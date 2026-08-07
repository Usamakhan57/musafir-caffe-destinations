/**
 * Seed-only CMS fixtures for Prisma bootstrap.
 * Runtime admin CRUD uses Prisma via cms-db / cms-extended (no memory store).
 */
import type {
  CafeRecord,
  CategoryRecord,
  CmsUserRecord,
  CommunityRecord,
  DestinationRecord,
  GuideRecord,
  MediaRecord,
  ReviewRecord,
  TagRecord,
} from "../types";

function id() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

const categories: CategoryRecord[] = [
  {
    id: id(),
    name: "Coffee Culture",
    slug: "coffee-culture",
    description: "Rituals, origins, and specialty scenes",
    scope: "guides",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    name: "Digital Nomads",
    slug: "digital-nomads",
    description: "Remote-work friendly cities and cafés",
    scope: "destinations",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    name: "Weekend Escapes",
    slug: "weekend-escapes",
    description: "Short trips and city breaks",
    scope: "community",
    createdAt: now(),
    updatedAt: now(),
  },
];

const tags: TagRecord[] = [
  { id: id(), name: "Specialty", slug: "specialty", createdAt: now(), updatedAt: now() },
  { id: id(), name: "Budget", slug: "budget", createdAt: now(), updatedAt: now() },
  { id: id(), name: "Luxury", slug: "luxury", createdAt: now(), updatedAt: now() },
  { id: id(), name: "Family", slug: "family", createdAt: now(), updatedAt: now() },
];

const destinations: DestinationRecord[] = [
  {
    id: id(),
    title: "Lisbon",
    slug: "lisbon",
    country: "Portugal",
    city: "Lisbon",
    summary: "Miradouros, coastal light, and laptop-friendly cafés.",
    status: "published",
    categoryId: categories[1].id,
    coverImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
    tags: ["specialty", "weekend"],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    title: "Vienna",
    slug: "vienna",
    country: "Austria",
    city: "Vienna",
    summary: "Grand coffeehouses and refined pastry culture.",
    status: "published",
    categoryId: categories[0].id,
    coverImage:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    tags: ["luxury"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const cafes: CafeRecord[] = [
  {
    id: id(),
    name: "Café Central Sample",
    slug: "cafe-central-sample",
    city: "Vienna",
    country: "Austria",
    summary: "Historic coffeehouse atmosphere for lingering conversations.",
    status: "published",
    categoryId: categories[0].id,
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    tags: ["specialty"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const guides: GuideRecord[] = [
  {
    id: id(),
    title: "Editor sample guide",
    slug: "editor-sample-guide",
    authorName: "Eli Editor",
    summary: "A sample guide record for CMS seeding.",
    status: "draft",
    categoryId: categories[0].id,
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    tags: ["specialty"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const community: CommunityRecord[] = [
  {
    id: id(),
    title: "Community sample story",
    slug: "community-sample-story",
    authorName: "Taylor Traveler",
    summary: "A sample community post for CMS seeding.",
    status: "published",
    categoryId: categories[2].id,
    coverImage:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80",
    tags: ["budget"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const reviews: ReviewRecord[] = [
  {
    id: id(),
    targetType: "destination",
    targetId: destinations[0].id,
    targetName: "Lisbon",
    rating: 5,
    body: "Seed review for moderation workflows.",
    status: "draft",
    authorName: "Taylor Traveler",
    createdAt: now(),
    updatedAt: now(),
  },
];

const media: MediaRecord[] = [
  {
    id: id(),
    title: "Lisbon hillside",
    url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80",
    alt: "Lisbon hillside view",
    mimeType: "image/jpeg",
    sizeBytes: 220000,
    folder: "destinations",
    createdAt: now(),
    updatedAt: now(),
  },
];

const users: CmsUserRecord[] = [
  {
    id: id(),
    name: "Amina Admin",
    email: "admin@musafircaffe.com",
    role: "admin",
    emailVerified: true,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    name: "Eli Editor",
    email: "editor@musafircaffe.com",
    role: "editor",
    emailVerified: true,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    name: "Morgan Moderator",
    email: "moderator@musafircaffe.com",
    role: "moderator",
    emailVerified: true,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    name: "Taylor Traveler",
    email: "traveler@musafircaffe.com",
    role: "traveler",
    emailVerified: false,
    createdAt: now(),
    updatedAt: now(),
  },
];

/** Seed payload mirror for Prisma/Supabase bootstrapping. */
export function getCmsSeedPayload() {
  return {
    categories,
    tags,
    destinations,
    cafes,
    guides,
    community,
    reviews,
    media,
    users,
  };
}
