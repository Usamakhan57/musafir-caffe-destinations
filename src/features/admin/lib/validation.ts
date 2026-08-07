import { z } from "zod";

import type { UserRole } from "@/features/auth/types";

import type { ContentStatus, ReviewTargetType } from "../types";

export const contentStatusSchema = z.enum(["draft", "published", "archived"]);
export const reviewTargetSchema = z.enum(["destination", "cafe", "guide", "community"]);
export const userRoleSchema = z.enum([
  "traveler",
  "cafe-owner",
  "guide-creator",
  "editor",
  "moderator",
  "admin",
]);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  q: z.string().optional().default(""),
  status: contentStatusSchema.optional(),
  role: userRoleSchema.optional(),
});

const optionalUrl = z
  .union([z.string().url(), z.literal(""), z.null()])
  .optional()
  .transform((value) => (value ? value : null));

export const categoryInputSchema = z.object({
  name: z.string().min(2).max(80),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional().default(""),
  scope: z
    .string()
    .max(40)
    .optional()
    .transform((value) => (value && value.trim() ? value.trim() : "general")),
});

export const tagInputSchema = z.object({
  name: z.string().min(2).max(60),
  slug: z.string().min(2).max(60).regex(/^[a-z0-9-]+$/),
});

export const destinationInputSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  country: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
  summary: z.string().min(8).max(1000),
  status: contentStatusSchema.default("draft"),
  categoryId: z.string().uuid().nullable().optional(),
  coverImage: optionalUrl,
  tags: z.array(z.string()).default([]),
  payload: z.string().max(500_000).optional(),
});

export const cafeInputSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
  city: z.string().min(2).max(80),
  country: z.string().min(2).max(80),
  summary: z.string().min(8).max(1000),
  status: contentStatusSchema.default("draft"),
  categoryId: z.string().uuid().nullable().optional(),
  coverImage: optionalUrl,
  tags: z.array(z.string()).default([]),
});

export const guideInputSchema = z.object({
  title: z.string().min(2).max(160),
  slug: z.string().min(2).max(160).regex(/^[a-z0-9-]+$/),
  authorName: z.string().min(2).max(80),
  summary: z.string().min(8).max(1000),
  status: contentStatusSchema.default("draft"),
  categoryId: z.string().uuid().nullable().optional(),
  coverImage: optionalUrl,
  tags: z.array(z.string()).default([]),
});

export const communityInputSchema = z.object({
  title: z.string().min(2).max(160),
  slug: z.string().min(2).max(160).regex(/^[a-z0-9-]+$/),
  authorName: z.string().min(2).max(80),
  summary: z.string().min(8).max(1000),
  status: contentStatusSchema.default("draft"),
  categoryId: z.string().uuid().nullable().optional(),
  coverImage: optionalUrl,
  tags: z.array(z.string()).default([]),
});

export const reviewInputSchema = z.object({
  targetType: reviewTargetSchema,
  targetId: z.string().min(1),
  targetName: z.string().min(2).max(160),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(8).max(2000),
  status: contentStatusSchema.default("draft"),
  authorName: z.string().min(2).max(80),
});

export const mediaInputSchema = z.object({
  title: z.string().min(2).max(120),
  url: z.string().url(),
  alt: z.string().max(200).optional().default(""),
  mimeType: z.string().optional().default("image/jpeg"),
  sizeBytes: z.number().int().min(0).optional().default(0),
  folder: z.string().optional().default("uploads"),
});

export const userInputSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  role: userRoleSchema,
  emailVerified: z.boolean().optional().default(false),
  image: z.string().url().optional(),
  password: z.string().min(8).max(128).optional(),
});

export const bulkActionSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
  action: z.enum(["delete", "publish", "archive", "draft"]),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type TagInput = z.infer<typeof tagInputSchema>;
export type DestinationInput = z.infer<typeof destinationInputSchema>;
export type CafeInput = z.infer<typeof cafeInputSchema>;
export type GuideInput = z.infer<typeof guideInputSchema>;
export type CommunityInput = z.infer<typeof communityInputSchema>;
export type ReviewInput = z.infer<typeof reviewInputSchema>;
export type MediaInput = z.infer<typeof mediaInputSchema>;
export type UserInput = z.infer<typeof userInputSchema>;

export function isStaffRole(role: UserRole | string | undefined): boolean {
  return role === "admin" || role === "editor" || role === "moderator";
}

export function canManageUsers(role: UserRole | string | undefined): boolean {
  return role === "admin";
}

export function canModerate(role: UserRole | string | undefined): boolean {
  return role === "admin" || role === "moderator";
}

export function canEditContent(role: UserRole | string | undefined): boolean {
  return role === "admin" || role === "editor";
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type { ContentStatus, ReviewTargetType };
