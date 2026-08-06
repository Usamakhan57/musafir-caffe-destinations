export const CAFE_CATEGORIES = [
  "Specialty Coffee",
  "Historic Café",
  "Design-forward",
  "Rooftop Lounge",
  "Neighborhood Staple",
  "Late-night Café",
] as const;
export type CafeCategory = (typeof CAFE_CATEGORIES)[number];

export const CAFE_SORT_OPTIONS = ["recommended", "rating", "name", "price", "reviews"] as const;
export type CafeSortOption = (typeof CAFE_SORT_OPTIONS)[number];

export type PriceLevel = "$" | "$$" | "$$$";

export interface CafeSummary {
  readonly slug: string;
  readonly name: string;
  readonly city: string;
  readonly country: string;
  readonly countryFlag: string;
  readonly category: CafeCategory;
  readonly tagline: string;
  readonly description: string;
  readonly heroImage: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly priceLevel: PriceLevel;
  readonly openingHours: string;
  readonly amenities: readonly string[];
}

export interface GalleryImage {
  readonly src: string;
  readonly alt: string;
}

export interface Review {
  readonly author: string;
  readonly location: string;
  readonly rating: number;
  readonly date: string;
  readonly comment: string;
}

export interface CafeDetail extends CafeSummary {
  readonly longDescription: string;
  readonly gallery: readonly GalleryImage[];
  readonly highlights: readonly string[];
  readonly reviews: readonly Review[];
  readonly nearbySlugs: readonly string[];
  readonly relatedDestinationSlugs: readonly string[];
}

export interface CafeFilters {
  readonly search: string;
  readonly category: CafeCategory | null;
  readonly city: string | null;
  readonly country: string | null;
  readonly minRating: number | null;
  readonly priceLevel: PriceLevel | null;
  readonly sort: CafeSortOption;
  readonly page: number;
}

export interface FilterOptions {
  readonly categories: readonly CafeCategory[];
  readonly cities: readonly string[];
  readonly countries: readonly string[];
  readonly ratings: readonly number[];
  readonly priceLevels: readonly PriceLevel[];
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly totalPages: number;
}
