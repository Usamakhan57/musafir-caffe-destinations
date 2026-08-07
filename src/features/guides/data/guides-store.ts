import type { GuideAuthor, GuideDetail } from "../types";

export const GUIDE_AUTHORS: readonly GuideAuthor[] = [
  {
    slug: "mehmet-yilmaz",
    name: "Mehmet Yılmaz",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    role: "City guide editor",
    bio: "Istanbul-born storyteller covering cafés, markets, and Bosphorus rituals for travelers who linger.",
    social: {
      instagram: "https://instagram.com",
      x: "https://x.com",
      website: "https://example.com/mehmet",
    },
    favoriteDestinationSlugs: ["istanbul", "vienna"],
    favoriteCafeSlugs: ["cafe-central-vienna", "fuglen-tokyo"],
  },
  {
    slug: "claire-thompson",
    name: "Claire Thompson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    role: "Specialty coffee writer",
    bio: "Melbourne-based writer mapping laneway espresso, flat whites, and work-friendly tables across Oceania.",
    social: { instagram: "https://instagram.com", website: "https://example.com/claire" },
    favoriteDestinationSlugs: ["melbourne", "chiang-mai"],
    favoriteCafeSlugs: ["blue-bottle-kyoto", "pergamino-cafe-medellin"],
  },
  {
    slug: "aisha-bekele",
    name: "Aisha Bekele",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    role: "Origins correspondent",
    bio: "Documents Ethiopian coffee ceremonies, highland farms, and the hospitality that shaped modern specialty.",
    social: { instagram: "https://instagram.com", x: "https://x.com" },
    favoriteDestinationSlugs: ["addis-ababa", "cape-town"],
    favoriteCafeSlugs: ["tomoca-coffee-addis"],
  },
  {
    slug: "lena-ortiz",
    name: "Lena Ortiz",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    role: "Digital nomad editor",
    bio: "Writes for remote workers who want wifi that works and neighborhoods that feel like home.",
    social: { website: "https://example.com/lena", x: "https://x.com" },
    favoriteDestinationSlugs: ["lisbon", "medellin", "chiang-mai"],
    favoriteCafeSlugs: ["pergamino-cafe-medellin", "fuglen-tokyo"],
  },
];

function article(
  paragraphs: string[],
  extras: GuideDetail["content"] = [],
): GuideDetail["content"] {
  const base: GuideDetail["content"] = [
    { type: "heading", id: "overview", text: "Overview" },
    { type: "paragraph", text: paragraphs[0] ?? "" },
    {
      type: "callout",
      variant: "tip",
      title: "Traveler tip",
      text: "Arrive early for quieter tables, and always order something if you plan to linger with a laptop.",
    },
    { type: "heading", id: "itinerary", text: "Suggested itinerary" },
    { type: "paragraph", text: paragraphs[1] ?? paragraphs[0] ?? "" },
    {
      type: "quote",
      text: "The best guides leave room for a second cup and an unplanned alley.",
      attribution: "MusafirCaffe editors",
    },
    { type: "heading", id: "practical", text: "Practical notes" },
    { type: "paragraph", text: paragraphs[2] ?? paragraphs[0] ?? "" },
    {
      type: "callout",
      variant: "warning",
      title: "Before you go",
      text: "Confirm opening hours locally — café schedules shift with seasons and holidays.",
    },
    { type: "heading", id: "closing", text: "Before you leave" },
    { type: "paragraph", text: paragraphs[3] ?? paragraphs[0] ?? "" },
    ...extras,
  ];
  return base;
}

const guides: GuideDetail[] = [
  {
    slug: "istanbul-coffee-markets",
    title: "Istanbul: Coffee & Markets",
    subtitle: "Three days of cezve rituals, Karaköy pour-overs, and spice-scented walks",
    excerpt:
      "A three-day route through Istanbul’s best cafés, spice markets, and waterfront walks.",
    coverImage:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1800&q=80",
    category: "Coffee Culture",
    destination: "Istanbul",
    destinationSlug: "istanbul",
    country: "Türkiye",
    readingMinutes: 8,
    publishedAt: "2026-07-12",
    updatedAt: "2026-08-01",
    authorSlug: "mehmet-yilmaz",
    rating: 4.9,
    reviewCount: 214,
    views: 12400,
    tags: ["Istanbul", "Cafés", "Markets", "Weekend"],
    featured: true,
    trending: true,
    editorsPick: true,
    coffeeCulture: true,
    digitalNomad: false,
    content: article([
      "Istanbul drinks coffee in layers — copper cezve at the kahvehane, third-wave flat whites in Kadıköy, and ferry rides that become part of the crawl.",
      "Day one: Karaköy specialty bars and Galata views. Day two: Grand Bazaar edges and a slow Melange-style linger. Day three: Asian-side neighborhoods and sunset tea.",
      "Carry small notes for market stalls, and leave laptop work for quieter upstairs cafés after the morning rush.",
      "End with a Bosphorus walk — the city teaches hospitality one cup at a time.",
    ]),
    coffeeRecommendations: [
      { name: "Türk kahvesi", note: "Order with water; finish the grounds gently." },
      { name: "Filter of the day", note: "Seek Karaköy bars for light-roast clarity." },
    ],
    localFoods: [
      { name: "Simit", note: "Sesame bread ring — the classic café companion." },
      { name: "Baklava", note: "Share a plate between specialty stops." },
    ],
    nearbyCafeSlugs: ["cafe-central-vienna", "fuglen-tokyo"],
    nearbyDestinationSlugs: ["istanbul", "vienna"],
    relatedGuideSlugs: ["vienna-coffeehouse-weekend", "lisbon-nomad-bases"],
    faqs: [
      {
        question: "How many days do I need?",
        answer: "Three focused days cover both shores and signature coffee rituals without rushing.",
      },
      {
        question: "Is this guide laptop-friendly?",
        answer: "Partially — choose quieter cafés after brunch; historic rooms prefer conversation over calls.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&q=80",
        alt: "Istanbul skyline across the Bosphorus",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Espresso being poured in a specialty café",
      },
    ],
  },
  {
    slug: "melbourne-coffee-crawl",
    title: "Melbourne Coffee Crawl",
    subtitle: "Laneways, flat whites, and the art of the long brunch",
    excerpt:
      "Discover the espresso bars and hidden laneway cafés that define Melbourne’s coffee scene.",
    coverImage:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1800&q=80",
    category: "Food",
    destination: "Melbourne",
    destinationSlug: "melbourne",
    country: "Australia",
    readingMinutes: 6,
    publishedAt: "2026-06-05",
    updatedAt: "2026-07-20",
    authorSlug: "claire-thompson",
    rating: 4.8,
    reviewCount: 188,
    views: 9800,
    tags: ["Melbourne", "Coffee", "Brunch"],
    featured: true,
    trending: true,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Melbourne’s laneways reward curiosity — look for blackboard menus, single-origin dial-ins, and bakers who take milk texture as seriously as espresso.",
      "Start in the CBD for classics, swing through Fitzroy for independent roasters, then end in Brunswick for quieter afternoon focus.",
      "Weekdays before 9am are kinder for remote work; weekends belong to brunch queues.",
      "Leave room for a second flat white — Melbourne invented lingering.",
    ]),
    coffeeRecommendations: [
      { name: "Flat white", note: "The city’s signature — silky microfoam, balanced shot." },
      { name: "Batch brew", note: "Ask for today’s origin; many bars rotate weekly." },
    ],
    localFoods: [
      { name: "Avocado toast", note: "Still a ritual — elevate it with house sourdough." },
      { name: "Lamington", note: "Sweet stop between espresso bars." },
    ],
    nearbyCafeSlugs: ["blue-bottle-kyoto", "pergamino-cafe-medellin"],
    nearbyDestinationSlugs: ["melbourne"],
    relatedGuideSlugs: ["chiang-mai-nomad-month", "kyoto-quiet-cafes"],
    faqs: [
      {
        question: "Best season?",
        answer: "Autumn and spring offer mild walking weather and shorter café lines.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
        alt: "Café counter with espresso machine",
      },
    ],
  },
  {
    slug: "addis-ababa-coffee-origins",
    title: "Addis Ababa: Coffee Origins",
    subtitle: "Buna ceremonies, Piazza institutions, and highland hospitality",
    excerpt:
      "A cultural tour of Ethiopia’s coffee ceremonies, markets, and origin farms.",
    coverImage:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1800&q=80",
    category: "Adventure",
    destination: "Addis Ababa",
    destinationSlug: "addis-ababa",
    country: "Ethiopia",
    readingMinutes: 10,
    publishedAt: "2026-05-20",
    updatedAt: "2026-06-15",
    authorSlug: "aisha-bekele",
    rating: 5,
    reviewCount: 156,
    views: 15200,
    tags: ["Ethiopia", "Origins", "Coffee", "Culture"],
    featured: true,
    trending: false,
    editorsPick: true,
    coffeeCulture: true,
    digitalNomad: false,
    content: article([
      "In Addis, coffee is ceremony — frankincense, popcorn, and three rounds from a clay jebena that refuse to be rushed.",
      "Pair Tomoca’s standing-room macchiato with a Merkato morning, then arrange a day trip toward highland farms when time allows.",
      "Altitude sits above 2,300m — hydrate and pace your first afternoon.",
      "Accept every invitation to sit; hospitality is the itinerary.",
    ]),
    coffeeRecommendations: [
      { name: "Macchiato", note: "House-roasted and vivid at classic bars." },
      { name: "Buna ceremony", note: "Budget 45+ minutes for all three rounds." },
    ],
    localFoods: [
      { name: "Injera with shiro", note: "Everyday plate between café stops." },
      { name: "Ambasha", note: "Slightly sweet bread with black coffee." },
    ],
    nearbyCafeSlugs: ["tomoca-coffee-addis"],
    nearbyDestinationSlugs: ["addis-ababa"],
    relatedGuideSlugs: ["istanbul-coffee-markets", "antigua-origin-weekend"],
    faqs: [
      {
        question: "Do I need a guide for farm visits?",
        answer: "Recommended for logistics and respectful farm access — ask your hotel or a local operator.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1497935586047-9242eb4fc795?w=1200&q=80",
        alt: "Coffee cherries drying in the sun",
      },
    ],
  },
  {
    slug: "chiang-mai-nomad-month",
    title: "Chiang Mai: A Nomad Month",
    subtitle: "Wifi cafés, mountain weekends, and a softer pace of work",
    excerpt:
      "Build a remote month around Nimman cafés, coworking hybrids, and highland day trips.",
    coverImage:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=1800&q=80",
    category: "Digital Nomad",
    destination: "Chiang Mai",
    destinationSlug: "chiang-mai",
    country: "Thailand",
    readingMinutes: 9,
    publishedAt: "2026-04-18",
    updatedAt: "2026-07-02",
    authorSlug: "lena-ortiz",
    rating: 4.7,
    reviewCount: 203,
    views: 18600,
    tags: ["Chiang Mai", "Nomad", "Wifi", "Remote"],
    featured: true,
    trending: true,
    editorsPick: true,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Chiang Mai rewards a two-café rotation: deep work before lunch, lighter tasks near Nimman as the heat rises.",
      "Spend weekdays in design cafés, Saturdays at the markets, Sundays toward the hills where arabica grows.",
      "Cool season (Nov–Feb) is ideal for outdoor seating and stable wifi routines.",
      "Join a meetup early — community is half the reason the city works for remote life.",
    ]),
    coffeeRecommendations: [
      { name: "Northern Thai arabica", note: "Ask for local lots from nearby hills." },
      { name: "Iced latte", note: "Afternoon heat calls for something cold and dialed." },
    ],
    localFoods: [
      { name: "Khao soi", note: "Curry noodle comfort after a long laptop session." },
      { name: "Mango sticky rice", note: "Sweet reward when the week closes." },
    ],
    nearbyCafeSlugs: ["pergamino-cafe-medellin", "fuglen-tokyo"],
    nearbyDestinationSlugs: ["chiang-mai", "hanoi"],
    relatedGuideSlugs: ["lisbon-nomad-bases", "medellin-eternal-spring"],
    faqs: [
      {
        question: "Is one month enough?",
        answer: "Yes — enough to settle a routine, explore cafés, and take two highland weekends.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1200&q=80",
        alt: "Laptop-friendly café interior",
      },
    ],
  },
  {
    slug: "vienna-coffeehouse-weekend",
    title: "Vienna Coffeehouse Weekend",
    subtitle: "Melange, marble rooms, and unhurried newspapers",
    excerpt:
      "A luxurious weekend in UNESCO coffeehouse culture — cake, conversation, and grand salons.",
    coverImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=80",
    category: "Luxury",
    destination: "Vienna",
    destinationSlug: "vienna",
    country: "Austria",
    readingMinutes: 7,
    publishedAt: "2026-03-22",
    updatedAt: "2026-05-10",
    authorSlug: "mehmet-yilmaz",
    rating: 4.8,
    reviewCount: 142,
    views: 9100,
    tags: ["Vienna", "Luxury", "Historic"],
    featured: false,
    trending: false,
    editorsPick: true,
    coffeeCulture: true,
    digitalNomad: false,
    content: article([
      "Vienna’s coffeehouses are living rooms with chandeliers — linger without apology.",
      "Reserve one grand classic (Café Central), one specialty newcomer, and one pastry pilgrimage.",
      "Dress neat for historic rooms; keep calls outside.",
      "Sunday mornings feel cinematic under vaulted ceilings.",
    ]),
    coffeeRecommendations: [{ name: "Melange", note: "The city’s gentle classic." }],
    localFoods: [{ name: "Sachertorte", note: "Share a slice between museums." }],
    nearbyCafeSlugs: ["cafe-central-vienna", "cafe-de-flore-paris"],
    nearbyDestinationSlugs: ["vienna", "istanbul"],
    relatedGuideSlugs: ["istanbul-coffee-markets", "paris-terrace-evenings"],
    faqs: [
      {
        question: "Do I need reservations?",
        answer: "Helpful for peak weekend afternoons at iconic rooms.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Coffee and cake on a marble table",
      },
    ],
  },
  {
    slug: "lisbon-nomad-bases",
    title: "Lisbon Bases for Remote Weeks",
    subtitle: "Miradouros, bicas, and apartments with reliable wifi",
    excerpt:
      "Neighborhood bases, café rotations, and budget notes for a productive Lisbon week.",
    coverImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1800&q=80",
    category: "Budget Travel",
    destination: "Lisbon",
    destinationSlug: "lisbon",
    country: "Portugal",
    readingMinutes: 8,
    publishedAt: "2026-02-14",
    updatedAt: "2026-06-01",
    authorSlug: "lena-ortiz",
    rating: 4.6,
    reviewCount: 167,
    views: 11200,
    tags: ["Lisbon", "Budget", "Nomad"],
    featured: true,
    trending: true,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Lisbon works on hills and caffeine — stand for a quick bica, sit for specialty filter in Príncipe Real.",
      "Base in Santos or Arroios for value; day-trip cafés across neighborhoods instead of changing hotels.",
      "Trams are charming but crowded — walk downhill, ride up.",
      "Sunset miradouros pair perfectly with a final espresso.",
    ]),
    coffeeRecommendations: [{ name: "Bica", note: "Short, strong, standing at the bar." }],
    localFoods: [{ name: "Pastel de nata", note: "Warm from the bakery, never refrigerated." }],
    nearbyCafeSlugs: ["cafe-de-flore-paris", "blue-bottle-kyoto"],
    nearbyDestinationSlugs: ["lisbon"],
    relatedGuideSlugs: ["chiang-mai-nomad-month", "porto-weekend-escape"],
    faqs: [
      {
        question: "Is Lisbon still affordable?",
        answer: "More mid-range than before, but café culture and transit keep daily costs manageable.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Lisbon café terrace",
      },
    ],
  },
  {
    slug: "kyoto-quiet-cafes",
    title: "Kyoto: Quiet Cafés & Temples",
    subtitle: "Machiya pour-overs between shrine paths",
    excerpt:
      "Tranquil cafés, tea houses, and walking routes through historical Kyoto.",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1800&q=80",
    category: "Hidden Gems",
    destination: "Kyoto",
    destinationSlug: "kyoto",
    country: "Japan",
    readingMinutes: 7,
    publishedAt: "2026-04-10",
    updatedAt: "2026-05-22",
    authorSlug: "claire-thompson",
    rating: 4.9,
    reviewCount: 129,
    views: 8600,
    tags: ["Kyoto", "Tea", "Culture", "Quiet"],
    featured: false,
    trending: false,
    editorsPick: true,
    coffeeCulture: true,
    digitalNomad: false,
    content: article([
      "Kyoto’s best cups hide in restored townhouses — soft light, careful pour-overs, and near-silent mornings.",
      "Alternate temple walks with kissaten stops; never rush a siphon coffee.",
      "Spring and autumn are magical but busy — early entry wins.",
      "Leave phones on silent; the room is part of the craft.",
    ]),
    coffeeRecommendations: [{ name: "Siphon coffee", note: "A kissaten classic worth the wait." }],
    localFoods: [{ name: "Matcha sweets", note: "Balance specialty coffee with local tea culture." }],
    nearbyCafeSlugs: ["blue-bottle-kyoto", "fuglen-tokyo"],
    nearbyDestinationSlugs: ["kyoto"],
    relatedGuideSlugs: ["melbourne-coffee-crawl", "tokyo-design-cafes"],
    faqs: [
      {
        question: "Can I work from these cafés?",
        answer: "Some welcome laptops midday; historic kissaten often prefer conversation-free calm without screens.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=80",
        alt: "Pour-over coffee setup",
      },
    ],
  },
  {
    slug: "family-cape-town-weekend",
    title: "Cape Town with Kids",
    subtitle: "Beaches, easy cafés, and mountain air without the stress",
    excerpt:
      "A family-friendly weekend of ocean walks, spacious cafés, and flexible pacing.",
    coverImage:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1800&q=80",
    category: "Family",
    destination: "Cape Town",
    destinationSlug: "cape-town",
    country: "South Africa",
    readingMinutes: 6,
    publishedAt: "2026-01-28",
    updatedAt: "2026-03-05",
    authorSlug: "aisha-bekele",
    rating: 4.5,
    reviewCount: 98,
    views: 5400,
    tags: ["Cape Town", "Family", "Weekend"],
    featured: false,
    trending: false,
    editorsPick: false,
    coffeeCulture: false,
    digitalNomad: false,
    content: article([
      "Cape Town shines when you keep plans soft — beach mornings, café lunches, early evenings.",
      "Choose spacious specialty rooms with outdoor seating and short menus kids accept.",
      "Wind can rise fast; pack layers even in summer.",
      "One mountain viewpoint is enough — save energy for ice cream.",
    ]),
    coffeeRecommendations: [{ name: "Flat white", note: "Widely excellent across the city." }],
    localFoods: [{ name: "Fresh seafood", note: "Easy shared plates near the waterfront." }],
    nearbyCafeSlugs: ["pergamino-cafe-medellin"],
    nearbyDestinationSlugs: ["cape-town"],
    relatedGuideSlugs: ["porto-weekend-escape", "lisbon-nomad-bases"],
    faqs: [
      {
        question: "Is it walkable with a stroller?",
        answer: "Waterfront and some suburbs yes; mountain paths need carriers instead.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&q=80",
        alt: "Coastal path near Cape Town",
      },
    ],
  },
  {
    slug: "backpacking-hanoi-alleys",
    title: "Backpacking Hanoi’s Coffee Alleys",
    subtitle: "Egg coffee, plastic stools, and budget nights done right",
    excerpt:
      "A backpacker’s map to ca phe da, Old Quarter alleys, and affordable stays.",
    coverImage:
      "https://images.unsplash.com/photo-1509030450996-dd1a26cea137?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1509030450996-dd1a26cea137?w=1800&q=80",
    category: "Backpacking",
    destination: "Hanoi",
    destinationSlug: "hanoi",
    country: "Vietnam",
    readingMinutes: 5,
    publishedAt: "2025-12-12",
    updatedAt: "2026-02-01",
    authorSlug: "lena-ortiz",
    rating: 4.7,
    reviewCount: 176,
    views: 13400,
    tags: ["Hanoi", "Backpacking", "Budget"],
    featured: false,
    trending: true,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Hanoi’s best coffee costs little and tastes like nowhere else — egg coffee upstairs, iced milk coffee on the curb.",
      "Sleep near the Old Quarter fringe for value, walk everywhere, and follow locals to tiny storefronts.",
      "Traffic is the adventure; cross with calm groups.",
      "One week stretches easily if you slow down for morning rituals.",
    ]),
    coffeeRecommendations: [{ name: "Cà phê trứng", note: "Egg coffee — rich, sweet, iconic." }],
    localFoods: [{ name: "Phở", note: "Breakfast of champions between café hops." }],
    nearbyCafeSlugs: ["tomoca-coffee-addis"],
    nearbyDestinationSlugs: ["hanoi", "chiang-mai"],
    relatedGuideSlugs: ["chiang-mai-nomad-month", "addis-ababa-coffee-origins"],
    faqs: [
      {
        question: "Cash or card?",
        answer: "Cash still rules many sidewalk cafés — keep small notes.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=80",
        alt: "Street café seating",
      },
    ],
  },
  {
    slug: "nature-medellin-escapes",
    title: "Nature Escapes from Medellín",
    subtitle: "Day trips to hills, farms, and cooler air",
    excerpt:
      "Pair El Poblado specialty coffee with green day trips into Antioquia’s hills.",
    coverImage:
      "https://images.unsplash.com/photo-1483729558449-99ef03a8a814?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1483729558449-99ef03a8a814?w=1800&q=80",
    category: "Nature",
    destination: "Medellín",
    destinationSlug: "medellin",
    country: "Colombia",
    readingMinutes: 7,
    publishedAt: "2026-03-01",
    updatedAt: "2026-04-18",
    authorSlug: "claire-thompson",
    rating: 4.6,
    reviewCount: 121,
    views: 7800,
    tags: ["Medellín", "Nature", "Farms"],
    featured: false,
    trending: false,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Medellín’s eternal spring makes nature easy — short rides to cooler hills and coffee fincas.",
      "Book one farm cupping day, one park picnic, and keep evenings for Provenza cafés.",
      "Mornings are clearest for views; afternoons can cloud quickly.",
      "Return to the city for a terrace flat white as lights come on.",
    ]),
    coffeeRecommendations: [{ name: "Direct-trade flat white", note: "Traceable lots poured downtown." }],
    localFoods: [{ name: "Arepa", note: "Simple, filling, everywhere." }],
    nearbyCafeSlugs: ["pergamino-cafe-medellin"],
    nearbyDestinationSlugs: ["medellin", "antigua-guatemala"],
    relatedGuideSlugs: ["antigua-origin-weekend", "chiang-mai-nomad-month"],
    faqs: [
      {
        question: "Are farm tours beginner-friendly?",
        answer: "Yes — most include tasting and easy walking paths.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Coffee beans and mountain light",
      },
    ],
  },
  {
    slug: "porto-weekend-escape",
    title: "Porto Weekend Escape",
    subtitle: "River light, bookstores, and espresso between azulejos",
    excerpt:
      "A compact weekend of riverside walks, cafés, and golden-hour viewpoints.",
    coverImage:
      "https://images.unsplash.com/photo-1555881400-749b21c75f3d?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555881400-749b21c75f3d?w=1800&q=80",
    category: "Weekend Trips",
    destination: "Porto",
    destinationSlug: null,
    country: "Portugal",
    readingMinutes: 5,
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-30",
    authorSlug: "mehmet-yilmaz",
    rating: 4.7,
    reviewCount: 110,
    views: 6900,
    tags: ["Porto", "Weekend", "River"],
    featured: true,
    trending: false,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: false,
    content: article([
      "Porto is a weekend city — walk the river, climb for viewpoints, and claim a marble café table mid-afternoon.",
      "Saturday for the historic center, Sunday for Gaia views and a slower brunch.",
      "Cobblestones demand good shoes.",
      "Take the train from Lisbon if you’re already in-country.",
    ]),
    coffeeRecommendations: [{ name: "Café pingado", note: "Espresso with a drop of milk." }],
    localFoods: [{ name: "Francesinha", note: "Share it — it’s a project." }],
    nearbyCafeSlugs: ["cafe-de-flore-paris"],
    nearbyDestinationSlugs: ["lisbon"],
    relatedGuideSlugs: ["lisbon-nomad-bases", "vienna-coffeehouse-weekend"],
    faqs: [
      {
        question: "Two days enough?",
        answer: "Yes for highlights; three if you want beach time in Matosinhos.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1513735492242-486b52559bd8?w=1200&q=80",
        alt: "Colorful riverside houses",
      },
    ],
  },
  {
    slug: "antigua-origin-weekend",
    title: "Antigua Origin Weekend",
    subtitle: "Volcano views and cupping tables in colonial streets",
    excerpt:
      "A short origin-focused escape among courtyard cafés and nearby coffee farms.",
    coverImage:
      "https://images.unsplash.com/photo-1531963136727-4be00fbe8f52?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1531963136727-4be00fbe8f52?w=1800&q=80",
    category: "Road Trips",
    destination: "Antigua",
    destinationSlug: "antigua-guatemala",
    country: "Guatemala",
    readingMinutes: 6,
    publishedAt: "2026-01-08",
    updatedAt: "2026-02-20",
    authorSlug: "aisha-bekele",
    rating: 4.8,
    reviewCount: 87,
    views: 6100,
    tags: ["Antigua", "Origins", "Road trip"],
    featured: false,
    trending: false,
    editorsPick: true,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Antigua pairs cobblestones with volcano silhouettes — and some of Central America’s best cupping rooms.",
      "Morning farm visit, afternoon courtyard filter, evening rooftop quiet.",
      "Hire a driver for farm roads if you’re short on time.",
      "Bring a light jacket; evenings cool quickly.",
    ]),
    coffeeRecommendations: [{ name: "Antigua washed arabica", note: "Bright, chocolate, classic." }],
    localFoods: [{ name: "Pepian", note: "Hearty stew after a farm morning." }],
    nearbyCafeSlugs: ["tomoca-coffee-addis", "pergamino-cafe-medellin"],
    nearbyDestinationSlugs: ["antigua-guatemala", "medellin"],
    relatedGuideSlugs: ["addis-ababa-coffee-origins", "nature-medellin-escapes"],
    faqs: [
      {
        question: "Do farms speak English?",
        answer: "Many tours offer English; confirm when booking.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Coffee cup with volcanic backdrop vibe",
      },
    ],
  },
  {
    slug: "paris-terrace-evenings",
    title: "Paris Terrace Evenings",
    subtitle: "Café crème, people-watching, and golden streets",
    excerpt:
      "An evening-focused stroll through iconic terraces and quieter specialty corners.",
    coverImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=80",
    category: "Road Trips",
    destination: "Paris",
    destinationSlug: null,
    country: "France",
    readingMinutes: 5,
    publishedAt: "2025-11-20",
    updatedAt: "2026-01-15",
    authorSlug: "mehmet-yilmaz",
    rating: 4.4,
    reviewCount: 201,
    views: 15800,
    tags: ["Paris", "Terrace", "Evening"],
    featured: false,
    trending: true,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: false,
    content: article([
      "Paris evenings belong to terraces — order a café crème and watch the boulevard move.",
      "Mix one legendary terrace with one modern specialty bar to taste both eras.",
      "Queues are real; a late seating often beats early rush.",
      "Walk home along the Seine when the lights come up.",
    ], [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
        alt: "Paris café table with coffee",
        caption: "A classic terrace pause between arrondissements.",
      },
    ]),
    coffeeRecommendations: [{ name: "Café crème", note: "Evening classic on the terrace." }],
    localFoods: [{ name: "Croissant", note: "Still mandatory." }],
    nearbyCafeSlugs: ["cafe-de-flore-paris", "cafe-central-vienna"],
    nearbyDestinationSlugs: ["vienna", "lisbon"],
    relatedGuideSlugs: ["vienna-coffeehouse-weekend", "porto-weekend-escape"],
    faqs: [
      {
        question: "Touristy or worth it?",
        answer: "Both — go for atmosphere, then chase specialty for the coffee itself.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
        alt: "Eiffel Tower view from a Paris street",
      },
    ],
  },
  {
    slug: "tokyo-design-cafes",
    title: "Tokyo Design Cafés",
    subtitle: "Minimal rooms, late pour-overs, and careful light",
    excerpt:
      "A design-led café circuit through Tomigaya and beyond for travelers who notice interiors.",
    coverImage:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1600&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1800&q=80",
    category: "Adventure",
    destination: "Tokyo",
    destinationSlug: null,
    country: "Japan",
    readingMinutes: 8,
    publishedAt: "2026-02-02",
    updatedAt: "2026-03-28",
    authorSlug: "claire-thompson",
    rating: 4.7,
    reviewCount: 134,
    views: 6400,
    tags: ["Tokyo", "Design", "Specialty"],
    featured: false,
    trending: false,
    editorsPick: false,
    coffeeCulture: true,
    digitalNomad: true,
    content: article([
      "Tokyo’s design cafés treat the room as carefully as the roast — wood, light, and quiet precision.",
      "Daytime for pour-overs, evening for spaces that shift toward drinks without losing craft.",
      "Trains make multi-neighborhood crawls easy; avoid rush hour with bags.",
      "One perfect bar beats five hurried stamps.",
    ]),
    coffeeRecommendations: [{ name: "Light-roast pour-over", note: "Ask about Nordic-influenced lots." }],
    localFoods: [{ name: "Kissaten toast", note: "Thick-cut and comforting." }],
    nearbyCafeSlugs: ["fuglen-tokyo", "blue-bottle-kyoto"],
    nearbyDestinationSlugs: ["kyoto"],
    relatedGuideSlugs: ["kyoto-quiet-cafes", "melbourne-coffee-crawl"],
    faqs: [
      {
        question: "English menus?",
        answer: "Common in specialty bars; translation apps cover the rest.",
      },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=80",
        alt: "Minimal pour-over bar",
      },
    ],
  },
];

/** Static catalog seed — production reads go through server catalog loaders. */
export function getAllGuides(): GuideDetail[] {
  return [...guides];
}

export function getGuideBySlug(slug: string): GuideDetail | null {
  return guides.find((guide) => guide.slug === slug) ?? null;
}

export function getGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

export function getGuidesBySlugs(slugs: readonly string[]): GuideDetail[] {
  const set = new Set(slugs);
  return guides.filter((guide) => set.has(guide.slug));
}

export function getFeaturedGuides(): GuideDetail[] {
  return guides.filter((guide) => guide.featured);
}

export function getTrendingGuides(): GuideDetail[] {
  return guides.filter((guide) => guide.trending);
}

export function getEditorsPicks(): GuideDetail[] {
  return guides.filter((guide) => guide.editorsPick);
}

export function getLatestGuides(limit = 8): GuideDetail[] {
  return [...guides]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function getAllAuthors(): GuideAuthor[] {
  return [...GUIDE_AUTHORS];
}

export function getAuthorBySlug(slug: string): GuideAuthor | undefined {
  return GUIDE_AUTHORS.find((author) => author.slug === slug);
}

export function getGuidesByAuthor(authorSlug: string): GuideDetail[] {
  return guides.filter((guide) => guide.authorSlug === authorSlug);
}

/** Seed export for DB seeding / server fallbacks. */
export const GUIDES = guides;

export function getGuideFilterOptions() {
  const countries = Array.from(new Set(guides.map((g) => g.country))).sort();
  const destinations = Array.from(new Set(guides.map((g) => g.destination))).sort();
  const tags = Array.from(new Set(guides.flatMap((g) => g.tags))).sort();
  const authors = GUIDE_AUTHORS.map((author) => ({
    slug: author.slug,
    name: author.name,
  }));

  return {
    categories: Array.from(new Set(guides.map((g) => g.category))),
    countries,
    destinations,
    authors,
    tags,
  };
}

export function getAuthorForGuide(guide: GuideDetail): GuideAuthor | undefined {
  return getAuthorBySlug(guide.authorSlug);
}
