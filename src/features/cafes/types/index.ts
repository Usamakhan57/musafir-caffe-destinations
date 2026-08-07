export const CAFE_CATEGORIES = [
  "Specialty Coffee",
  "Historic Café",
  "Design-forward",
  "Rooftop Lounge",
  "Neighborhood Staple",
  "Late-night Café",
] as const;
export type CafeCategory = (typeof CAFE_CATEGORIES)[number];

export const COFFEE_TYPES = [
  "Espresso",
  "Filter / pour-over",
  "Traditional ceremony",
  "Latte & milk drinks",
  "Cold brew",
  "Single-origin tasting",
] as const;
export type CoffeeType = (typeof COFFEE_TYPES)[number];

export const CAFE_SORT_OPTIONS = [
  "rating",
  "popular",
  "newest",
  "budget",
  "premium",
] as const;
export type CafeSortOption = (typeof CAFE_SORT_OPTIONS)[number];

export type PriceLevel = "$" | "$$" | "$$$";

export interface CafeSummary {
  readonly slug: string;
  readonly name: string;
  readonly city: string;
  readonly country: string;
  readonly countryFlag: string;
  readonly category: CafeCategory;
  readonly coffeeType: CoffeeType;
  readonly tagline: string;
  readonly description: string;
  readonly heroImage: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly priceLevel: PriceLevel;
  readonly openingHours: string;
  /** Minutes from midnight local for open/close checks. */
  readonly opensAtMinutes: number;
  readonly closesAtMinutes: number;
  readonly amenities: readonly string[];
  readonly hasWifi: boolean;
  readonly hasOutdoorSeating: boolean;
  readonly remoteWorkFriendly: boolean;
  readonly petFriendly: boolean;
  readonly veganOptions: boolean;
  readonly coffeeQualityScore: number;
  readonly remoteWorkScore: number;
  readonly popularity: number;
  readonly openedYear: number;
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

export interface MenuHighlight {
  readonly name: string;
  readonly description: string;
  readonly price: string;
}

export interface SocialLinks {
  readonly instagram?: string;
  readonly facebook?: string;
  readonly x?: string;
}

export interface NearbyAttraction {
  readonly name: string;
  readonly description: string;
  readonly walkMinutes: number;
}

export interface MapPlaceholder {
  readonly label: string;
  readonly lat: number;
  readonly lng: number;
}

export interface CafeDetail extends CafeSummary {
  readonly longDescription: string;
  readonly about: string;
  readonly story: string;
  readonly signatureCoffee: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly website: string;
  readonly social: SocialLinks;
  readonly wifiSpeed: string;
  readonly foodOptions: readonly string[];
  readonly menuHighlights: readonly MenuHighlight[];
  readonly gallery: readonly GalleryImage[];
  readonly highlights: readonly string[];
  readonly reviews: readonly Review[];
  readonly nearbyAttractions: readonly NearbyAttraction[];
  readonly nearbySlugs: readonly string[];
  readonly relatedDestinationSlugs: readonly string[];
  readonly map: MapPlaceholder;
}

export interface CafeFilters {
  readonly search: string;
  readonly category: CafeCategory | null;
  readonly city: string | null;
  readonly country: string | null;
  readonly coffeeType: CoffeeType | null;
  readonly minRating: number | null;
  readonly priceLevel: PriceLevel | null;
  readonly openNow: boolean | null;
  readonly outdoor: boolean | null;
  readonly wifi: boolean | null;
  readonly remoteWork: boolean | null;
  readonly petFriendly: boolean | null;
  readonly vegan: boolean | null;
  readonly sort: CafeSortOption;
  readonly page: number;
}

export interface FilterOptions {
  readonly categories: readonly CafeCategory[];
  readonly cities: readonly string[];
  readonly countries: readonly string[];
  readonly coffeeTypes: readonly CoffeeType[];
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
