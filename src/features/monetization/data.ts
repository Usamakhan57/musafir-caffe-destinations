import type {
  AffiliatePartner,
  CommerceOffer,
  MembershipPlan,
  PaymentIntentDraft,
} from "./types";

export const membershipPlans: MembershipPlan[] = [
  {
    id: "plan-explorer",
    name: "Explorer",
    slug: "explorer",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Free browsing with wishlist and community basics.",
    features: ["Browse destinations & cafés", "Save wishlist items", "Community reading"],
  },
  {
    id: "plan-nomad",
    name: "Nomad",
    slug: "nomad",
    priceMonthly: 12,
    priceYearly: 120,
    description: "Premium recommendations, offline packs, and priority support.",
    features: [
      "AI planner priority",
      "Offline destination packs",
      "Affiliate travel perks",
      "Priority review highlighting",
    ],
    highlighted: true,
  },
  {
    id: "plan-connoisseur",
    name: "Connoisseur",
    slug: "connoisseur",
    priceMonthly: 29,
    priceYearly: 290,
    description: "For creators and café owners who need deeper tools.",
    features: [
      "Everything in Nomad",
      "Guide publishing toolkit",
      "Partner dashboard access",
      "Gear affiliate boosts",
    ],
  },
];

export const affiliatePartners: AffiliatePartner[] = [
  {
    id: "aff-booking",
    name: "StayPartner",
    network: "hotel-network",
    category: "hotel",
    commissionLabel: "4–8% per booking",
    trackingParam: "mc_aff=stay",
  },
  {
    id: "aff-sky",
    name: "SkyLane",
    network: "flight-network",
    category: "flight",
    commissionLabel: "Flat fee + tier bonus",
    trackingParam: "mc_aff=sky",
  },
  {
    id: "aff-local",
    name: "LocalWalks",
    network: "tour-network",
    category: "tour",
    commissionLabel: "10% per tour",
    trackingParam: "mc_aff=walk",
  },
  {
    id: "aff-gear",
    name: "BrewSupply",
    network: "commerce-network",
    category: "gear",
    commissionLabel: "6% product share",
    trackingParam: "mc_aff=gear",
  },
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80`;

export const hotelOffers: CommerceOffer[] = [
  {
    id: "hotel-1",
    slug: "lisbon-river-inn",
    category: "hotel",
    title: "Lisbon River Inn",
    summary: "Boutique rooms near miradouros and laptop-friendly cafés.",
    location: "Lisbon, Portugal",
    priceFrom: 118,
    currency: "USD",
    rating: 4.7,
    reviewCount: 214,
    affiliatePartner: "StayPartner",
    image: img("photo-1566073771259-6a8506099945"),
    featured: true,
    tags: ["boutique", "walkable"],
  },
  {
    id: "hotel-2",
    slug: "vienna-coffeehouse-suites",
    category: "hotel",
    title: "Vienna Coffeehouse Suites",
    summary: "Quiet suites steps from classic melange culture.",
    location: "Vienna, Austria",
    priceFrom: 162,
    currency: "USD",
    rating: 4.8,
    reviewCount: 188,
    affiliatePartner: "StayPartner",
    image: img("photo-1551882547-ff40c63fe5fa"),
    tags: ["historic", "quiet"],
  },
];

export const flightOffers: CommerceOffer[] = [
  {
    id: "flight-1",
    slug: "nyc-lisbon-flexible",
    category: "flight",
    title: "NYC → Lisbon flexible fares",
    summary: "Partner fares with café-city arrival timing guidance.",
    location: "Transatlantic",
    priceFrom: 420,
    currency: "USD",
    rating: 4.5,
    reviewCount: 96,
    affiliatePartner: "SkyLane",
    image: img("photo-1436491865332-7a61a109cc05"),
    featured: true,
    tags: ["flexible", "economy"],
  },
  {
    id: "flight-2",
    slug: "lon-addis-origin",
    category: "flight",
    title: "London → Addis Ababa",
    summary: "Origin-trip routing for coffee ceremony weeks.",
    location: "UK → Ethiopia",
    priceFrom: 510,
    currency: "USD",
    rating: 4.4,
    reviewCount: 71,
    affiliatePartner: "SkyLane",
    image: img("photo-1464037866556-6812c8d1c3c6"),
    tags: ["origin", "culture"],
  },
];

export const tourOffers: CommerceOffer[] = [
  {
    id: "tour-1",
    slug: "istanbul-coffee-markets",
    category: "tour",
    title: "Istanbul Coffee & Markets",
    summary: "Half-day walk through cezve rituals and spice alleys.",
    location: "Istanbul, Türkiye",
    priceFrom: 64,
    currency: "USD",
    rating: 4.9,
    reviewCount: 312,
    affiliatePartner: "LocalWalks",
    image: img("photo-1524231757912-21f4fe3a7200"),
    featured: true,
    tags: ["walking", "food"],
  },
  {
    id: "tour-2",
    slug: "melbourne-laneway-crawl",
    category: "tour",
    title: "Melbourne Laneway Crawl",
    summary: "Specialty stops with tasting notes for first-timers.",
    location: "Melbourne, Australia",
    priceFrom: 78,
    currency: "USD",
    rating: 4.8,
    reviewCount: 201,
    affiliatePartner: "LocalWalks",
    image: img("photo-1506974210756-8e1b34177fdb"),
    tags: ["specialty", "city"],
  },
];

export const gearOffers: CommerceOffer[] = [
  {
    id: "gear-1",
    slug: "travel-pour-over-kit",
    category: "gear",
    title: "Travel pour-over kit",
    summary: "Packable dripper, filters, and scale for café-free mornings.",
    location: "Ships worldwide",
    priceFrom: 48,
    currency: "USD",
    rating: 4.6,
    reviewCount: 540,
    affiliatePartner: "BrewSupply",
    image: img("photo-1495474472287-4d71bcdd2085"),
    featured: true,
    tags: ["packable", "brew"],
  },
  {
    id: "gear-2",
    slug: "hand-grinder-compact",
    category: "gear",
    title: "Compact hand grinder",
    summary: "Consistent grind for hotel rooms and overnight trains.",
    location: "Ships worldwide",
    priceFrom: 89,
    currency: "USD",
    rating: 4.7,
    reviewCount: 402,
    affiliatePartner: "BrewSupply",
    image: img("photo-1511920170033-f8396924c348"),
    tags: ["grind", "travel"],
  },
];

const affiliateClicks: Array<{ id: string; partnerId: string; offerId: string; createdAt: string }> =
  [];

export function buildAffiliateUrl(offer: CommerceOffer, path: string) {
  const partner = affiliatePartners.find((p) => p.name === offer.affiliatePartner);
  const base = `https://partners.musafircaffe.com/out/${offer.slug}`;
  const tracking = partner?.trackingParam ?? "mc_aff=general";
  return `${base}?${tracking}&src=${encodeURIComponent(path)}`;
}

export function trackAffiliateClick(partnerId: string, offerId: string) {
  const record = {
    id: crypto.randomUUID(),
    partnerId,
    offerId,
    createdAt: new Date().toISOString(),
  };
  affiliateClicks.unshift(record);
  return record;
}

export function listAffiliateClicks() {
  return [...affiliateClicks];
}

/** Payment-ready intent factory (Stripe-shaped, no live charges). */
export function createPaymentIntentDraft(input: {
  amount: number;
  currency?: string;
  description: string;
}): PaymentIntentDraft {
  const id = `pi_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
  return {
    id,
    amount: input.amount,
    currency: (input.currency ?? "usd").toLowerCase(),
    status: "requires_payment_method",
    description: input.description,
    clientSecret: `${id}_secret_${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
  };
}

export function getOffersByCategory(category: CommerceOffer["category"]) {
  switch (category) {
    case "hotel":
      return hotelOffers;
    case "flight":
      return flightOffers;
    case "tour":
      return tourOffers;
    case "gear":
      return gearOffers;
  }
}
