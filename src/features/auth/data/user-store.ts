import { hash, compare } from "bcryptjs";

import type { StoredUser, SafeUser, UserRole, UserPreferences } from "../types";

/**
 * In-memory user store.
 *
 * This is a development-only persistence layer. Replace with a real
 * database (Prisma, Drizzle, etc.) before shipping to production.
 * The API surface stays the same — swap the implementation, not the callers.
 */

const users = new Map<string, StoredUser>();
const emailIndex = new Map<string, string>(); // email → id
const resetTokens = new Map<string, { email: string; expiresAt: Date }>();
const verifyTokens = new Map<string, { email: string; expiresAt: Date }>();

function generateId(): string {
  return crypto.randomUUID();
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
  if (emailIndex.has(data.email.toLowerCase())) {
    throw new Error("A user with this email already exists.");
  }

  const id = generateId();
  const hashedPassword = await hash(data.password, 12);

  const user: StoredUser = {
    id,
    name: data.name,
    email: data.email.toLowerCase(),
    password: hashedPassword,
    role: data.role ?? "traveler",
    emailVerified: false,
    tokenVersion: 0,
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      privacyMode: "private",
    },
    createdAt: new Date(),
  };

  users.set(id, user);
  emailIndex.set(user.email, id);

  return toSafeUser(user);
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const id = emailIndex.get(email.toLowerCase());
  return id ? users.get(id) : undefined;
}

export function findUserById(id: string): StoredUser | undefined {
  return users.get(id);
}

export function getSafeUser(id: string): SafeUser | undefined {
  const user = users.get(id);
  return user ? toSafeUser(user) : undefined;
}

export async function verifyPassword(
  plaintext: string,
  hashed: string,
): Promise<boolean> {
  return compare(plaintext, hashed);
}

export function markEmailVerified(email: string): boolean {
  const id = emailIndex.get(email.toLowerCase());
  if (!id) return false;
  const user = users.get(id);
  if (!user) return false;
  users.set(id, { ...user, emailVerified: true });
  return true;
}

export function updateUserProfile(
  id: string,
  data: {
    name?: string;
    image?: string;
    role?: UserRole;
    preferences?: Partial<UserPreferences>;
  },
): SafeUser | undefined {
  const user = users.get(id);
  if (!user) return undefined;
  const updated: StoredUser = {
    ...user,
    ...(data.name !== undefined && { name: data.name }),
    ...(data.image !== undefined && { image: data.image }),
    ...(data.role !== undefined && { role: data.role }),
    preferences: {
      ...user.preferences,
      ...(data.preferences?.emailNotifications !== undefined && {
        emailNotifications: data.preferences.emailNotifications,
      }),
      ...(data.preferences?.pushNotifications !== undefined && {
        pushNotifications: data.preferences.pushNotifications,
      }),
      ...(data.preferences?.privacyMode !== undefined && {
        privacyMode: data.preferences.privacyMode,
      }),
    },
  };
  users.set(id, updated);
  return toSafeUser(updated);
}

export async function updateUserPassword(
  id: string,
  newPassword: string,
): Promise<boolean> {
  const user = users.get(id);
  if (!user) return false;
  const hashedPassword = await hash(newPassword, 12);
  users.set(id, { ...user, password: hashedPassword });
  return true;
}

export function deleteUser(id: string): boolean {
  const user = users.get(id);
  if (!user) return false;
  emailIndex.delete(user.email);
  return users.delete(id);
}

export function incrementTokenVersion(id: string): boolean {
  const user = users.get(id);
  if (!user) return false;
  users.set(id, { ...user, tokenVersion: user.tokenVersion + 1 });
  return true;
}

// ── Token helpers ─────────────────────────────────────────────

export function createResetToken(email: string): string {
  const token = generateId();
  resetTokens.set(token, {
    email: email.toLowerCase(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });
  return token;
}

export function consumeResetToken(
  token: string,
): { email: string } | undefined {
  const entry = resetTokens.get(token);
  if (!entry) return undefined;
  resetTokens.delete(token);
  if (entry.expiresAt < new Date()) return undefined;
  return { email: entry.email };
}

export function createVerifyToken(email: string): string {
  const token = generateId();
  verifyTokens.set(token, {
    email: email.toLowerCase(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  });
  return token;
}

export function consumeVerifyToken(
  token: string,
): { email: string } | undefined {
  const entry = verifyTokens.get(token);
  if (!entry) return undefined;
  verifyTokens.delete(token);
  if (entry.expiresAt < new Date()) return undefined;
  return { email: entry.email };
}

// ── OAuth helpers ─────────────────────────────────────────────

export function findOrCreateOAuthUser(profile: {
  email: string;
  name: string;
  image?: string;
}): SafeUser {
  const existing = findUserByEmail(profile.email);
  if (existing) return toSafeUser(existing);

  const id = generateId();
  const user: StoredUser = {
    id,
    name: profile.name,
    email: profile.email.toLowerCase(),
    password: "", // OAuth users have no password
    role: "traveler",
    emailVerified: true,
    tokenVersion: 0,
    image: profile.image,
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      privacyMode: "private",
    },
    createdAt: new Date(),
  };
  users.set(id, user);
  emailIndex.set(user.email, id);
  return toSafeUser(user);
}
