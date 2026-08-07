import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  prismaReady?: boolean | null;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "[prisma] Missing required environment variable DATABASE_URL. Set it before starting the app.",
    );
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

/** Lazy Prisma proxy — avoids crashing module init when DATABASE_URL is unset. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    if (!client) {
      throw new Error(
        "[prisma] Missing required environment variable DATABASE_URL. Set it before starting the app.",
      );
    }
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

/** Probe Postgres connectivity once per process. */
export async function isDatabaseReady(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {
    globalForPrisma.prismaReady = false;
    return false;
  }
  if (globalForPrisma.prismaReady != null) return globalForPrisma.prismaReady;
  try {
    const client = getClient();
    if (!client) {
      globalForPrisma.prismaReady = false;
      return false;
    }
    await client.$queryRaw`SELECT 1`;
    globalForPrisma.prismaReady = true;
  } catch {
    globalForPrisma.prismaReady = false;
  }
  return globalForPrisma.prismaReady;
}

export function resetDatabaseReadyCache() {
  globalForPrisma.prismaReady = null;
}
