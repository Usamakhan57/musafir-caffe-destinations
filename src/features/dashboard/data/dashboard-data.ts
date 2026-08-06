import type {
  DashboardOverview,
  MessageThread,
  NotificationItem,
  ProfileData,
  Trip,
  WishlistItem,
} from "../types";

export const dashboardOverviewData: Record<string, DashboardOverview> = {
  traveler: {
    roleTitle: "Traveler lounge",
    roleDescription: "A calm, premium view of your plans, saved places, and travel momentum.",
    welcomeTitle: "Your next coffee-fueled escape is ready.",
    welcomeSubtitle: "We’ve curated a polished plan around your saved places, recent activity, and the best fit for your travel style.",
    metrics: [
      { label: "Trips", value: "12", hint: "Across 9 countries" },
      { label: "Coffee stops", value: "27", hint: "Mapped and saved" },
      { label: "Upcoming", value: "3", hint: "One AI planned" },
    ],
    recommendations: [
      { title: "Addis Ababa", subtitle: "Coffee heritage and urban energy", cta: "Explore", href: "/destinations/addis-ababa" },
      { title: "Melbourne", subtitle: "Design cafés and cultural depth", cta: "Discover", href: "/destinations/melbourne" },
    ],
    recentActivity: [
      { title: "Booked a café-hopping route in Kyoto", detail: "2h ago" },
      { title: "Saved 3 destinations for winter travel", detail: "Yesterday" },
      { title: "Joined the community discussion on slow travel", detail: "3 days ago" },
    ],
    savedPlaces: [
      { name: "Cafe Central", location: "Vienna" },
      { name: "Tomoca", location: "Addis" },
      { name: "Fuglen", location: "Tokyo" },
    ],
    aiSuggestions: [
      { title: "Ideal morning route", body: "Start at a riverside café, then continue to two compact cultural stops." },
      { title: "Best coffee pairing", body: "Pair your destination with a relaxed late-afternoon pastry stop." },
    ],
  },
  "cafe-owner": {
    roleTitle: "Café operations",
    roleDescription: "Keep your café story, community notes, and guest momentum in one refined place.",
    welcomeTitle: "Your café presence is shaping beautifully.",
    welcomeSubtitle: "Your latest highlights and local recommendations are ready to share with every traveler.",
    metrics: [
      { label: "Visits", value: "184", hint: "This month" },
      { label: "Replies", value: "92", hint: "Community conversations" },
      { label: "Saved guides", value: "17", hint: "Your local favorites" },
    ],
    recommendations: [
      { title: "Local guide spotlights", subtitle: "Feature your best morning rituals", cta: "Manage", href: "/dashboard/profile" },
      { title: "Traveler reach", subtitle: "Connect your café story with the right audience", cta: "View", href: "/dashboard/community" },
    ],
    recentActivity: [
      { title: "Opened a new weekend tasting menu", detail: "Today" },
      { title: "Responded to 4 traveler messages", detail: "Yesterday" },
      { title: "Saved a new route for coffee lovers", detail: "2 days ago" },
    ],
    savedPlaces: [
      { name: "Neighborhood roast", location: "Your local area" },
      { name: "Rosetta coffee room", location: "Your community" },
    ],
    aiSuggestions: [
      { title: "Guest experience pulse", body: "Use your latest notes to tailor a calm, premium stay." },
    ],
  },
  "guide-creator": {
    roleTitle: "Guide studio",
    roleDescription: "Shape itinerary updates, recommendations, and your latest guide material with clarity.",
    welcomeTitle: "Your newest guide is almost live.",
    welcomeSubtitle: "The next route, story, and recommendation set is waiting for a final polish.",
    metrics: [
      { label: "Guides", value: "8", hint: "Published" },
      { label: "Feedback", value: "146", hint: "Traveler comments" },
      { label: "Routes", value: "12", hint: "In review" },
    ],
    recommendations: [
      { title: "New itinerary draft", subtitle: "A refined slow-travel route", cta: "Open", href: "/dashboard/trips" },
      { title: "Coffee route pack", subtitle: "Tailored to your audience", cta: "Preview", href: "/dashboard/wishlist" },
    ],
    recentActivity: [
      { title: "Updated your spring route notes", detail: "Today" },
      { title: "Shared a fresh guide review", detail: "Yesterday" },
    ],
    savedPlaces: [
      { name: "Atlas route", location: "Morocco" },
      { name: "Harbor walk", location: "Lisbon" },
    ],
    aiSuggestions: [
      { title: "Route pacing", body: "Balance the day so your audience has the right depth for each stop." },
    ],
  },
  admin: {
    roleTitle: "Command center",
    roleDescription: "Coordinate the community with a calm administrative view of metrics, safety, and momentum.",
    welcomeTitle: "The community is moving with clarity.",
    welcomeSubtitle: "Your dashboard is designed to keep the experience polished for every role and every journey.",
    metrics: [
      { label: "Active members", value: "2.3k", hint: "Across the network" },
      { label: "Reviews", value: "841", hint: "Recently shared" },
      { label: "Needs review", value: "19", hint: "Pending" },
    ],
    recommendations: [
      { title: "Community review", subtitle: "Spotlight the healthiest trends", cta: "Inspect", href: "/dashboard/community" },
      { title: "Member insights", subtitle: "Support growth with calm structure", cta: "Open", href: "/dashboard/notifications" },
    ],
    recentActivity: [
      { title: "Community metrics refreshed", detail: "Today" },
      { title: "New members joined the platform", detail: "Yesterday" },
    ],
    savedPlaces: [
      { name: "Admin review queue", location: "Platform" },
      { name: "Growth insights", location: "Operations" },
    ],
    aiSuggestions: [
      { title: "Priority support", body: "Move the most urgent community needs to the top of your day." },
    ],
  },
};

export const tripsData: Trip[] = [
  {
    id: "trip-1",
    title: "Istanbul to Cappadocia",
    destination: "Turkey",
    dates: "Apr 18 – Apr 24",
    status: "upcoming",
    description: "A seamless blend of slow mornings, cave stays, and coffee-led side trips.",
    progress: "72% planned",
    tags: ["AI planned", "Mountain views"],
  },
  {
    id: "trip-2",
    title: "Marrakech weekend",
    destination: "Morocco",
    dates: "May 02 – May 05",
    status: "ai-generated",
    description: "A compact route designed around courtyards, rooftops, and local roasters.",
    progress: "45% planned",
    tags: ["Draft", "Community picked"],
  },
  {
    id: "trip-3",
    title: "Kyoto spring reset",
    destination: "Japan",
    dates: "Mar 12 – Mar 18",
    status: "completed",
    description: "A remembered route with careful café stops and thoughtful walking days.",
    progress: "Completed",
    tags: ["Archivd", "Refined"],
  },
];

export const wishlistData: WishlistItem[] = [
  {
    id: "wish-1",
    title: "Addis Ababa",
    category: "destination",
    location: "Ethiopia",
    notes: "Coffee heritage and late-night culture.",
    savedAt: "Saved 2 days ago",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: "wish-2",
    title: "Cafe Central",
    category: "cafe",
    location: "Vienna",
    notes: "A classic for long conversations and ritual coffee.",
    savedAt: "Saved 5 days ago",
    accent: "from-slate-700 to-blue-700",
  },
  {
    id: "wish-3",
    title: "Roads of the Atlas",
    category: "guide",
    location: "Morocco",
    notes: "A practical route for spring and resilient travel.",
    savedAt: "Saved 1 week ago",
    accent: "from-amber-500 to-orange-500",
  },
];

export const notificationsData: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Your trip plan was updated",
    message: "New itinerary notes are ready for your Istanbul route.",
    time: "15m ago",
    unread: true,
    category: "trip",
  },
  {
    id: "notif-2",
    title: "A new community reply arrived",
    message: "Someone answered your café route question.",
    time: "1h ago",
    unread: true,
    category: "community",
  },
  {
    id: "notif-3",
    title: "Your billing update is ready",
    message: "The latest invoice summary is available.",
    time: "Yesterday",
    unread: false,
    category: "billing",
  },
];

export const messageThreadsData: MessageThread[] = [
  {
    id: "thread-1",
    name: "Mina",
    role: "Traveler",
    preview: "I found a quiet café in Alfama that matches your taste.",
    unread: true,
    online: true,
    messages: [
      { id: "m1", from: "them", content: "I found a quiet café in Alfama that matches your taste.", time: "09:22" },
      { id: "m2", from: "me", content: "Perfect — I’ll save it for the evening route.", time: "09:24" },
    ],
  },
  {
    id: "thread-2",
    name: "Sami",
    role: "Guide creator",
    preview: "The revised route should be ready by tomorrow morning.",
    unread: false,
    online: false,
    messages: [
      { id: "m3", from: "them", content: "The revised route should be ready by tomorrow morning.", time: "08:10" },
    ],
  },
];

export const profileData: ProfileData = {
  fullName: "Alicia Moreno",
  email: "alicia@example.com",
  location: "London, United Kingdom",
  bio: "I’m drawn to slow mornings, old cafés, and city walks with a beautiful route.",
  languages: ["English", "Turkish", "French"],
  travelStyle: ["Slow travel", "Design", "Coffee culture"],
  coffeePreference: ["Flat whites", "Single-origin pour-over"],
  socialLinks: [
    { label: "Instagram", value: "@alicia.travel" },
    { label: "X", value: "@aliciasjourneys" },
  ],
  profileCompletion: 87,
  achievements: [
    { title: "Coffee explorer", detail: "10 cafés logged" },
    { title: "Weekend wanderer", detail: "5 city breaks" },
  ],
};
