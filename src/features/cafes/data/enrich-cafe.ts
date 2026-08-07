import type {
  CafeCategory,
  CafeDetail,
  CoffeeType,
  MenuHighlight,
  NearbyAttraction,
  PriceLevel,
} from "../types";

/** Shape authored in `cafes-store.ts` before enrichment. */
export interface RawCafe {
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
  readonly longDescription: string;
  readonly gallery: CafeDetail["gallery"];
  readonly highlights: readonly string[];
  readonly reviews: CafeDetail["reviews"];
  readonly nearbySlugs: readonly string[];
  readonly relatedDestinationSlugs: readonly string[];
}

interface CafeEnrichment {
  readonly coffeeType: CoffeeType;
  readonly opensAtMinutes: number;
  readonly closesAtMinutes: number;
  readonly hasWifi: boolean;
  readonly hasOutdoorSeating: boolean;
  readonly remoteWorkFriendly: boolean;
  readonly petFriendly: boolean;
  readonly veganOptions: boolean;
  readonly coffeeQualityScore: number;
  readonly remoteWorkScore: number;
  readonly popularity: number;
  readonly openedYear: number;
  readonly story: string;
  readonly signatureCoffee: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly website: string;
  readonly social: CafeDetail["social"];
  readonly wifiSpeed: string;
  readonly foodOptions: readonly string[];
  readonly menuHighlights: readonly MenuHighlight[];
  readonly nearbyAttractions: readonly NearbyAttraction[];
  readonly map: CafeDetail["map"];
}

function parseHoursToMinutes(openingHours: string): { open: number; close: number } {
  // Expect formats like "7:00 AM – 10:00 PM" or "8:00 AM – 11:30 PM"
  const match = openingHours.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM).*?(\d{1,2}):(\d{2})\s*(AM|PM)/i,
  );
  if (!match) {
    return { open: 7 * 60, close: 22 * 60 };
  }
  const toMinutes = (h: number, m: number, period: string) => {
    let hour = h % 12;
    if (period.toUpperCase() === "PM") hour += 12;
    return hour * 60 + m;
  };
  return {
    open: toMinutes(Number(match[1]), Number(match[2]), match[3]),
    close: toMinutes(Number(match[4]), Number(match[5]), match[6]),
  };
}

function amenityHas(amenities: readonly string[], ...needles: string[]): boolean {
  const joined = amenities.join(" ").toLowerCase();
  return needles.some((needle) => joined.includes(needle.toLowerCase()));
}

function defaultMenu(signature: string, priceLevel: PriceLevel): MenuHighlight[] {
  const coffeePrice = priceLevel === "$" ? "$2.50" : priceLevel === "$$" ? "$4.50" : "$6.00";
  return [
    { name: signature, description: "House signature — the cup this café is known for.", price: coffeePrice },
    { name: "Seasonal pastry", description: "Local bakery pairing that changes with the week.", price: priceLevel === "$$$" ? "$7.00" : "$4.00" },
    { name: "Filter of the day", description: "Single-origin drip or batch brew, dialed fresh.", price: coffeePrice },
  ];
}

const ENRICHMENT: Record<string, Partial<CafeEnrichment> & Pick<CafeEnrichment, "coffeeType" | "map" | "address" | "signatureCoffee" | "story">> = {
  "tomoca-coffee-addis": {
    coffeeType: "Traditional ceremony",
    signatureCoffee: "House-roasted macchiato",
    story:
      "Since 1953, Tomoca has roasted on Piazza and served standing-room macchiatos to generations of Addis drinkers — a bridge between buna ritual and modern café pace.",
    address: "Wavel Street, Piazza, Addis Ababa, Ethiopia",
    phone: "+251 11 111 7811",
    email: "hello@tomoca.example",
    website: "https://example.com/tomoca",
    social: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    wifiSpeed: "45 Mbps",
    coffeeQualityScore: 9.7,
    remoteWorkScore: 6.2,
    remoteWorkFriendly: false,
    hasOutdoorSeating: false,
    petFriendly: false,
    veganOptions: true,
    openedYear: 1953,
    popularity: 96,
    foodOptions: ["Pastries", "Light snacks", "Takeaway"],
    nearbyAttractions: [
      { name: "National Museum of Ethiopia", description: "Home of Lucy and Ethiopian heritage galleries.", walkMinutes: 12 },
      { name: "Merkato edge stalls", description: "Spice and coffee trading streets nearby.", walkMinutes: 18 },
    ],
    map: { label: "Tomoca Coffee, Addis Ababa", lat: 9.03, lng: 38.75 },
  },
  "fuglen-tokyo": {
    coffeeType: "Filter / pour-over",
    signatureCoffee: "Nordic light-roast pour-over",
    story:
      "Born from Oslo’s Fuglen, the Tokyo outpost mixes mid-century design furniture with precise light roasts — café by day, cocktail-friendly by night.",
    address: "1-16-11 Tomigaya, Shibuya, Tokyo, Japan",
    phone: "+81 3-3481-0884",
    email: "tokyo@fuglen.example",
    website: "https://example.com/fuglen",
    social: { instagram: "https://instagram.com", x: "https://x.com" },
    wifiSpeed: "120 Mbps",
    coffeeQualityScore: 9.2,
    remoteWorkScore: 8.4,
    remoteWorkFriendly: true,
    hasOutdoorSeating: false,
    petFriendly: false,
    veganOptions: true,
    openedYear: 2012,
    popularity: 88,
    foodOptions: ["Desserts", "Light bites", "Evening drinks"],
    nearbyAttractions: [
      { name: "Yoyogi Park", description: "Green escape minutes from Tomigaya lanes.", walkMinutes: 10 },
      { name: "Meiji Shrine approach", description: "Forest path and shrine precinct nearby.", walkMinutes: 15 },
    ],
    map: { label: "Fuglen Tokyo", lat: 35.67, lng: 139.69 },
  },
  "cafe-central-vienna": {
    coffeeType: "Espresso",
    signatureCoffee: "Wiener Melange",
    story:
      "Opened in 1876, Café Central hosted writers and revolutionaries under vaulted ceilings — still the archetype of Viennese coffeehouse culture.",
    address: "Herrengasse 14, 1010 Vienna, Austria",
    phone: "+43 1 5333764",
    email: "reserve@cafecentral.example",
    website: "https://example.com/cafecentral",
    social: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
    wifiSpeed: "35 Mbps",
    coffeeQualityScore: 8.8,
    remoteWorkScore: 5.5,
    remoteWorkFriendly: false,
    hasOutdoorSeating: false,
    petFriendly: false,
    veganOptions: true,
    openedYear: 1876,
    popularity: 94,
    foodOptions: ["Pastries", "Full meals", "Classic cakes"],
    nearbyAttractions: [
      { name: "Hofburg Palace", description: "Imperial complex a short stroll away.", walkMinutes: 8 },
      { name: "Graben shopping street", description: "Café crawl territory through the Innere Stadt.", walkMinutes: 6 },
    ],
    map: { label: "Café Central, Vienna", lat: 48.21, lng: 16.37 },
  },
  "blue-bottle-kyoto": {
    coffeeType: "Single-origin tasting",
    signatureCoffee: "Single-origin drip",
    story:
      "Set in a restored machiya, Blue Bottle Kyoto pairs Japanese restraint with California specialty craft — quiet mornings, bright cups, wooden light.",
    address: "64-2 Nenbutsuje-cho, Shimogyo, Kyoto, Japan",
    phone: "+81 75-744-6256",
    email: "kyoto@bluebottle.example",
    website: "https://example.com/bluebottle-kyoto",
    social: { instagram: "https://instagram.com" },
    wifiSpeed: "95 Mbps",
    coffeeQualityScore: 9.0,
    remoteWorkScore: 7.8,
    remoteWorkFriendly: true,
    hasOutdoorSeating: false,
    petFriendly: false,
    veganOptions: true,
    openedYear: 2015,
    popularity: 82,
    foodOptions: ["Pastries", "Light breakfast", "Takeaway"],
    nearbyAttractions: [
      { name: "Nishiki Market", description: "Kyoto’s kitchen — short walk for snacks.", walkMinutes: 12 },
      { name: "Kamo River paths", description: "Riverside walking between café stops.", walkMinutes: 14 },
    ],
    map: { label: "Blue Bottle Kyoto", lat: 35.0, lng: 135.76 },
  },
  "pergamino-cafe-medellin": {
    coffeeType: "Latte & milk drinks",
    signatureCoffee: "Direct-trade flat white",
    story:
      "Pergamino grew from a family coffee business into El Poblado’s sunlit specialty hub — terrace tables, brunch plates, and beans traced to Colombian farms.",
    address: "Calle 11A #32-8, El Poblado, Medellín, Colombia",
    phone: "+57 604 444 0000",
    email: "hola@pergamino.example",
    website: "https://example.com/pergamino",
    social: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    wifiSpeed: "110 Mbps",
    coffeeQualityScore: 9.1,
    remoteWorkScore: 9.0,
    remoteWorkFriendly: true,
    hasOutdoorSeating: true,
    petFriendly: true,
    veganOptions: true,
    openedYear: 2012,
    popularity: 90,
    foodOptions: ["Brunch", "Vegan options", "Pastries"],
    nearbyAttractions: [
      { name: "Provenza streets", description: "Nightlife and design shops around the corner.", walkMinutes: 8 },
      { name: "Lleras Park", description: "Green square for a post-coffee wander.", walkMinutes: 10 },
    ],
    map: { label: "Pergamino Café, Medellín", lat: 6.21, lng: -75.57 },
  },
  "cafe-de-flore-paris": {
    coffeeType: "Espresso",
    signatureCoffee: "Café crème",
    story:
      "A Saint-Germain landmark since the 1880s, Café de Flore remains the terrace for people-watching — polished service, pastry theater, late lights.",
    address: "172 Boulevard Saint-Germain, 75006 Paris, France",
    phone: "+33 1 45 48 55 26",
    email: "contact@cafedeflore.example",
    website: "https://example.com/cafedeflore",
    social: { instagram: "https://instagram.com", facebook: "https://facebook.com", x: "https://x.com" },
    wifiSpeed: "25 Mbps",
    coffeeQualityScore: 8.2,
    remoteWorkScore: 4.8,
    remoteWorkFriendly: false,
    hasOutdoorSeating: true,
    petFriendly: false,
    veganOptions: true,
    openedYear: 1887,
    popularity: 98,
    foodOptions: ["Full meals", "Pastries", "Late-night menu"],
    nearbyAttractions: [
      { name: "Saint-Germain-des-Prés church", description: "Historic square steps away.", walkMinutes: 3 },
      { name: "Seine riverbanks", description: "Booksellers and evening walks nearby.", walkMinutes: 10 },
    ],
    map: { label: "Café de Flore, Paris", lat: 48.85, lng: 2.33 },
  },
};

export function enrichCafe(raw: RawCafe): CafeDetail {
  const extra = ENRICHMENT[raw.slug];
  const parsed = parseHoursToMinutes(raw.openingHours);
  const hasWifi =
    extra?.hasWifi ?? amenityHas(raw.amenities, "wi-fi", "wifi", "wi‑fi");
  const hasOutdoorSeating =
    extra?.hasOutdoorSeating ??
    amenityHas(raw.amenities, "outdoor", "terrace", "rooftop");
  const remoteWorkFriendly =
    extra?.remoteWorkFriendly ??
    (hasWifi && amenityHas(raw.amenities, "power", "quiet", "study"));
  const coffeeType =
    extra?.coffeeType ??
    (raw.category === "Specialty Coffee"
      ? "Single-origin tasting"
      : raw.category === "Historic Café"
        ? "Espresso"
        : "Filter / pour-over");
  const signatureCoffee = extra?.signatureCoffee ?? raw.highlights[0] ?? "House espresso";
  const coffeeQualityScore =
    extra?.coffeeQualityScore ?? Math.min(9.8, Math.round(raw.rating * 1.85 * 10) / 10);
  const remoteWorkScore =
    extra?.remoteWorkScore ?? (remoteWorkFriendly ? 8.2 : 5.5);

  return {
    ...raw,
    coffeeType,
    opensAtMinutes: extra?.opensAtMinutes ?? parsed.open,
    closesAtMinutes: extra?.closesAtMinutes ?? parsed.close,
    hasWifi,
    hasOutdoorSeating,
    remoteWorkFriendly,
    petFriendly: extra?.petFriendly ?? false,
    veganOptions: extra?.veganOptions ?? amenityHas(raw.amenities, "vegan", "plant"),
    coffeeQualityScore,
    remoteWorkScore,
    popularity: extra?.popularity ?? Math.min(99, Math.round(raw.reviewCount / 8)),
    openedYear: extra?.openedYear ?? 2010,
    about: raw.longDescription,
    story:
      extra?.story ??
      `${raw.name} has become a landmark stop in ${raw.city} — known for ${signatureCoffee.toLowerCase()} and a room that rewards lingering.`,
    signatureCoffee,
    address: extra?.address ?? `${raw.city}, ${raw.country}`,
    phone: extra?.phone ?? "+1 000 000 0000",
    email: extra?.email ?? `hello@${raw.slug}.example`,
    website: extra?.website ?? "https://example.com",
    social: extra?.social ?? { instagram: "https://instagram.com" },
    wifiSpeed: extra?.wifiSpeed ?? (hasWifi ? "60 Mbps" : "N/A"),
    foodOptions: extra?.foodOptions ?? ["Pastries", "Light snacks"],
    menuHighlights: extra?.menuHighlights ?? defaultMenu(signatureCoffee, raw.priceLevel),
    nearbyAttractions: extra?.nearbyAttractions ?? [
      {
        name: `${raw.city} old town walk`,
        description: "Explore nearby streets between cups.",
        walkMinutes: 10,
      },
    ],
    map: extra?.map ?? { label: `${raw.name}, ${raw.city}`, lat: 0, lng: 0 },
  };
}

/** Server-safe open-now check using UTC clock as approximation for demo data. */
export function isCafeOpenNow(cafe: Pick<CafeDetail, "opensAtMinutes" | "closesAtMinutes">, now = new Date()): boolean {
  const minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const { opensAtMinutes: open, closesAtMinutes: close } = cafe;
  if (close > open) {
    return minutes >= open && minutes < close;
  }
  // Overnight hours (e.g. 7:30 AM – 1:00 AM)
  return minutes >= open || minutes < close;
}
