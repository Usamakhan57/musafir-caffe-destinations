import { ROUTES } from "@/constants";

import type {
  Attraction,
  BudgetBreakdown,
  Category,
  CoffeeCulture,
  DestinationDetail,
  FaqItem,
  LocalFood,
  MapPlaceholder,
  PriceLevel,
  RelatedGuide,
  Season,
  TransportOption,
  WeatherMonth,
} from "../types";

/** Shape of records currently authored in `destinations-store.ts`. */
export interface RawDestination {
  readonly slug: string;
  readonly name: string;
  readonly country: string;
  readonly countryFlag: string;
  readonly region: DestinationDetail["region"];
  readonly category: Category;
  readonly tagline: string;
  readonly description: string;
  readonly heroImage: string;
  readonly rating: number;
  readonly reviewCount: number;
  readonly cafesCount: number;
  readonly priceLevel: PriceLevel;
  readonly bestSeason: string;
  readonly longDescription: string;
  readonly gallery: DestinationDetail["gallery"];
  readonly bestCafes: DestinationDetail["bestCafes"];
  readonly travelTips: DestinationDetail["travelTips"];
  readonly thingsToDo: DestinationDetail["thingsToDo"];
  readonly reviews: DestinationDetail["reviews"];
  readonly nearbySlugs: readonly string[];
}

interface Enrichment {
  readonly seasons: readonly Season[];
  readonly coffeeCulture: CoffeeCulture;
  readonly coffeeScore: number;
  readonly nomadScore: number;
  readonly digitalNomadFriendly: boolean;
  readonly budgetLabel: string;
  readonly history: string;
  readonly coffeeCultureStory: string;
  readonly attractions: readonly Attraction[];
  readonly localFoods: readonly LocalFood[];
  readonly weather: readonly WeatherMonth[];
  readonly budget: BudgetBreakdown;
  readonly transportation: readonly TransportOption[];
  readonly map: MapPlaceholder;
  readonly faqs: readonly FaqItem[];
  readonly relatedGuides: readonly RelatedGuide[];
}

const BUDGET_LABELS: Record<PriceLevel, string> = {
  $: "Budget-friendly",
  $$: "Mid-range",
  $$$: "Premium",
};

function defaultWeather(bestSeason: string): WeatherMonth[] {
  return [
    { month: "Jan–Mar", tempC: "18–26°C", note: `Cooler / dry stretch — often aligns with ${bestSeason}.` },
    { month: "Apr–Jun", tempC: "20–28°C", note: "Shoulder season with pleasant café-hopping weather." },
    { month: "Jul–Sep", tempC: "22–30°C", note: "Warmer months — seek shaded courtyards and morning coffee." },
    { month: "Oct–Dec", tempC: "18–27°C", note: "Transition season; check local rain patterns before packing." },
  ];
}

function defaultBudget(priceLevel: PriceLevel): BudgetBreakdown {
  if (priceLevel === "$") {
    return {
      lodging: "$25–55 / night",
      meals: "$12–25 / day",
      coffee: "$1–3 / cup",
      transport: "$3–8 / day",
      dailyTotal: "$45–90",
      note: "Excellent value for long stays — café culture without the premium markup.",
    };
  }
  if (priceLevel === "$$$") {
    return {
      lodging: "$140–280 / night",
      meals: "$55–110 / day",
      coffee: "$4–7 / cup",
      transport: "$15–35 / day",
      dailyTotal: "$220–420",
      note: "Expect specialty pricing — book café seats and stays early in peak season.",
    };
  }
  return {
    lodging: "$70–140 / night",
    meals: "$30–60 / day",
    coffee: "$3–5 / cup",
    transport: "$8–18 / day",
    dailyTotal: "$110–220",
    note: "Balanced spend for travelers who want specialty coffee and comfortable stays.",
  };
}

function defaultTransport(name: string): TransportOption[] {
  return [
    { mode: "Airport transfer", description: `Official taxis, rideshare, or rail links connect the airport to central ${name}.` },
    { mode: "Public transit", description: "Metro, tram, or bus networks cover major café districts — grab a day pass when hopping neighborhoods." },
    { mode: "Walking & cycling", description: "Historic cores reward walking. Rent a bike for riverside or park routes between cafés." },
    { mode: "Intercity", description: "Trains and coaches link nearby towns — ideal for day trips to origin farms or coastal escapes." },
  ];
}

function defaultFaqs(name: string, country: string): FaqItem[] {
  return [
    {
      question: `Is ${name} good for a coffee-focused trip?`,
      answer: `Yes — ${name}, ${country} is curated on MusafirCaffe for its café density, rituals, and traveler-friendly neighborhoods.`,
    },
    {
      question: "How many days should I plan?",
      answer: "Three to five days covers signature cafés, one major attraction cluster, and a slower morning for local coffee culture.",
    },
    {
      question: "Can I work from cafés here?",
      answer: "Many spots welcome laptops outside peak brunch hours. Check nomad scores and café notes for wifi-friendly tables.",
    },
    {
      question: "What is the best time to visit?",
      answer: "Follow the destination’s best-season window for comfortable walking weather and peak café patio season.",
    },
  ];
}

function defaultGuides(name: string): RelatedGuide[] {
  return [
    {
      title: `${name} café crawl`,
      excerpt: "A half-day route through signature cups, courtyards, and neighborhood bakeries.",
      href: ROUTES.guides,
    },
    {
      title: "Travel tips for coffee cities",
      excerpt: "Packing lighter, café etiquette, and how to linger without rushing the ritual.",
      href: ROUTES.travelTips,
    },
    {
      title: "Digital nomad playbook",
      excerpt: "Wifi-friendly tables, two-café rotations, and seasons that favor remote work.",
      href: ROUTES.digitalNomads,
    },
  ];
}

function attractionsFromActivities(
  activities: RawDestination["thingsToDo"],
): Attraction[] {
  return activities.slice(0, 3).map((activity) => ({
    name: activity.name,
    description: activity.description,
    image: activity.image,
  }));
}

function defaultFoods(name: string): LocalFood[] {
  return [
    {
      name: "Neighborhood bakery pastry",
      description: `Pair your first espresso with a local pastry — the classic ${name} café breakfast.`,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    },
    {
      name: "Market lunch plate",
      description: "Follow café mornings with a market lunch — seasonal, affordable, and close to roasting districts.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    },
    {
      name: "Evening sharing dishes",
      description: "End the day with local sharing plates and a final filter or digestivo near your favorite bar.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    },
  ];
}

const ENRICHMENT: Record<string, Partial<Enrichment> & Pick<Enrichment, "seasons" | "coffeeCulture" | "coffeeScore" | "nomadScore" | "digitalNomadFriendly" | "map">> = {
  "addis-ababa": {
    seasons: ["Autumn", "Winter", "Spring"],
    coffeeCulture: "Ceremony & ritual",
    coffeeScore: 9.8,
    nomadScore: 6.4,
    digitalNomadFriendly: false,
    history:
      "Long before specialty menus, Ethiopia’s highlands held wild arabica. Addis grew as a diplomatic and cultural capital where the buna ceremony remained a social institution — coffee as hospitality, not hustle.",
    coffeeCultureStory:
      "Expect frankincense, popcorn, and three rounds from a clay jebena. Standing-room classics like Tomoca sit beside modern Bole roasters pouring Yirgacheffe with third-wave precision.",
    localFoods: [
      {
        name: "Injera with shiro",
        description: "Sourdough flatbread with spiced chickpea stew — the everyday plate between café stops.",
        image: "https://images.unsplash.com/photo-1604329760661-e7b63fc1d3e2?w=800&q=80",
      },
      {
        name: "Ambasha bread",
        description: "Slightly sweet celebratory bread that pairs beautifully with black buna.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      },
      {
        name: "Fresh popcorn",
        description: "Served during coffee ceremonies — salty crunch between incense and conversation.",
        image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&q=80",
      },
    ],
    map: { label: "Addis Ababa, Ethiopia", lat: 9.03, lng: 38.74 },
  },
  istanbul: {
    seasons: ["Spring", "Autumn"],
    coffeeCulture: "Café society",
    coffeeScore: 8.6,
    nomadScore: 7.2,
    digitalNomadFriendly: true,
    history:
      "Coffee arrived via Yemen and the Ottoman court, shaping kahvehane culture across the Bosphorus. Today Istanbul balances copper cezve traditions with Karaköy specialty bars.",
    coffeeCultureStory:
      "Order Türk kahvesi with a side of water, then chase it with a third-wave flat white in Kadıköy. Ferry rides between continents become part of the café crawl.",
    map: { label: "Istanbul, Türkiye", lat: 41.01, lng: 28.98 },
  },
  melbourne: {
    seasons: ["Autumn", "Spring"],
    coffeeCulture: "Third-wave specialty",
    coffeeScore: 9.6,
    nomadScore: 8.8,
    digitalNomadFriendly: true,
    history:
      "Post-war Italian espresso bars seeded a city that reinvented milk-based coffee. Laneway culture turned Melbourne into a global specialty benchmark.",
    coffeeCultureStory:
      "Flat whites, single-origin dial-ins, and serious brunch lines. Expect knowledgeable baristas and neighborhoods built around the morning cup.",
    map: { label: "Melbourne, Australia", lat: -37.81, lng: 144.96 },
  },
  hanoi: {
    seasons: ["Autumn", "Winter", "Spring"],
    coffeeCulture: "Café society",
    coffeeScore: 9.1,
    nomadScore: 8.2,
    digitalNomadFriendly: true,
    history:
      "French colonial cafés met robusta grown in the central highlands, creating egg coffee, ca phe da, and a sidewalk culture unique to Vietnam’s capital.",
    coffeeCultureStory:
      "Sit low on plastic stools for ca phe sua da, then climb into quiet upstairs cafés overlooking the Old Quarter for deep work.",
    map: { label: "Hanoi, Vietnam", lat: 21.03, lng: 105.85 },
  },
  kyoto: {
    seasons: ["Spring", "Autumn"],
    coffeeCulture: "Roastery scene",
    coffeeScore: 8.9,
    nomadScore: 6.8,
    digitalNomadFriendly: false,
    history:
      "Temple city craftsmanship extends to coffee: meticulous pour-overs, kissaten classics, and machiya townhouses converted into quiet cafés.",
    coffeeCultureStory:
      "Seek wood-lined kissaten for siphon coffee, then modern roasters near the Kamo River for light-roast clarity.",
    map: { label: "Kyoto, Japan", lat: 35.01, lng: 135.77 },
  },
  medellin: {
    seasons: ["Summer", "Winter", "Spring", "Autumn"],
    coffeeCulture: "Origin & farm culture",
    coffeeScore: 9.0,
    nomadScore: 9.2,
    digitalNomadFriendly: true,
    history:
      "The City of Eternal Spring reinvented itself as a creative hub. Nearby Antioquia farms feed a café scene that celebrates Colombian origin with modern brewing.",
    coffeeCultureStory:
      "Day-trip to fincas, then return for latte art and mountain views in Provenza and El Poblado coworking cafés.",
    map: { label: "Medellín, Colombia", lat: 6.25, lng: -75.56 },
  },
  vienna: {
    seasons: ["Spring", "Autumn", "Winter"],
    coffeeCulture: "Espresso bar tradition",
    coffeeScore: 9.3,
    nomadScore: 7.5,
    digitalNomadFriendly: true,
    history:
      "UNESCO-recognized coffeehouse culture made the café a second living room — newspapers, strudel, and marathon conversations under vaulted ceilings.",
    coffeeCultureStory:
      "Order a Melange, linger without guilt, then explore specialty newcomers refining espresso alongside imperial institutions.",
    map: { label: "Vienna, Austria", lat: 48.21, lng: 16.37 },
  },
  lisbon: {
    seasons: ["Spring", "Autumn", "Winter"],
    coffeeCulture: "Café society",
    coffeeScore: 8.4,
    nomadScore: 8.9,
    digitalNomadFriendly: true,
    history:
      "Pastelarias and neighborhood bicas shaped daily rhythm. Recent years brought Nordic-influenced specialty while keeping pastel de nata rituals intact.",
    coffeeCultureStory:
      "Stand for a quick bica, sit for specialty filter in Príncipe Real, and time café stops between miradouro sunsets.",
    map: { label: "Lisbon, Portugal", lat: 38.72, lng: -9.14 },
  },
  "chiang-mai": {
    seasons: ["Autumn", "Winter"],
    coffeeCulture: "Origin & farm culture",
    coffeeScore: 8.8,
    nomadScore: 9.4,
    digitalNomadFriendly: true,
    history:
      "Northern Thailand’s hills grow arabica that now fuels a creative café boom — from Nimman design cafés to mountain roasting rooms.",
    coffeeCultureStory:
      "Laptop-friendly cafés by day, night markets by evening. Weekend trips into the hills reveal farms behind the city’s cups.",
    map: { label: "Chiang Mai, Thailand", lat: 18.79, lng: 98.98 },
  },
  "cape-town": {
    seasons: ["Spring", "Summer", "Autumn"],
    coffeeCulture: "Third-wave specialty",
    coffeeScore: 8.7,
    nomadScore: 8.0,
    digitalNomadFriendly: true,
    history:
      "A wind-swept port city with a roaring specialty scene — wood-fired bakeries, seaside espresso, and mountain backdrops between cups.",
    coffeeCultureStory:
      "Roasteries in Woodstock and cafés beneath Table Mountain make Cape Town a southern-hemisphere coffee destination with serious outdoors between sips.",
    map: { label: "Cape Town, South Africa", lat: -33.92, lng: 18.42 },
  },
  "antigua-guatemala": {
    seasons: ["Winter", "Spring", "Autumn"],
    coffeeCulture: "Origin & farm culture",
    coffeeScore: 9.4,
    nomadScore: 7.0,
    digitalNomadFriendly: true,
    history:
      "Colonial streets framed by volcanoes sit beside some of Central America’s most celebrated coffee farms — Antigua’s name is synonymous with origin quality.",
    coffeeCultureStory:
      "Tour fincas in the morning, taste cupping tables by noon, and settle into courtyard cafés as the volcanoes catch afternoon light.",
    map: { label: "Antigua, Guatemala", lat: 14.56, lng: -90.73 },
  },
};

export function enrichDestination(raw: RawDestination): DestinationDetail {
  const extra = ENRICHMENT[raw.slug];
  const seasons = extra?.seasons ?? (["Spring", "Autumn"] as const);
  const coffeeCulture =
    extra?.coffeeCulture ??
    (raw.category === "Coffee Town"
      ? "Third-wave specialty"
      : raw.category === "Digital Nomad Hub"
        ? "Café society"
        : "Café society");
  const coffeeScore =
    extra?.coffeeScore ??
    Math.min(9.8, Math.round((raw.rating * 1.8 + raw.cafesCount / 400) * 10) / 10);
  const nomadScore =
    extra?.nomadScore ??
    (raw.category === "Digital Nomad Hub" ? 9.0 : 7.0);
  const digitalNomadFriendly =
    extra?.digitalNomadFriendly ??
    (raw.category === "Digital Nomad Hub" || nomadScore >= 8);

  return {
    ...raw,
    city: raw.name,
    continent: raw.region,
    seasons,
    coffeeCulture,
    coffeeScore,
    nomadScore,
    digitalNomadFriendly,
    budgetLabel: BUDGET_LABELS[raw.priceLevel],
    overview: raw.longDescription,
    history:
      extra?.history ??
      `${raw.name} has long drawn travelers for culture, café life, and the pace of its streets. Today it sits among MusafirCaffe’s curated coffee cities.`,
    coffeeCultureStory:
      extra?.coffeeCultureStory ??
      `${raw.name}'s coffee culture blends local ritual with specialty craft — explore ${raw.bestCafes[0]?.name ?? "signature cafés"} and neighborhood bars to taste the difference.`,
    attractions: extra?.attractions ?? attractionsFromActivities(raw.thingsToDo),
    localFoods: extra?.localFoods ?? defaultFoods(raw.name),
    weather: extra?.weather ?? defaultWeather(raw.bestSeason),
    budget: extra?.budget ?? defaultBudget(raw.priceLevel),
    transportation: extra?.transportation ?? defaultTransport(raw.name),
    map: extra?.map ?? { label: `${raw.name}, ${raw.country}`, lat: 0, lng: 0 },
    faqs: extra?.faqs ?? defaultFaqs(raw.name, raw.country),
    relatedGuides: extra?.relatedGuides ?? defaultGuides(raw.name),
  };
}
