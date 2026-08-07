/**
 * Ensure production bootstrap admin exists.
 * Usage: npm run db:ensure-admin
 */
import "dotenv/config";
import { hash, compare } from "bcryptjs";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { PrismaClient } = await import("../src/generated/prisma/client");
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const email = "admin@musafircaffe.com";
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "Admin@12345";
  const passwordHash = await hash(password, 12);

  try {
    await prisma.$queryRaw`SELECT 1`;
    const existing = await prisma.user.findUnique({ where: { email } });

    if (!existing) {
      const created = await prisma.user.create({
        data: {
          name: "Amina Admin",
          email,
          password: passwordHash,
          role: "admin",
          emailVerified: true,
          preferences: { create: {} },
          profile: { create: { displayName: "Amina Admin" } },
        },
      });
      console.log("Created bootstrap admin:", created.id);
    } else {
      const valid =
        Boolean(existing.password) && (await compare(password, existing.password!));
      if (!valid || existing.role !== "admin") {
        await prisma.user.update({
          where: { id: existing.id },
          data: {
            password: passwordHash,
            role: "admin",
            emailVerified: true,
          },
        });
        console.log("Updated bootstrap admin password/role:", existing.id);
      } else {
        console.log("Bootstrap admin already valid:", existing.id);
      }
      await prisma.profile.upsert({
        where: { userId: existing.id },
        create: { userId: existing.id, displayName: existing.name },
        update: {},
      });
    }

    const verify = await prisma.user.findUnique({ where: { email } });
    const match =
      verify?.password != null && (await compare(password, verify.password));
    console.log(
      JSON.stringify(
        {
          email,
          exists: Boolean(verify),
          role: verify?.role,
          hasPassword: Boolean(verify?.password),
          passwordMatchesBootstrap: match,
        },
        null,
        2,
      ),
    );
    if (!match) process.exit(2);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
