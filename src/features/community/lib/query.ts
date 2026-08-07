import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_SORT_OPTIONS,
  type CommunityCategory,
  type CommunityFilterOptions,
  type CommunityFilters,
  type CommunitySortOption,
  type CommunityStory,
  type PaginatedResult,
} from "../types";
import { getCommunityFilterOptions } from "../data/community-store";

export const COMMUNITY_PAGE_SIZE = 9;

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isCategory(value: string | undefined): value is CommunityCategory {
  return !!value && (COMMUNITY_CATEGORIES as readonly string[]).includes(value);
}

function isSort(value: string | undefined): value is CommunitySortOption {
  return !!value && (COMMUNITY_SORT_OPTIONS as readonly string[]).includes(value);
}

export function parseCommunityFilters(searchParams: RawSearchParams): CommunityFilters {
  const pageRaw = Number(firstValue(searchParams.page));
  return {
    search: firstValue(searchParams.q)?.trim() ?? "",
    category: isCategory(firstValue(searchParams.category))
      ? (firstValue(searchParams.category) as CommunityCategory)
      : null,
    country: firstValue(searchParams.country)?.trim() || null,
    destination: firstValue(searchParams.destination)?.trim() || null,
    traveler: firstValue(searchParams.traveler)?.trim() || null,
    coffee: firstValue(searchParams.coffee)?.trim() || null,
    tag: firstValue(searchParams.tag)?.trim() || null,
    sort: isSort(firstValue(searchParams.sort))
      ? (firstValue(searchParams.sort) as CommunitySortOption)
      : "latest",
    page: Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1,
  };
}

export function filterStories(
  stories: readonly CommunityStory[],
  filters: CommunityFilters,
): CommunityStory[] {
  const q = filters.search.toLowerCase();
  return stories.filter((story) => {
    if (q) {
      const haystack =
        `${story.title} ${story.excerpt} ${story.destination} ${story.country} ${story.tags.join(" ")} ${story.coffeeTags.join(" ")} ${story.category} ${story.authorSlug}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.category && story.category !== filters.category) return false;
    if (filters.country && story.country !== filters.country) return false;
    if (filters.destination && story.destination !== filters.destination) return false;
    if (filters.traveler && story.authorSlug !== filters.traveler) return false;
    if (filters.coffee && !story.coffeeTags.includes(filters.coffee)) return false;
    if (filters.tag && !story.tags.includes(filters.tag)) return false;
    return true;
  });
}

export function sortStories(
  stories: readonly CommunityStory[],
  sort: CommunitySortOption,
): CommunityStory[] {
  const sorted = [...stories];
  switch (sort) {
    case "popular":
      return sorted.sort((a, b) => b.bookmarks + b.shares - (a.bookmarks + a.shares));
    case "trending":
      return sorted.sort(
        (a, b) => Number(b.trending) - Number(a.trending) || b.likes - a.likes,
      );
    case "mostLiked":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "latest":
    default:
      return sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
}

export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number,
): PaginatedResult<T> {
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

type QueryKey =
  | "q"
  | "category"
  | "country"
  | "destination"
  | "traveler"
  | "coffee"
  | "tag"
  | "sort"
  | "page";

export function buildCommunityQuery(
  current: CommunityFilters,
  overrides: Partial<Record<QueryKey, string | number | null>>,
): string {
  const params = new URLSearchParams();
  const next = {
    q: overrides.q !== undefined ? overrides.q : current.search,
    category: overrides.category !== undefined ? overrides.category : current.category,
    country: overrides.country !== undefined ? overrides.country : current.country,
    destination:
      overrides.destination !== undefined ? overrides.destination : current.destination,
    traveler: overrides.traveler !== undefined ? overrides.traveler : current.traveler,
    coffee: overrides.coffee !== undefined ? overrides.coffee : current.coffee,
    tag: overrides.tag !== undefined ? overrides.tag : current.tag,
    sort: overrides.sort !== undefined ? overrides.sort : current.sort,
    page: overrides.page !== undefined ? overrides.page : current.page,
  };

  if (next.q) params.set("q", String(next.q));
  if (next.category) params.set("category", String(next.category));
  if (next.country) params.set("country", String(next.country));
  if (next.destination) params.set("destination", String(next.destination));
  if (next.traveler) params.set("traveler", String(next.traveler));
  if (next.coffee) params.set("coffee", String(next.coffee));
  if (next.tag) params.set("tag", String(next.tag));
  if (next.sort && next.sort !== "latest") params.set("sort", String(next.sort));
  if (next.page && Number(next.page) > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function getFilterOptionsForUI(): CommunityFilterOptions {
  return getCommunityFilterOptions() as CommunityFilterOptions;
}
