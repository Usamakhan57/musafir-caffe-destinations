"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { env } from "@/config";
import {
  resetPasswordEmail,
  sendEmail,
  verifyEmailTemplate,
  welcomeEmail,
} from "@/features/email";
import { signIn, signOut } from "@/lib/auth";
import { logger } from "@/lib/logger";
import type { ActionResult } from "../types";
import { checkRateLimit } from "../lib/rate-limit";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "../schemas";
import {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
  createResetToken,
  consumeResetToken,
  updateUserPassword,
  createVerifyToken,
  consumeVerifyToken,
  markEmailVerified,
  updateUserProfile,
  deleteUser,
  incrementTokenVersion,
} from "../data/user-store";

const log = logger.child("auth:actions");

const STAFF_ROLES = new Set(["admin", "editor", "moderator"]);

function isNextRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

function loginFailedResult(detail?: string): ActionResult {
  if (detail) log.warn("Login failed", { detail });
  return {
    success: false,
    message: "Invalid email or password.",
  };
}

// ── Login ─────────────────────────────────────────────────────

export async function loginAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    remember: formData.get("remember"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (parsed.success === false) {
    return {
      success: false,
      message: "Invalid input.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const rateLimit = await checkRateLimit("login");
  if (!rateLimit.ok) {
    return {
      success: false,
      message: `Too many attempts. Please try again in ${rateLimit.retryAfter} seconds.`,
    };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const password = parsed.data.password;
  const remember = parsed.data.remember === true ? "true" : "false";

  // Resolve post-login destination from the same Prisma DB Auth.js uses.
  let redirectTo = "/profile";
  try {
    const existing = await findUserByEmail(email);
    if (existing && STAFF_ROLES.has(existing.role)) {
      redirectTo = "/admin";
    }
  } catch (error) {
    log.warn("Pre-login user lookup failed", {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    // Auth.js v5 server signIn with redirectTo throws NEXT_REDIRECT on success.
    // On credentials failure it throws AuthError (CredentialsSignin).
    await signIn("credentials", {
      email,
      password,
      remember,
      redirectTo,
    });
  } catch (error) {
    if (isNextRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      log.warn("Login failed", { type: error.type, email });
      return loginFailedResult(error.type);
    }
    throw error;
  }

  // Fallback if Auth.js returned without throwing a redirect.
  redirect(redirectTo);
}

// ── Register ──────────────────────────────────────────────────

export async function registerAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role") ?? "traveler",
  };

  const parsed = registerSchema.safeParse(raw);
  if (parsed.success === false) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const rateLimit = await checkRateLimit("register");
  if (!rateLimit.ok) {
    return {
      success: false,
      message: `Too many attempts. Please try again in ${rateLimit.retryAfter} seconds.`,
    };
  }

  try {
    await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      role: parsed.data.role,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      return {
        success: false,
        message: "A user with this email already exists.",
        errors: { email: ["A user with this email already exists."] },
      };
    }
    log.error("Registration failed", { error });
    return { success: false, message: "Something went wrong. Please try again." };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (user) {
    const token = await createVerifyToken(parsed.data.email);
    const verifyUrl = `${env.appUrl}/verify-email?token=${encodeURIComponent(token)}`;
    const mail = verifyEmailTemplate(user.name, verifyUrl);
    mail.to = user.email;
    await sendEmail(mail);
    const welcome = welcomeEmail(user.name);
    welcome.to = user.email;
    await sendEmail(welcome);
    log.info("Verification + welcome emails queued", { email: parsed.data.email });
  }

  // Auto sign-in after registration
  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      log.warn("Auto sign-in after register failed", { type: error.type });
      redirect("/login");
    }
    throw error;
  }

  redirect("/dashboard");
}

// ── Forgot Password ──────────────────────────────────────────

export async function forgotPasswordAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const raw = { email: formData.get("email") };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid input.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (user) {
    const token = await createResetToken(parsed.data.email);
    const resetUrl = `${env.appUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const mail = resetPasswordEmail(user.name, resetUrl);
    mail.to = user.email;
    await sendEmail(mail);
    log.info("Password reset email queued", { email: parsed.data.email });
  }

  // Always return success to prevent email enumeration
  return {
    success: true,
    message: "If an account exists with that email, you will receive a password reset link.",
  };
}

// ── Reset Password ───────────────────────────────────────────

export async function resetPasswordAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const tokenData = await consumeResetToken(parsed.data.token);
  if (!tokenData) {
    return {
      success: false,
      message: "Invalid or expired reset token. Please request a new one.",
    };
  }

  const user = await findUserByEmail(tokenData.email);
  if (!user) {
    return { success: false, message: "User not found." };
  }

  const updated = await updateUserPassword(user.id, parsed.data.password);
  if (!updated) {
    return { success: false, message: "Failed to update password." };
  }

  return {
    success: true,
    message: "Password has been reset successfully. You can now log in.",
  };
}

// ── Verify Email ─────────────────────────────────────────────

export async function verifyEmailAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const raw = { token: formData.get("token") };

  const parsed = verifyEmailSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid verification token.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const tokenData = await consumeVerifyToken(parsed.data.token);
  if (!tokenData) {
    return {
      success: false,
      message: "Invalid or expired verification token.",
    };
  }

  const verified = await markEmailVerified(tokenData.email);
  if (!verified) {
    return { success: false, message: "User not found." };
  }

  return {
    success: true,
    message: "Email verified successfully!",
  };
}

// ── Update Profile ───────────────────────────────────────────

export async function updateProfileAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in." };
  }

  const raw = {
    name: formData.get("name"),
    image: formData.get("image"),
    emailNotifications: formData.get("emailNotifications"),
    pushNotifications: formData.get("pushNotifications"),
    privacyMode: formData.get("privacyMode"),
  };

  const parsed = updateProfileSchema.safeParse(raw);
  if (parsed.success === false) {
    return {
      success: false,
      message: "Invalid input.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const updated = await updateUserProfile(session.user.id, {
    name: parsed.data.name,
    image: parsed.data.image,
    preferences: {
      emailNotifications: parsed.data.emailNotifications,
      pushNotifications: parsed.data.pushNotifications,
      privacyMode: parsed.data.privacyMode,
    },
  });
  if (!updated) {
    return { success: false, message: "Failed to update profile." };
  }

  return { success: true, message: "Profile updated successfully." };
}

// ── Change Password ──────────────────────────────────────────

export async function changePasswordAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in." };
  }

  const raw = {
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = changePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const user = await findUserById(session.user.id);
  if (!user) {
    return { success: false, message: "User not found." };
  }

  const isValidPassword = await verifyPassword(parsed.data.currentPassword, user.password);
  if (!isValidPassword) {
    return {
      success: false,
      message: "Current password is incorrect.",
      errors: { currentPassword: ["Current password is incorrect."] },
    };
  }

  const updated = await updateUserPassword(session.user.id, parsed.data.password);
  if (!updated) {
    return { success: false, message: "Failed to update password." };
  }

  await incrementTokenVersion(session.user.id);

  return {
    success: true,
    message: "Password updated successfully. You have been signed out everywhere.",
  };
}

// ── Delete Account ───────────────────────────────────────────

export async function deleteAccountAction(): Promise<ActionResult> {
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in." };
  }

  const deleted = await deleteUser(session.user.id);
  if (!deleted) {
    return { success: false, message: "Failed to delete account." };
  }

  await signOut({ redirectTo: "/" });
  return { success: true, message: "Your account was deleted." };
}

// ── Logout ───────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function logoutAllAction(): Promise<ActionResult> {
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in." };
  }

  await incrementTokenVersion(session.user.id);
  await signOut({ redirectTo: "/" });

  return {
    success: true,
    message: "You have been signed out of all sessions.",
  };
}
