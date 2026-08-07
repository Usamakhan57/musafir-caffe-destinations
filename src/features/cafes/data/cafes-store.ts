import type { CafeDetail } from "../types";
import { enrichCafe, type RawCafe } from "./enrich-cafe";
import { COFFEE_TYPES } from "../types";

/**
 * In-memory cafés catalog.
 *
 * This is the only module that knows the mock data shape. All UI code and
 * page components should consume the exported helpers below so the data layer
 * can later be swapped for Prisma without redesigning the UI.
 */
const cafes: RawCafe[] = [
  {
    slug: "tomoca-coffee-addis",
    name: "Tomoca Coffee",
    city: "Addis Ababa",
    country: "Ethiopia",
    countryFlag: "🇪🇹",
    category: "Specialty Coffee",
    tagline: "House-roasted macchiatos and a ritual of welcome",
    description:
      "A modern shrine to Ethiopian coffee culture, where beans are roasted in-house and brewed with the calm ceremony of a classic buna bar.",
    heroImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80",
    rating: 4.9,
    reviewCount: 634,
    priceLevel: "$",
    openingHours: "7:00 AM – 10:00 PM",
    amenities: ["Wi‑Fi", "Power outlets", "Indoor seating", "Takeaway"],
    longDescription:
      "Tomoca blends the intimacy of a neighborhood café with the ceremonial depth of Ethiopia's coffee traditions. Guests are greeted by slow pours, house-roasted beans, and a menu that ranges from classic macchiatos to single-origin brews that feel almost medicinal in their clarity.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Tomoca coffee bar with espresso machines and roasted beans",
      },
      {
        src: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=1200&q=80",
        alt: "Cups of Ethiopian coffee served with a traditional side plate",
      },
      {
        src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80",
        alt: "Wooden shelves lined with bags of roasted coffee",
      },
    ],
    highlights: ["House-roasted beans", "Classic macchiato", "Takeaway-friendly"],
    reviews: [
      {
        author: "Mina L.",
        location: "Toronto, Canada",
        rating: 5,
        date: "2026-06-08",
        comment: "The service is effortless and the coffee is vivid without being aggressive.",
      },
      {
        author: "Alemu B.",
        location: "Nairobi, Kenya",
        rating: 5,
        date: "2026-05-03",
        comment: "It feels like a coffee ritual rather than a caffeine stop.",
      },
    ],
    nearbySlugs: ["fuglen-tokyo", "cafe-central-vienna"],
    relatedDestinationSlugs: ["addis-ababa"],
  },
  {
    slug: "fuglen-tokyo",
    name: "Fuglen Tokyo",
    city: "Tokyo",
    country: "Japan",
    countryFlag: "🇯🇵",
    category: "Design-forward",
    tagline: "Nordic precision in the heart of Tomigaya",
    description:
      "A refined roastery café where minimalist interiors, light roasts, and late-night energy create a modern ritual of focus.",
    heroImage:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1600&q=80",
    rating: 4.7,
    reviewCount: 512,
    priceLevel: "$$",
    openingHours: "8:00 AM – 11:30 PM",
    amenities: ["Wi‑Fi", "Power outlets", "Late-night service", "Desserts"],
    longDescription:
      "Fuglen Tokyo feels as much like a design studio as a café. Its clean lines, thoughtful pour-overs, and expertly balanced light roasts have made it a favorite for travelers who want the calm of a specialty bar without sacrificing an evening plan.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1200&q=80",
        alt: "Minimalist cafe interior with light wood and espresso cups",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=80",
        alt: "Pour-over coffee setup with a ceramic dripper",
      },
    ],
    highlights: ["Nordic pour-overs", "Late-night seating", "Design-led interior"],
    reviews: [
      {
        author: "Haruto K.",
        location: "Osaka, Japan",
        rating: 4,
        date: "2026-04-14",
        comment: "The coffee is beautiful, and the room remains calm even at peak hours.",
      },
    ],
    nearbySlugs: ["tomoca-coffee-addis", "cafe-central-vienna"],
    relatedDestinationSlugs: ["kyoto"],
  },
  {
    slug: "cafe-central-vienna",
    name: "Café Central",
    city: "Vienna",
    country: "Austria",
    countryFlag: "🇦🇹",
    category: "Historic Café",
    tagline: "A grand salon for coffee, cake, and conversation",
    description:
      "For over a century, this imperial-era café has hosted thinkers, composers, and travelers beneath ornate ceilings and polished marble.",
    heroImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80",
    rating: 4.8,
    reviewCount: 780,
    priceLevel: "$$$",
    openingHours: "8:00 AM – 11:00 PM",
    amenities: ["Indoor seating", "Desserts", "Accessible entry", "Classic menu"],
    longDescription:
      "Café Central has long been one of Vienna's most magnetic public rooms. Its history, architecture, and coffeehouse culture make it the perfect place to linger over an espresso or a slice of cake while the city moves around you.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
        alt: "Elegant Vienna cafe with chandeliers and marble tables",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Coffee served on a marble-top table with cake",
      },
    ],
    highlights: ["Historic interiors", "Classic melange", "Long conversations"],
    reviews: [
      {
        author: "Sophie D.",
        location: "Berlin, Germany",
        rating: 5,
        date: "2026-03-20",
        comment: "The atmosphere alone is worth the visit, and the service feels timeless.",
      },
    ],
    nearbySlugs: ["tomoca-coffee-addis", "fuglen-tokyo"],
    relatedDestinationSlugs: ["istanbul"],
  },
  {
    slug: "blue-bottle-kyoto",
    name: "Blue Bottle Kyoto",
    city: "Kyoto",
    country: "Japan",
    countryFlag: "🇯🇵",
    category: "Neighborhood Staple",
    tagline: "Minimalist coffee in a restored machiya townhouse",
    description:
      "A quiet, beautifully restored café where single-origin coffee and Japanese restraint create one of Kyoto's most radiant morning rituals.",
    heroImage:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80",
    rating: 4.6,
    reviewCount: 421,
    priceLevel: "$$",
    openingHours: "8:00 AM – 7:00 PM",
    amenities: ["Wi‑Fi", "Indoor seating", "Takeaway", "Quiet study area"],
    longDescription:
      "Blue Bottle Kyoto channels the stillness of a machiya townhouse into a contemporary coffee experience. The result is calm, precise, and memorable — especially for travelers arriving early to explore the city's temples and lanes.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
        alt: "Blue Bottle coffee bar in a wooden machiya setting",
      },
      {
        src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1200&q=80",
        alt: "Coffee served beside a window overlooking a Kyoto street",
      },
    ],
    highlights: ["Single-origin drip", "Quiet atmosphere", "Restored townhouse"],
    reviews: [
      {
        author: "Leah W.",
        location: "Singapore",
        rating: 4,
        date: "2026-02-12",
        comment: "It feels almost meditative. The coffee is bright and generous.",
      },
    ],
    nearbySlugs: ["fuglen-tokyo", "cafe-central-vienna"],
    relatedDestinationSlugs: ["kyoto"],
  },
  {
    slug: "pergamino-cafe-medellin",
    name: "Pergamino Café",
    city: "Medellín",
    country: "Colombia",
    countryFlag: "🇨🇴",
    category: "Rooftop Lounge",
    tagline: "Sunlit specialty coffee with mountain views",
    description:
      "A bright, modern roastery in El Poblado where direct-trade beans and rooftop seating make the city feel lighter at any hour.",
    heroImage:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80",
    rating: 4.7,
    reviewCount: 380,
    priceLevel: "$$",
    openingHours: "7:30 AM – 11:00 PM",
    amenities: ["Rooftop seating", "Wi‑Fi", "Power outlets", "Brunch"],
    longDescription:
      "Pergamino Café brings the optimism of Medellín into a bright, modern workspace. The coffee is deliberate and the rooftop terrace makes it one of the city's best spots to pause between meetings or market walks.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Modern coffee bar with bright natural light",
      },
      {
        src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=80",
        alt: "Rooftop table with coffee and city views",
      },
    ],
    highlights: ["Rooftop terrace", "Direct-trade beans", "Brunch-friendly"],
    reviews: [
      {
        author: "Nadia V.",
        location: "Bogotá, Colombia",
        rating: 5,
        date: "2026-01-16",
        comment: "The terrace feels like the best part of the city but with better beans.",
      },
    ],
    nearbySlugs: ["blue-bottle-kyoto", "fuglen-tokyo"],
    relatedDestinationSlugs: ["medellin"],
  },
  {
    slug: "cafe-de-flore-paris",
    name: "Café de Flore",
    city: "Paris",
    country: "France",
    countryFlag: "🇫🇷",
    category: "Late-night Café",
    tagline: "A legendary terrace for espresso and people-watching",
    description:
      "Saint-Germain's grand terrace remains one of the city's most iconic places to pause over a café crème and watch the street drift by.",
    heroImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80",
    rating: 4.5,
    reviewCount: 650,
    priceLevel: "$$$",
    openingHours: "7:30 AM – 1:00 AM",
    amenities: ["Terrace", "Desserts", "Late-night seating", "Classic menu"],
    longDescription:
      "The café's history and terrace culture make it a place for lingering long after the coffee has cooled. Expect polished service, excellent pastry, and plenty of atmosphere for travelers who like their café visits to feel theatrical.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Cafe de Flore terrace in Paris with tables and umbrellas",
      },
      {
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
        alt: "Coffee and pastry on a Paris café table",
      },
    ],
    highlights: ["Terrace seating", "Legacy venue", "Late-night energy"],
    reviews: [
      {
        author: "Luca M.",
        location: "Milan, Italy",
        rating: 4,
        date: "2025-12-02",
        comment: "The place is beautiful, but the queues are real — worth it for the atmosphere.",
      },
    ],
    nearbySlugs: ["cafe-central-vienna", "blue-bottle-kyoto"],
    relatedDestinationSlugs: ["istanbul"],
  },
];

function allEnriched(): CafeDetail[] {
  return cafes.map(enrichCafe);
}

export async function getAllCafes(): Promise<CafeDetail[]> {
  return allEnriched();
}

export async function getCafeBySlug(slug: string): Promise<CafeDetail | null> {
  const raw = cafes.find((cafe) => cafe.slug === slug);
  return raw ? enrichCafe(raw) : null;
}

export async function getCafeSlugs(): Promise<string[]> {
  return cafes.map((cafe) => cafe.slug);
}

export async function getNearbyCafes(slugs: readonly string[]): Promise<CafeDetail[]> {
  return cafes.filter((cafe) => slugs.includes(cafe.slug)).map(enrichCafe);
}

export function getFilterOptions() {
  const enriched = allEnriched();
  return {
    categories: Array.from(new Set(enriched.map((cafe) => cafe.category))),
    cities: Array.from(new Set(enriched.map((cafe) => cafe.city))).sort(),
    countries: Array.from(new Set(enriched.map((cafe) => cafe.country))).sort(),
    coffeeTypes: Array.from(new Set(enriched.map((cafe) => cafe.coffeeType))).sort() as typeof COFFEE_TYPES[number][],
    ratings: [4.5, 4.6, 4.7, 4.8, 4.9],
    priceLevels: ["$", "$$", "$$$"] as const,
  };
}
