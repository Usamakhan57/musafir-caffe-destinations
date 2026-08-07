import "server-only";

import { compare, hash } from "bcryptjs";

import { isDatabaseReady, prisma } from "@/lib/prisma";

export const BOOTSTRAP_ADMIN_EMAIL = "admin@musafircaffe.com";
export const BOOTSTRAP_ADMIN_PASSWORD =
  process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "Admin@12345";

type EnsureResult =
  | { ok: true; action: "created" | "password_updated" | "unchanged" }
  | { ok: false; reason: string };

const globalEnsure = globalThis as typeof globalThis & {
  __musafirAdminEnsure?: Promise<EnsureResult> | EnsureResult;
};

async function ensureProfileAndPreferences(userId: string, name: string) {
  try {
    await prisma.preferences.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  } catch (error) {
    console.warn("[bootstrap-admin] preferences upsert skipped:", error);
  }
  try {
    await prisma.profile.upsert({
      where: { userId },
      create: { userId, displayName: name },
      update: {},
    });
  } catch (error) {
    console.warn("[bootstrap-admin] profile upsert skipped:", error);
  }
}

/**
 * Ensures the production bootstrap admin exists with a valid bcrypt password.
 * Safe to call repeatedly — runs at most once per process unless forced.
 */
export async function ensureBootstrapAdmin(options?: {
  force?: boolean;
}): Promise<EnsureResult> {
  if (!options?.force && globalEnsure.__musafirAdminEnsure) {
    return globalEnsure.__musafirAdminEnsure;
  }

  const run = (async (): Promise<EnsureResult> => {
    if (!process.env.DATABASE_URL) {
      return { ok: false, reason: "DATABASE_URL missing" };
    }
    if (!(await isDatabaseReady())) {
      return { ok: false, reason: "database unavailable" };
    }

    const email = BOOTSTRAP_ADMIN_EMAIL;
    const password = BOOTSTRAP_ADMIN_PASSWORD;
    const passwordHash = await hash(password, 12);

    const existing = await prisma.user.findUnique({ where: { email } });

    if (!existing) {
      const created = await prisma.user.create({
        data: {
          name: "Amina Admin",
          email,
          password: passwordHash,
          role: "admin",
          emailVerified: true,
          tokenVersion: 0,
        },
      });
      await ensureProfileAndPreferences(created.id, created.name);
      return { ok: true, action: "created" };
    }

    const hasValidPassword =
      Boolean(existing.password) &&
      (await compare(password, existing.password!));

    if (hasValidPassword && existing.role === "admin") {
      await ensureProfileAndPreferences(existing.id, existing.name);
      return { ok: true, action: "unchanged" };
    }

    await prisma.user.update({
      where: { id: existing.id },
      data: {
        password: passwordHash,
        role: "admin",
        emailVerified: true,
      },
    });

    await ensureProfileAndPreferences(existing.id, existing.name);

    return { ok: true, action: "password_updated" };
  })();

  globalEnsure.__musafirAdminEnsure = run;
  try {
    const result = await run;
    globalEnsure.__musafirAdminEnsure = result;
    return result;
  } catch (error) {
    globalEnsure.__musafirAdminEnsure = undefined;
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "ensure failed",
    };
  }
}

/** Reset the in-process cache (tests / after manual DB changes). */
export function resetBootstrapAdminCache() {
  globalEnsure.__musafirAdminEnsure = undefined;
}
