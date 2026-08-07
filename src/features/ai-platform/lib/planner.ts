import type {
  AiDayPlan,
  AiPlannerInput,
  AiTripPlan,
  BudgetBreakdown,
  BudgetEstimatorInput,
  BudgetTier,
} from "../types";

const CITY_CATALOG: Record<
  string,
  {
    country: string;
    attractions: string[];
    cafeIdeas: string[];
    packing: string[];
    weather: string;
    destinationSlug: string | null;
    cafeSlugs: string[];
  }
> = {
  Lisbon: {
    country: "Portugal",
    attractions: ["Alfama miradouros", "Belém riverside", "LX Factory", "Time Out Market"],
    cafeIdeas: ["Terrace espresso with a view", "Specialty flat white near Chiado", "Work-friendly pour-over"],
    packing: ["Comfortable cobblestone shoes", "Light jacket", "Transit card sleeve", "Reusable bottle"],
    weather: "Mild Atlantic days — pack a light layer for evenings.",
    destinationSlug: "lisbon",
    cafeSlugs: ["cafe-de-flore-paris"],
  },
  Vienna: {
    country: "Austria",
    attractions: ["Ringstrasse walk", "Museum Quarter", "Schönbrunn gardens", "Naschmarkt"],
    cafeIdeas: ["Classic melange at a coffeehouse", "Modern specialty espresso", "Pastry + filter afternoon"],
    packing: ["Smart-casual layer", "Comfortable walking shoes", "Compact umbrella"],
    weather: "Cool mornings and crisp evenings — layers recommended.",
    destinationSlug: "vienna",
    cafeSlugs: ["cafe-central-vienna"],
  },
  Kyoto: {
    country: "Japan",
    attractions: ["Arashiyama bamboo", "Fushimi Inari", "Philosopher’s Path", "Nishiki Market"],
    cafeIdeas: ["Quiet pour-over near temples", "Matcha latte pause", "Minimal specialty espresso"],
    packing: ["Easy-off shoes for temples", "Compact day bag", "Portable charger"],
    weather: "Seasonal swings — check forecast and pack a light rain shell.",
    destinationSlug: "kyoto",
    cafeSlugs: ["blue-bottle-kyoto", "fuglen-tokyo"],
  },
  "Addis Ababa": {
    country: "Ethiopia",
    attractions: ["National Museum", "Merkato", "Entoto views", "Coffee ceremony visit"],
    cafeIdeas: ["Historic Tomoca cup", "Ceremony experience", "Modern filter tasting"],
    packing: ["Modest clothing for ceremonies", "Cash for markets", "Notebook for tasting notes"],
    weather: "Highland climate — cool mornings, pleasant afternoons.",
    destinationSlug: "addis-ababa",
    cafeSlugs: ["tomoca-coffee-addis"],
  },
  Melbourne: {
    country: "Australia",
    attractions: ["Laneway crawl", "Queen Victoria Market", "Yarra river walk", "NGV"],
    cafeIdeas: ["Magic or flat white", "Filter flight in Fitzroy", "Late specialty espresso"],
    packing: ["Light layers", "Umbrella", "Reusable cup optional"],
    weather: "Changeable — pack a compact umbrella year-round.",
    destinationSlug: "melbourne",
    cafeSlugs: ["blue-bottle-kyoto"],
  },
  "Chiang Mai": {
    country: "Thailand",
    attractions: ["Old City temples", "Doi Suthep", "Night bazaar", "Nimman cafés"],
    cafeIdeas: ["Coworking pour-over", "Thai iced coffee (less sweet)", "Single-origin tasting"],
    packing: ["Sunscreen", "Light rain jacket", "Noise-cancelling earbuds"],
    weather: "Warm days — hydrate and plan temple visits early.",
    destinationSlug: "chiang-mai",
    cafeSlugs: ["pergamino-cafe-medellin"],
  },
  Medellín: {
    country: "Colombia",
    attractions: ["Comuna 13 outdoor escalators", "Pueblito Paisa", "Botanical garden", "Guatapé day trip"],
    cafeIdeas: ["Pergamino tasting flight", "Neighborhood gesha pour-over", "Afternoon cortado"],
    packing: ["Light layers for altitude", "Comfortable shoes", "Daypack"],
    weather: "Eternal spring — mild days, occasional showers.",
    destinationSlug: "medellin",
    cafeSlugs: ["pergamino-cafe-medellin"],
  },
  Hanoi: {
    country: "Vietnam",
    attractions: ["Old Quarter walk", "Hoan Kiem Lake", "Temple of Literature", "Train street viewpoint"],
    cafeIdeas: ["Egg coffee balcony", "Sidewalk cà phê sữa đá", "Quiet specialty filter"],
    packing: ["Small bills", "Tissue pack", "Offline maps"],
    weather: "Humid — light breathable clothing and a rain shell.",
    destinationSlug: "hanoi",
    cafeSlugs: ["tomoca-coffee-addis"],
  },
};

export const PLANNER_CITIES = Object.keys(CITY_CATALOG);

export function getCountriesForPlanner(): string[] {
  return Array.from(new Set(Object.values(CITY_CATALOG).map((c) => c.country))).sort();
}

export function getCitiesForCountry(country: string): string[] {
  return Object.entries(CITY_CATALOG)
    .filter(([, meta]) => meta.country === country)
    .map(([city]) => city);
}

function tierMultiplier(tier: BudgetTier): number {
  switch (tier) {
    case "Luxury":
      return 1.75;
    case "Mid-range":
      return 1.15;
    default:
      return 0.75;
  }
}

function partyMultiplier(party: AiPlannerInput["party"]): number {
  switch (party) {
    case "Family":
      return 2.4;
    case "Couple":
      return 1.85;
    default:
      return 1;
  }
}

function buildDays(input: AiPlannerInput, attractions: string[], cafeIdeas: string[]): AiDayPlan[] {
  return Array.from({ length: input.days }, (_, index) => {
    const day = index + 1;
    const attraction = attractions[index % attractions.length];
    const cafe = cafeIdeas[index % cafeIdeas.length];
    const isFirst = day === 1;
    const isLast = day === input.days;

    return {
      day,
      title: isFirst
        ? "Arrival & orientation"
        : isLast
          ? "Farewell & favorites"
          : `${input.travelStyle} day ${day}`,
      summary: isFirst
        ? `Settle into ${input.city} with a gentle café stop and an easy first walk.`
        : isLast
          ? `Revisit a favorite cup and leave buffer time before departure.`
          : `Balance ${input.coffeePreference.toLowerCase()} rituals with ${input.foodPreference.toLowerCase()} and a local highlight.`,
      morning: isFirst
        ? `Check in, stretch your legs, and order a ${input.coffeePreference.toLowerCase()} nearby.`
        : `Start with ${cafe} and a short neighborhood loop.`,
      afternoon: `${attraction} with a ${input.foodPreference.toLowerCase()} break.`,
      evening:
        input.party === "Family"
          ? "Early dinner and a calm stroll before rest."
          : input.party === "Couple"
            ? "Golden-hour viewpoint and a shared dessert café stop."
            : "Solo-friendly café counter or a quiet rooftop table.",
      cafes: [cafe, cafeIdeas[(index + 1) % cafeIdeas.length]],
      attractions: [attraction, attractions[(index + 2) % attractions.length]],
    };
  });
}

export function generateAiTripPlan(input: AiPlannerInput): AiTripPlan {
  const catalog = CITY_CATALOG[input.city] ?? CITY_CATALOG.Lisbon;
  const mult = tierMultiplier(input.budgetTier) * partyMultiplier(input.party);
  const styleBoost =
    input.budgetTier === "Luxury"
      ? 1.2
      : input.travelStyle === "Digital Nomad"
        ? 0.95
        : 1;

  const accommodation = Math.round(85 * input.days * mult * styleBoost);
  const food = Math.round(42 * input.days * mult);
  const coffee = Math.round(14 * input.days * mult * (input.coffeePreference ? 1.1 : 1));
  const transport = Math.round(18 * input.days * mult);
  const activities = Math.round(28 * input.days * mult);
  const computedTotal = accommodation + food + coffee + transport + activities;
  const total = Math.min(Math.max(computedTotal, Math.round(input.budget * 0.7)), Math.max(input.budget, computedTotal));

  const days = buildDays(input, catalog.attractions, catalog.cafeIdeas);

  return {
    id: `ai-${input.city.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    title: `${input.days}-day ${input.travelStyle} plan in ${input.city}`,
    subtitle: `${input.party} · ${input.budgetTier} · ${input.coffeePreference}`,
    city: input.city,
    country: catalog.country,
    days,
    suggestedCafes: catalog.cafeIdeas.map((name, i) => ({
      name,
      slug: catalog.cafeSlugs[i] ?? catalog.cafeSlugs[0] ?? null,
      note: `Fits ${input.coffeePreference.toLowerCase()} and a ${input.travelStyle.toLowerCase()} pace.`,
    })),
    suggestedAttractions: catalog.attractions,
    suggestedDestinations: [
      {
        name: input.city,
        slug: catalog.destinationSlug,
        note: "Primary base for this itinerary.",
      },
      {
        name: catalog.country === "Portugal" ? "Porto weekend add-on" : "Nearby regional day trip",
        slug: catalog.destinationSlug,
        note: "Optional extension if you have an extra day.",
      },
    ],
    estimatedBudget: {
      total,
      daily: Math.round(total / input.days),
      accommodation,
      food,
      coffee,
      transport,
      activities,
    },
    packingChecklist: [
      ...catalog.packing,
      input.party === "Family" ? "Compact snacks & wipes" : "Notebook for café notes",
      input.travelStyle === "Digital Nomad" ? "Laptop sleeve & adapters" : "Daypack for attractions",
      input.travelStyle === "Adventure" || input.travelStyle === "Nature"
        ? "Light trail shoes"
        : "Comfortable city shoes",
    ],
    weatherNote: catalog.weather,
    generatedAt: new Date().toISOString(),
  };
}

const CITY_RATES: Record<
  string,
  { accommodation: number; food: number; coffee: number; transport: number; activities: number }
> = {
  Lisbon: { accommodation: 95, food: 40, coffee: 12, transport: 16, activities: 30 },
  Vienna: { accommodation: 120, food: 45, coffee: 14, transport: 18, activities: 35 },
  Kyoto: { accommodation: 130, food: 48, coffee: 15, transport: 22, activities: 40 },
  "Addis Ababa": { accommodation: 70, food: 28, coffee: 8, transport: 12, activities: 25 },
  Melbourne: { accommodation: 125, food: 50, coffee: 16, transport: 20, activities: 38 },
  "Chiang Mai": { accommodation: 55, food: 22, coffee: 7, transport: 10, activities: 20 },
  Medellín: { accommodation: 65, food: 26, coffee: 9, transport: 12, activities: 24 },
  Hanoi: { accommodation: 50, food: 20, coffee: 6, transport: 8, activities: 18 },
  default: { accommodation: 90, food: 38, coffee: 12, transport: 15, activities: 28 },
};

export function estimateBudget(input: BudgetEstimatorInput): BudgetBreakdown {
  const rates = CITY_RATES[input.city] ?? CITY_RATES.default;
  const tier = tierMultiplier(input.tier);
  const people = Math.max(1, input.travelers);
  const days = Math.max(1, input.days);

  const accommodation = Math.round(rates.accommodation * days * tier * Math.ceil(people / 2));
  const food = Math.round(rates.food * days * tier * people);
  const coffee = Math.round(
    rates.coffee * days * tier * people * (input.includeCoffeeCrawl ? 1.35 : 1),
  );
  const transport = Math.round(rates.transport * days * tier * people);
  const activities = input.includeActivities
    ? Math.round(rates.activities * days * tier * people)
    : Math.round(rates.activities * days * tier * people * 0.35);
  const total = accommodation + food + coffee + transport + activities;

  return {
    accommodation,
    food,
    coffee,
    transport,
    activities,
    total,
    dailyPerPerson: Math.round(total / days / people),
  };
}
