import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { env } from "@/config/env";
import {
  findUserByEmail,
  verifyPassword,
  findOrCreateOAuthUser,
  findUserById,
} from "@/features/auth/data/user-store";
import { ensureBootstrapAdmin, BOOTSTRAP_ADMIN_EMAIL } from "@/features/auth/data/ensure-admin";
import { recordAuthDeny } from "@/features/auth/data/auth-audit";
import type { UserRole, UserPreferences } from "@/features/auth/types";

interface AuthUserWithPreferences {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
  remember?: boolean;
  preferences?: UserPreferences;
}


declare module "next-auth" {
  interface User {
    role?: UserRole;
    preferences?: {
      emailNotifications: boolean;
      pushNotifications: boolean;
      privacyMode: "public" | "private";
    };
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: UserRole;
      isEmailVerified: boolean;
      preferences: {
        emailNotifications: boolean;
        pushNotifications: boolean;
        privacyMode: "public" | "private";
      };
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    isEmailVerified: boolean;
    tokenVersion?: number;
    remember?: boolean;
    preferences: {
      emailNotifications: boolean;
      pushNotifications: boolean;
      privacyMode: "public" | "private";
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Required behind Hostinger / CDN reverse proxies.
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...(env.googleClientId && env.googleClientSecret
      ? [
          Google({
            clientId: env.googleClientId,
            clientSecret: env.googleClientSecret,
          }),
        ]
      : []),
    ...(env.githubClientId && env.githubClientSecret
      ? [
          GitHub({
            clientId: env.githubClientId,
            clientSecret: env.githubClientSecret,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          recordAuthDeny("", "missing_credentials");
          return null;
        }

        const normalizedEmail = email.toLowerCase().trim();

        try {
          // Heal production bootstrap admin if seed never ran or password is missing.
          // Force on the bootstrap email so an empty/wrong hash is repaired even when
          // an earlier in-process ensure cached a stale "unchanged" result.
          await ensureBootstrapAdmin({
            force: normalizedEmail === BOOTSTRAP_ADMIN_EMAIL,
          });

          let user = await findUserByEmail(normalizedEmail);
          if (!user) {
            recordAuthDeny(normalizedEmail, "user_not_found");
            return null;
          }
          if (!user.password) {
            recordAuthDeny(normalizedEmail, "password_empty");
            return null;
          }

          let valid = await verifyPassword(password, user.password);
          if (!valid && normalizedEmail === BOOTSTRAP_ADMIN_EMAIL) {
            await ensureBootstrapAdmin({ force: true });
            user = await findUserByEmail(normalizedEmail);
            if (!user?.password) {
              recordAuthDeny(normalizedEmail, "password_empty", "after bootstrap repair");
              return null;
            }
            valid = await verifyPassword(password, user.password);
          }
          if (!valid) {
            recordAuthDeny(normalizedEmail, "password_mismatch");
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image ?? null,
            role: user.role,
            remember:
              credentials?.remember === "on" || credentials?.remember === "true",
          };
        } catch (error) {
          recordAuthDeny(
            normalizedEmail,
            "authorize_exception",
            error instanceof Error ? error.message : String(error),
          );
          console.error("[auth] credentials authorize failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const oauthUser = await findOrCreateOAuthUser({
          email: user.email!,
          name: user.name ?? "User",
          image: user.image ?? undefined,
        });
        user.id = oauthUser.id;
        user.role = oauthUser.role;
      }

      if (account?.provider === "credentials") {
        const stored = user.id ? await findUserById(user.id) : undefined;
        if (stored) {
          user.role = stored.role;
          (user as AuthUserWithPreferences).preferences = stored.preferences;
        }
        const rememberValue = credentials?.remember;
        const remember = typeof rememberValue === "string" && (rememberValue === "on" || rememberValue === "true");
        (user as AuthUserWithPreferences).remember = remember;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUserWithPreferences;
        token.id = authUser.id!;
        token.role = authUser.role ?? "traveler";
        token.tokenVersion = 0;
        token.remember = authUser.remember === true;
        token.preferences = authUser.preferences ?? {
          emailNotifications: true,
          pushNotifications: true,
          privacyMode: "private",
        };
      }

      if (token.id) {
        const stored = await findUserById(token.id);
        if (!stored) {
          return null;
        }

        if (stored.tokenVersion !== (token.tokenVersion ?? -1)) {
          return null;
        }

        token.role = stored.role;
        token.isEmailVerified = stored.emailVerified;
        token.tokenVersion = stored.tokenVersion;
        token.preferences = stored.preferences;

        if (typeof token.remember !== "boolean") {
          token.remember = false;
        }

        if (!token.exp && token.remember !== undefined) {
          const maxAge = token.remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
          token.exp = Math.floor(Date.now() / 1000) + maxAge;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.isEmailVerified = token.isEmailVerified;
      session.user.preferences = token.preferences;
      return session;
    },
  },
  secret: env.authSecret,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
