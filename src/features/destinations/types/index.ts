/**
 * Domain types for the Destinations feature.
 *
 * `DestinationSummary` is what listing/card views need.
 * `DestinationDetail` extends it with everything the detail page needs.
 * Both are currently backed by an in-memory mock store — see
 * `../data/destinations-store.ts` for the swap-to-Prisma boundary.
 */

export const REGIONS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
] as const;
export type Region = (typeof REGIONS)[number];

export const CATEGORIES = [
  "Coffee Town",
  "Cultural Capital",
  "Coastal Escape",
  "Mountain Retreat",
  "Digital Nomad Hub",
  "Historic City",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const SORT_OPTIONS = ["recommended", "rating", "name", "cafes"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export type PriceLevel = "$" | "$$" | "$$$";

export interface DestinationSummary {
  readonly slug: string;
  readonly name: string;
  readonly country: string;
  readonly countryFlag: string;
  readonly region: Region;
  readonly category: Category;
  readonly tagline: string;
  readonly description: string;
  readonly heroImage: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly cafesCount: number;
  readonly priceLevel: PriceLevel;
  readonly bestSeason: string;
}

export interface GalleryImage {
  readonly src: string;
  readonly alt: string;
}

export interface FeaturedCafe {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly rating: number;
  readonly knownFor: string;
}

export interface TravelTip {
  readonly title: string;
  readonly description: string;
}

export interface Activity {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly duration: string;
}

export interface Review {
  readonly author: string;
  readonly location: string;
  readonly rating: number;
  readonly date: string;
  readonly comment: string;
}

export interface DestinationDetail extends DestinationSummary {
  readonly longDescription: string;
  readonly gallery: readonly GalleryImage[];
  readonly bestCafes: readonly FeaturedCafe[];
  readonly travelTips: readonly TravelTip[];
  readonly thingsToDo: readonly Activity[];
  readonly reviews: readonly Review[];
  readonly nearbySlugs: readonly string[];
}

/** Query params accepted by the `/destinations` listing page. */
export interface DestinationFilters {
  readonly search: string;
  readonly country: string | null;
  readonly region: Region | null;
  readonly category: Category | null;
  readonly sort: SortOption;
  readonly page: number;
}

export interface FilterOptions {
  readonly countries: readonly string[];
  readonly regions: readonly Region[];
  readonly categories: readonly Category[];
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly totalPages: number;
}
