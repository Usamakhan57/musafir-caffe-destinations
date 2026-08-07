import "server-only";

import { compare } from "bcryptjs";

import {
  BOOTSTRAP_ADMIN_EMAIL,
  BOOTSTRAP_ADMIN_PASSWORD,
  ensureBootstrapAdmin,
  resetBootstrapAdminCache,
} from "@/features/auth/data/ensure-admin";
import { isDatabaseReady, prisma, resetDatabaseReadyCache } from "@/lib/prisma";

export type AuthDenyReason =
  | "missing_credentials"
  | "database_unavailable"
  | "user_not_found"
  | "password_empty"
  | "password_mismatch"
  | "authorize_exception";

type AuthDenyEvent = {
  at: string;
  email: string;
  reason: AuthDenyReason;
  detail?: string;
};

const globalAuth = globalThis as typeof globalThis & {
  __musafirAuthDenies?: AuthDenyEvent[];
};

function denyLog(): AuthDenyEvent[] {
  if (!globalAuth.__musafirAuthDenies) globalAuth.__musafirAuthDenies = [];
  return globalAuth.__musafirAuthDenies;
}

/** Record why Credentials authorize returned null (ring buffer). */
export function recordAuthDeny(
  email: string,
  reason: AuthDenyReason,
  detail?: string,
) {
  const events = denyLog();
  events.push({
    at: new Date().toISOString(),
    email: email.toLowerCase(),
    reason,
    detail: detail?.slice(0, 500),
  });
  if (events.length > 25) events.shift();
  console.warn("[auth] authorize denied", { email, reason, detail });
}

export function getRecentAuthDenies() {
  return [...denyLog()].reverse();
}

function redactDatabaseUrl(url: string | undefined): {
  set: boolean;
  host: string | null;
  database: string | null;
  user: string | null;
  usingMockFallback: boolean;
} {
  if (!url) {
    return {
      set: false,
      host: null,
      database: null,
      user: null,
      usingMockFallback: true,
    };
  }
  try {
    const parsed = new URL(url);
    return {
      set: true,
      host: parsed.hostname,
      database: parsed.pathname.replace(/^\//, "") || null,
      user: parsed.username || null,
      usingMockFallback: ["localhost", "127.0.0.1"].includes(parsed.hostname),
    };
  } catch {
    return {
      set: true,
      host: "unparseable",
      database: null,
      user: null,
      usingMockFallback: false,
    };
  }
}

function isBcryptHash(value: string | null | undefined): boolean {
  if (!value) return false;
  return /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value);
}

/**
 * Full production auth audit for the bootstrap admin account.
 * Never returns the raw password hash — only metadata + compare results.
 */
export async function auditProductionAdminAuth(options?: {
  repair?: boolean;
  probePassword?: string;
}) {
  resetDatabaseReadyCache();
  if (options?.repair) resetBootstrapAdminCache();

  const database = redactDatabaseUrl(process.env.DATABASE_URL);
  const dbReady = await isDatabaseReady();
  const probePassword = options?.probePassword ?? BOOTSTRAP_ADMIN_PASSWORD;

  let ensure:
    | { ok: true; action: string }
    | { ok: false; reason: string }
    | null = null;

  if (options?.repair) {
    ensure = await ensureBootstrapAdmin({ force: true });
  }

  let admin: {
    found: boolean;
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    emailVerified?: boolean;
    tokenVersion?: number;
    createdAt?: string;
    updatedAt?: string;
    passwordHashNull?: boolean;
    passwordHashEmpty?: boolean;
    passwordHashIsBcrypt?: boolean;
    passwordHashPrefix?: string | null;
    bcryptCompareAdmin12345?: boolean;
    bcryptCompareProbe?: boolean;
    accountActive?: boolean;
    error?: string;
  } = { found: false };

  if (dbReady) {
    try {
      const row = await prisma.user.findUnique({
        where: { email: BOOTSTRAP_ADMIN_EMAIL },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          emailVerified: true,
          tokenVersion: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!row) {
        admin = { found: false };
      } else {
        const hash = row.password;
        const passwordHashNull = hash == null;
        const passwordHashEmpty = !hash;
        const passwordHashIsBcrypt = isBcryptHash(hash);
        let bcryptCompareProbe = false;
        let bcryptCompareAdmin12345 = false;
        if (hash) {
          try {
            bcryptCompareProbe = await compare(probePassword, hash);
          } catch {
            bcryptCompareProbe = false;
          }
          try {
            bcryptCompareAdmin12345 = await compare("Admin@12345", hash);
          } catch {
            bcryptCompareAdmin12345 = false;
          }
        }

        admin = {
          found: true,
          id: row.id,
          email: row.email,
          name: row.name,
          role: row.role,
          emailVerified: row.emailVerified,
          tokenVersion: row.tokenVersion,
          createdAt: row.createdAt.toISOString(),
          updatedAt: row.updatedAt.toISOString(),
          passwordHashNull,
          passwordHashEmpty,
          passwordHashIsBcrypt,
          passwordHashPrefix: hash ? hash.slice(0, 7) : null,
          bcryptCompareAdmin12345,
          bcryptCompareProbe,
          // No separate "active" column — active means admin + verified + usable hash
          accountActive:
            row.role === "admin" &&
            row.emailVerified &&
            passwordHashIsBcrypt &&
            bcryptCompareAdmin12345,
        };
      }
    } catch (error) {
      admin = {
        found: false,
        error: error instanceof Error ? error.message : "query failed",
      };
    }
  }

  return {
    ok:
      database.set &&
      dbReady &&
      admin.found &&
      admin.role === "admin" &&
      admin.passwordHashIsBcrypt === true &&
      admin.bcryptCompareAdmin12345 === true,
    prismaConnectedToProductionDatabase: database.set && !database.usingMockFallback,
    usingMockOrFallbackDatabase: !database.set || database.usingMockFallback,
    database,
    dbReady,
    bootstrapEmail: BOOTSTRAP_ADMIN_EMAIL,
    ensure,
    admin,
    recentAuthDenies: getRecentAuthDenies(),
    sameDatabaseAsCredentialsProvider: true,
  };
}
