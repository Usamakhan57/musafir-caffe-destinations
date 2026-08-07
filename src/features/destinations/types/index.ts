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

/** Continent labels mirror regions for traveler-facing filters. */
export type Continent = Region;

export const CATEGORIES = [
  "Coffee Town",
  "Cultural Capital",
  "Coastal Escape",
  "Mountain Retreat",
  "Digital Nomad Hub",
  "Historic City",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const SEASONS = ["Spring", "Summer", "Autumn", "Winter"] as const;
export type Season = (typeof SEASONS)[number];

export const COFFEE_CULTURES = [
  "Ceremony & ritual",
  "Third-wave specialty",
  "Espresso bar tradition",
  "Origin & farm culture",
  "Café society",
  "Roastery scene",
] as const;
export type CoffeeCulture = (typeof COFFEE_CULTURES)[number];

export const SORT_OPTIONS = [
  "recommended",
  "rating",
  "name",
  "cafes",
  "budget",
  "coffee",
  "nomad",
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export type PriceLevel = "$" | "$$" | "$$$";

export interface DestinationSummary {
  readonly slug: string;
  readonly name: string;
  /** City name for filters — usually matches `name`. */
  readonly city: string;
  readonly country: string;
  readonly countryFlag: string;
  readonly region: Region;
  readonly continent: Continent;
  readonly category: Category;
  readonly tagline: string;
  readonly description: string;
  readonly heroImage: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly cafesCount: number;
  readonly priceLevel: PriceLevel;
  readonly budgetLabel: string;
  readonly bestSeason: string;
  readonly seasons: readonly Season[];
  readonly coffeeCulture: CoffeeCulture;
  readonly coffeeScore: number;
  readonly nomadScore: number;
  readonly digitalNomadFriendly: boolean;
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
  readonly cafeSlug?: string;
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

export interface LocalFood {
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

export interface Attraction {
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

export interface WeatherMonth {
  readonly month: string;
  readonly tempC: string;
  readonly note: string;
}

export interface BudgetBreakdown {
  readonly lodging: string;
  readonly meals: string;
  readonly coffee: string;
  readonly transport: string;
  readonly dailyTotal: string;
  readonly note: string;
}

export interface TransportOption {
  readonly mode: string;
  readonly description: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface RelatedGuide {
  readonly title: string;
  readonly excerpt: string;
  readonly href: string;
}

export interface MapPlaceholder {
  readonly label: string;
  readonly lat: number;
  readonly lng: number;
}

export interface DestinationDetail extends DestinationSummary {
  readonly longDescription: string;
  readonly overview: string;
  readonly history: string;
  readonly coffeeCultureStory: string;
  readonly gallery: readonly GalleryImage[];
  readonly bestCafes: readonly FeaturedCafe[];
  readonly attractions: readonly Attraction[];
  readonly travelTips: readonly TravelTip[];
  readonly thingsToDo: readonly Activity[];
  readonly localFoods: readonly LocalFood[];
  readonly weather: readonly WeatherMonth[];
  readonly budget: BudgetBreakdown;
  readonly transportation: readonly TransportOption[];
  readonly map: MapPlaceholder;
  readonly reviews: readonly Review[];
  readonly faqs: readonly FaqItem[];
  readonly relatedGuides: readonly RelatedGuide[];
  readonly nearbySlugs: readonly string[];
}

/** Query params accepted by the `/destinations` listing page. */
export interface DestinationFilters {
  readonly search: string;
  readonly country: string | null;
  readonly city: string | null;
  readonly region: Region | null;
  readonly budget: PriceLevel | null;
  readonly season: Season | null;
  readonly coffeeCulture: CoffeeCulture | null;
  readonly nomadFriendly: boolean | null;
  readonly category: Category | null;
  readonly sort: SortOption;
  readonly page: number;
}

export interface FilterOptions {
  readonly countries: readonly string[];
  readonly cities: readonly string[];
  readonly regions: readonly Region[];
  readonly budgets: readonly PriceLevel[];
  readonly seasons: readonly Season[];
  readonly coffeeCultures: readonly CoffeeCulture[];
  readonly categories: readonly Category[];
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly totalPages: number;
}
