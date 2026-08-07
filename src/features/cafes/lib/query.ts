import type {
  CafeCategory,
  CafeDetail,
  CafeFilters,
  CafeSortOption,
  CoffeeType,
  FilterOptions,
  PaginatedResult,
  PriceLevel,
} from "../types";
import { CAFE_CATEGORIES, CAFE_SORT_OPTIONS, COFFEE_TYPES } from "../types";
import { isCafeOpenNow } from "../data/enrich-cafe";

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

function isCoffeeType(value: string | undefined): value is CoffeeType {
  return !!value && (COFFEE_TYPES as readonly string[]).includes(value);
}

function parseBoolFlag(value: string | undefined): boolean | null {
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return null;
}

export function parseCafeFilters(searchParams: RawSearchParams): CafeFilters {
  const search = firstValue(searchParams.q)?.trim() ?? "";
  const categoryRaw = firstValue(searchParams.category);
  const cityRaw = firstValue(searchParams.city);
  const countryRaw = firstValue(searchParams.country);
  const coffeeRaw = firstValue(searchParams.coffee);
  const ratingRaw = Number(firstValue(searchParams.rating));
  const priceRaw = firstValue(searchParams.price);
  const sortRaw = firstValue(searchParams.sort);
  const pageRaw = Number(firstValue(searchParams.page));

  return {
    search,
    category: isCategory(categoryRaw) ? categoryRaw : null,
    city: cityRaw?.trim() || null,
    country: countryRaw?.trim() || null,
    coffeeType: isCoffeeType(coffeeRaw) ? coffeeRaw : null,
    minRating: Number.isFinite(ratingRaw) && ratingRaw > 0 ? ratingRaw : null,
    priceLevel: isPriceLevel(priceRaw) ? priceRaw : null,
    openNow: parseBoolFlag(firstValue(searchParams.open)),
    outdoor: parseBoolFlag(firstValue(searchParams.outdoor)),
    wifi: parseBoolFlag(firstValue(searchParams.wifi)),
    remoteWork: parseBoolFlag(firstValue(searchParams.remote)),
    petFriendly: parseBoolFlag(firstValue(searchParams.pet)),
    vegan: parseBoolFlag(firstValue(searchParams.vegan)),
    sort: isSortOption(sortRaw) ? sortRaw : "rating",
    page: Number.isFinite(pageRaw) && pageRaw > 1 ? Math.floor(pageRaw) : 1,
  };
}

export function filterCafes(cafes: readonly CafeDetail[], filters: CafeFilters): CafeDetail[] {
  const query = filters.search.toLowerCase();

  return cafes.filter((cafe) => {
    if (query) {
      const haystack =
        `${cafe.name} ${cafe.city} ${cafe.country} ${cafe.tagline} ${cafe.description} ${cafe.coffeeType}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.category && cafe.category !== filters.category) return false;
    if (filters.city && cafe.city !== filters.city) return false;
    if (filters.country && cafe.country !== filters.country) return false;
    if (filters.coffeeType && cafe.coffeeType !== filters.coffeeType) return false;
    if (filters.minRating && cafe.rating < filters.minRating) return false;
    if (filters.priceLevel && cafe.priceLevel !== filters.priceLevel) return false;
    if (filters.openNow === true && !isCafeOpenNow(cafe)) return false;
    if (filters.outdoor === true && !cafe.hasOutdoorSeating) return false;
    if (filters.wifi === true && !cafe.hasWifi) return false;
    if (filters.remoteWork === true && !cafe.remoteWorkFriendly) return false;
    if (filters.petFriendly === true && !cafe.petFriendly) return false;
    if (filters.vegan === true && !cafe.veganOptions) return false;
    return true;
  });
}

export function sortCafes(cafes: readonly CafeDetail[], sort: CafeSortOption): CafeDetail[] {
  const sorted = [...cafes];

  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popular":
      return sorted.sort((a, b) => b.popularity - a.popularity || b.reviewCount - a.reviewCount);
    case "newest":
      return sorted.sort((a, b) => b.openedYear - a.openedYear);
    case "budget":
      return sorted.sort((a, b) => priceWeight(a.priceLevel) - priceWeight(b.priceLevel));
    case "premium":
      return sorted.sort((a, b) => priceWeight(b.priceLevel) - priceWeight(a.priceLevel));
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
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

type QueryKey =
  | "q"
  | "category"
  | "city"
  | "country"
  | "coffee"
  | "rating"
  | "price"
  | "open"
  | "outdoor"
  | "wifi"
  | "remote"
  | "pet"
  | "vegan"
  | "sort"
  | "page";

export function buildCafeQuery(
  current: CafeFilters,
  overrides: Partial<Record<QueryKey, string | number | boolean | null>>,
): string {
  const params = new URLSearchParams();

  const flag = (currentValue: boolean | null, override: string | number | boolean | null | undefined) => {
    if (override !== undefined) {
      if (override === true || override === "1") return "1";
      if (override === false || override === "0") return "0";
      return null;
    }
    if (currentValue === true) return "1";
    if (currentValue === false) return "0";
    return null;
  };

  const next = {
    q: overrides.q !== undefined ? overrides.q : current.search,
    category: overrides.category !== undefined ? overrides.category : current.category,
    city: overrides.city !== undefined ? overrides.city : current.city,
    country: overrides.country !== undefined ? overrides.country : current.country,
    coffee: overrides.coffee !== undefined ? overrides.coffee : current.coffeeType,
    rating: overrides.rating !== undefined ? overrides.rating : current.minRating,
    price: overrides.price !== undefined ? overrides.price : current.priceLevel,
    open: flag(current.openNow, overrides.open),
    outdoor: flag(current.outdoor, overrides.outdoor),
    wifi: flag(current.wifi, overrides.wifi),
    remote: flag(current.remoteWork, overrides.remote),
    pet: flag(current.petFriendly, overrides.pet),
    vegan: flag(current.vegan, overrides.vegan),
    sort: overrides.sort !== undefined ? overrides.sort : current.sort,
    page: overrides.page !== undefined ? overrides.page : current.page,
  };

  if (next.q) params.set("q", String(next.q));
  if (next.category) params.set("category", String(next.category));
  if (next.city) params.set("city", String(next.city));
  if (next.country) params.set("country", String(next.country));
  if (next.coffee) params.set("coffee", String(next.coffee));
  if (next.rating && Number(next.rating) > 0) params.set("rating", String(next.rating));
  if (next.price) params.set("price", String(next.price));
  if (next.open) params.set("open", String(next.open));
  if (next.outdoor) params.set("outdoor", String(next.outdoor));
  if (next.wifi) params.set("wifi", String(next.wifi));
  if (next.remote) params.set("remote", String(next.remote));
  if (next.pet) params.set("pet", String(next.pet));
  if (next.vegan) params.set("vegan", String(next.vegan));
  if (next.sort && next.sort !== "rating") params.set("sort", String(next.sort));
  if (next.page && Number(next.page) > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function getFilterOptionsForUI(): FilterOptions {
  return {
    categories: CAFE_CATEGORIES,
    cities: [],
    countries: [],
    coffeeTypes: COFFEE_TYPES,
    ratings: [4.5, 4.6, 4.7, 4.8, 4.9],
    priceLevels: ["$", "$$", "$$$"],
  };
}
