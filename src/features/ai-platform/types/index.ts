export const TRAVEL_PARTY = ["Solo", "Couple", "Family"] as const;
export type TravelParty = (typeof TRAVEL_PARTY)[number];

export const BUDGET_TIERS = ["Budget", "Mid-range", "Luxury"] as const;
export type BudgetTier = (typeof BUDGET_TIERS)[number];

export const TRAVEL_STYLES = [
  "Digital Nomad",
  "Adventure",
  "Nature",
  "Coffee Culture",
  "Foodie",
  "City Break",
] as const;
export type TravelStyle = (typeof TRAVEL_STYLES)[number];

export const COFFEE_PREFERENCES = [
  "Espresso",
  "Pour-over",
  "Flat white",
  "Traditional ceremony",
  "Cold brew",
  "Matcha & specialty",
] as const;

export const FOOD_PREFERENCES = [
  "Local street food",
  "Vegetarian",
  "Fine dining",
  "Café bites",
  "Markets & bakeries",
] as const;

export interface AiPlannerInput {
  readonly budget: number;
  readonly budgetTier: BudgetTier;
  readonly country: string;
  readonly city: string;
  readonly days: number;
  readonly travelStyle: TravelStyle;
  readonly coffeePreference: string;
  readonly foodPreference: string;
  readonly party: TravelParty;
  readonly notes?: string;
}

export interface AiDayPlan {
  readonly day: number;
  readonly title: string;
  readonly summary: string;
  readonly morning: string;
  readonly afternoon: string;
  readonly evening: string;
  readonly cafes: readonly string[];
  readonly attractions: readonly string[];
}

export interface AiTripPlan {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly city: string;
  readonly country: string;
  readonly days: readonly AiDayPlan[];
  readonly suggestedCafes: readonly {
    readonly name: string;
    readonly slug: string | null;
    readonly note: string;
  }[];
  readonly suggestedAttractions: readonly string[];
  readonly suggestedDestinations: readonly {
    readonly name: string;
    readonly slug: string | null;
    readonly note: string;
  }[];
  readonly estimatedBudget: {
    readonly total: number;
    readonly daily: number;
    readonly accommodation: number;
    readonly food: number;
    readonly coffee: number;
    readonly transport: number;
    readonly activities: number;
  };
  readonly packingChecklist: readonly string[];
  readonly weatherNote: string;
  readonly generatedAt: string;
}

export type SearchResultType =
  | "destination"
  | "cafe"
  | "guide"
  | "story"
  | "traveler";

export interface SearchResultItem {
  readonly id: string;
  readonly type: SearchResultType;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly image?: string;
  readonly tags: readonly string[];
}

export interface MapMarker {
  readonly id: string;
  readonly type: "destination" | "cafe" | "attraction" | "guide";
  readonly label: string;
  readonly subtitle: string;
  readonly lat: number;
  readonly lng: number;
  readonly href?: string;
}

export interface MapRegion {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly center: { readonly lat: number; readonly lng: number };
  readonly markers: readonly MapMarker[];
  readonly nearbyCafes: readonly string[];
  readonly nearbyAttractions: readonly string[];
  readonly nearbyGuides: readonly string[];
}

export interface WeatherDay {
  readonly label: string;
  readonly highC: number;
  readonly lowC: number;
  readonly condition: string;
  readonly icon: "sun" | "cloud" | "rain" | "partly";
}

export interface WeatherSnapshot {
  readonly city: string;
  readonly country: string;
  readonly currentC: number;
  readonly condition: string;
  readonly humidity: number;
  readonly windKph: number;
  readonly bestSeason: string;
  readonly forecast: readonly WeatherDay[];
}

export interface BudgetEstimatorInput {
  readonly days: number;
  readonly travelers: number;
  readonly tier: BudgetTier;
  readonly city: string;
  readonly includeCoffeeCrawl: boolean;
  readonly includeActivities: boolean;
}

export interface BudgetBreakdown {
  readonly accommodation: number;
  readonly food: number;
  readonly coffee: number;
  readonly transport: number;
  readonly activities: number;
  readonly total: number;
  readonly dailyPerPerson: number;
}
