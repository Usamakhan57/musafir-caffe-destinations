import { NextResponse } from "next/server";

import {
  BOOTSTRAP_ADMIN_EMAIL,
  BOOTSTRAP_ADMIN_PASSWORD,
  ensureBootstrapAdmin,
  resetBootstrapAdminCache,
} from "@/features/auth/data/ensure-admin";
import { isDatabaseReady, prisma, resetDatabaseReadyCache } from "@/lib/prisma";
import { findUserByEmail, verifyPassword } from "@/features/auth/data/user-store";

/**
 * Production admin heal + schema patch.
 *
 * POST /api/admin/bootstrap
 * Header: x-bootstrap-secret: <ADMIN_BOOTSTRAP_SECRET or AUTH_SECRET>
 *
 * Hostinger runtimes cannot reliably shell out to `prisma migrate deploy`,
 * so this endpoint applies critical missing auth tables/columns via SQL, then
 * creates/repairs admin@musafircaffe.com with a valid bcrypt password.
 */

function isAuthorized(request: Request): boolean {
  const expected =
    process.env.ADMIN_BOOTSTRAP_SECRET ??
    process.env.AUTH_SECRET ??
    "development-secret";
  const provided =
    request.headers.get("x-bootstrap-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(provided) && provided === expected;
}

async function patchProductionSchema(): Promise<{
  ok: boolean;
  statements: string[];
  error?: string;
}> {
  const statements = [
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bio" TEXT`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "location" TEXT`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "website" TEXT`,
    `CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role")`,
    `CREATE INDEX IF NOT EXISTS "User_name_idx" ON "User"("name")`,
    `ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT ''`,
    `UPDATE "User" SET "password" = '' WHERE "password" IS NULL`,
    `ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL`,
    // Auth-adjacent tables required by ensureBootstrapAdmin / Auth.js
    `CREATE TABLE IF NOT EXISTS "Preferences" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
      "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
      "privacyMode" TEXT NOT NULL DEFAULT 'private',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Preferences_userId_key" ON "Preferences"("userId")`,
    `CREATE TABLE IF NOT EXISTS "Profile" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "displayName" TEXT,
      "headline" TEXT,
      "avatarUrl" TEXT,
      "coverUrl" TEXT,
      "socials" JSONB,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile"("userId")`,
    `CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
      "id" TEXT NOT NULL,
      "token" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token")`,
    `CREATE TABLE IF NOT EXISTS "EmailVerificationToken" (
      "id" TEXT NOT NULL,
      "token" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "EmailVerificationToken_token_key" ON "EmailVerificationToken"("token")`,
    // Minimal CMS tables required by later admin modules
    `CREATE TABLE IF NOT EXISTS "WebsiteSetting" (
      "id" TEXT NOT NULL,
      "key" TEXT NOT NULL,
      "label" TEXT NOT NULL,
      "value" JSONB NOT NULL,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "WebsiteSetting_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "WebsiteSetting_key_key" ON "WebsiteSetting"("key")`,
    `CREATE TABLE IF NOT EXISTS "SeoPage" (
      "id" TEXT NOT NULL,
      "path" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "ogImage" TEXT,
      "canonicalUrl" TEXT,
      "noIndex" BOOLEAN NOT NULL DEFAULT false,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "SeoPage_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "SeoPage_path_key" ON "SeoPage"("path")`,
    `CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
      "id" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "name" TEXT,
      "status" TEXT NOT NULL DEFAULT 'active',
      "source" TEXT NOT NULL DEFAULT 'website',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email")`,
  ];

  try {
    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql);
    }
    // Record migrations as applied when possible so future migrate deploy is clean.
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
        "id" VARCHAR(36) PRIMARY KEY,
        "checksum" VARCHAR(64) NOT NULL,
        "finished_at" TIMESTAMPTZ,
        "migration_name" VARCHAR(255) NOT NULL,
        "logs" TEXT,
        "rolled_back_at" TIMESTAMPTZ,
        "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "applied_steps_count" INTEGER NOT NULL DEFAULT 0
      )
    `);
    return { ok: true, statements };
  } catch (error) {
    return {
      ok: false,
      statements,
      error: error instanceof Error ? error.message : "schema patch failed",
    };
  }
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
  const databaseUrlSet = Boolean(process.env.DATABASE_URL);
  const dbReady = await isDatabaseReady();

  let schemaPatch: Awaited<ReturnType<typeof patchProductionSchema>> | null = null;
  if (patchRequested && dbReady) {
    schemaPatch = await patchProductionSchema();
  }

  resetBootstrapAdminCache();
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
    Boolean(schemaPatch?.ok ?? true) &&
    result.ok &&
    passwordMatchesBootstrap &&
    role === "admin";

  return NextResponse.json(
    {
      ok,
      email: BOOTSTRAP_ADMIN_EMAIL,
      loginUrl: "/login",
      databaseUrlSet,
      dbReady,
      schemaPatch,
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
