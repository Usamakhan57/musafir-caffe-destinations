import {
  GUIDE_CATEGORIES,
  GUIDE_SORT_OPTIONS,
  READING_TIME_FILTERS,
  type GuideCategory,
  type GuideDetail,
  type GuideFilterOptions,
  type GuideFilters,
  type GuideSortOption,
  type PaginatedResult,
  type ReadingTimeFilter,
} from "../types";
import { getGuideFilterOptions } from "../data/guides-store";

export const GUIDES_PAGE_SIZE = 9;

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isCategory(value: string | undefined): value is GuideCategory {
  return !!value && (GUIDE_CATEGORIES as readonly string[]).includes(value);
}

function isSort(value: string | undefined): value is GuideSortOption {
  return !!value && (GUIDE_SORT_OPTIONS as readonly string[]).includes(value);
}

function isReading(value: string | undefined): value is ReadingTimeFilter {
  return !!value && (READING_TIME_FILTERS as readonly string[]).includes(value);
}

function parseBool(value: string | undefined): boolean | null {
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return null;
}

export function parseGuideFilters(searchParams: RawSearchParams): GuideFilters {
  const pageRaw = Number(firstValue(searchParams.page));
  return {
    search: firstValue(searchParams.q)?.trim() ?? "",
    category: isCategory(firstValue(searchParams.category))
      ? (firstValue(searchParams.category) as GuideCategory)
      : null,
    country: firstValue(searchParams.country)?.trim() || null,
    destination: firstValue(searchParams.destination)?.trim() || null,
    author: firstValue(searchParams.author)?.trim() || null,
    coffeeCulture: parseBool(firstValue(searchParams.coffee)),
    digitalNomad: parseBool(firstValue(searchParams.nomad)),
    readingTime: isReading(firstValue(searchParams.read))
      ? (firstValue(searchParams.read) as ReadingTimeFilter)
      : null,
    tag: firstValue(searchParams.tag)?.trim() || null,
    sort: isSort(firstValue(searchParams.sort))
      ? (firstValue(searchParams.sort) as GuideSortOption)
      : "recommended",
    page: Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1,
  };
}

export function filterGuides(
  guides: readonly GuideDetail[],
  filters: GuideFilters,
): GuideDetail[] {
  const q = filters.search.toLowerCase();
  return guides.filter((guide) => {
    if (q) {
      const haystack =
        `${guide.title} ${guide.subtitle} ${guide.excerpt} ${guide.destination} ${guide.country} ${guide.tags.join(" ")} ${guide.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.category && guide.category !== filters.category) return false;
    if (filters.country && guide.country !== filters.country) return false;
    if (filters.destination && guide.destination !== filters.destination) return false;
    if (filters.author && guide.authorSlug !== filters.author) return false;
    if (filters.coffeeCulture === true && !guide.coffeeCulture) return false;
    if (filters.digitalNomad === true && !guide.digitalNomad) return false;
    if (filters.tag && !guide.tags.includes(filters.tag)) return false;
    if (filters.readingTime === "short" && guide.readingMinutes > 6) return false;
    if (filters.readingTime === "medium" && (guide.readingMinutes < 7 || guide.readingMinutes > 9)) {
      return false;
    }
    if (filters.readingTime === "long" && guide.readingMinutes < 10) return false;
    return true;
  });
}

export function sortGuides(
  guides: readonly GuideDetail[],
  sort: GuideSortOption,
): GuideDetail[] {
  const sorted = [...guides];
  switch (sort) {
    case "latest":
      return sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    case "popular":
      return sorted.sort((a, b) => b.views - a.views);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "trending":
      return sorted.sort(
        (a, b) => Number(b.trending) - Number(a.trending) || b.views - a.views,
      );
    case "recommended":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.rating * Math.log10(b.views + 10) - a.rating * Math.log10(a.views + 10),
      );
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
  | "author"
  | "coffee"
  | "nomad"
  | "read"
  | "tag"
  | "sort"
  | "page";

export function buildGuidesQuery(
  current: GuideFilters,
  overrides: Partial<Record<QueryKey, string | number | boolean | null>>,
): string {
  const params = new URLSearchParams();
  const flag = (curr: boolean | null, override: string | number | boolean | null | undefined) => {
    if (override !== undefined) {
      if (override === true || override === "1") return "1";
      if (override === false || override === "0") return "0";
      return null;
    }
    return curr === true ? "1" : curr === false ? "0" : null;
  };

  const next = {
    q: overrides.q !== undefined ? overrides.q : current.search,
    category: overrides.category !== undefined ? overrides.category : current.category,
    country: overrides.country !== undefined ? overrides.country : current.country,
    destination:
      overrides.destination !== undefined ? overrides.destination : current.destination,
    author: overrides.author !== undefined ? overrides.author : current.author,
    coffee: flag(current.coffeeCulture, overrides.coffee),
    nomad: flag(current.digitalNomad, overrides.nomad),
    read: overrides.read !== undefined ? overrides.read : current.readingTime,
    tag: overrides.tag !== undefined ? overrides.tag : current.tag,
    sort: overrides.sort !== undefined ? overrides.sort : current.sort,
    page: overrides.page !== undefined ? overrides.page : current.page,
  };

  if (next.q) params.set("q", String(next.q));
  if (next.category) params.set("category", String(next.category));
  if (next.country) params.set("country", String(next.country));
  if (next.destination) params.set("destination", String(next.destination));
  if (next.author) params.set("author", String(next.author));
  if (next.coffee) params.set("coffee", String(next.coffee));
  if (next.nomad) params.set("nomad", String(next.nomad));
  if (next.read) params.set("read", String(next.read));
  if (next.tag) params.set("tag", String(next.tag));
  if (next.sort && next.sort !== "recommended") params.set("sort", String(next.sort));
  if (next.page && Number(next.page) > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function getFilterOptionsForUI(): GuideFilterOptions {
  return getGuideFilterOptions() as GuideFilterOptions;
}
