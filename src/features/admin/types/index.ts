import type { UserRole } from "@/features/auth/types";

export type ContentStatus = "draft" | "published" | "archived";
export type ReviewTargetType = "destination" | "cafe" | "guide" | "community";

export type AdminStaffRole = Extract<UserRole, "admin" | "editor" | "moderator">;

export const ADMIN_RESOURCES = [
  "users",
  "destinations",
  "cafes",
  "guides",
  "community",
  "categories",
  "tags",
  "reviews",
  "media",
  "countries",
  "cities",
  "homepage",
  "seo",
  "settings",
  "contact",
  "newsletter",
  "notifications",
  "payments",
  "affiliates",
] as const;

export type AdminResource = (typeof ADMIN_RESOURCES)[number];

export interface CmsUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  scope: string;
  createdAt: string;
  updatedAt: string;
}

export interface TagRecord {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface DestinationRecord {
  id: string;
  title: string;
  slug: string;
  country: string;
  city: string;
  summary: string;
  status: ContentStatus;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  /** Full destination JSON payload (stringified for ResourceManager). */
  payload?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CafeRecord {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  summary: string;
  status: ContentStatus;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GuideRecord {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  summary: string;
  status: ContentStatus;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommunityRecord {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  summary: string;
  status: ContentStatus;
  categoryId: string | null;
  coverImage: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewRecord {
  id: string;
  targetType: ReviewTargetType;
  targetId: string;
  targetName: string;
  rating: number;
  body: string;
  status: ContentStatus;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaRecord {
  id: string;
  title: string;
  url: string;
  alt: string;
  mimeType: string;
  sizeBytes: number;
  folder: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface AnalyticsSnapshot {
  users: number;
  destinations: number;
  cafes: number;
  guides: number;
  community: number;
  reviews: number;
  media: number;
  published: number;
  draft: number;
  pendingReviews: number;
  revenueCents: number;
  paymentCount: number;
  memberships: number;
  affiliateClicks: number;
  traffic: number;
}
