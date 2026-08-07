import type { UserRole } from "@/features/auth/types";

import { slugify } from "../lib/validation";
import type {
  AnalyticsSnapshot,
  CafeRecord,
  CategoryRecord,
  CmsUserRecord,
  CommunityRecord,
  ContentStatus,
  DestinationRecord,
  GuideRecord,
  MediaRecord,
  PaginatedResponse,
  ReviewRecord,
  TagRecord,
} from "../types";

function id() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
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
    summary: "Grand coffeehouses and elegant city walks.",
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
    name: "Café Central",
    slug: "cafe-central-vienna",
    city: "Vienna",
    country: "Austria",
    summary: "Historic coffeehouse with melange rituals.",
    status: "published",
    categoryId: categories[0].id,
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    tags: ["specialty", "luxury"],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    name: "Tomoca Coffee",
    slug: "tomoca-coffee-addis",
    city: "Addis Ababa",
    country: "Ethiopia",
    summary: "Origin classic in the heart of Addis.",
    status: "published",
    categoryId: categories[0].id,
    coverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    tags: ["specialty"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const guides: GuideRecord[] = [
  {
    id: id(),
    title: "Istanbul Coffee & Markets",
    slug: "istanbul-coffee-markets",
    authorName: "Mehmet Yılmaz",
    summary: "Three days of cezve rituals and spice markets.",
    status: "published",
    categoryId: categories[0].id,
    coverImage:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    tags: ["specialty"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const community: CommunityRecord[] = [
  {
    id: id(),
    title: "A solo week in Lisbon",
    slug: "lisbon-solo-week",
    authorName: "Lena Ortiz",
    summary: "Tram rides, terrace espresso, and Tagus evenings.",
    status: "published",
    categoryId: categories[2].id,
    coverImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
    tags: ["budget"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const reviews: ReviewRecord[] = [
  {
    id: id(),
    targetType: "cafe",
    targetId: cafes[0].id,
    targetName: cafes[0].name,
    rating: 5,
    body: "Perfect melange and atmosphere — worth the wait.",
    status: "published",
    authorName: "Marco Rossi",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    targetType: "destination",
    targetId: destinations[0].id,
    targetName: destinations[0].title,
    rating: 4,
    body: "Great for café hopping and remote work mornings.",
    status: "draft",
    authorName: "Sam Rivera",
    createdAt: now(),
    updatedAt: now(),
  },
];

const media: MediaRecord[] = [
  {
    id: id(),
    title: "Lisbon riverside",
    url: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80",
    alt: "Lisbon riverside view",
    mimeType: "image/jpeg",
    sizeBytes: 245000,
    folder: "destinations",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: id(),
    title: "Specialty latte",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80",
    alt: "Latte art in a café",
    mimeType: "image/jpeg",
    sizeBytes: 198000,
    folder: "cafes",
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

function matchesQuery(haystack: string, q: string) {
  if (!q.trim()) return true;
  return haystack.toLowerCase().includes(q.trim().toLowerCase());
}

function applyBulkStatus<T extends { id: string; status: ContentStatus; updatedAt: string }>(
  collection: T[],
  ids: string[],
  status: ContentStatus,
) {
  const set = new Set(ids);
  for (const item of collection) {
    if (set.has(item.id)) {
      item.status = status;
      item.updatedAt = now();
    }
  }
}

export const cmsStore = {
  analytics(): AnalyticsSnapshot {
    const content = [...destinations, ...cafes, ...guides, ...community];
    return {
      users: users.length,
      destinations: destinations.length,
      cafes: cafes.length,
      guides: guides.length,
      community: community.length,
      reviews: reviews.length,
      media: media.length,
      published: content.filter((c) => c.status === "published").length,
      draft: content.filter((c) => c.status === "draft").length,
      pendingReviews: reviews.filter((r) => r.status === "draft").length,
    };
  },

  listUsers(page = 1, pageSize = 10, q = "", role?: UserRole) {
    const filtered = users.filter((user) => {
      if (role && user.role !== role) return false;
      return matchesQuery(`${user.name} ${user.email} ${user.role}`, q);
    });
    return paginate(filtered, page, pageSize);
  },

  createUser(input: Omit<CmsUserRecord, "id" | "createdAt" | "updatedAt">) {
    const record: CmsUserRecord = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    users.unshift(record);
    return record;
  },

  updateUser(userId: string, patch: Partial<CmsUserRecord>) {
    const idx = users.findIndex((u) => u.id === userId);
    if (idx < 0) return null;
    users[idx] = { ...users[idx], ...patch, id: userId, updatedAt: now() };
    return users[idx];
  },

  deleteUsers(ids: string[]) {
    const set = new Set(ids);
    for (let i = users.length - 1; i >= 0; i--) {
      if (set.has(users[i].id)) users.splice(i, 1);
    }
  },

  listCategories(page = 1, pageSize = 10, q = "") {
    return paginate(
      categories.filter((c) => matchesQuery(`${c.name} ${c.slug} ${c.scope}`, q)),
      page,
      pageSize,
    );
  },
  createCategory(input: Omit<CategoryRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    categories.unshift(record);
    return record;
  },
  updateCategory(recordId: string, patch: Partial<CategoryRecord>) {
    const idx = categories.findIndex((c) => c.id === recordId);
    if (idx < 0) return null;
    categories[idx] = { ...categories[idx], ...patch, id: recordId, updatedAt: now() };
    return categories[idx];
  },
  deleteCategories(ids: string[]) {
    const set = new Set(ids);
    for (let i = categories.length - 1; i >= 0; i--) {
      if (set.has(categories[i].id)) categories.splice(i, 1);
    }
  },

  listTags(page = 1, pageSize = 10, q = "") {
    return paginate(
      tags.filter((t) => matchesQuery(`${t.name} ${t.slug}`, q)),
      page,
      pageSize,
    );
  },
  createTag(input: Omit<TagRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    tags.unshift(record);
    return record;
  },
  updateTag(recordId: string, patch: Partial<TagRecord>) {
    const idx = tags.findIndex((t) => t.id === recordId);
    if (idx < 0) return null;
    tags[idx] = { ...tags[idx], ...patch, id: recordId, updatedAt: now() };
    return tags[idx];
  },
  deleteTags(ids: string[]) {
    const set = new Set(ids);
    for (let i = tags.length - 1; i >= 0; i--) {
      if (set.has(tags[i].id)) tags.splice(i, 1);
    }
  },

  listDestinations(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
    return paginate(
      destinations.filter((d) => {
        if (status && d.status !== status) return false;
        return matchesQuery(`${d.title} ${d.city} ${d.country} ${d.summary}`, q);
      }),
      page,
      pageSize,
    );
  },
  createDestination(input: Omit<DestinationRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    destinations.unshift(record);
    return record;
  },
  updateDestination(recordId: string, patch: Partial<DestinationRecord>) {
    const idx = destinations.findIndex((d) => d.id === recordId);
    if (idx < 0) return null;
    destinations[idx] = { ...destinations[idx], ...patch, id: recordId, updatedAt: now() };
    return destinations[idx];
  },
  deleteDestinations(ids: string[]) {
    const set = new Set(ids);
    for (let i = destinations.length - 1; i >= 0; i--) {
      if (set.has(destinations[i].id)) destinations.splice(i, 1);
    }
  },
  bulkDestinations(ids: string[], action: "delete" | "publish" | "archive" | "draft") {
    if (action === "delete") return this.deleteDestinations(ids);
    applyBulkStatus(destinations, ids, action === "publish" ? "published" : action === "archive" ? "archived" : "draft");
  },

  listCafes(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
    return paginate(
      cafes.filter((c) => {
        if (status && c.status !== status) return false;
        return matchesQuery(`${c.name} ${c.city} ${c.country} ${c.summary}`, q);
      }),
      page,
      pageSize,
    );
  },
  createCafe(input: Omit<CafeRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    cafes.unshift(record);
    return record;
  },
  updateCafe(recordId: string, patch: Partial<CafeRecord>) {
    const idx = cafes.findIndex((c) => c.id === recordId);
    if (idx < 0) return null;
    cafes[idx] = { ...cafes[idx], ...patch, id: recordId, updatedAt: now() };
    return cafes[idx];
  },
  deleteCafes(ids: string[]) {
    const set = new Set(ids);
    for (let i = cafes.length - 1; i >= 0; i--) {
      if (set.has(cafes[i].id)) cafes.splice(i, 1);
    }
  },
  bulkCafes(ids: string[], action: "delete" | "publish" | "archive" | "draft") {
    if (action === "delete") return this.deleteCafes(ids);
    applyBulkStatus(cafes, ids, action === "publish" ? "published" : action === "archive" ? "archived" : "draft");
  },

  listGuides(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
    return paginate(
      guides.filter((g) => {
        if (status && g.status !== status) return false;
        return matchesQuery(`${g.title} ${g.authorName} ${g.summary}`, q);
      }),
      page,
      pageSize,
    );
  },
  createGuide(input: Omit<GuideRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    guides.unshift(record);
    return record;
  },
  updateGuide(recordId: string, patch: Partial<GuideRecord>) {
    const idx = guides.findIndex((g) => g.id === recordId);
    if (idx < 0) return null;
    guides[idx] = { ...guides[idx], ...patch, id: recordId, updatedAt: now() };
    return guides[idx];
  },
  deleteGuides(ids: string[]) {
    const set = new Set(ids);
    for (let i = guides.length - 1; i >= 0; i--) {
      if (set.has(guides[i].id)) guides.splice(i, 1);
    }
  },
  bulkGuides(ids: string[], action: "delete" | "publish" | "archive" | "draft") {
    if (action === "delete") return this.deleteGuides(ids);
    applyBulkStatus(guides, ids, action === "publish" ? "published" : action === "archive" ? "archived" : "draft");
  },

  listCommunity(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
    return paginate(
      community.filter((c) => {
        if (status && c.status !== status) return false;
        return matchesQuery(`${c.title} ${c.authorName} ${c.summary}`, q);
      }),
      page,
      pageSize,
    );
  },
  createCommunity(input: Omit<CommunityRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    community.unshift(record);
    return record;
  },
  updateCommunity(recordId: string, patch: Partial<CommunityRecord>) {
    const idx = community.findIndex((c) => c.id === recordId);
    if (idx < 0) return null;
    community[idx] = { ...community[idx], ...patch, id: recordId, updatedAt: now() };
    return community[idx];
  },
  deleteCommunity(ids: string[]) {
    const set = new Set(ids);
    for (let i = community.length - 1; i >= 0; i--) {
      if (set.has(community[i].id)) community.splice(i, 1);
    }
  },
  bulkCommunity(ids: string[], action: "delete" | "publish" | "archive" | "draft") {
    if (action === "delete") return this.deleteCommunity(ids);
    applyBulkStatus(community, ids, action === "publish" ? "published" : action === "archive" ? "archived" : "draft");
  },

  listReviews(page = 1, pageSize = 10, q = "", status?: ContentStatus) {
    return paginate(
      reviews.filter((r) => {
        if (status && r.status !== status) return false;
        return matchesQuery(`${r.targetName} ${r.authorName} ${r.body}`, q);
      }),
      page,
      pageSize,
    );
  },
  createReview(input: Omit<ReviewRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    reviews.unshift(record);
    return record;
  },
  updateReview(recordId: string, patch: Partial<ReviewRecord>) {
    const idx = reviews.findIndex((r) => r.id === recordId);
    if (idx < 0) return null;
    reviews[idx] = { ...reviews[idx], ...patch, id: recordId, updatedAt: now() };
    return reviews[idx];
  },
  deleteReviews(ids: string[]) {
    const set = new Set(ids);
    for (let i = reviews.length - 1; i >= 0; i--) {
      if (set.has(reviews[i].id)) reviews.splice(i, 1);
    }
  },
  bulkReviews(ids: string[], action: "delete" | "publish" | "archive" | "draft") {
    if (action === "delete") return this.deleteReviews(ids);
    applyBulkStatus(reviews, ids, action === "publish" ? "published" : action === "archive" ? "archived" : "draft");
  },

  listMedia(page = 1, pageSize = 12, q = "") {
    return paginate(
      media.filter((m) => matchesQuery(`${m.title} ${m.alt} ${m.folder}`, q)),
      page,
      pageSize,
    );
  },
  createMedia(input: Omit<MediaRecord, "id" | "createdAt" | "updatedAt">) {
    const record = { ...input, id: id(), createdAt: now(), updatedAt: now() };
    media.unshift(record);
    return record;
  },
  updateMedia(recordId: string, patch: Partial<MediaRecord>) {
    const idx = media.findIndex((m) => m.id === recordId);
    if (idx < 0) return null;
    media[idx] = { ...media[idx], ...patch, id: recordId, updatedAt: now() };
    return media[idx];
  },
  deleteMedia(ids: string[]) {
    const set = new Set(ids);
    for (let i = media.length - 1; i >= 0; i--) {
      if (set.has(media[i].id)) media.splice(i, 1);
    }
  },

  ensureSlug(base: string, existing: string[]) {
    let slug = slugify(base);
    let i = 1;
    while (existing.includes(slug)) {
      slug = `${slugify(base)}-${i++}`;
    }
    return slug;
  },
};

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
