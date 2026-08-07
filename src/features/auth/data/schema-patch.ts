import "server-only";

import { isDatabaseReady, prisma } from "@/lib/prisma";

/**
 * Idempotent auth-schema patch for Hostinger production where
 * `prisma migrate deploy` cannot be shelled out from the runtime.
 */
export async function patchAuthSchemaIfNeeded(): Promise<{
  ok: boolean;
  statements: string[];
  error?: string;
  skipped?: boolean;
}> {
  if (!(await isDatabaseReady())) {
    return { ok: false, statements: [], error: "database unavailable", skipped: true };
  }

  const statements = [
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bio" TEXT`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "location" TEXT`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "website" TEXT`,
    `CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role")`,
    `CREATE INDEX IF NOT EXISTS "User_name_idx" ON "User"("name")`,
    `ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT ''`,
    `UPDATE "User" SET "password" = '' WHERE "password" IS NULL`,
    `ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL`,
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
  ];

  try {
    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql);
    }
    return { ok: true, statements };
  } catch (error) {
    return {
      ok: false,
      statements,
      error: error instanceof Error ? error.message : "schema patch failed",
    };
  }
}
