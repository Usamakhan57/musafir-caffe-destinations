import "server-only";

import { hash, compare } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import type { StoredUser, SafeUser, UserRole, UserPreferences } from "../types";
import type {
  User as PrismaUser,
  Preferences as PrismaPreferences,
  UserRole as PrismaUserRole,
  PrismaClient as PrismaClientType,
} from "@/generated/prisma/client";

const defaultPreferences: UserPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  privacyMode: "private",
};

type UserWithPreferences = PrismaUser & {
  preferences: PrismaPreferences | null;
};

type TransactionClient = Parameters<PrismaClientType["$transaction"]>[0] extends (
  tx: infer T,
) => unknown
  ? T
  : never;

function mapRoleToDb(role: UserRole): PrismaUserRole {
  switch (role) {
    case "cafe-owner":
      return "cafe_owner";
    case "guide-creator":
      return "guide_creator";
    case "editor":
      return "editor";
    case "moderator":
      return "moderator";
    case "admin":
      return "admin";
    default:
      return "traveler";
  }
}

function mapRoleFromDb(role: PrismaUserRole): UserRole {
  switch (role) {
    case "cafe_owner":
      return "cafe-owner";
    case "guide_creator":
      return "guide-creator";
    case "editor":
      return "editor";
    case "moderator":
      return "moderator";
    case "admin":
      return "admin";
    default:
      return "traveler";
  }
}

function generateId(): string {
  return crypto.randomUUID();
}

function toStoredUser(user: UserWithPreferences): StoredUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password ?? "",
    role: mapRoleFromDb(user.role),
    emailVerified: user.emailVerified,
    tokenVersion: user.tokenVersion,
    image: user.image ?? undefined,
    preferences: user.preferences
      ? {
          emailNotifications: user.preferences.emailNotifications,
          pushNotifications: user.preferences.pushNotifications,
          privacyMode: user.preferences.privacyMode as UserPreferences["privacyMode"],
        }
      : defaultPreferences,
    createdAt: user.createdAt,
  };
}

function toSafeUser(user: StoredUser): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...safe } = user;
  return safe;
}

// ── Public API ────────────────────────────────────────────────

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}): Promise<SafeUser> {
  const normalizedEmail = data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    throw new Error("A user with this email already exists.");
  }

  const hashedPassword = await hash(data.password, 12);
  const createdUser = await prisma.$transaction(async (tx: TransactionClient) => {
    const user = await tx.user.create({
      data: {
        name: data.name,
        email: normalizedEmail,
        password: hashedPassword,
        role: mapRoleToDb(data.role ?? "traveler"),
        emailVerified: false,
        tokenVersion: 0,
        preferences: {
          create: {},
        },
      },
      include: {
        preferences: true,
      },
    });

    return user;
  });

  return toSafeUser(toStoredUser(createdUser as UserWithPreferences));
}

export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { preferences: true },
  });

  return user ? toStoredUser(user as UserWithPreferences) : undefined;
}

export async function findUserById(id: string): Promise<StoredUser | undefined> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { preferences: true },
  });

  return user ? toStoredUser(user as UserWithPreferences) : undefined;
}

export async function getSafeUser(id: string): Promise<SafeUser | undefined> {
  const user = await findUserById(id);
  return user ? toSafeUser(user) : undefined;
}

export async function verifyPassword(
  plaintext: string,
  hashed: string,
): Promise<boolean> {
  if (!plaintext || !hashed) return false;
  try {
    return await compare(plaintext, hashed);
  } catch {
    return false;
  }
}

export async function markEmailVerified(email: string): Promise<boolean> {
  const result = await prisma.user.updateMany({
    where: { email: email.toLowerCase() },
    data: { emailVerified: true },
  });

  return result.count > 0;
}

export async function updateUserProfile(
  id: string,
  data: {
    name?: string;
    image?: string;
    role?: UserRole;
    preferences?: Partial<UserPreferences>;
  },
): Promise<SafeUser | undefined> {
  const updateData: { name?: string; image?: string | null; role?: PrismaUserRole } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.image !== undefined) {
    updateData.image = data.image || null;
  }

  if (data.role !== undefined) {
    updateData.role = mapRoleToDb(data.role);
  }

  await prisma.user.updateMany({
    where: { id },
    data: updateData,
  });

  if (data.preferences) {
    await prisma.preferences.upsert({
      where: { userId: id },
      update: {
        ...(data.preferences.emailNotifications !== undefined && {
          emailNotifications: data.preferences.emailNotifications,
        }),
        ...(data.preferences.pushNotifications !== undefined && {
          pushNotifications: data.preferences.pushNotifications,
        }),
        ...(data.preferences.privacyMode !== undefined && {
          privacyMode: data.preferences.privacyMode as UserPreferences["privacyMode"],
        }),
      },
      create: {
        userId: id,
        emailNotifications: data.preferences.emailNotifications ?? defaultPreferences.emailNotifications,
        pushNotifications: data.preferences.pushNotifications ?? defaultPreferences.pushNotifications,
        privacyMode: (data.preferences.privacyMode ?? defaultPreferences.privacyMode) as UserPreferences["privacyMode"],
      },
    });
  }

  const updated = await findUserById(id);
  return updated ? toSafeUser(updated) : undefined;
}

export async function updateUserPassword(
  id: string,
  newPassword: string,
): Promise<boolean> {
  const hashedPassword = await hash(newPassword, 12);
  const result = await prisma.user.updateMany({
    where: { id },
    data: { password: hashedPassword },
  });

  return result.count > 0;
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

export async function incrementTokenVersion(id: string): Promise<boolean> {
  const result = await prisma.user.updateMany({
    where: { id },
    data: { tokenVersion: { increment: 1 } },
  });

  return result.count > 0;
}

// ── Token helpers ─────────────────────────────────────────────

export async function createResetToken(email: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    return "";
  }

  const token = generateId();
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  return token;
}

export async function consumeResetToken(
  token: string,
): Promise<{ email: string } | undefined> {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record) {
    return undefined;
  }

  await prisma.passwordResetToken.delete({ where: { id: record.id } });
  if (record.expiresAt < new Date()) {
    return undefined;
  }

  return { email: record.user.email };
}

export async function createVerifyToken(email: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    return "";
  }

  const token = generateId();
  await prisma.emailVerificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  return token;
}

export async function consumeVerifyToken(
  token: string,
): Promise<{ email: string } | undefined> {
  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record) {
    return undefined;
  }

  await prisma.emailVerificationToken.delete({ where: { id: record.id } });
  if (record.expiresAt < new Date()) {
    return undefined;
  }

  return { email: record.user.email };
}

// ── OAuth helpers ─────────────────────────────────────────────

export async function findOrCreateOAuthUser(profile: {
  email: string;
  name: string;
  image?: string;
}): Promise<SafeUser> {
  const existing = await findUserByEmail(profile.email);
  if (existing) {
    return toSafeUser(existing);
  }

  const normalizedEmail = profile.email.toLowerCase();
  const createdUser = await prisma.$transaction(async (tx: TransactionClient) => {
    const user = await tx.user.create({
      data: {
        name: profile.name,
        email: normalizedEmail,
        password: "",
        role: mapRoleToDb("traveler"),
        emailVerified: true,
        tokenVersion: 0,
        image: profile.image,
        preferences: {
          create: {},
        },
      },
      include: {
        preferences: true,
      },
    });

    return user;
  });

  return toSafeUser(toStoredUser(createdUser as UserWithPreferences));
}
