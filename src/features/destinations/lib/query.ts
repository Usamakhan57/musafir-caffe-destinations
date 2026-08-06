import {
  CATEGORIES,
  REGIONS,
  SORT_OPTIONS,
  type Category,
  type DestinationFilters,
  type DestinationSummary,
  type PaginatedResult,
  type Region,
  type SortOption,
} from "../types";

export const DESTINATIONS_PAGE_SIZE = 9;

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isRegion(value: string | undefined): value is Region {
  return !!value && (REGIONS as readonly string[]).includes(value);
}

function isCategory(value: string | undefined): value is Category {
  return !!value && (CATEGORIES as readonly string[]).includes(value);
}

function isSortOption(value: string | undefined): value is SortOption {
  return !!value && (SORT_OPTIONS as readonly string[]).includes(value);
}

/** Normalize raw URL search params into typed, safe filter values. */
export function parseDestinationFilters(
  searchParams: RawSearchParams,
): DestinationFilters {
  const search = firstValue(searchParams.q)?.trim() ?? "";
  const country = firstValue(searchParams.country) || null;
  const regionRaw = firstValue(searchParams.region);
  const categoryRaw = firstValue(searchParams.category);
  const sortRaw = firstValue(searchParams.sort);
  const pageRaw = Number(firstValue(searchParams.page));

  return {
    search,
    country,
    region: isRegion(regionRaw) ? regionRaw : null,
    category: isCategory(categoryRaw) ? categoryRaw : null,
    sort: isSortOption(sortRaw) ? sortRaw : "recommended",
    page: Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1,
  };
}

export function filterDestinations(
  destinations: readonly DestinationSummary[],
  filters: DestinationFilters,
): DestinationSummary[] {
  const query = filters.search.toLowerCase();

  return destinations.filter((destination) => {
    if (query) {
      const haystack =
        `${destination.name} ${destination.country} ${destination.tagline} ${destination.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.country && destination.country !== filters.country) return false;
    if (filters.region && destination.region !== filters.region) return false;
    if (filters.category && destination.category !== filters.category) return false;
    return true;
  });
}

export function sortDestinations(
  destinations: readonly DestinationSummary[],
  sort: SortOption,
): DestinationSummary[] {
  const sorted = [...destinations];

  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "cafes":
      return sorted.sort((a, b) => b.cafesCount - a.cafesCount);
    case "recommended":
    default:
      // Recommended blends rating and review volume so well-loved,
      // well-reviewed destinations surface first.
      return sorted.sort(
        (a, b) => b.rating * Math.log10(b.reviewCount + 10) - a.rating * Math.log10(a.reviewCount + 10),
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

/** Build a query string for the listing page, overriding only the given keys. */
export function buildDestinationsQuery(
  current: DestinationFilters,
  overrides: Partial<Record<"q" | "country" | "region" | "category" | "sort" | "page", string | number | null>>,
): string {
  const params = new URLSearchParams();

  const next = {
    q: overrides.q !== undefined ? overrides.q : current.search,
    country: overrides.country !== undefined ? overrides.country : current.country,
    region: overrides.region !== undefined ? overrides.region : current.region,
    category: overrides.category !== undefined ? overrides.category : current.category,
    sort: overrides.sort !== undefined ? overrides.sort : current.sort,
    page: overrides.page !== undefined ? overrides.page : current.page,
  };

  if (next.q) params.set("q", String(next.q));
  if (next.country) params.set("country", String(next.country));
  if (next.region) params.set("region", String(next.region));
  if (next.category) params.set("category", String(next.category));
  if (next.sort && next.sort !== "recommended") params.set("sort", String(next.sort));
  if (next.page && Number(next.page) > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
