export const COMMUNITY_CATEGORIES = [
  "Solo Travel",
  "Couples",
  "Family",
  "Luxury",
  "Budget",
  "Digital Nomads",
  "Coffee Lovers",
  "Hidden Gems",
  "Road Trips",
  "Weekend Escapes",
] as const;
export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number];

export const COMMUNITY_SORT_OPTIONS = [
  "latest",
  "popular",
  "trending",
  "mostLiked",
] as const;
export type CommunitySortOption = (typeof COMMUNITY_SORT_OPTIONS)[number];

export interface TravelerSocial {
  readonly instagram?: string;
  readonly x?: string;
  readonly website?: string;
}

export interface Traveler {
  readonly slug: string;
  readonly name: string;
  readonly avatar: string;
  readonly location: string;
  readonly bio: string;
  readonly specialty: string;
  readonly verified: boolean;
  readonly featured: boolean;
  readonly followers: number;
  readonly following: number;
  readonly visitedCountries: readonly string[];
  readonly visitedCafeSlugs: readonly string[];
  readonly visitedDestinationSlugs: readonly string[];
  readonly savedStorySlugs: readonly string[];
  readonly savedCafeSlugs: readonly string[];
  readonly savedDestinationSlugs: readonly string[];
  readonly social: TravelerSocial;
}

export interface StoryComment {
  readonly id: string;
  readonly authorName: string;
  readonly authorAvatar: string;
  readonly body: string;
  readonly createdAt: string;
}

export interface JourneyStep {
  readonly day: string;
  readonly title: string;
  readonly description: string;
}

export interface CommunityStory {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly coverImage: string;
  readonly heroImage: string;
  readonly authorSlug: string;
  readonly category: CommunityCategory;
  readonly country: string;
  readonly destination: string;
  readonly destinationSlug: string | null;
  readonly tags: readonly string[];
  readonly coffeeTags: readonly string[];
  readonly readingMinutes: number;
  readonly likes: number;
  readonly commentsCount: number;
  readonly bookmarks: number;
  readonly shares: number;
  readonly publishedAt: string;
  readonly featured: boolean;
  readonly trending: boolean;
  readonly weeklyHighlight: boolean;
  readonly gallery: readonly { readonly src: string; readonly alt: string }[];
  readonly journey: readonly JourneyStep[];
  readonly visitedCafeSlugs: readonly string[];
  readonly visitedDestinationSlugs: readonly string[];
  readonly budget: {
    readonly total: string;
    readonly daily: string;
    readonly notes: string;
  };
  readonly travelTips: readonly string[];
  readonly coffeeRecommendations: readonly { readonly name: string; readonly note: string }[];
  readonly packingTips: readonly string[];
  readonly body: readonly string[];
  readonly comments: readonly StoryComment[];
  readonly relatedStorySlugs: readonly string[];
}

export interface CommunityFilters {
  readonly search: string;
  readonly category: CommunityCategory | null;
  readonly country: string | null;
  readonly destination: string | null;
  readonly traveler: string | null;
  readonly coffee: string | null;
  readonly tag: string | null;
  readonly sort: CommunitySortOption;
  readonly page: number;
}

export interface CommunityFilterOptions {
  readonly categories: readonly CommunityCategory[];
  readonly countries: readonly string[];
  readonly destinations: readonly string[];
  readonly travelers: readonly { readonly slug: string; readonly name: string }[];
  readonly coffeeTags: readonly string[];
  readonly tags: readonly string[];
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
  readonly totalPages: number;
}
