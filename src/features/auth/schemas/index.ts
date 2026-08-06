import { z } from "zod";

// ── Login ─────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  remember: z
    .preprocess((value) => {
      if (value === "on" || value === "true") return true;
      if (value === "false") return false;
      return undefined;
    }, z.boolean().optional()),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ── Register ──────────────────────────────────────────────────

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be at most 100 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    role: z
      .enum(["traveler", "cafe-owner", "guide-creator"])
      .default("traveler"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// ── Forgot Password ──────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ── Reset Password ───────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ── Email Verification ───────────────────────────────────────

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required."),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

// ── Profile Update ───────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  image: z
    .string()
    .url("Please enter a valid image URL.")
    .optional()
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value)),
  emailNotifications: z
    .preprocess((value) => {
      if (value === "on" || value === "true") return true;
      if (value === "false") return false;
      return undefined;
    }, z.boolean().optional()),
  pushNotifications: z
    .preprocess((value) => {
      if (value === "on" || value === "true") return true;
      if (value === "false") return false;
      return undefined;
    }, z.boolean().optional()),
  privacyMode: z.enum(["public", "private"]).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
