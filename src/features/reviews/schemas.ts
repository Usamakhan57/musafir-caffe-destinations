import { z } from "zod";

export const publicReviewSchema = z.object({
  targetType: z.enum(["destination", "cafe", "guide", "community", "tour", "hotel", "gear"]),
  targetId: z.string().min(1),
  targetName: z.string().min(2).max(160),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().min(2).max(120).optional().default(""),
  body: z.string().min(8).max(2000),
  authorName: z.string().min(2).max(80),
  authorEmail: z.string().email().optional(),
  photos: z.array(z.string().url()).max(6).optional().default([]),
});

export type PublicReviewInput = z.infer<typeof publicReviewSchema>;

export interface PublicReviewRecord extends PublicReviewInput {
  id: string;
  status: "pending" | "published" | "rejected" | "draft" | "archived";
  createdAt: string;
}
