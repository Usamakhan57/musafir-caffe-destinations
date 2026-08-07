import type {
  Category,
  DestinationDetail,
  FilterOptions,
  Region,
} from "../types";
import { enrichDestination, type RawDestination } from "./enrich-destination";
import { COFFEE_CULTURES, SEASONS } from "../types";

/**
 * In-memory destinations catalog.
 *
 * This is a development-only persistence layer standing in for a real
 * database. The functions below are the only supported access point —
 * callers never touch `destinations` directly, so swapping this file's
 * internals for Prisma queries later won't require touching call sites.
 */
const destinations: RawDestination[] = [
  {
    slug: "addis-ababa",
    name: "Addis Ababa",
    country: "Ethiopia",
    countryFlag: "🇪🇹",
    region: "Africa",
    category: "Coffee Town",
    tagline: "The birthplace of coffee",
    description:
      "The birthplace of arabica, where the buna ceremony turns every cup into an hours-long ritual of incense and unhurried conversation.",
    heroImage:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80",
    rating: 4.9,
    reviewCount: 812,
    cafesCount: 342,
    priceLevel: "$",
    bestSeason: "Oct – Mar",
    longDescription:
      "Addis Ababa sits at the source of coffee itself — Ethiopia's Kaffa region is where Coffea arabica was first discovered growing wild. In the capital, that heritage lives on in the buna ceremony: green beans roasted over charcoal in full view of guests, ground by hand, and brewed in a clay jebena, all while frankincense burns nearby. Expect the ceremony to run three rounds — abol, tona, and baraka — each a little weaker than the last, and each impossible to leave before finishing.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
        alt: "Traditional Ethiopian coffee ceremony with a clay jebena and roasting beans",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Barista pouring a macchiato at a standing-room coffee bar in Addis Ababa",
      },
      {
        src: "https://images.unsplash.com/photo-1497935586047-9242eb4fc795?w=1200&q=80",
        alt: "Green coffee cherries drying in the sun on raised beds",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Close-up of roasted coffee beans in a wooden scoop",
      },
    ],
    bestCafes: [
      {
        name: "Tomoca Coffee",
        description:
          "Family-roasted since 1953, this standing-room institution serves macchiatos brewed from beans roasted on-site daily.",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        rating: 4.9,
        knownFor: "House-roasted macchiato",
      },
      {
        name: "Kaldi's Coffee",
        description:
          "Ethiopia's answer to third-wave chains, named for the legendary goat herder said to have discovered coffee.",
        image:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
        rating: 4.5,
        knownFor: "Spiced macchiato",
      },
      {
        name: "Galani Coffee",
        description:
          "A modern roastery in Bole pouring single-origin Yirgacheffe with third-wave precision and a leafy courtyard.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
        rating: 4.7,
        knownFor: "Single-origin Yirgacheffe",
      },
    ],
    travelTips: [
      {
        title: "Accept every ceremony invitation",
        description:
          "Declining a buna ceremony is considered impolite — budget at least 45 minutes to sit through all three rounds.",
      },
      {
        title: "Carry small birr notes",
        description:
          "Most standing-room coffee bars operate cash-only and rarely have change for large notes.",
      },
      {
        title: "Altitude adjustment",
        description:
          "Addis sits above 2,300m — pace your first day and stay hydrated before exploring on foot.",
      },
    ],
    thingsToDo: [
      {
        name: "Tour the Merkato",
        description:
          "Africa's largest open-air market, where sacks of green coffee are traded alongside spices and textiles.",
        image:
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Visit the Ethnological Museum",
        description:
          "Housed in Haile Selassie's former palace, tracing Ethiopia's cultures alongside its coffee traditions.",
        image:
          "https://images.unsplash.com/photo-1497935586047-9242eb4fc795?w=800&q=80",
        duration: "2 hours",
      },
      {
        name: "Day trip to a coffee farm",
        description:
          "Head into the surrounding hills to see cherries picked, pulped, and dried the same way they have been for centuries.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        duration: "Full day",
      },
    ],
    reviews: [
      {
        author: "Marcus T.",
        location: "Toronto, Canada",
        rating: 5,
        date: "2026-05-12",
        comment:
          "The ceremony at Tomoca changed how I think about coffee entirely. Slow down and let it happen — don't rush it.",
      },
      {
        author: "Priya S.",
        location: "Bengaluru, India",
        rating: 5,
        date: "2026-03-02",
        comment:
          "Went for a day trip to a farm outside the city and came back with a newfound respect for how much work is behind every cup.",
      },
      {
        author: "Jonas W.",
        location: "Berlin, Germany",
        rating: 4,
        date: "2026-01-20",
        comment:
          "Incredible coffee culture. Traffic in the city can eat your afternoon, so plan around it.",
      },
    ],
    nearbySlugs: ["cape-town"],
  },
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    countryFlag: "🇹🇷",
    region: "Europe",
    category: "Historic City",
    tagline: "Where two continents brew coffee",
    description:
      "Centuries-old kahvehane culture meets the Bosphorus. Turkish coffee arrives thick, unfiltered, always with water and Turkish delight.",
    heroImage:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=80",
    rating: 4.8,
    reviewCount: 1204,
    cafesCount: 587,
    priceLevel: "$$",
    bestSeason: "Apr – Jun, Sep – Oct",
    longDescription:
      "Turkish coffee earned UNESCO Intangible Cultural Heritage status for good reason — it's less a drink than a small ceremony. Finely ground beans are simmered slowly in a cezve until a thick foam rises, then served unfiltered in tiny cups with a glass of water to cleanse the palate. Istanbul's kahvehane (coffeehouses) have hosted chess games, storytellers, and gossip for over 450 years, and the tradition of reading fortunes in the leftover grounds still happens after almost every cup.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
        alt: "Turkish coffee brewing in a copper cezve over hot sand",
      },
      {
        src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1200&q=80",
        alt: "View of the Bosphorus strait with ferries and mosque silhouettes",
      },
      {
        src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=80",
        alt: "Traditional Turkish coffee cup with foam and a side of Turkish delight",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Cozy Istanbul café interior with patterned tiles",
      },
    ],
    bestCafes: [
      {
        name: "Fazıl Bey",
        description:
          "A Kadıköy institution roasting over hot sand, drawing lines for coffee brewed the old way since 1923.",
        image:
          "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
        rating: 4.8,
        knownFor: "Sand-brewed Türk kahvesi",
      },
      {
        name: "Mandabatmaz",
        description:
          "A tiny Beyoğlu alley café famous for foam so thick a spoon can nearly stand in it.",
        image:
          "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80",
        rating: 4.7,
        knownFor: "Impossibly thick foam",
      },
      {
        name: "Petra Roasting Co.",
        description:
          "A modern specialty roaster in Karaköy pouring filter coffee alongside the traditional cezve menu.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.6,
        knownFor: "Third-wave filter bar",
      },
    ],
    travelTips: [
      {
        title: "Let your fortune be read",
        description:
          "After finishing your cup, flip it onto the saucer and let the grounds cool — many cafés will read the patterns for fun.",
      },
      {
        title: "Cross to the Asian side",
        description:
          "A short ferry ride to Kadıköy gets you some of the city's best coffee with a fraction of the crowds.",
      },
      {
        title: "Order it sweet upfront",
        description:
          "Turkish coffee is brewed with sugar mixed in — specify sade (none), az şekerli (little), or şekerli (sweet) when ordering.",
      },
    ],
    thingsToDo: [
      {
        name: "Explore the Grand Bazaar",
        description:
          "Get lost in one of the world's oldest covered markets, steps from several historic kahvehane.",
        image:
          "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Bosphorus ferry crossing",
        description:
          "Ride between continents for the price of a bus ticket, coffee in hand, as the skyline slides by.",
        image:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
        duration: "1.5 hours",
      },
      {
        name: "Visit a historic hamam",
        description:
          "Pair your coffee ritual with another centuries-old tradition at one of the city's Ottoman-era bathhouses.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        duration: "2 hours",
      },
    ],
    reviews: [
      {
        author: "Elena R.",
        location: "Madrid, Spain",
        rating: 5,
        date: "2026-04-18",
        comment:
          "Mandabatmaz lives up to the hype — arrive early, the alley fills up fast.",
      },
      {
        author: "Tom H.",
        location: "Manchester, UK",
        rating: 5,
        date: "2026-02-09",
        comment:
          "Had my fortune read from the grounds three times across the trip, three completely different stories. Loved it.",
      },
      {
        author: "Aiko N.",
        location: "Osaka, Japan",
        rating: 4,
        date: "2025-12-14",
        comment:
          "Rich, intense coffee — pace yourself, one small cup carries a real kick.",
      },
    ],
    nearbySlugs: ["vienna", "lisbon"],
  },
  {
    slug: "melbourne",
    name: "Melbourne",
    country: "Australia",
    countryFlag: "🇦🇺",
    region: "Oceania",
    category: "Coffee Town",
    tagline: "The flat white capital",
    description:
      "The flat white capital. Laneway roasters and barista champions treat espresso with the reverence of a craft discipline.",
    heroImage:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1600&q=80",
    rating: 4.7,
    reviewCount: 1530,
    cafesCount: 1240,
    priceLevel: "$$",
    bestSeason: "Mar – May, Sep – Nov",
    longDescription:
      "Melbourne's coffee obsession runs so deep that Starbucks famously struggled here and shut most of its stores. What replaced the gap was a laneway culture of independent roasters, each treating espresso extraction like a craft discipline worth competing over — the city has produced multiple World Barista Champions. Duck down any unmarked alley in the CBD and you'll likely stumble onto a hole-in-the-wall pulling shots that rival anywhere on earth.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1200&q=80",
        alt: "Barista pouring latte art into a flat white in a Melbourne laneway café",
      },
      {
        src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=80",
        alt: "Colorful Melbourne laneway lined with street art and café signage",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Espresso shot pulling from a group head at a specialty coffee bar",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Bag of freshly roasted specialty coffee beans on a wooden counter",
      },
    ],
    bestCafes: [
      {
        name: "Patricia Coffee Brewers",
        description:
          "A stand-up-only laneway bar with no seats and no shortage of devoted regulars lining up before work.",
        image:
          "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&q=80",
        rating: 4.8,
        knownFor: "Standing-room espresso bar",
      },
      {
        name: "Proud Mary",
        description:
          "A Fitzroy roastery-café known for its own single-origin blends and a menu that goes well beyond coffee.",
        image:
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80",
        rating: 4.7,
        knownFor: "House-roasted single origins",
      },
      {
        name: "Market Lane Coffee",
        description:
          "Sources direct-trade beans and roasts them in small batches across several Melbourne locations.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
        rating: 4.6,
        knownFor: "Direct-trade single origins",
      },
    ],
    travelTips: [
      {
        title: "Learn the lingo",
        description:
          "A \"flat white\" here is the baseline order — ask for a \"latte\" and you'll get something noticeably different.",
      },
      {
        title: "Skip the chains, follow the laneways",
        description:
          "The best cafés rarely front onto main streets — duck into Degraves St, Centre Place, and the surrounding arcades.",
      },
      {
        title: "Go early on weekdays",
        description:
          "The best stand-up bars get a pre-work rush between 7:30–9am; arrive just after opening to avoid the queue.",
      },
    ],
    thingsToDo: [
      {
        name: "Laneway café crawl",
        description:
          "Walk the CBD's arcade network hopping between three or four cafés in a single afternoon.",
        image:
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Queen Victoria Market",
        description:
          "Browse produce, deli stalls, and a night market food hall a short walk from the CBD's roasteries.",
        image:
          "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80",
        duration: "2 hours",
      },
      {
        name: "Coffee roastery tour",
        description:
          "Several Fitzroy and Collingwood roasters run public cupping sessions and tours on weekends.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        duration: "1.5 hours",
      },
    ],
    reviews: [
      {
        author: "Sara K.",
        location: "Portland, USA",
        rating: 5,
        date: "2026-06-01",
        comment:
          "As a coffee snob I was skeptical, but Melbourne genuinely lives up to its reputation. Patricia was a highlight.",
      },
      {
        author: "Liam O.",
        location: "Dublin, Ireland",
        rating: 4,
        date: "2026-03-22",
        comment:
          "Loved the laneway crawl idea — just wear comfortable shoes, you'll walk a lot more than expected.",
      },
      {
        author: "Noor A.",
        location: "Dubai, UAE",
        rating: 5,
        date: "2025-11-30",
        comment:
          "Best flat white of my life at Market Lane. Baristas here talk about beans the way sommeliers talk about wine.",
      },
    ],
    nearbySlugs: [],
  },
  {
    slug: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    countryFlag: "🇻🇳",
    region: "Asia",
    category: "Coffee Town",
    tagline: "Home of egg coffee",
    description:
      "Sidewalk stools, dripping phin filters, and the famous egg coffee whipped into a silky custard — invented in a 1940s milk shortage.",
    heroImage:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80",
    rating: 4.8,
    reviewCount: 967,
    cafesCount: 465,
    priceLevel: "$",
    bestSeason: "Oct – Dec, Mar – Apr",
    longDescription:
      "Hanoi's coffee culture is built around the phin — a small metal filter that drips slowly over condensed milk or, in the case of cà phê trứng, a whipped egg-yolk custard invented during a 1940s milk shortage. Locals don't rush it: the point of ordering is to sit on a plastic stool at sidewalk height, watch the Old Quarter pass by, and let the phin do its slow work while the coffee cools to the perfect temperature.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80",
        alt: "Vietnamese egg coffee with whipped custard foam in a glass cup",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Phin filter dripping coffee over condensed milk",
      },
      {
        src: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80",
        alt: "Hanoi Old Quarter street lined with motorbikes and sidewalk cafés",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Bag of Vietnamese robusta coffee beans",
      },
    ],
    bestCafes: [
      {
        name: "Café Giảng",
        description:
          "The birthplace of egg coffee, hidden down a narrow alley and still run by the founder's family.",
        image:
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
        rating: 4.9,
        knownFor: "Original cà phê trứng",
      },
      {
        name: "Cong Caphe",
        description:
          "A retro, wartime-themed chain serving coconut coffee smoothies alongside the classic egg version.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.5,
        knownFor: "Coconut coffee smoothie",
      },
      {
        name: "The Note Coffee",
        description:
          "Walls covered floor-to-ceiling in colorful sticky notes left by visitors, overlooking Hoan Kiem Lake.",
        image:
          "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=600&q=80",
        rating: 4.4,
        knownFor: "Lakeview seating",
      },
    ],
    travelTips: [
      {
        title: "Sit low, stay long",
        description:
          "Sidewalk stool seating is part of the experience — don't rush to finish, locals linger for an hour or more.",
      },
      {
        title: "Try it hot first",
        description:
          "Egg coffee is traditionally served hot; the iced version is popular with tourists but changes the texture.",
      },
      {
        title: "Cross the street with confidence",
        description:
          "Traffic won't stop for you — walk at a steady, predictable pace and let motorbikes flow around you.",
      },
    ],
    thingsToDo: [
      {
        name: "Old Quarter walking tour",
        description:
          "36 historic guild streets, each still loosely tied to the trade it's named after, dotted with sidewalk cafés.",
        image:
          "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&q=80",
        duration: "2.5 hours",
      },
      {
        name: "Hoan Kiem Lake at sunrise",
        description:
          "Watch locals practice tai chi around the lake before grabbing coffee at one of the nearby stalls.",
        image:
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
        duration: "1 hour",
      },
      {
        name: "Train Street photo stop",
        description:
          "Grab a coffee at one of the cafés built along the narrow active rail line as a train passes within arm's reach.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        duration: "45 minutes",
      },
    ],
    reviews: [
      {
        author: "Diego M.",
        location: "Buenos Aires, Argentina",
        rating: 5,
        date: "2026-05-30",
        comment:
          "Café Giảng was worth every bit of the maze to find it. Egg coffee is basically dessert and I loved it.",
      },
      {
        author: "Han Y.",
        location: "Seoul, South Korea",
        rating: 5,
        date: "2026-01-15",
        comment:
          "Cheapest and best coffee I've had traveling anywhere. The sidewalk seating is half the charm.",
      },
      {
        author: "Rebecca F.",
        location: "London, UK",
        rating: 4,
        date: "2025-12-02",
        comment:
          "Sweet, rich, and everywhere. Great value too — a cup rarely costs more than a dollar or two.",
      },
    ],
    nearbySlugs: ["chiang-mai", "kyoto"],
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    countryFlag: "🇯🇵",
    region: "Asia",
    category: "Cultural Capital",
    tagline: "Kissaten precision",
    description:
      "Where ancient kissaten tradition meets third-wave precision. Sip pour-overs in century-old machiya townhouses beside zen gardens.",
    heroImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    rating: 4.9,
    reviewCount: 1108,
    cafesCount: 298,
    priceLevel: "$$",
    bestSeason: "Mar – May, Oct – Nov",
    longDescription:
      "Kyoto's kissaten (old-school coffeehouses) have quietly perfected pour-over coffee since long before \"third wave\" was a phrase — some have been hand-brewing single cups behind the same wooden counter for over 60 years. In restored machiya townhouses, that same unhurried precision now sits alongside modern specialty roasters, and it's common to find a decades-old siphon brewer and a digital gram scale on the same counter.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
        alt: "Hand pour-over coffee brewing in a traditional Kyoto kissaten",
      },
      {
        src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200&q=80",
        alt: "Machiya townhouse café interior with wooden beams and low lighting",
      },
      {
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80",
        alt: "Minimalist Japanese café counter with siphon coffee brewers",
      },
      {
        src: "https://images.unsplash.com/photo-1601924638867-3ec241f8dabb?w=1200&q=80",
        alt: "Traditional zen garden visible through a café window in Kyoto",
      },
    ],
    bestCafes: [
      {
        name: "Blue Bottle Kyoto",
        description:
          "A beautifully restored 100-year-old machiya townhouse where single-origin drip coffee meets Japanese minimalist aesthetics.",
        image:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
        rating: 4.8,
        knownFor: "Single-origin drip",
      },
      {
        name: "Kissaten Rocca",
        description:
          "A retro kissaten institution serving siphon-brewed coffee under warm amber lighting since the 1970s.",
        image:
          "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80",
        rating: 4.7,
        knownFor: "Siphon-brewed coffee",
      },
      {
        name: "% Arabica Higashiyama",
        description:
          "Minimalist counter with a view of the Yasaka Pagoda, pulling clean, bright espresso shots.",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
        rating: 4.6,
        knownFor: "Pagoda-view espresso bar",
      },
    ],
    travelTips: [
      {
        title: "Visit kissaten mid-afternoon",
        description:
          "Many old-school kissaten close early evening — plan your café visit between lunch and 5pm.",
      },
      {
        title: "Bring cash",
        description:
          "Smaller, older cafés often don't accept cards — keep yen on hand.",
      },
      {
        title: "Book popular spots ahead",
        description:
          "Machiya cafés near Higashiyama get long queues on weekends; arrive at opening or reserve where possible.",
      },
    ],
    thingsToDo: [
      {
        name: "Higashiyama district walk",
        description:
          "Wander preserved lantern-lit lanes lined with cafés, tea houses, and craft shops below the Yasaka Pagoda.",
        image:
          "https://images.unsplash.com/photo-1601924638867-3ec241f8dabb?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Fushimi Inari at dawn",
        description:
          "Beat the crowds up the thousand-torii trail, then reward yourself with coffee back in town.",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        duration: "2 hours",
      },
      {
        name: "Siphon coffee tasting",
        description:
          "Sit at the counter of a kissaten and watch a siphon brewer work — ask the barista to explain the process.",
        image:
          "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80",
        duration: "1 hour",
      },
    ],
    reviews: [
      {
        author: "Camille D.",
        location: "Lyon, France",
        rating: 5,
        date: "2026-04-10",
        comment:
          "Kissaten Rocca felt like stepping into another decade. The siphon brewing show alone is worth the visit.",
      },
      {
        author: "Ahmed K.",
        location: "Cairo, Egypt",
        rating: 5,
        date: "2026-02-25",
        comment:
          "% Arabica's view of the pagoda while sipping espresso is one of my favorite travel memories.",
      },
      {
        author: "Grace L.",
        location: "Singapore",
        rating: 4,
        date: "2025-12-19",
        comment:
          "Beautiful cafés everywhere, though the popular ones do get a queue. Worth the wait.",
      },
    ],
    nearbySlugs: ["hanoi", "chiang-mai"],
  },
  {
    slug: "medellin",
    name: "Medellín",
    country: "Colombia",
    countryFlag: "🇨🇴",
    region: "South America",
    category: "Digital Nomad Hub",
    tagline: "City of eternal spring",
    description:
      "The city of eternal spring where coffee farms cascade down emerald hillsides and every corner café pours single-origin tinto.",
    heroImage:
      "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=1600&q=80",
    rating: 4.7,
    reviewCount: 894,
    cafesCount: 412,
    priceLevel: "$",
    bestSeason: "Dec – Mar, Jul – Aug",
    longDescription:
      "Medellín sits in the heart of Colombia's coffee axis, close enough to the surrounding fincas that many cafés serve beans picked and roasted within a day's drive. The city's near-constant spring-like climate has also made it a magnet for remote workers, and a wave of specialty cafés with reliable wifi and single-origin pour-overs has grown up around El Poblado and Laureles to match.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=1200&q=80",
        alt: "Coffee farm on a hillside near Medellín with rows of coffee plants",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Colombian coffee beans roasting in a drum roaster",
      },
      {
        src: "https://images.unsplash.com/photo-1503481766315-7a586b20f66d?w=1200&q=80",
        alt: "Medellín cityscape with cable cars over the valley",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Modern specialty café interior with laptops and pour-over coffee",
      },
    ],
    bestCafes: [
      {
        name: "Pergamino Café",
        description:
          "Direct-trade specialty roaster in El Poblado serving award-winning Colombian micro-lots in a sun-drenched modern space.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
        rating: 4.7,
        knownFor: "Direct-trade micro-lots",
      },
      {
        name: "Café Velvet",
        description:
          "A Laureles neighborhood favorite for remote workers, with strong wifi and an all-day brunch menu.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.5,
        knownFor: "Laptop-friendly workspace",
      },
      {
        name: "Al Alma Café",
        description:
          "Family-run roastery sourcing directly from small producers in Antioquia's coffee belt.",
        image:
          "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=600&q=80",
        rating: 4.6,
        knownFor: "Antioquia single origins",
      },
    ],
    travelTips: [
      {
        title: "Take the Metrocable",
        description:
          "The cable car system doubles as a scenic ride and connects you to hillside neighborhoods with their own café scenes.",
      },
      {
        title: "Book a finca tour",
        description:
          "Day trips to coffee farms in nearby towns like Jardín or Santa Elena sell out on weekends — reserve ahead.",
      },
      {
        title: "Stick to El Poblado or Laureles at night",
        description:
          "These neighborhoods are the safest and most walkable after dark for visitors unfamiliar with the city.",
      },
    ],
    thingsToDo: [
      {
        name: "Comuna 13 graffiti tour",
        description:
          "A guided walk through the neighborhood's outdoor escalators and street art, with tinto stops along the way.",
        image:
          "https://images.unsplash.com/photo-1503481766315-7a586b20f66d?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Coffee farm day trip",
        description:
          "Visit a working finca to pick, process, and cup coffee the way it's done before it ever reaches a café.",
        image:
          "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800&q=80",
        duration: "Full day",
      },
      {
        name: "Botanical Garden stroll",
        description:
          "A quiet, shaded escape in the city center, with a café inside serving locally roasted beans.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        duration: "1.5 hours",
      },
    ],
    reviews: [
      {
        author: "Fatima Z.",
        location: "Casablanca, Morocco",
        rating: 5,
        date: "2026-06-14",
        comment:
          "Spent a month working from Café Velvet — great coffee, reliable wifi, friendly regulars.",
      },
      {
        author: "Bruno S.",
        location: "São Paulo, Brazil",
        rating: 4,
        date: "2026-03-08",
        comment:
          "The finca day trip through Pergamino was the highlight of our whole Colombia trip.",
      },
      {
        author: "Ingrid V.",
        location: "Oslo, Norway",
        rating: 5,
        date: "2025-11-22",
        comment:
          "Perfect weather, great coffee, and the cable car views alone are worth the visit.",
      },
    ],
    nearbySlugs: ["antigua-guatemala"],
  },
  {
    slug: "vienna",
    name: "Vienna",
    country: "Austria",
    countryFlag: "🇦🇹",
    region: "Europe",
    category: "Cultural Capital",
    tagline: "Coffeehouse culture, since 1876",
    description:
      "Grand vaulted coffeehouses where a single melange buys you a marble table and hours of uninterrupted reading, writing, or conversation.",
    heroImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80",
    rating: 4.8,
    reviewCount: 1042,
    cafesCount: 620,
    priceLevel: "$$$",
    bestSeason: "Apr – Jun, Sep – Nov",
    longDescription:
      "Viennese coffeehouse culture is UNESCO-listed intangible heritage, and it shows the moment you sit down — a single melange comes with a glass of water, a silver tray, and an unspoken invitation to stay as long as you like. Newspapers on wooden rods still line the walls of the grandest rooms, holdovers from a time when the coffeehouse doubled as the city's reading room, salon, and unofficial office for writers who couldn't afford heating at home.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
        alt: "Grand Viennese coffeehouse interior with vaulted ceilings and marble tables",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Viennese melange coffee served with a glass of water on a silver tray",
      },
      {
        src: "https://images.unsplash.com/photo-1516600164266-f3b8166ee679?w=1200&q=80",
        alt: "Historic Vienna street with ornate facades near a traditional café",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Slice of Sachertorte served alongside coffee",
      },
    ],
    bestCafes: [
      {
        name: "Café Central",
        description:
          "Since 1876, poets and revolutionaries have lingered here over melange and Sachertorte beneath vaulted ceilings.",
        image:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
        rating: 4.8,
        knownFor: "Viennese melange",
      },
      {
        name: "Café Sperl",
        description:
          "A billiard-table-equipped classic largely unchanged since 1880, favored by locals over tourist-heavy alternatives.",
        image:
          "https://images.unsplash.com/photo-1516600164266-f3b8166ee679?w=600&q=80",
        rating: 4.7,
        knownFor: "Classic Kleiner Brauner",
      },
      {
        name: "Kaffeefabrik",
        description:
          "A modern specialty roaster and café bringing third-wave technique into a decidedly traditional coffee city.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.6,
        knownFor: "Specialty single origins",
      },
    ],
    travelTips: [
      {
        title: "Learn the coffee vocabulary",
        description:
          "A \"melange\" isn't a latte and a \"Kleiner Brauner\" isn't an espresso — learn the local terms before ordering.",
      },
      {
        title: "Stay as long as you like",
        description:
          "There's no pressure to order more or leave quickly; lingering for hours over one coffee is completely normal.",
      },
      {
        title: "Reserve for Café Central",
        description:
          "It's the most famous room in the city — arrive early or book ahead to avoid a long queue at the door.",
      },
    ],
    thingsToDo: [
      {
        name: "Historic coffeehouse crawl",
        description:
          "Compare the grand rooms of Café Central, Café Sperl, and Demel over the course of an afternoon.",
        image:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
        duration: "4 hours",
      },
      {
        name: "Vienna State Opera tour",
        description:
          "Take a daytime tour of the opera house, then debrief over coffee at a nearby traditional café.",
        image:
          "https://images.unsplash.com/photo-1516600164266-f3b8166ee679?w=800&q=80",
        duration: "1.5 hours",
      },
      {
        name: "Naschmarkt browse",
        description:
          "Vienna's largest market, good for a coffee break between stalls of produce, spices, and street food.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        duration: "2 hours",
      },
    ],
    reviews: [
      {
        author: "Oliver B.",
        location: "Amsterdam, Netherlands",
        rating: 5,
        date: "2026-05-05",
        comment:
          "Café Central is touristy but genuinely earns it — the room itself is worth the visit even before the coffee arrives.",
      },
      {
        author: "Mei L.",
        location: "Taipei, Taiwan",
        rating: 4,
        date: "2026-01-28",
        comment:
          "Loved Café Sperl — quieter, more local, and the billiard tables are a fun touch.",
      },
      {
        author: "Karim B.",
        location: "Tunis, Tunisia",
        rating: 5,
        date: "2025-10-19",
        comment:
          "Nowhere else have I felt so unhurried over a single cup of coffee. Wonderful tradition.",
      },
    ],
    nearbySlugs: ["istanbul", "lisbon"],
  },
  {
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    countryFlag: "🇵🇹",
    region: "Europe",
    category: "Coastal Escape",
    tagline: "A bica and a view of the Tagus",
    description:
      "Tiled café facades, steep tram-lined streets, and the bica — Lisbon's answer to the espresso — enjoyed on nearly every corner.",
    heroImage:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&q=80",
    rating: 4.7,
    reviewCount: 763,
    cafesCount: 510,
    priceLevel: "$$",
    bestSeason: "Mar – May, Sep – Oct",
    longDescription:
      "Lisbon's coffee order of choice is the bica, a short, strong espresso pulled since the early 20th century and still priced low enough that a coffee break rarely feels like an indulgence. Cafés here spill onto tiled squares and steep, tram-lined streets, and pairing a bica with a warm pastel de nata is close to a local rite of passage.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80",
        alt: "Lisbon tram climbing a steep tiled street past a corner café",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "A bica espresso served alongside a pastel de nata",
      },
      {
        src: "https://images.unsplash.com/photo-1555881639-4c0f0e0f1234?w=1200&q=80",
        alt: "View of Lisbon's terracotta rooftops and the Tagus river",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Traditional tiled café facade in the Alfama district",
      },
    ],
    bestCafes: [
      {
        name: "A Brasileira",
        description:
          "An Art Nouveau institution in Chiado, open since 1905, where writers once traded ideas over strong bicas.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.6,
        knownFor: "Historic Chiado bica",
      },
      {
        name: "Copenhagen Coffee Lab",
        description:
          "A Nordic-style specialty café bringing precise pour-overs to Lisbon's Príncipe Real neighborhood.",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        rating: 4.7,
        knownFor: "Nordic-style pour-over",
      },
      {
        name: "Fábrica Coffee Roasters",
        description:
          "Housed in a converted 19th-century factory, roasting on-site with an industrial-chic dining room.",
        image:
          "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&q=80",
        rating: 4.6,
        knownFor: "On-site micro-roasting",
      },
    ],
    travelTips: [
      {
        title: "Order at the counter",
        description:
          "Standing at the bar for a bica is often cheaper than table service and is exactly how locals do it.",
      },
      {
        title: "Wear good shoes",
        description:
          "Lisbon's hills and cobblestones are steep and slippery when wet — comfortable, grippy footwear matters.",
      },
      {
        title: "Pair it with a nata",
        description:
          "A warm pastel de nata dusted with cinnamon is the classic bica companion, best eaten fresh from the oven.",
      },
    ],
    thingsToDo: [
      {
        name: "Ride Tram 28",
        description:
          "The classic yellow tram winds through Alfama and Graça, passing dozens of corner cafés along the way.",
        image:
          "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80",
        duration: "1 hour",
      },
      {
        name: "Alfama viewpoint walk",
        description:
          "Climb to a miradouro for river views, then cool down with a bica at a nearby kiosk café.",
        image:
          "https://images.unsplash.com/photo-1555881639-4c0f0e0f1234?w=800&q=80",
        duration: "2 hours",
      },
      {
        name: "Time Out Market visit",
        description:
          "A curated food hall pairing Lisbon's top chefs with a strong specialty coffee counter.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        duration: "1.5 hours",
      },
    ],
    reviews: [
      {
        author: "Anders P.",
        location: "Copenhagen, Denmark",
        rating: 5,
        date: "2026-04-27",
        comment:
          "Copenhagen Coffee Lab felt like home, but the real magic was standing-room bicas in the Alfama backstreets.",
      },
      {
        author: "Wei C.",
        location: "Shanghai, China",
        rating: 4,
        date: "2026-02-14",
        comment:
          "Cheap, strong, and everywhere. Tram 28 plus a few café stops made for a perfect afternoon.",
      },
      {
        author: "Lucia M.",
        location: "Rome, Italy",
        rating: 5,
        date: "2025-12-30",
        comment:
          "As an Italian I'm picky about espresso — the bica genuinely holds up. A Brasileira is worth the tourist crowd.",
      },
    ],
    nearbySlugs: ["istanbul", "vienna"],
  },
  {
    slug: "chiang-mai",
    name: "Chiang Mai",
    country: "Thailand",
    countryFlag: "🇹🇭",
    region: "Asia",
    category: "Digital Nomad Hub",
    tagline: "Highland Arabica meets slow living",
    description:
      "Northern Thailand's highland Arabica farms feed a laid-back café scene built around temple views, co-working spaces, and long afternoons.",
    heroImage:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1600&q=80",
    rating: 4.6,
    reviewCount: 701,
    cafesCount: 380,
    priceLevel: "$",
    bestSeason: "Nov – Feb",
    longDescription:
      "Chiang Mai sits close to the hill-tribe farms of northern Thailand, where Arabica has replaced older cash crops on cooler mountain slopes since a royal project encouraged the switch decades ago. In the city, that supply chain feeds a relaxed café culture that's equal parts specialty coffee, digital-nomad co-working, and temple-adjacent garden seating — few places make it this easy to spend an entire slow afternoon over one pour-over.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80",
        alt: "Coffee cherries growing on a highland farm near Chiang Mai",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Garden café seating with string lights in Chiang Mai's Old City",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Pour-over coffee setup with a temple visible in the background",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Bag of northern Thai highland Arabica coffee beans",
      },
    ],
    bestCafes: [
      {
        name: "Ristr8to",
        description:
          "An internationally awarded latte-art bar in the Nimman district, sourcing beans from Doi Chang and Doi Inthanon.",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        rating: 4.8,
        knownFor: "Competition-grade latte art",
      },
      {
        name: "Akha Ama Coffee",
        description:
          "A social enterprise café supporting Akha hill-tribe farmers, with a rustic Old City courtyard.",
        image:
          "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80",
        rating: 4.7,
        knownFor: "Farmer-direct sourcing",
      },
      {
        name: "Graph Cafe",
        description:
          "A minimalist, design-forward café favored by remote workers for its reliable wifi and quiet corners.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.5,
        knownFor: "Laptop-friendly quiet space",
      },
    ],
    travelTips: [
      {
        title: "Avoid burning season",
        description:
          "February to April brings agricultural smoke haze to the region — plan around November to February instead.",
      },
      {
        title: "Rent a scooter carefully",
        description:
          "Traffic rules are loosely followed; wear a helmet and drive defensively if you rent one to reach farm cafés.",
      },
      {
        title: "Support farmer-direct cafés",
        description:
          "Look for cafés naming their source farm directly — it usually means a better price reaches the grower.",
      },
    ],
    thingsToDo: [
      {
        name: "Doi Suthep temple visit",
        description:
          "Climb to the hilltop temple overlooking the city, then descend to a garden café for a well-earned coffee.",
        image:
          "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Old City café walk",
        description:
          "Wander the moat-ringed Old City, ducking between temple courtyards and specialty cafés.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        duration: "2.5 hours",
      },
      {
        name: "Highland farm day trip",
        description:
          "Visit a cooperative farm in the surrounding hills to see cherry picking and processing firsthand.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        duration: "Full day",
      },
    ],
    reviews: [
      {
        author: "Julia S.",
        location: "Warsaw, Poland",
        rating: 5,
        date: "2026-01-11",
        comment:
          "Ristr8to's latte art is genuinely a show. Akha Ama's story behind the beans made the coffee taste even better.",
      },
      {
        author: "Kenji T.",
        location: "Fukuoka, Japan",
        rating: 4,
        date: "2025-12-05",
        comment:
          "Worked remotely from Graph Cafe for two weeks — great wifi, calm atmosphere, coffee never disappointed.",
      },
      {
        author: "Sofia N.",
        location: "Athens, Greece",
        rating: 5,
        date: "2025-11-18",
        comment:
          "The farm day trip was unforgettable — met the family who grows the beans we'd been drinking all week.",
      },
    ],
    nearbySlugs: ["hanoi", "kyoto"],
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    countryFlag: "🇿🇦",
    region: "Africa",
    category: "Coastal Escape",
    tagline: "Table Mountain roasts",
    description:
      "A booming third-wave scene set against Table Mountain, where roasteries double as galleries and coffee farms are a short drive into the Winelands.",
    heroImage:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=80",
    rating: 4.6,
    reviewCount: 655,
    cafesCount: 320,
    priceLevel: "$$",
    bestSeason: "Nov – Mar",
    longDescription:
      "Cape Town's specialty coffee scene has grown fast over the past decade, fueled by an easy pairing with the city's design and gallery culture — many roasteries double as exhibition spaces or sit inside converted warehouses in the up-and-coming Woodstock district. A short drive into the surrounding Winelands adds coffee-and-wine farm tours to the mix, set against the backdrop of Table Mountain.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=80",
        alt: "Table Mountain viewed from a Cape Town rooftop café",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Coffee roastery interior in a converted Woodstock warehouse",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Barista preparing a flat white at a Cape Town specialty café",
      },
      {
        src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
        alt: "Outdoor café seating with a view of Cape Town's harbor",
      },
    ],
    bestCafes: [
      {
        name: "Truth Coffee Roasting",
        description:
          "A steampunk-styled roastery in a converted warehouse, widely cited among the world's best-looking cafés.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
        rating: 4.7,
        knownFor: "Steampunk roastery interior",
      },
      {
        name: "Origin Coffee Roasting",
        description:
          "A De Waterkant favorite roasting single-origin African beans with a lively open kitchen.",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        rating: 4.6,
        knownFor: "Single-origin African roasts",
      },
      {
        name: "Deluxe Coffeeworks",
        description:
          "A design-forward café chain with several harbor-adjacent locations and reliably strong espresso.",
        image:
          "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80",
        rating: 4.5,
        knownFor: "Harbor-view espresso bar",
      },
    ],
    travelTips: [
      {
        title: "Book Truth Coffee ahead on weekends",
        description:
          "It's popular enough that weekend mornings can mean a real wait — go early or expect a queue.",
      },
      {
        title: "Combine with a Winelands day trip",
        description:
          "Stellenbosch and Franschhoek are under an hour away and pair coffee farm visits with wine tastings.",
      },
      {
        title: "Check safety guidance by neighborhood",
        description:
          "Stick to well-trafficked areas like the V&A Waterfront and City Bowl, especially after dark.",
      },
    ],
    thingsToDo: [
      {
        name: "Table Mountain cable car",
        description:
          "Ride up for panoramic views, then find a rooftop café back in town to unwind.",
        image:
          "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
        duration: "3 hours",
      },
      {
        name: "Woodstock gallery + roastery walk",
        description:
          "Explore converted industrial spaces mixing street art, galleries, and third-wave coffee roasters.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        duration: "2.5 hours",
      },
      {
        name: "Winelands day trip",
        description:
          "Drive to Stellenbosch or Franschhoek for coffee-and-wine farm tours against mountain scenery.",
        image:
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
        duration: "Full day",
      },
    ],
    reviews: [
      {
        author: "Nadia R.",
        location: "Nairobi, Kenya",
        rating: 5,
        date: "2026-02-20",
        comment:
          "Truth Coffee is as good as the photos suggest, and Origin's single origins were some of the best I've had in Africa.",
      },
      {
        author: "Pieter V.",
        location: "Rotterdam, Netherlands",
        rating: 4,
        date: "2025-12-27",
        comment:
          "Combined a coffee crawl in Woodstock with a Stellenbosch day trip — great pairing, highly recommend.",
      },
      {
        author: "Zanele M.",
        location: "Johannesburg, South Africa",
        rating: 4,
        date: "2025-11-09",
        comment:
          "Solid third-wave scene for a city this size. Deluxe Coffeeworks by the harbor is a reliable go-to.",
      },
    ],
    nearbySlugs: ["addis-ababa"],
  },
  {
    slug: "antigua-guatemala",
    name: "Antigua",
    country: "Guatemala",
    countryFlag: "🇬🇹",
    region: "North America",
    category: "Mountain Retreat",
    tagline: "Volcano-grown coffee, colonial streets",
    description:
      "A colonial-era city ringed by volcanoes, surrounded by some of the highest-altitude coffee farms in Central America.",
    heroImage:
      "https://images.unsplash.com/photo-1531963136727-4be00fbe8f52?w=1600&q=80",
    rating: 4.7,
    reviewCount: 528,
    cafesCount: 210,
    priceLevel: "$",
    bestSeason: "Nov – Apr",
    longDescription:
      "Antigua's cobblestone streets sit in a valley ringed by three volcanoes, and the same volcanic soil and high altitude that make the surrounding hillsides dramatic also make them exceptional for coffee — Antigua is one of Guatemala's most prized growing regions. Cafés here range from centuries-old colonial courtyards to modern roasteries run by growers who cut out the middleman entirely.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1531963136727-4be00fbe8f52?w=1200&q=80",
        alt: "Colonial-era Antigua street with a volcano visible in the background",
      },
      {
        src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Coffee cherries being sorted on a high-altitude Guatemalan farm",
      },
      {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        alt: "Colonial courtyard café with cobblestone floor and volcano view",
      },
      {
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Pour-over coffee being prepared in a rustic Antigua café",
      },
    ],
    bestCafes: [
      {
        name: "Café Rocío",
        description:
          "A grower-owned café serving beans from the family's own farm on the slopes of Volcán de Agua.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
        rating: 4.8,
        knownFor: "Grower-direct volcanic coffee",
      },
      {
        name: "Fernando's Kaffee",
        description:
          "A cozy courtyard roastery known for its own-farm beans and a small on-site chocolate workshop.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        rating: 4.6,
        knownFor: "Farm-to-cup single origin",
      },
      {
        name: "Café Condesa",
        description:
          "A colonial courtyard café just off the main plaza, popular for slow breakfasts with mountain views.",
        image:
          "https://images.unsplash.com/photo-1531963136727-4be00fbe8f52?w=600&q=80",
        rating: 4.5,
        knownFor: "Plaza-adjacent courtyard seating",
      },
    ],
    travelTips: [
      {
        title: "Visit a farm on the volcano slopes",
        description:
          "Several fincas near Antigua offer tours ending in a cupping session — book a day ahead in high season.",
      },
      {
        title: "Layer for the altitude",
        description:
          "Evenings get cool fast at this elevation, even when days are warm — bring a light jacket.",
      },
      {
        title: "Walk, don't drive, in the center",
        description:
          "The colonial core is compact and cobblestoned — most cafés and sights are an easy walk apart.",
      },
    ],
    thingsToDo: [
      {
        name: "Finca coffee tour",
        description:
          "Tour a working farm on the volcano's slopes, ending with a fresh cupping of that morning's roast.",
        image:
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
        duration: "Half day",
      },
      {
        name: "Cerro de la Cruz viewpoint",
        description:
          "A short hike above the city for a classic postcard view of Antigua framed by Volcán de Agua.",
        image:
          "https://images.unsplash.com/photo-1531963136727-4be00fbe8f52?w=800&q=80",
        duration: "1.5 hours",
      },
      {
        name: "Colonial ruins walk",
        description:
          "Explore the earthquake-damaged convents and churches scattered through the historic center.",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        duration: "2 hours",
      },
    ],
    reviews: [
      {
        author: "Valentina G.",
        location: "Santiago, Chile",
        rating: 5,
        date: "2026-01-30",
        comment:
          "Café Rocío's farm tour was incredible — tasting coffee at the source with the volcano right there is unbeatable.",
      },
      {
        author: "Robert K.",
        location: "Denver, USA",
        rating: 4,
        date: "2025-12-08",
        comment:
          "Cerro de la Cruz at sunrise, then coffee back in town — perfect combo, highly recommend the early start.",
      },
      {
        author: "Isabela P.",
        location: "Lisbon, Portugal",
        rating: 5,
        date: "2025-10-25",
        comment:
          "Smaller and quieter than I expected, in the best way. Fernando's Kaffee was a lovely surprise.",
      },
    ],
    nearbySlugs: ["medellin"],
  },
];

// ── Public API ──────────────────────────────────────────────────

function allEnriched(): DestinationDetail[] {
  return destinations.map(enrichDestination);
}

export async function getAllDestinations(): Promise<DestinationDetail[]> {
  return allEnriched();
}

export async function getDestinationBySlug(
  slug: string,
): Promise<DestinationDetail | undefined> {
  const raw = destinations.find((destination) => destination.slug === slug);
  return raw ? enrichDestination(raw) : undefined;
}

export async function getDestinationSlugs(): Promise<string[]> {
  return destinations.map((destination) => destination.slug);
}

export async function getNearbyDestinations(
  slugs: readonly string[],
): Promise<DestinationDetail[]> {
  const set = new Set(slugs);
  return destinations
    .filter((destination) => set.has(destination.slug))
    .map(enrichDestination);
}

export function getFilterOptions(): FilterOptions {
  const enriched = allEnriched();
  const countries = Array.from(new Set(enriched.map((d) => d.country))).sort();
  const cities = Array.from(new Set(enriched.map((d) => d.city))).sort();
  const regions = Array.from(new Set(enriched.map((d) => d.region))).sort() as Region[];
  const categories = Array.from(
    new Set(enriched.map((d) => d.category)),
  ).sort() as Category[];
  const budgets = Array.from(new Set(enriched.map((d) => d.priceLevel))).sort(
    (a, b) => a.length - b.length,
  );
  const seasons = [...SEASONS];
  const coffeeCultures = Array.from(
    new Set(enriched.map((d) => d.coffeeCulture)),
  ).sort() as FilterOptions["coffeeCultures"][number][];

  return {
    countries,
    cities,
    regions,
    budgets,
    seasons: seasons.filter((season) =>
      enriched.some((d) => d.seasons.includes(season)),
    ),
    coffeeCultures: coffeeCultures.length ? coffeeCultures : [...COFFEE_CULTURES],
    categories,
  };
}
