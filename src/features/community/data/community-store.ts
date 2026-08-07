import type { CommunityStory, Traveler } from "../types";

export const TRAVELERS: readonly Traveler[] = [
  {
    slug: "lena-ortiz",
    name: "Lena Ortiz",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    location: "Barcelona, Spain",
    bio: "Digital nomad editor sharing wifi-friendly cafés, neighborhood walks, and slow mornings abroad.",
    specialty: "Street café routes and market finds.",
    verified: true,
    featured: true,
    followers: 18420,
    following: 312,
    visitedCountries: ["Spain", "Portugal", "Thailand", "Colombia", "Japan"],
    visitedCafeSlugs: ["pergamino-cafe-medellin", "fuglen-tokyo"],
    visitedDestinationSlugs: ["lisbon", "chiang-mai", "medellin"],
    savedStorySlugs: ["lisbon-solo-week", "tokyo-design-cafes-diary"],
    savedCafeSlugs: ["cafe-central-vienna", "blue-bottle-kyoto"],
    savedDestinationSlugs: ["vienna", "kyoto"],
    social: {
      instagram: "https://instagram.com",
      x: "https://x.com",
      website: "https://example.com/lena",
    },
  },
  {
    slug: "marco-rossi",
    name: "Marco Rossi",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    location: "Milan, Italy",
    bio: "Espresso-first traveler documenting modern coffee bars, design hotels, and weekend escapes.",
    specialty: "Modern espresso culture and hidden bars.",
    verified: true,
    featured: true,
    followers: 12650,
    following: 198,
    visitedCountries: ["Italy", "France", "Austria", "Türkiye"],
    visitedCafeSlugs: ["cafe-de-flore-paris", "cafe-central-vienna"],
    visitedDestinationSlugs: ["vienna", "istanbul", "lisbon"],
    savedStorySlugs: ["vienna-couple-weekend", "paris-terrace-notes"],
    savedCafeSlugs: ["cafe-de-flore-paris"],
    savedDestinationSlugs: ["istanbul"],
    social: { instagram: "https://instagram.com", website: "https://example.com/marco" },
  },
  {
    slug: "aisha-bekele",
    name: "Aisha Bekele",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    location: "Addis Ababa, Ethiopia",
    bio: "Origins correspondent covering ceremonies, highland farms, and hospitality that shaped specialty coffee.",
    specialty: "Origin stories, ceremonies and coffee farms.",
    verified: true,
    featured: true,
    followers: 22100,
    following: 144,
    visitedCountries: ["Ethiopia", "South Africa", "Guatemala"],
    visitedCafeSlugs: ["tomoca-coffee-addis"],
    visitedDestinationSlugs: ["addis-ababa", "cape-town", "antigua-guatemala"],
    savedStorySlugs: ["addis-ceremony-week", "antigua-origin-trail"],
    savedCafeSlugs: ["tomoca-coffee-addis", "pergamino-cafe-medellin"],
    savedDestinationSlugs: ["addis-ababa"],
    social: { instagram: "https://instagram.com", x: "https://x.com" },
  },
  {
    slug: "sam-rivera",
    name: "Sam Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    location: "Melbourne, Australia",
    bio: "Budget traveler mapping laneway espresso, hostels with good pour-overs, and city walks under $50/day.",
    specialty: "Budget coffee crawls and city hacks.",
    verified: false,
    featured: true,
    followers: 8420,
    following: 520,
    visitedCountries: ["Australia", "Vietnam", "Thailand"],
    visitedCafeSlugs: ["blue-bottle-kyoto"],
    visitedDestinationSlugs: ["melbourne", "hanoi", "chiang-mai"],
    savedStorySlugs: ["melbourne-budget-crawl", "hanoi-street-coffee"],
    savedCafeSlugs: ["fuglen-tokyo"],
    savedDestinationSlugs: ["hanoi"],
    social: { website: "https://example.com/sam" },
  },
  {
    slug: "jiwoo-park",
    name: "Jiwoo Park",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    location: "Seoul, South Korea",
    bio: "Writes about design cafés, family-friendly itineraries, and quiet corners in loud cities.",
    specialty: "Design cafés and family weekends.",
    verified: true,
    featured: false,
    followers: 9780,
    following: 265,
    visitedCountries: ["Japan", "South Korea", "Vietnam"],
    visitedCafeSlugs: ["fuglen-tokyo", "blue-bottle-kyoto"],
    visitedDestinationSlugs: ["kyoto", "hanoi"],
    savedStorySlugs: ["kyoto-family-weekend", "tokyo-design-cafes-diary"],
    savedCafeSlugs: ["blue-bottle-kyoto"],
    savedDestinationSlugs: ["kyoto"],
    social: { instagram: "https://instagram.com" },
  },
  {
    slug: "sofia-alvarez",
    name: "Sofia Alvarez",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80",
    location: "Medellín, Colombia",
    bio: "Road-trip storyteller pairing mountain drives with specialty cafés and local food stops.",
    specialty: "Road trips and highland cafés.",
    verified: false,
    featured: false,
    followers: 5640,
    following: 410,
    visitedCountries: ["Colombia", "Guatemala", "Portugal"],
    visitedCafeSlugs: ["pergamino-cafe-medellin"],
    visitedDestinationSlugs: ["medellin", "antigua-guatemala", "lisbon"],
    savedStorySlugs: ["medellin-road-escape", "lisbon-solo-week"],
    savedCafeSlugs: ["pergamino-cafe-medellin"],
    savedDestinationSlugs: ["medellin"],
    social: { x: "https://x.com", website: "https://example.com/sofia" },
  },
];

function comments(
  items: Array<[string, string, string, string]>,
): CommunityStory["comments"] {
  return items.map(([id, authorName, authorAvatar, body], index) => ({
    id,
    authorName,
    authorAvatar,
    body,
    createdAt: `2026-07-${String(10 + index).padStart(2, "0")}T10:00:00.000Z`,
  }));
}

const stories: CommunityStory[] = [
  {
    slug: "lisbon-solo-week",
    title: "A solo week in Lisbon: tram rides and terrace espresso",
    excerpt:
      "Seven days of miradouros, pastel de nata stops, and laptop-friendly cafés along the Tagus.",
    coverImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1800&q=80",
    authorSlug: "lena-ortiz",
    category: "Solo Travel",
    country: "Portugal",
    destination: "Lisbon",
    destinationSlug: "lisbon",
    tags: ["Lisbon", "Solo", "Europe"],
    coffeeTags: ["espresso", "terrace", "specialty"],
    readingMinutes: 8,
    likes: 2140,
    commentsCount: 36,
    bookmarks: 890,
    shares: 210,
    publishedAt: "2026-07-28T09:00:00.000Z",
    featured: true,
    trending: true,
    weeklyHighlight: true,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80",
        alt: "Lisbon tram on a hillside street",
      },
      {
        src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80",
        alt: "Coastal view near Lisbon",
      },
    ],
    journey: [
      {
        day: "Day 1",
        title: "Alfama mornings",
        description: "Walk the miradouros, then settle into a quiet specialty bar for an espresso.",
      },
      {
        day: "Day 3",
        title: "Belém sweets & coffee",
        description: "Pastéis and a second cup before the riverside walk back toward Cais do Sodré.",
      },
      {
        day: "Day 6",
        title: "LX Factory work session",
        description: "A full remote work day with reliable wifi and people-watching between calls.",
      },
    ],
    visitedCafeSlugs: ["cafe-de-flore-paris"],
    visitedDestinationSlugs: ["lisbon"],
    budget: {
      total: "€620",
      daily: "€88",
      notes: "Hostel + transit pass + two café stops a day.",
    },
    travelTips: [
      "Buy a 24h transit pass if you’re hopping hills.",
      "Book popular rooftop cafés for late afternoon light.",
    ],
    coffeeRecommendations: [
      { name: "Short espresso with a view", note: "Order standing first, then linger if the terrace opens." },
      { name: "Flat white for work blocks", note: "Look for specialty spots near LX Factory." },
    ],
    packingTips: [
      "Comfortable shoes for cobblestones",
      "Light jacket for Atlantic evenings",
      "Universal adapter and a compact laptop sleeve",
    ],
    body: [
      "Lisbon rewards travelers who move slowly between viewpoints and café counters. I spent mornings walking Alfama before the crowds, then claimed a table with an outlet and a short espresso.",
      "Afternoons were for Belém, river walks, and editing photos with a second cup. Evenings meant miradouro golden hour and a late, quiet pour-over.",
      "If you’re traveling solo, Lisbon’s café culture makes it easy to linger without feeling out of place — bring a notebook and let the city set the pace.",
    ],
    comments: comments([
      [
        "c1",
        "Marco Rossi",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        "This made me want to book a return trip just for the terrace light.",
      ],
      [
        "c2",
        "Sam Rivera",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        "Great budget notes — the daily spend feels realistic.",
      ],
    ]),
    relatedStorySlugs: ["porto-weekend-escape", "vienna-couple-weekend"],
  },
  {
    slug: "addis-ceremony-week",
    title: "Coffee ceremony week in Addis Ababa",
    excerpt:
      "Three ceremonies, one origin market morning, and the cafés that keep the capital buzzing.",
    coverImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1800&q=80",
    authorSlug: "aisha-bekele",
    category: "Coffee Lovers",
    country: "Ethiopia",
    destination: "Addis Ababa",
    destinationSlug: "addis-ababa",
    tags: ["Ethiopia", "Origins", "Ceremony"],
    coffeeTags: ["ceremony", "natural", "yirgacheffe"],
    readingMinutes: 10,
    likes: 3120,
    commentsCount: 54,
    bookmarks: 1402,
    shares: 388,
    publishedAt: "2026-07-20T11:00:00.000Z",
    featured: true,
    trending: true,
    weeklyHighlight: true,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Coffee cups on a wooden table",
      },
    ],
    journey: [
      {
        day: "Day 1",
        title: "Tomoca classic",
        description: "Start with a historic cup and a walk through Piazza’s coffee corners.",
      },
      {
        day: "Day 2",
        title: "Home ceremony",
        description: "Join a family ceremony — incense, roasting, and three rounds of coffee.",
      },
      {
        day: "Day 4",
        title: "Market morning",
        description: "Smell green coffee, chat with traders, and taste regional lots.",
      },
    ],
    visitedCafeSlugs: ["tomoca-coffee-addis"],
    visitedDestinationSlugs: ["addis-ababa"],
    budget: {
      total: "$480",
      daily: "$68",
      notes: "Includes ceremony hosting gifts and local taxis.",
    },
    travelTips: [
      "Bring small gifts if invited to a home ceremony.",
      "Ask before photographing roasting or family spaces.",
    ],
    coffeeRecommendations: [
      { name: "Traditional buna", note: "Stay for all three rounds if offered." },
      { name: "Filter Yirgacheffe", note: "Compare floral notes against a classic Italian-style espresso." },
    ],
    packingTips: ["Modest clothing for home visits", "Cash for markets", "Notebook for tasting notes"],
    body: [
      "Addis is where hospitality and coffee are inseparable. This week was less about checklists and more about sitting still while beans crackle and incense fills the room.",
      "Between ceremonies I revisited Tomoca and specialty newcomers, learning how the city’s café culture holds both tradition and experimentation.",
    ],
    comments: comments([
      [
        "c3",
        "Lena Ortiz",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        "The packing tips for ceremonies are so thoughtful.",
      ],
    ]),
    relatedStorySlugs: ["antigua-origin-trail", "melbourne-budget-crawl"],
  },
  {
    slug: "vienna-couple-weekend",
    title: "Vienna for two: coffeehouses and evening walks",
    excerpt:
      "A luxury-leaning weekend of marble coffeehouses, museum cafés, and slow dinners.",
    coverImage:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1800&q=80",
    authorSlug: "marco-rossi",
    category: "Couples",
    country: "Austria",
    destination: "Vienna",
    destinationSlug: "vienna",
    tags: ["Vienna", "Couples", "Luxury"],
    coffeeTags: ["melange", "coffeehouse", "pastry"],
    readingMinutes: 7,
    likes: 1680,
    commentsCount: 22,
    bookmarks: 640,
    shares: 145,
    publishedAt: "2026-07-14T08:30:00.000Z",
    featured: true,
    trending: false,
    weeklyHighlight: true,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80",
        alt: "Historic European café interior",
      },
    ],
    journey: [
      {
        day: "Saturday",
        title: "Café Central brunch",
        description: "Reserve a table and linger over melange and newspapers.",
      },
      {
        day: "Sunday",
        title: "Ringstrasse dusk",
        description: "Walk the ring, then finish with a pastry and an espresso.",
      },
    ],
    visitedCafeSlugs: ["cafe-central-vienna"],
    visitedDestinationSlugs: ["vienna"],
    budget: {
      total: "€780",
      daily: "€390",
      notes: "Boutique hotel and two sit-down coffeehouse meals.",
    },
    travelTips: ["Reserve iconic coffeehouses on weekends.", "Dress smart-casual for classic rooms."],
    coffeeRecommendations: [
      { name: "Wiener Melange", note: "The classic Vienna pairing with a small pastry." },
    ],
    packingTips: ["Comfortable dress shoes", "Light scarf for evenings"],
    body: [
      "Vienna is made for unhurried couples. We treated coffeehouses as destinations — marble rooms, soft light, and time that stretches between courses.",
      "Between museums we walked the Ringstrasse and ended each day with one more espresso, just because the city invites it.",
    ],
    comments: comments([
      [
        "c4",
        "Jiwoo Park",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        "Perfect weekend pacing — saving this for our anniversary.",
      ],
    ]),
    relatedStorySlugs: ["paris-terrace-notes", "lisbon-solo-week"],
  },
  {
    slug: "melbourne-budget-crawl",
    title: "Melbourne on a budget: laneway coffee crawl",
    excerpt:
      "Twelve specialty stops, tram hacks, and how to taste Melbourne without spending like a tourist.",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80",
    authorSlug: "sam-rivera",
    category: "Budget",
    country: "Australia",
    destination: "Melbourne",
    destinationSlug: "melbourne",
    tags: ["Melbourne", "Budget", "Laneways"],
    coffeeTags: ["flat-white", "filter", "laneway"],
    readingMinutes: 6,
    likes: 1940,
    commentsCount: 41,
    bookmarks: 980,
    shares: 260,
    publishedAt: "2026-07-10T07:00:00.000Z",
    featured: false,
    trending: true,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Latte art in a café",
      },
    ],
    journey: [
      {
        day: "Morning",
        title: "CBD laneways",
        description: "Hit two espresso bars before 10am while queues are short.",
      },
      {
        day: "Afternoon",
        title: "Fitzroy filter flight",
        description: "Compare single origins and split pastries to keep costs down.",
      },
    ],
    visitedCafeSlugs: ["blue-bottle-kyoto"],
    visitedDestinationSlugs: ["melbourne"],
    budget: {
      total: "A$320",
      daily: "A$80",
      notes: "Hostel + myki + one paid tasting flight.",
    },
    travelTips: ["Share flights with a friend.", "Use free museum days between café hops."],
    coffeeRecommendations: [
      { name: "Magic", note: "Melbourne’s stronger cousin to a flat white — ask baristas." },
    ],
    packingTips: ["Reusable cup if preferred", "Compact umbrella"],
    body: [
      "Melbourne’s laneways are a playground for budget travelers who care about coffee quality. I capped spend by sharing pastries and sticking to one paid tasting flight.",
      "The trick is pacing — two great cups beat five mediocre ones, and your wallet will agree.",
    ],
    comments: comments([
      [
        "c5",
        "Sofia Alvarez",
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80",
        "Love the magic tip — ordering that next time.",
      ],
    ]),
    relatedStorySlugs: ["hanoi-street-coffee", "lisbon-solo-week"],
  },
  {
    slug: "chiang-mai-nomad-month",
    title: "One month as a digital nomad in Chiang Mai",
    excerpt:
      "Coworking cafés, weekend temples, and the weekly rhythm that made remote work feel easy.",
    coverImage:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1800&q=80",
    authorSlug: "lena-ortiz",
    category: "Digital Nomads",
    country: "Thailand",
    destination: "Chiang Mai",
    destinationSlug: "chiang-mai",
    tags: ["Chiang Mai", "Nomad", "Remote work"],
    coffeeTags: ["cold-brew", "coworking", "thai-coffee"],
    readingMinutes: 9,
    likes: 2760,
    commentsCount: 67,
    bookmarks: 1520,
    shares: 410,
    publishedAt: "2026-07-02T10:00:00.000Z",
    featured: true,
    trending: true,
    weeklyHighlight: true,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
        alt: "Laptop and coffee on a café table",
      },
    ],
    journey: [
      {
        day: "Week 1",
        title: "Old City base",
        description: "Find a café with outlets and settle into a morning deep-work block.",
      },
      {
        day: "Week 3",
        title: "Nimman evenings",
        description: "Swap work for specialty tastings and night markets.",
      },
    ],
    visitedCafeSlugs: ["pergamino-cafe-medellin"],
    visitedDestinationSlugs: ["chiang-mai"],
    budget: {
      total: "$1,100",
      daily: "$36",
      notes: "Monthly condo + scooters + café spend.",
    },
    travelTips: ["Test wifi before ordering a second round.", "Keep Fridays for temple walks."],
    coffeeRecommendations: [
      { name: "Thai iced coffee", note: "Ask for less sweet if you’ll work after." },
      { name: "Single-origin pour-over", note: "Great afternoon reset between meetings." },
    ],
    packingTips: ["Noise-cancelling earbuds", "Light rain jacket", "Portable power bank"],
    body: [
      "Chiang Mai is still one of the easiest cities to work remotely without losing the plot of travel. I rotated three cafés and kept weekends for Doi Suthep and slow dinners.",
      "The community here is generous — ask for outlet tips and you’ll leave with a map of favorites.",
    ],
    comments: comments([
      [
        "c6",
        "Sam Rivera",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        "That daily budget is inspiring. Bookmarking for my next stint.",
      ],
    ]),
    relatedStorySlugs: ["medellin-road-escape", "hanoi-street-coffee"],
  },
  {
    slug: "tokyo-design-cafes-diary",
    title: "Tokyo design cafés: a quiet luxury diary",
    excerpt:
      "Minimal interiors, precise espresso, and neighborhoods that reward curiosity.",
    coverImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1800&q=80",
    authorSlug: "jiwoo-park",
    category: "Luxury",
    country: "Japan",
    destination: "Tokyo",
    destinationSlug: null,
    tags: ["Tokyo", "Design", "Luxury"],
    coffeeTags: ["espresso", "matcha", "minimal"],
    readingMinutes: 8,
    likes: 2210,
    commentsCount: 29,
    bookmarks: 1104,
    shares: 198,
    publishedAt: "2026-06-26T09:00:00.000Z",
    featured: true,
    trending: false,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=1200&q=80",
        alt: "Quiet café interior",
      },
    ],
    journey: [
      {
        day: "Day 1",
        title: "Shimokitazawa stroll",
        description: "Independent cafés and vinyl shops between cups.",
      },
      {
        day: "Day 2",
        title: "Fuglen Tokyo",
        description: "Mid-century interiors and carefully pulled espresso.",
      },
    ],
    visitedCafeSlugs: ["fuglen-tokyo", "blue-bottle-kyoto"],
    visitedDestinationSlugs: ["kyoto"],
    budget: {
      total: "¥95,000",
      daily: "¥19,000",
      notes: "Boutique hotel nights and café tastings.",
    },
    travelTips: ["Speak softly in design cafés.", "Arrive early for counter seats."],
    coffeeRecommendations: [
      { name: "Straight espresso", note: "Best way to taste the roast without milk." },
    ],
    packingTips: ["Compact camera", "Comfortable walking shoes"],
    body: [
      "Tokyo’s design cafés feel like small museums you can drink in. I chased light, wood grain, and espresso that matched the room’s restraint.",
      "Pair a Kyoto day trip if you want temple gardens between pour-overs.",
    ],
    comments: comments([
      [
        "c7",
        "Marco Rossi",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        "Fuglen is always worth the detour.",
      ],
    ]),
    relatedStorySlugs: ["kyoto-family-weekend", "vienna-couple-weekend"],
  },
  {
    slug: "hanoi-street-coffee",
    title: "Hanoi street coffee and hidden gems",
    excerpt:
      "Egg coffee balconies, sidewalk stools, and the alleys you’d miss without a local tip.",
    coverImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1800&q=80",
    authorSlug: "sam-rivera",
    category: "Hidden Gems",
    country: "Vietnam",
    destination: "Hanoi",
    destinationSlug: "hanoi",
    tags: ["Hanoi", "Street coffee", "Hidden gems"],
    coffeeTags: ["egg-coffee", "ca-phe-sua", "street"],
    readingMinutes: 7,
    likes: 1875,
    commentsCount: 33,
    bookmarks: 760,
    shares: 220,
    publishedAt: "2026-06-18T12:00:00.000Z",
    featured: false,
    trending: true,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        alt: "Street café scene",
      },
    ],
    journey: [
      {
        day: "Morning",
        title: "Old Quarter stools",
        description: "Sidewalk ca phe sua da while scooters weave past.",
      },
      {
        day: "Afternoon",
        title: "Egg coffee balcony",
        description: "Climb a narrow stair for the city’s classic sweet cup.",
      },
    ],
    visitedCafeSlugs: ["tomoca-coffee-addis"],
    visitedDestinationSlugs: ["hanoi"],
    budget: {
      total: "$210",
      daily: "$42",
      notes: "Guesthouse and endless street coffee.",
    },
    travelTips: ["Carry small bills for street vendors.", "Look up for second-floor cafés."],
    coffeeRecommendations: [
      { name: "Egg coffee", note: "Share one if it’s your first — it’s rich." },
      { name: "Cà phê sữa đá", note: "The everyday classic on ice." },
    ],
    packingTips: ["Tissue pack", "Phone with offline maps"],
    body: [
      "Hanoi’s coffee culture lives on stools and balconies. The best cups often come without English menus — smile, point, and settle in.",
      "I found the hidden gems by asking café owners where they drink on their day off.",
    ],
    comments: comments([
      [
        "c8",
        "Aisha Bekele",
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
        "Those balcony tips are gold.",
      ],
    ]),
    relatedStorySlugs: ["chiang-mai-nomad-month", "melbourne-budget-crawl"],
  },
  {
    slug: "medellin-road-escape",
    title: "Medellín road trip: mountains and specialty stops",
    excerpt:
      "A weekend escape through highland roads with Pergamino pour-overs and valley viewpoints.",
    coverImage:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1800&q=80",
    authorSlug: "sofia-alvarez",
    category: "Road Trips",
    country: "Colombia",
    destination: "Medellín",
    destinationSlug: "medellin",
    tags: ["Medellín", "Road trip", "Colombia"],
    coffeeTags: ["gesha", "pour-over", "colombian"],
    readingMinutes: 8,
    likes: 1430,
    commentsCount: 19,
    bookmarks: 520,
    shares: 132,
    publishedAt: "2026-06-12T15:00:00.000Z",
    featured: false,
    trending: false,
    weeklyHighlight: true,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        alt: "Mountain road landscape",
      },
    ],
    journey: [
      {
        day: "Saturday",
        title: "City to hills",
        description: "Leave early, stop for pour-over, chase ridge views.",
      },
      {
        day: "Sunday",
        title: "Pergamino reset",
        description: "Return for a tasting flight before the week starts.",
      },
    ],
    visitedCafeSlugs: ["pergamino-cafe-medellin"],
    visitedDestinationSlugs: ["medellin", "antigua-guatemala"],
    budget: {
      total: "$340",
      daily: "$170",
      notes: "Car rental share + café tastings.",
    },
    travelTips: ["Fill fuel before mountain stretches.", "Download offline maps."],
    coffeeRecommendations: [
      { name: "Colombian gesha tasting", note: "Ask for brew method recommendations." },
    ],
    packingTips: ["Light layers", "Reusable water bottle"],
    body: [
      "Medellín’s surrounding roads make a perfect weekend loop for coffee lovers. We stacked viewpoints with specialty stops and never felt rushed.",
      "End at Pergamino — it’s the soft landing after mountain curves.",
    ],
    comments: comments([
      [
        "c9",
        "Lena Ortiz",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        "Road + coffee is my favorite combo. Thanks for the route.",
      ],
    ]),
    relatedStorySlugs: ["antigua-origin-trail", "chiang-mai-nomad-month"],
  },
  {
    slug: "kyoto-family-weekend",
    title: "Kyoto weekend with kids: temples and calm cafés",
    excerpt:
      "Family pacing through gardens, soft serve breaks, and cafés that welcome little travelers.",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1800&q=80",
    authorSlug: "jiwoo-park",
    category: "Family",
    country: "Japan",
    destination: "Kyoto",
    destinationSlug: "kyoto",
    tags: ["Kyoto", "Family", "Temples"],
    coffeeTags: ["matcha", "filter", "quiet"],
    readingMinutes: 6,
    likes: 1180,
    commentsCount: 17,
    bookmarks: 430,
    shares: 96,
    publishedAt: "2026-06-05T09:30:00.000Z",
    featured: false,
    trending: false,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=1200&q=80",
        alt: "Kyoto temple garden path",
      },
    ],
    journey: [
      {
        day: "Saturday",
        title: "Arashiyama morning",
        description: "Bamboo early, café break, then river ice cream.",
      },
      {
        day: "Sunday",
        title: "Quiet Blue Bottle hour",
        description: "Adult coffee while kids sketch in a notebook.",
      },
    ],
    visitedCafeSlugs: ["blue-bottle-kyoto"],
    visitedDestinationSlugs: ["kyoto"],
    budget: {
      total: "¥68,000",
      daily: "¥34,000",
      notes: "Family room + transit + café treats.",
    },
    travelTips: ["Start temple mornings early.", "Pack snacks between café hops."],
    coffeeRecommendations: [
      { name: "Matcha latte", note: "Kid-friendly vibe; adults can order filter." },
    ],
    packingTips: ["Compact stroller if needed", "Wet wipes", "Portable charger"],
    body: [
      "Kyoto with kids works when you protect quiet windows — early temples, midday cafés, early dinners.",
      "Blue Bottle gave us a calm hour that reset everyone before the train home.",
    ],
    comments: comments([
      [
        "c10",
        "Sofia Alvarez",
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80",
        "Saving this for our next family trip.",
      ],
    ]),
    relatedStorySlugs: ["tokyo-design-cafes-diary", "porto-weekend-escape"],
  },
  {
    slug: "porto-weekend-escape",
    title: "Porto weekend escape: river light and café mornings",
    excerpt:
      "Forty-eight hours of azulejos, riverside walks, and specialty coffee between viewpoints.",
    coverImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1800&q=80",
    authorSlug: "marco-rossi",
    category: "Weekend Escapes",
    country: "Portugal",
    destination: "Porto",
    destinationSlug: null,
    tags: ["Porto", "Weekend", "Portugal"],
    coffeeTags: ["espresso", "pastry", "specialty"],
    readingMinutes: 5,
    likes: 980,
    commentsCount: 12,
    bookmarks: 310,
    shares: 78,
    publishedAt: "2026-05-28T16:00:00.000Z",
    featured: false,
    trending: false,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80",
        alt: "Riverside city view",
      },
    ],
    journey: [
      {
        day: "Saturday",
        title: "Ribeira stroll",
        description: "River light, pastel stops, and an afternoon espresso.",
      },
      {
        day: "Sunday",
        title: "Bookstore & brew",
        description: "Morning specialty coffee before the train back.",
      },
    ],
    visitedCafeSlugs: ["cafe-de-flore-paris"],
    visitedDestinationSlugs: ["lisbon"],
    budget: {
      total: "€340",
      daily: "€170",
      notes: "Central hotel and café hopping.",
    },
    travelTips: ["Wear shoes for steep streets.", "Sunset on the Dom Luís bridge is worth the wait."],
    coffeeRecommendations: [
      { name: "Short espresso + pastel", note: "The Porto weekend pairing." },
    ],
    packingTips: ["Light layers", "Compact day bag"],
    body: [
      "Porto is the ideal weekend escape from Lisbon — compact, photogenic, and full of café counters with character.",
      "We kept the itinerary light: walk, drink coffee, walk again.",
    ],
    comments: comments([
      [
        "c11",
        "Lena Ortiz",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        "This is exactly the pace I needed.",
      ],
    ]),
    relatedStorySlugs: ["lisbon-solo-week", "vienna-couple-weekend"],
  },
  {
    slug: "paris-terrace-notes",
    title: "Paris terrace notes for coffee lovers",
    excerpt:
      "How to claim a terrace seat, what to order, and when the light is worth the wait.",
    coverImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=80",
    authorSlug: "marco-rossi",
    category: "Coffee Lovers",
    country: "France",
    destination: "Paris",
    destinationSlug: null,
    tags: ["Paris", "Terrace", "Café culture"],
    coffeeTags: ["espresso", "terrace", "people-watching"],
    readingMinutes: 6,
    likes: 1560,
    commentsCount: 24,
    bookmarks: 670,
    shares: 155,
    publishedAt: "2026-05-20T10:00:00.000Z",
    featured: true,
    trending: false,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Coffee on a café table",
      },
    ],
    journey: [
      {
        day: "Morning",
        title: "Left Bank espresso",
        description: "Stand at the bar first, then graduate to a terrace seat.",
      },
      {
        day: "Evening",
        title: "Golden hour watch",
        description: "One last café crème as the street lights warm up.",
      },
    ],
    visitedCafeSlugs: ["cafe-de-flore-paris"],
    visitedDestinationSlugs: ["lisbon"],
    budget: {
      total: "€420",
      daily: "€140",
      notes: "Café hopping adds up — budget for terrace premiums.",
    },
    travelTips: ["Standing at the bar is cheaper and local.", "Never rush a terrace hour."],
    coffeeRecommendations: [
      { name: "Café crème", note: "Classic terrace companion for people-watching." },
    ],
    packingTips: ["Stylish layer for evenings", "Small notebook"],
    body: [
      "Paris café culture is a performance and a rest stop at once. I practiced claiming terrace seats without apology and ordering with confidence.",
      "Café de Flore remains a classic — go early if you want the postcard table.",
    ],
    comments: comments([
      [
        "c12",
        "Jiwoo Park",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        "The bar vs terrace tip is so useful.",
      ],
    ]),
    relatedStorySlugs: ["vienna-couple-weekend", "lisbon-solo-week"],
  },
  {
    slug: "antigua-origin-trail",
    title: "Antigua origin trail for curious travelers",
    excerpt:
      "Volcano views, roasting sheds, and cups that taste like altitude and hospitality.",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80",
    authorSlug: "aisha-bekele",
    category: "Coffee Lovers",
    country: "Guatemala",
    destination: "Antigua",
    destinationSlug: "antigua-guatemala",
    tags: ["Antigua", "Origins", "Guatemala"],
    coffeeTags: ["antigua", "washed", "farm"],
    readingMinutes: 9,
    likes: 1320,
    commentsCount: 21,
    bookmarks: 540,
    shares: 118,
    publishedAt: "2026-05-12T13:00:00.000Z",
    featured: false,
    trending: false,
    weeklyHighlight: false,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80",
        alt: "Coffee cherries and farm landscape",
      },
    ],
    journey: [
      {
        day: "Day 1",
        title: "Town tasting",
        description: "Sample washed lots in Antigua’s specialty cafés.",
      },
      {
        day: "Day 2",
        title: "Farm visit",
        description: "Walk rows, watch processing, taste with producers.",
      },
    ],
    visitedCafeSlugs: ["tomoca-coffee-addis"],
    visitedDestinationSlugs: ["antigua-guatemala", "medellin"],
    budget: {
      total: "$390",
      daily: "$130",
      notes: "Includes farm tour transport.",
    },
    travelTips: ["Book farm tours ahead in harvest season.", "Bring cash for cooperative purchases."],
    coffeeRecommendations: [
      { name: "Antigua washed filter", note: "Chocolate and citrus clarity at altitude." },
    ],
    packingTips: ["Sun hat", "Closed-toe shoes for farms"],
    body: [
      "Antigua pairs colonial streets with volcano silhouettes and some of the most approachable origin tourism in coffee.",
      "I left with green coffee gifts and a deeper respect for washed processing.",
    ],
    comments: comments([
      [
        "c13",
        "Sam Rivera",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        "Adding this to my origin wish list.",
      ],
    ]),
    relatedStorySlugs: ["addis-ceremony-week", "medellin-road-escape"],
  },
];

export async function getAllStories(): Promise<CommunityStory[]> {
  return [...stories];
}

export async function getStoryBySlug(slug: string): Promise<CommunityStory | null> {
  return stories.find((story) => story.slug === slug) ?? null;
}

export async function getStorySlugs(): Promise<string[]> {
  return stories.map((story) => story.slug);
}

export async function getStoriesBySlugs(slugs: readonly string[]): Promise<CommunityStory[]> {
  const set = new Set(slugs);
  return stories.filter((story) => set.has(story.slug));
}

export async function getFeaturedStories(): Promise<CommunityStory[]> {
  return stories.filter((story) => story.featured);
}

export async function getTrendingPosts(): Promise<CommunityStory[]> {
  return stories.filter((story) => story.trending);
}

export async function getLatestPosts(limit = 8): Promise<CommunityStory[]> {
  return [...stories]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export async function getWeeklyHighlights(): Promise<CommunityStory[]> {
  return stories.filter((story) => story.weeklyHighlight);
}

export async function getStoriesByAuthor(authorSlug: string): Promise<CommunityStory[]> {
  return stories.filter((story) => story.authorSlug === authorSlug);
}

export function getAllTravelers(): Traveler[] {
  return [...TRAVELERS];
}

export function getTravelerBySlug(slug: string): Traveler | undefined {
  return TRAVELERS.find((traveler) => traveler.slug === slug);
}

export async function getPopularTravelers(limit = 6): Promise<Traveler[]> {
  return [...TRAVELERS]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.followers - a.followers)
    .slice(0, limit);
}

export function getTravelerForStory(story: CommunityStory): Traveler | undefined {
  return getTravelerBySlug(story.authorSlug);
}

export function getCommunityFilterOptions() {
  const countries = Array.from(new Set(stories.map((s) => s.country))).sort();
  const destinations = Array.from(new Set(stories.map((s) => s.destination))).sort();
  const tags = Array.from(new Set(stories.flatMap((s) => s.tags))).sort();
  const coffeeTags = Array.from(new Set(stories.flatMap((s) => s.coffeeTags))).sort();
  const categories = Array.from(new Set(stories.map((s) => s.category)));
  const travelers = TRAVELERS.map((t) => ({ slug: t.slug, name: t.name }));

  return { categories, countries, destinations, travelers, coffeeTags, tags };
}
