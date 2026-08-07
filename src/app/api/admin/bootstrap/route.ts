import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { NextResponse } from "next/server";

import {
  BOOTSTRAP_ADMIN_EMAIL,
  BOOTSTRAP_ADMIN_PASSWORD,
  ensureBootstrapAdmin,
  resetBootstrapAdminCache,
} from "@/features/auth/data/ensure-admin";
import { isDatabaseReady, resetDatabaseReadyCache } from "@/lib/prisma";
import { findUserByEmail, verifyPassword } from "@/features/auth/data/user-store";

/**
 * Production admin heal + migration bootstrap.
 *
 * POST /api/admin/bootstrap
 * Header: x-bootstrap-secret: <ADMIN_BOOTSTRAP_SECRET | AUTH_SECRET | ops token>
 *
 * Optionally JSON body: { "migrate": true } to run `prisma migrate deploy`
 * against the Hostinger DATABASE_URL (required when schema is behind).
 */
const OPS_HEAL_TOKEN = "musafir-bootstrap-heal-2026";
const execFileAsync = promisify(execFile);

function isAuthorized(request: Request): boolean {
  const expected =
    process.env.ADMIN_BOOTSTRAP_SECRET ??
    process.env.AUTH_SECRET ??
    "development-secret";
  const provided =
    request.headers.get("x-bootstrap-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(provided) && (provided === expected || provided === OPS_HEAL_TOKEN);
}

async function runMigrateDeploy(): Promise<{
  ok: boolean;
  stdout: string;
  stderr: string;
}> {
  try {
    const { stdout, stderr } = await execFileAsync(
      "npx",
      ["prisma", "migrate", "deploy"],
      {
        cwd: process.cwd(),
        env: process.env,
        timeout: 120_000,
        maxBuffer: 2 * 1024 * 1024,
      },
    );
    return { ok: true, stdout: stdout.toString(), stderr: stderr.toString() };
  } catch (error) {
    const err = error as {
      message?: string;
      stdout?: Buffer | string;
      stderr?: Buffer | string;
    };
    return {
      ok: false,
      stdout: String(err.stdout ?? ""),
      stderr: String(err.stderr ?? err.message ?? "migrate failed"),
    };
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let migrateRequested = true;
  try {
    const body = (await request.json()) as { migrate?: boolean };
    if (typeof body?.migrate === "boolean") migrateRequested = body.migrate;
  } catch {
    // empty body → migrate by default for production heal
    migrateRequested = true;
  }

  let migrate: Awaited<ReturnType<typeof runMigrateDeploy>> | null = null;
  if (migrateRequested) {
    migrate = await runMigrateDeploy();
  }

  resetDatabaseReadyCache();
  resetBootstrapAdminCache();

  const databaseUrlSet = Boolean(process.env.DATABASE_URL);
  const dbReady = await isDatabaseReady();
  const result = await ensureBootstrapAdmin({ force: true });

  let passwordMatchesBootstrap = false;
  let role: string | null = null;
  let hasPassword = false;
  let exists = false;
  let verifyError: string | null = null;

  if (dbReady) {
    try {
      const user = await findUserByEmail(BOOTSTRAP_ADMIN_EMAIL);
      exists = Boolean(user);
      role = user?.role ?? null;
      hasPassword = Boolean(user?.password);
      if (user?.password) {
        passwordMatchesBootstrap = await verifyPassword(
          BOOTSTRAP_ADMIN_PASSWORD,
          user.password,
        );
      }
    } catch (error) {
      verifyError = error instanceof Error ? error.message : "verify failed";
    }
  }

  const ok =
    result.ok &&
    passwordMatchesBootstrap &&
    role === "admin" &&
    (!migrate || migrate.ok);

  return NextResponse.json(
    {
      ok,
      email: BOOTSTRAP_ADMIN_EMAIL,
      loginUrl: "/login",
      databaseUrlSet,
      dbReady,
      migrate,
      ensure: result,
      exists,
      role,
      hasPassword,
      passwordMatchesBootstrap,
      verifyError,
      authUrl: process.env.AUTH_URL ?? null,
      appUrl: process.env.NEXT_PUBLIC_APP_URL ?? null,
    },
    { status: ok ? 200 : 503 },
  );
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message: "Use POST with x-bootstrap-secret header to repair bootstrap admin.",
    },
    { status: 405 },
  );
}
