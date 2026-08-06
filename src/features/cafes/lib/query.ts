import type {
  CafeCategory,
  CafeDetail,
  CafeFilters,
  CafeSortOption,
  FilterOptions,
  PaginatedResult,
  PriceLevel,
} from "../types";
import { CAFE_CATEGORIES, CAFE_SORT_OPTIONS } from "../types";

export const CAFES_PAGE_SIZE = 6;

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isCategory(value: string | undefined): value is CafeCategory {
  return !!value && (CAFE_CATEGORIES as readonly string[]).includes(value);
}

function isSortOption(value: string | undefined): value is CafeSortOption {
  return !!value && (CAFE_SORT_OPTIONS as readonly string[]).includes(value);
}

function isPriceLevel(value: string | undefined): value is PriceLevel {
  return !!value && ["$", "$$", "$$$"].includes(value);
}

export function parseCafeFilters(searchParams: RawSearchParams): CafeFilters {
  const search = firstValue(searchParams.q)?.trim() ?? "";
  const categoryRaw = firstValue(searchParams.category);
  const cityRaw = firstValue(searchParams.city);
  const countryRaw = firstValue(searchParams.country);
  const ratingRaw = Number(firstValue(searchParams.rating));
  const priceRaw = firstValue(searchParams.price);
  const sortRaw = firstValue(searchParams.sort);
  const pageRaw = Number(firstValue(searchParams.page));

  return {
    search,
    category: isCategory(categoryRaw) ? categoryRaw : null,
    city: cityRaw?.trim() || null,
    country: countryRaw?.trim() || null,
    minRating: Number.isFinite(ratingRaw) && ratingRaw > 0 ? ratingRaw : null,
    priceLevel: isPriceLevel(priceRaw) ? priceRaw : null,
    sort: isSortOption(sortRaw) ? sortRaw : "recommended",
    page: Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1,
  };
}

export function filterCafes(cafes: readonly CafeDetail[], filters: CafeFilters): CafeDetail[] {
  const query = filters.search.toLowerCase();

  return cafes.filter((cafe) => {
    if (query) {
      const haystack = `${cafe.name} ${cafe.city} ${cafe.country} ${cafe.tagline} ${cafe.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.category && cafe.category !== filters.category) return false;
    if (filters.city && cafe.city !== filters.city) return false;
    if (filters.country && cafe.country !== filters.country) return false;
    if (filters.minRating && cafe.rating < filters.minRating) return false;
    if (filters.priceLevel && cafe.priceLevel !== filters.priceLevel) return false;
    return true;
  });
}

export function sortCafes(cafes: readonly CafeDetail[], sort: CafeSortOption): CafeDetail[] {
  const sorted = [...cafes];

  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "price":
      return sorted.sort((a, b) => priceWeight(b.priceLevel) - priceWeight(a.priceLevel));
    case "reviews":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "recommended":
    default:
      return sorted.sort((a, b) => b.rating * Math.log10(b.reviewCount + 10) - a.rating * Math.log10(a.reviewCount + 10));
  }
}

function priceWeight(level: PriceLevel): number {
  switch (level) {
    case "$$$":
      return 3;
    case "$$":
      return 2;
    case "$":
    default:
      return 1;
  }
}

export function paginate<T>(items: readonly T[], page: number, pageSize: number): PaginatedResult<T> {
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

export function buildCafeQuery(
  current: CafeFilters,
  overrides: Partial<Record<"q" | "category" | "city" | "country" | "rating" | "price" | "sort" | "page", string | number | null>>,
): string {
  const params = new URLSearchParams();
  const next = {
    q: overrides.q !== undefined ? overrides.q : current.search,
    category: overrides.category !== undefined ? overrides.category : current.category,
    city: overrides.city !== undefined ? overrides.city : current.city,
    country: overrides.country !== undefined ? overrides.country : current.country,
    rating: overrides.rating !== undefined ? overrides.rating : current.minRating,
    price: overrides.price !== undefined ? overrides.price : current.priceLevel,
    sort: overrides.sort !== undefined ? overrides.sort : current.sort,
    page: overrides.page !== undefined ? overrides.page : current.page,
  };

  if (next.q) params.set("q", String(next.q));
  if (next.category) params.set("category", String(next.category));
  if (next.city) params.set("city", String(next.city));
  if (next.country) params.set("country", String(next.country));
  if (next.rating && Number(next.rating) > 0) params.set("rating", String(next.rating));
  if (next.price) params.set("price", String(next.price));
  if (next.sort && next.sort !== "recommended") params.set("sort", String(next.sort));
  if (next.page && Number(next.page) > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function getFilterOptionsForUI(): FilterOptions {
  return {
    categories: CAFE_CATEGORIES,
    cities: [],
    countries: [],
    ratings: [4.5, 4.6, 4.7, 4.8, 4.9],
    priceLevels: ["$", "$$", "$$$"],
  };
}
