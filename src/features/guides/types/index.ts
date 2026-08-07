export const GUIDE_CATEGORIES = [
  "Adventure",
  "Coffee Culture",
  "Digital Nomad",
  "Food",
  "Weekend Trips",
  "Luxury",
  "Budget Travel",
  "Family",
  "Backpacking",
  "Hidden Gems",
  "Nature",
  "Road Trips",
] as const;
export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export const GUIDE_SORT_OPTIONS = [
  "latest",
  "popular",
  "rating",
  "trending",
  "recommended",
] as const;
export type GuideSortOption = (typeof GUIDE_SORT_OPTIONS)[number];

export const READING_TIME_FILTERS = ["short", "medium", "long"] as const;
export type ReadingTimeFilter = (typeof READING_TIME_FILTERS)[number];

export interface GuideAuthor {
  readonly slug: string;
  readonly name: string;
  readonly avatar: string;
  readonly role: string;
  readonly bio: string;
  readonly social: {
    readonly instagram?: string;
    readonly x?: string;
    readonly website?: string;
  };
  readonly favoriteDestinationSlugs: readonly string[];
  readonly favoriteCafeSlugs: readonly string[];
}

export interface GuideSummary {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly coverImage: string;
  readonly category: GuideCategory;
  readonly destination: string;
  readonly destinationSlug: string | null;
  readonly country: string;
  readonly readingMinutes: number;
  readonly publishedAt: string;
  readonly updatedAt: string;
  readonly authorSlug: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly views: number;
  readonly tags: readonly string[];
  readonly featured: boolean;
  readonly trending: boolean;
  readonly editorsPick: boolean;
  readonly coffeeCulture: boolean;
  readonly digitalNomad: boolean;
}

export type GuideContentBlock =
  | { readonly type: "heading"; readonly id: string; readonly text: string }
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "callout"; readonly variant: "tip" | "warning"; readonly title: string; readonly text: string }
  | { readonly type: "quote"; readonly text: string; readonly attribution?: string }
  | { readonly type: "image"; readonly src: string; readonly alt: string; readonly caption?: string };

export interface GuideFaq {
  readonly question: string;
  readonly answer: string;
}

export interface GuideCoffeeRec {
  readonly name: string;
  readonly note: string;
}

export interface GuideLocalFood {
  readonly name: string;
  readonly note: string;
}

export interface GuideDetail extends GuideSummary {
  readonly heroImage: string;
  readonly content: readonly GuideContentBlock[];
  readonly coffeeRecommendations: readonly GuideCoffeeRec[];
  readonly localFoods: readonly GuideLocalFood[];
  readonly nearbyCafeSlugs: readonly string[];
  readonly nearbyDestinationSlugs: readonly string[];
  readonly relatedGuideSlugs: readonly string[];
  readonly faqs: readonly GuideFaq[];
  readonly gallery: readonly { readonly src: string; readonly alt: string }[];
}

export interface GuideFilters {
  readonly search: string;
  readonly category: GuideCategory | null;
  readonly country: string | null;
  readonly destination: string | null;
  readonly author: string | null;
  readonly coffeeCulture: boolean | null;
  readonly digitalNomad: boolean | null;
  readonly readingTime: ReadingTimeFilter | null;
  readonly tag: string | null;
  readonly sort: GuideSortOption;
  readonly page: number;
}

export interface GuideFilterOptions {
  readonly categories: readonly GuideCategory[];
  readonly countries: readonly string[];
  readonly destinations: readonly string[];
  readonly authors: readonly { readonly slug: string; readonly name: string }[];
  readonly tags: readonly string[];
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly totalPages: number;
}
