import "server-only";

import type { CafeDetail } from "@/features/cafes/types";
import type { CommunityStory, Traveler } from "@/features/community/types";
import type { DestinationDetail } from "@/features/destinations/types";
import type { GuideAuthor, GuideDetail } from "@/features/guides/types";
import {
  CAFES,
  getAllCafes as staticCafes,
  getCafeBySlug as staticCafeBySlug,
  getNearbyCafes as staticNearbyCafes,
} from "@/features/cafes/data/cafes-store";
import {
  COMMUNITY_POSTS,
  COMMUNITY_TRAVELERS,
  getAllStories as staticStories,
  getFeaturedStories as staticFeaturedStories,
  getLatestPosts as staticLatestPosts,
  getPopularTravelers as staticPopularTravelers,
  getStoriesByAuthor as staticStoriesByAuthor,
  getStoriesBySlugs as staticStoriesBySlugs,
  getStoryBySlug as staticStoryBySlug,
  getTrendingPosts as staticTrendingPosts,
  getWeeklyHighlights as staticWeeklyHighlights,
} from "@/features/community/data/community-store";
import {
  DESTINATIONS,
  getAllDestinations as staticDestinations,
  getDestinationBySlug as staticDestinationBySlug,
  getNearbyDestinations as staticNearbyDestinations,
} from "@/features/destinations/data/destinations-store";
import {
  GUIDE_AUTHORS,
  GUIDES,
  getAllGuides as staticGuides,
  getEditorsPicks as staticEditorsPicks,
  getFeaturedGuides as staticFeaturedGuides,
  getGuideBySlug as staticGuideBySlug,
  getGuidesByAuthor as staticGuidesByAuthor,
  getGuidesBySlugs as staticGuidesBySlugs,
  getLatestGuides as staticLatestGuides,
  getTrendingGuides as staticTrendingGuides,
} from "@/features/guides/data/guides-store";
import { isDatabaseReady, prisma } from "@/lib/prisma";

async function canUseDatabase() {
  if (process.env.FORCE_STATIC_CATALOG === "1") return false;
  return isDatabaseReady();
}

export async function readDestinations(): Promise<DestinationDetail[]> {
  if (!(await canUseDatabase())) return staticDestinations();
  try {
    const rows = await prisma.destination.findMany({
      where: { status: { not: "archived" } },
      orderBy: [{ name: "asc" }],
    });
    if (!rows.length) return DESTINATIONS;
    return rows.map((row) => row.payload as unknown as DestinationDetail);
  } catch {
    return DESTINATIONS;
  }
}

export async function readDestinationBySlug(
  slug: string,
): Promise<DestinationDetail | undefined> {
  if (!(await canUseDatabase())) return staticDestinationBySlug(slug);
  try {
    const row = await prisma.destination.findUnique({ where: { slug } });
    if (row?.payload) return row.payload as unknown as DestinationDetail;
  } catch {
    /* fall through */
  }
  return staticDestinationBySlug(slug);
}

export async function readDestinationSlugs(): Promise<string[]> {
  return (await readDestinations()).map((item) => item.slug);
}

export async function readNearbyDestinations(
  slugs: readonly string[],
): Promise<DestinationDetail[]> {
  if (!(await canUseDatabase())) return staticNearbyDestinations(slugs);
  const set = new Set(slugs);
  return (await readDestinations()).filter((item) => set.has(item.slug));
}

export async function readCafes(): Promise<CafeDetail[]> {
  if (!(await canUseDatabase())) return staticCafes();
  try {
    const rows = await prisma.cafe.findMany({
      where: { status: { not: "archived" } },
      orderBy: [{ name: "asc" }],
    });
    if (!rows.length) return CAFES;
    return rows.map((row) => row.payload as unknown as CafeDetail);
  } catch {
    return CAFES;
  }
}

export async function readCafeBySlug(slug: string): Promise<CafeDetail | null> {
  if (!(await canUseDatabase())) return staticCafeBySlug(slug);
  try {
    const row = await prisma.cafe.findUnique({ where: { slug } });
    if (row?.payload) return row.payload as unknown as CafeDetail;
  } catch {
    /* fall through */
  }
  return staticCafeBySlug(slug);
}

export async function readCafeSlugs(): Promise<string[]> {
  return (await readCafes()).map((item) => item.slug);
}

export async function readNearbyCafes(slugs: readonly string[]): Promise<CafeDetail[]> {
  if (!(await canUseDatabase())) return staticNearbyCafes(slugs);
  const set = new Set(slugs);
  return (await readCafes()).filter((item) => set.has(item.slug));
}

export async function readGuides(): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticGuides();
  try {
    const rows = await prisma.guide.findMany({
      where: { status: { not: "archived" } },
      orderBy: [{ updatedAt: "desc" }],
    });
    if (!rows.length) return GUIDES;
    return rows.map((row) => row.payload as unknown as GuideDetail);
  } catch {
    return GUIDES;
  }
}

export async function readGuideBySlug(slug: string): Promise<GuideDetail | null> {
  if (!(await canUseDatabase())) return staticGuideBySlug(slug);
  try {
    const row = await prisma.guide.findUnique({ where: { slug } });
    if (row?.payload) return row.payload as unknown as GuideDetail;
  } catch {
    /* fall through */
  }
  return staticGuideBySlug(slug);
}

export async function readGuideSlugs(): Promise<string[]> {
  return (await readGuides()).map((item) => item.slug);
}

export async function readGuidesBySlugs(slugs: readonly string[]): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticGuidesBySlugs(slugs);
  const set = new Set(slugs);
  return (await readGuides()).filter((item) => set.has(item.slug));
}

export async function readFeaturedGuides(): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticFeaturedGuides();
  return (await readGuides()).filter((item) => item.featured);
}

export async function readTrendingGuides(): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticTrendingGuides();
  return (await readGuides()).filter((item) => item.trending);
}

export async function readEditorsPicks(): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticEditorsPicks();
  return (await readGuides()).filter((item) => item.editorsPick);
}

export async function readLatestGuides(limit = 8): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticLatestGuides(limit);
  return [...(await readGuides())]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export async function readGuidesByAuthor(authorSlug: string): Promise<GuideDetail[]> {
  if (!(await canUseDatabase())) return staticGuidesByAuthor(authorSlug);
  return (await readGuides()).filter((item) => item.authorSlug === authorSlug);
}

export async function readGuideAuthors(): Promise<GuideAuthor[]> {
  if (!(await canUseDatabase())) return [...GUIDE_AUTHORS];
  try {
    const rows = await prisma.guideAuthor.findMany({ orderBy: { name: "asc" } });
    if (!rows.length) return [...GUIDE_AUTHORS];
    return rows.map((row) => row.payload as unknown as GuideAuthor);
  } catch {
    return [...GUIDE_AUTHORS];
  }
}

export async function readCommunityPosts(): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticStories();
  try {
    const rows = await prisma.communityPost.findMany({
      where: { status: { not: "archived" } },
      orderBy: [{ createdAt: "desc" }],
    });
    if (!rows.length) return COMMUNITY_POSTS;
    return rows.map((row) => row.payload as unknown as CommunityStory);
  } catch {
    return COMMUNITY_POSTS;
  }
}

export async function readCommunityPostBySlug(
  slug: string,
): Promise<CommunityStory | null> {
  if (!(await canUseDatabase())) return staticStoryBySlug(slug);
  try {
    const row = await prisma.communityPost.findUnique({ where: { slug } });
    if (row?.payload) return row.payload as unknown as CommunityStory;
  } catch {
    /* fall through */
  }
  return staticStoryBySlug(slug);
}

export async function readCommunityPostSlugs(): Promise<string[]> {
  return (await readCommunityPosts()).map((item) => item.slug);
}

export async function readCommunityPostsBySlugs(
  slugs: readonly string[],
): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticStoriesBySlugs(slugs);
  const set = new Set(slugs);
  return (await readCommunityPosts()).filter((item) => set.has(item.slug));
}

export async function readFeaturedStories(): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticFeaturedStories();
  return (await readCommunityPosts()).filter((item) => item.featured);
}

export async function readTrendingPosts(): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticTrendingPosts();
  return (await readCommunityPosts()).filter((item) => item.trending);
}

export async function readLatestPosts(limit = 8): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticLatestPosts(limit);
  return [...(await readCommunityPosts())]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export async function readWeeklyHighlights(): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticWeeklyHighlights();
  return (await readCommunityPosts()).filter((item) => item.weeklyHighlight);
}

export async function readStoriesByAuthor(authorSlug: string): Promise<CommunityStory[]> {
  if (!(await canUseDatabase())) return staticStoriesByAuthor(authorSlug);
  return (await readCommunityPosts()).filter((item) => item.authorSlug === authorSlug);
}

export async function readCommunityTravelers(): Promise<Traveler[]> {
  if (!(await canUseDatabase())) return [...COMMUNITY_TRAVELERS];
  try {
    const rows = await prisma.communityTraveler.findMany({ orderBy: { name: "asc" } });
    if (!rows.length) return [...COMMUNITY_TRAVELERS];
    return rows.map((row) => row.payload as unknown as Traveler);
  } catch {
    return [...COMMUNITY_TRAVELERS];
  }
}

export async function readPopularTravelers(limit = 6): Promise<Traveler[]> {
  if (!(await canUseDatabase())) return staticPopularTravelers(limit);
  return [...(await readCommunityTravelers())]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.followers - a.followers)
    .slice(0, limit);
}
