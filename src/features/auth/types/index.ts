/** User roles for RBAC. */
export type UserRole = "traveler" | "cafe-owner" | "guide-creator" | "admin";

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  privacyMode: "public" | "private";
}

/** Shape of a user stored in the in-memory database. */
export interface StoredUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly emailVerified: boolean;
  readonly tokenVersion: number;
  readonly image?: string;
  readonly preferences: UserPreferences;
  readonly createdAt: Date;
}

/** Safe user object (no password). */
export type SafeUser = Omit<StoredUser, "password">;

/** Generic action result returned from Server Actions. */
export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
