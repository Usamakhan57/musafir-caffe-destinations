import type { TripPlannerAccommodation, TripPlannerStyle, TripPlannerTransport } from "../types";

export interface PlannerDestinationOption {
  name: string;
  region: string;
  description: string;
  vibe: string;
}

export const plannerDestinations: PlannerDestinationOption[] = [
  {
    name: "Addis Ababa",
    region: "Ethiopia",
    description: "Coffee culture, architecture, and thoughtful city walks.",
    vibe: "urban heritage",
  },
  {
    name: "Vienna",
    region: "Austria",
    description: "Grand cafés, elegant streets, and slow mornings.",
    vibe: "classic elegance",
  },
  {
    name: "Marrakech",
    region: "Morocco",
    description: "Rooftops, hidden gardens, and deep cultural texture.",
    vibe: "colorful immersion",
  },
  {
    name: "Kyoto",
    region: "Japan",
    description: "Temple districts and calm, precise coffee rituals.",
    vibe: "serene rhythm",
  },
  {
    name: "Lisbon",
    region: "Portugal",
    description: "Miradouros, tiled streets, and late afternoon espresso breaks.",
    vibe: "sunlit coastal",
  },
];

export const travelStyles: TripPlannerStyle[] = ["slow travel", "food-forward", "photography", "nature", "city breaks", "wellness"];
export const coffeePreferences = ["flat whites", "single-origin pour-over", "espresso", "matcha", "tea rituals", "café hopping"];
export const interests = ["museums", "street markets", "architecture", "nature walks", "spa time", "nightlife", "live music", "bookshops"];
export const accommodationOptions: TripPlannerAccommodation[] = ["boutique hotel", "design stay", "guesthouse", "apartment", "eco lodge"];
export const transportOptions: TripPlannerTransport[] = ["train", "car", "flight", "hybrid"];
