import {
  CATEGORIES,
  COFFEE_CULTURES,
  REGIONS,
  SEASONS,
  SORT_OPTIONS,
  type Category,
  type CoffeeCulture,
  type DestinationFilters,
  type DestinationSummary,
  type PaginatedResult,
  type PriceLevel,
  type Region,
  type Season,
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

function isSeason(value: string | undefined): value is Season {
  return !!value && (SEASONS as readonly string[]).includes(value);
}

function isCoffeeCulture(value: string | undefined): value is CoffeeCulture {
  return !!value && (COFFEE_CULTURES as readonly string[]).includes(value);
}

function isPriceLevel(value: string | undefined): value is PriceLevel {
  return value === "$" || value === "$$" || value === "$$$";
}

/** Normalize raw URL search params into typed, safe filter values. */
export function parseDestinationFilters(
  searchParams: RawSearchParams,
): DestinationFilters {
  const search = firstValue(searchParams.q)?.trim() ?? "";
  const country = firstValue(searchParams.country) || null;
  const city = firstValue(searchParams.city) || null;
  const regionRaw = firstValue(searchParams.region) ?? firstValue(searchParams.continent);
  const categoryRaw = firstValue(searchParams.category);
  const budgetRaw = firstValue(searchParams.budget);
  const seasonRaw = firstValue(searchParams.season);
  const coffeeRaw = firstValue(searchParams.coffee);
  const nomadRaw = firstValue(searchParams.nomad);
  const sortRaw = firstValue(searchParams.sort);
  const pageRaw = Number(firstValue(searchParams.page));

  const nomadFriendly =
    nomadRaw === "1" || nomadRaw === "true"
      ? true
      : nomadRaw === "0" || nomadRaw === "false"
        ? false
        : null;

  return {
    search,
    country,
    city,
    region: isRegion(regionRaw) ? regionRaw : null,
    budget: isPriceLevel(budgetRaw) ? budgetRaw : null,
    season: isSeason(seasonRaw) ? seasonRaw : null,
    coffeeCulture: isCoffeeCulture(coffeeRaw) ? coffeeRaw : null,
    nomadFriendly,
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
        `${destination.name} ${destination.city} ${destination.country} ${destination.tagline} ${destination.description} ${destination.coffeeCulture}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.country && destination.country !== filters.country) return false;
    if (filters.city && destination.city !== filters.city) return false;
    if (filters.region && destination.region !== filters.region) return false;
    if (filters.budget && destination.priceLevel !== filters.budget) return false;
    if (filters.season && !destination.seasons.includes(filters.season)) return false;
    if (filters.coffeeCulture && destination.coffeeCulture !== filters.coffeeCulture) {
      return false;
    }
    if (filters.nomadFriendly === true && !destination.digitalNomadFriendly) return false;
    if (filters.nomadFriendly === false && destination.digitalNomadFriendly) return false;
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
    case "budget":
      return sorted.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
    case "coffee":
      return sorted.sort((a, b) => b.coffeeScore - a.coffeeScore);
    case "nomad":
      return sorted.sort((a, b) => b.nomadScore - a.nomadScore);
    case "recommended":
    default:
      return sorted.sort(
        (a, b) =>
          b.rating * Math.log10(b.reviewCount + 10) +
          b.coffeeScore -
          (a.rating * Math.log10(a.reviewCount + 10) + a.coffeeScore),
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

type QueryOverrideKey =
  | "q"
  | "country"
  | "city"
  | "region"
  | "budget"
  | "season"
  | "coffee"
  | "nomad"
  | "category"
  | "sort"
  | "page";

/** Build a query string for the listing page, overriding only the given keys. */
export function buildDestinationsQuery(
  current: DestinationFilters,
  overrides: Partial<Record<QueryOverrideKey, string | number | boolean | null>>,
): string {
  const params = new URLSearchParams();

  const next = {
    q: overrides.q !== undefined ? overrides.q : current.search,
    country: overrides.country !== undefined ? overrides.country : current.country,
    city: overrides.city !== undefined ? overrides.city : current.city,
    region: overrides.region !== undefined ? overrides.region : current.region,
    budget: overrides.budget !== undefined ? overrides.budget : current.budget,
    season: overrides.season !== undefined ? overrides.season : current.season,
    coffee:
      overrides.coffee !== undefined ? overrides.coffee : current.coffeeCulture,
    nomad:
      overrides.nomad !== undefined
        ? overrides.nomad
        : current.nomadFriendly === null
          ? null
          : current.nomadFriendly
            ? "1"
            : "0",
    category: overrides.category !== undefined ? overrides.category : current.category,
    sort: overrides.sort !== undefined ? overrides.sort : current.sort,
    page: overrides.page !== undefined ? overrides.page : current.page,
  };

  if (next.q) params.set("q", String(next.q));
  if (next.country) params.set("country", String(next.country));
  if (next.city) params.set("city", String(next.city));
  if (next.region) params.set("region", String(next.region));
  if (next.budget) params.set("budget", String(next.budget));
  if (next.season) params.set("season", String(next.season));
  if (next.coffee) params.set("coffee", String(next.coffee));
  if (next.nomad === true || next.nomad === "1") params.set("nomad", "1");
  if (next.nomad === false || next.nomad === "0") params.set("nomad", "0");
  if (next.category) params.set("category", String(next.category));
  if (next.sort && next.sort !== "recommended") params.set("sort", String(next.sort));
  if (next.page && Number(next.page) > 1) params.set("page", String(next.page));

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
