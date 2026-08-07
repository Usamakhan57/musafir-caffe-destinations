import { NextResponse } from "next/server";

import {
  BOOTSTRAP_ADMIN_EMAIL,
  ensureBootstrapAdmin,
  resetBootstrapAdminCache,
} from "@/features/auth/data/ensure-admin";

/**
 * Production admin heal endpoint.
 *
 * POST /api/admin/bootstrap
 * Header: x-bootstrap-secret: <ADMIN_BOOTSTRAP_SECRET or AUTH_SECRET>
 *
 * Creates/repairs admin@musafircaffe.com with a valid bcrypt password.
 * Safe to call repeatedly. Does not change UI.
 */
export async function POST(request: Request) {
  const expected =
    process.env.ADMIN_BOOTSTRAP_SECRET ??
    process.env.AUTH_SECRET ??
    "development-secret";
  const provided =
    request.headers.get("x-bootstrap-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!provided || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  resetBootstrapAdminCache();
  const result = await ensureBootstrapAdmin({ force: true });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        email: BOOTSTRAP_ADMIN_EMAIL,
        reason: result.reason,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    email: BOOTSTRAP_ADMIN_EMAIL,
    action: result.action,
    loginUrl: "/login",
  });
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
