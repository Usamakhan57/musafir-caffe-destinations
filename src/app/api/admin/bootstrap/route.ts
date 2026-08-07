import { NextResponse } from "next/server";

import {
  BOOTSTRAP_ADMIN_EMAIL,
  ensureBootstrapAdmin,
  resetBootstrapAdminCache,
} from "@/features/auth/data/ensure-admin";
import { auditProductionAdminAuth } from "@/features/auth/data/auth-audit";
import { patchAuthSchemaIfNeeded } from "@/features/auth/data/schema-patch";
import { isDatabaseReady, resetDatabaseReadyCache } from "@/lib/prisma";

/**
 * Production admin heal + schema patch + auth audit.
 *
 * POST /api/admin/bootstrap
 * Header: x-bootstrap-secret: <ADMIN_BOOTSTRAP_SECRET | AUTH_SECRET | ops token>
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

  let patchRequested = true;
  try {
    const body = (await request.json()) as { migrate?: boolean; patch?: boolean };
    if (typeof body?.patch === "boolean") patchRequested = body.patch;
    else if (typeof body?.migrate === "boolean") patchRequested = body.migrate;
  } catch {
    patchRequested = true;
  }

  resetDatabaseReadyCache();
  const dbReady = await isDatabaseReady();

  let schemaPatch: Awaited<ReturnType<typeof patchAuthSchemaIfNeeded>> | null = null;
  if (patchRequested && dbReady) {
    schemaPatch = await patchAuthSchemaIfNeeded();
  }

  resetBootstrapAdminCache();
  await ensureBootstrapAdmin({ force: true });
  const audit = await auditProductionAdminAuth({ repair: false });

  const ok = Boolean(schemaPatch?.ok ?? true) && audit.ok;

  return NextResponse.json(
    {
      ok,
      email: BOOTSTRAP_ADMIN_EMAIL,
      loginUrl: "/login",
      adminUrl: "/admin",
      schemaPatch,
      audit,
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
