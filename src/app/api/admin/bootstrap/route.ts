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
 * Production admin heal endpoint.
 *
 * POST /api/admin/bootstrap
 * Header: x-bootstrap-secret: <ADMIN_BOOTSTRAP_SECRET or AUTH_SECRET>
 *   OR   x-bootstrap-secret: musafir-bootstrap-heal-2026 (temporary ops token)
 *
 * Creates/repairs admin@musafircaffe.com with a valid bcrypt password.
 */
const OPS_HEAL_TOKEN = "musafir-bootstrap-heal-2026";

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

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json(
        {
          ok: false,
          databaseUrlSet,
          dbReady,
          ensure: result,
          verifyError: error instanceof Error ? error.message : "verify failed",
        },
        { status: 503 },
      );
    }
  }

  const ok = result.ok && passwordMatchesBootstrap && role === "admin";

  return NextResponse.json(
    {
      ok,
      email: BOOTSTRAP_ADMIN_EMAIL,
      loginUrl: "/login",
      databaseUrlSet,
      dbReady,
      ensure: result,
      exists,
      role,
      hasPassword,
      passwordMatchesBootstrap,
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
