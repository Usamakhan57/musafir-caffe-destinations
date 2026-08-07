/**
 * Align User.password with the init migration (TEXT NOT NULL).
 * Prisma schema previously marked it optional, which let seeds omit the
 * field and left Auth.js calling bcrypt on empty strings → Configuration errors.
 */
-- No-op if already NOT NULL (init migration). Ensure empty-string default for safety.
ALTER TABLE "User" ALTER COLUMN "password" SET DEFAULT '';
UPDATE "User" SET "password" = '' WHERE "password" IS NULL;
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
