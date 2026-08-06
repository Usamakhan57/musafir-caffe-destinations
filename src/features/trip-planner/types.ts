export type TripPlannerBudget = "value" | "mid-range" | "comfortable" | "luxury";
export type TripPlannerStyle = "slow travel" | "food-forward" | "photography" | "nature" | "city breaks" | "wellness";
export type TripPlannerAccommodation = "boutique hotel" | "design stay" | "guesthouse" | "apartment" | "eco lodge";
export type TripPlannerTransport = "train" | "car" | "flight" | "hybrid";

export interface TripPlannerFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: TripPlannerBudget;
  budgetAmount: number;
  travelStyle: TripPlannerStyle;
  coffeePreferences: string[];
  interests: string[];
  accommodationType: TripPlannerAccommodation;
  transportPreference: TripPlannerTransport;
  notes: string;
}

export interface TripItineraryPlace {
  name: string;
  area: string;
  reason: string;
  time: string;
}

export interface TripItineraryDay {
  day: number;
  title: string;
  summary: string;
  activities: string[];
  cafes: string[];
  hotel: string;
}

export interface GeneratedTripPlan {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  overview: string;
  heroNote: string;
  estimatedBudget: string;
  estimatedBudgetValue: number;
  days: TripItineraryDay[];
  places: TripItineraryPlace[];
  cafes: Array<{ name: string; area: string; whyItFits: string }>;
  hotels: Array<{ name: string; type: string; reason: string }>;
  transportation: string[];
  weatherSummary: string[];
  localTips: string[];
  packingSuggestions: string[];
  mapPlaceholder: string;
  generatedAt: string;
  tags: string[];
}
