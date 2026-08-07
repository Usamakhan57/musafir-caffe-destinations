/**
 * Curated content for the MusafirCaffe landing page.
 * Real places, real traditions — no filler copy.
 */

export interface Destination {
  name: string;
  country: string;
  countryFlag: string;
  description: string;
  signature: string;
  image: string;
  rating: number;
  cafes: number;
}

export interface Cafe {
  name: string;
  city: string;
  country: string;
  countryFlag: string;
  description: string;
  knownFor: string;
  image: string;
  rating: number;
  priceLevel: string;
}

export interface Guide {
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}

export interface Category {
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar: string;
}

export interface CommunityStory {
  title: string;
  excerpt: string;
  author: string;
  location: string;
  image: string;
  likes: number;
}

export interface InstagramPost {
  image: string;
  alt: string;
  likes: number;
}

export const destinations: Destination[] = [
  {
    name: "Addis Ababa",
    country: "Ethiopia",
    countryFlag: "🇪🇹",
    description:
      "The birthplace of arabica, where the buna ceremony turns every cup into an hours-long ritual of incense and unhurried conversation.",
    signature: "Traditional buna ceremony",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    rating: 4.9,
    cafes: 342,
  },
  {
    name: "Istanbul",
    country: "Türkiye",
    countryFlag: "🇹🇷",
    description:
      "Centuries-old kahvehane culture meets the Bosphorus. Turkish coffee arrives thick, unfiltered, always with water and Turkish delight.",
    signature: "Cezve-brewed Türk kahvesi",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    rating: 4.8,
    cafes: 587,
  },
  {
    name: "Melbourne",
    country: "Australia",
    countryFlag: "🇦🇺",
    description:
      "The flat white capital. Laneway roasters and barista champions treat espresso with the reverence of a craft discipline.",
    signature: "Laneway flat whites",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80",
    rating: 4.7,
    cafes: 1240,
  },
  {
    name: "Hanoi",
    country: "Vietnam",
    countryFlag: "🇻🇳",
    description:
      "Sidewalk stools, dripping phin filters, and the famous egg coffee whipped into a silky custard — invented in a 1940s milk shortage.",
    signature: "Cà phê trứng (egg coffee)",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
    rating: 4.8,
    cafes: 465,
  },
  {
    name: "Kyoto",
    country: "Japan",
    countryFlag: "🇯🇵",
    description:
      "Where ancient kissaten tradition meets third-wave precision. Sip pour-overs in century-old machiya townhouses beside zen gardens.",
    signature: "Kissaten pour-overs",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    rating: 4.9,
    cafes: 298,
  },
  {
    name: "Medellín",
    country: "Colombia",
    countryFlag: "🇨🇴",
    description:
      "The city of eternal spring where coffee farms cascade down emerald hillsides and every corner café pours single-origin tinto.",
    signature: "Farm-to-cup tinto",
    image:
      "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800&q=80",
    rating: 4.7,
    cafes: 412,
  },
];

export const cafes: Cafe[] = [
  {
    name: "Café Central",
    city: "Vienna",
    country: "Austria",
    countryFlag: "🇦🇹",
    description:
      "Since 1876, poets and revolutionaries have lingered here over melange and Sachertorte beneath vaulted ceilings.",
    knownFor: "Viennese melange",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    rating: 4.8,
    priceLevel: "$$$",
  },
  {
    name: "Fuglen Tokyo",
    city: "Tokyo",
    country: "Japan",
    countryFlag: "🇯🇵",
    description:
      "A Norwegian transplant in Tomigaya pouring precise Nordic-style light roasts by day and craft cocktails by night.",
    knownFor: "Nordic pour-overs",
    image:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80",
    rating: 4.7,
    priceLevel: "$$",
  },
  {
    name: "Café de Flore",
    city: "Paris",
    country: "France",
    countryFlag: "🇫🇷",
    description:
      "Saint-Germain's legendary terrace, where Sartre and Beauvoir wrote for hours over café crème and people-watching.",
    knownFor: "Terrace café crème",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    rating: 4.6,
    priceLevel: "$$$",
  },
  {
    name: "Tomoca Coffee",
    city: "Addis Ababa",
    country: "Ethiopia",
    countryFlag: "🇪🇹",
    description:
      "Family-roasted since 1953, this standing-room institution serves macchiatos brewed from beans roasted on-site daily.",
    knownFor: "House-roasted macchiato",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    rating: 4.9,
    priceLevel: "$",
  },
  {
    name: "Blue Bottle Kyoto",
    city: "Kyoto",
    country: "Japan",
    countryFlag: "🇯🇵",
    description:
      "A beautifully restored 100-year-old machiya townhouse where single-origin drip coffee meets Japanese minimalist aesthetics.",
    knownFor: "Single-origin drip",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
    rating: 4.8,
    priceLevel: "$$",
  },
  {
    name: "Pergamino Café",
    city: "Medellín",
    country: "Colombia",
    countryFlag: "🇨🇴",
    description:
      "Direct-trade specialty roaster in El Poblado serving award-winning Colombian micro-lots in a sun-drenched modern space.",
    knownFor: "Direct-trade micro-lots",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
    rating: 4.7,
    priceLevel: "$$",
  },
];

export const guides: Guide[] = [
  {
    title: "How to Order Coffee in 12 Countries Without Embarrassing Yourself",
    excerpt:
      "From 'un caffè' in Rome to 'kopi O' in Singapore — the exact words, customs, and unspoken rules that earn a local's nod.",
    readTime: "9 min read",
    category: "Coffee Culture",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80",
    author: "Sofia Moretti",
  },
  {
    title: "The Slow Route: Five Train Journeys Built Around Great Cafés",
    excerpt:
      "Rail itineraries through the Alps, Andes, and Balkans where every stop is timed to a roaster's opening hours.",
    readTime: "14 min read",
    category: "Itineraries",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
    author: "Marcus Chen",
  },
  {
    title: "A Traveler's Guide to Coffee Etiquette: Standing, Sitting, Sipping",
    excerpt:
      "Why Italians drink espresso at the bar, Ethiopians never rush a buna, and your laptop is unwelcome at a Viennese Kaffeehaus.",
    readTime: "7 min read",
    category: "Etiquette",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
    author: "Amara Okafor",
  },
];

export const categories: Category[] = [
  {
    name: "Hidden Gems",
    description: "Off-the-beaten-path cafés only locals know",
    icon: "✦",
    count: 847,
  },
  {
    name: "Digital Nomad",
    description: "Reliable WiFi, power outlets, long-stay friendly",
    icon: "⌘",
    count: 1243,
  },
  {
    name: "Rooftop Views",
    description: "Coffee with panoramic city and mountain vistas",
    icon: "◈",
    count: 392,
  },
  {
    name: "Historic Cafés",
    description: "Establishments with over 50 years of heritage",
    icon: "❋",
    count: 628,
  },
  {
    name: "Farm Tours",
    description: "Bean-to-cup experiences at working plantations",
    icon: "⚘",
    count: 215,
  },
  {
    name: "Late Night",
    description: "Cafés that keep brewing past midnight",
    icon: "☽",
    count: 534,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Elena Vasquez",
    role: "Travel Photographer",
    location: "Barcelona, Spain",
    quote:
      "MusafirCaffe changed how I travel. Every city now starts with their café map — I've discovered places I never would have found on my own.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "James Okonkwo",
    role: "Digital Nomad",
    location: "Bali, Indonesia",
    quote:
      "As someone who works remotely from a new city every month, this platform is indispensable. The WiFi ratings alone have saved me countless wasted mornings.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Yuki Tanaka",
    role: "Coffee Roaster",
    location: "Kyoto, Japan",
    quote:
      "The community here understands that coffee is culture. I've connected with roasters worldwide and our shop has welcomed travelers from 40+ countries.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export const communityStories: CommunityStory[] = [
  {
    title: "A Stranger's Kindness in Marrakech",
    excerpt:
      "How a wrong turn in the medina led me to a rooftop riad, mint tea, and a friendship that's lasted three years.",
    author: "Priya Sharma",
    location: "Marrakech, Morocco",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80",
    likes: 342,
  },
  {
    title: "The Coffee Farm That Changed My Career",
    excerpt:
      "I went to Colombia for a two-week holiday. Six months later, I was still there, learning to roast beans at 1,800 meters.",
    author: "Daniel Eriksson",
    location: "Salento, Colombia",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
    likes: 528,
  },
  {
    title: "Sunrise Espresso on the Amalfi Coast",
    excerpt:
      "Every morning at 5:30, the same fisherman and I share a standing espresso at Bar del Porto. No words needed — just coffee and the sea.",
    author: "Chiara Bianchi",
    location: "Positano, Italy",
    image:
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&q=80",
    likes: 891,
  },
];

export const instagramPosts: InstagramPost[] = [
  {
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80",
    alt: "Latte art in a ceramic cup at a Kyoto café",
    likes: 2341,
  },
  {
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80",
    alt: "Morning coffee with a mountain view in Medellín",
    likes: 1892,
  },
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    alt: "Traditional Ethiopian coffee ceremony setup",
    likes: 3104,
  },
  {
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&q=80",
    alt: "Parisian café terrace at golden hour",
    likes: 2756,
  },
  {
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80",
    alt: "Pour-over brewing at a specialty coffee bar",
    likes: 1467,
  },
  {
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80",
    alt: "Grand Viennese café interior with marble tables",
    likes: 2089,
  },
];

export const stats = [
  { value: "12,000+", label: "Cafés catalogued" },
  { value: "180+", label: "Countries & regions" },
  { value: "50,000+", label: "Travelers in community" },
  { value: "4.9★", label: "Average traveler rating" },
] as const;
