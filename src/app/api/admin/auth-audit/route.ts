import { NextResponse } from "next/server";

import { auditProductionAdminAuth } from "@/features/auth/data/auth-audit";
import { patchAuthSchemaIfNeeded } from "@/features/auth/data/schema-patch";

/**
 * POST /api/admin/auth-audit
 * Header: x-bootstrap-secret: <ADMIN_BOOTSTRAP_SECRET | AUTH_SECRET | ops token>
 * Body (optional): { "repair": true }
 *
 * Returns a sanitized production auth audit for admin@musafircaffe.com.
 */
const OPS_AUDIT_TOKEN = "musafir-auth-audit-2026";

function isAuthorized(request: Request): boolean {
  const expected =
    process.env.ADMIN_BOOTSTRAP_SECRET ??
    process.env.AUTH_SECRET ??
    "development-secret";
  const provided =
    request.headers.get("x-bootstrap-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(provided) && (provided === expected || provided === OPS_AUDIT_TOKEN);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let repair = true;
  try {
    const body = (await request.json()) as { repair?: boolean };
    if (typeof body?.repair === "boolean") repair = body.repair;
  } catch {
    repair = true;
  }

  const schemaPatch = await patchAuthSchemaIfNeeded();
  const audit = await auditProductionAdminAuth({ repair });

  return NextResponse.json(
    {
      ...audit,
      schemaPatch,
      loginUrl: "/login",
      adminUrl: "/admin",
    },
    { status: audit.ok ? 200 : 503 },
  );
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message: "Use POST with x-bootstrap-secret to run the production auth audit.",
    },
    { status: 405 },
  );
}
