export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  category: "account" | "travel" | "billing" | "quality";
};

export const helpArticles: HelpArticle[] = [
  {
    slug: "getting-started",
    title: "Getting started with MusafirCaffe",
    summary: "Create an account, explore destinations, and save your first café.",
    category: "account",
    body: [
      "Browse Destinations and Cafés without an account.",
      "Join free to unlock wishlist, trip planner, and community posting.",
      "Verify your email to secure password resets and membership receipts.",
    ],
  },
  {
    slug: "reviews-and-ratings",
    title: "Reviews & ratings",
    summary: "How traveler reviews are submitted, moderated, and displayed.",
    category: "quality",
    body: [
      "Anyone can submit a review on destination and café pages.",
      "New reviews enter moderation (pending) before publishing.",
      "Staff moderators manage reviews from the Admin CMS.",
      "Star ratings use accessible labels and average aggregates where published.",
    ],
  },
  {
    slug: "membership-billing",
    title: "Membership & billing",
    summary: "Explorer, Nomad, and Connoisseur plans with payment-ready checkout.",
    category: "billing",
    body: [
      "Open Membership to compare plans.",
      "Checkout creates a payment intent draft — live charging activates when STRIPE_SECRET_KEY is configured.",
      "Manage plan status from Dashboard → Billing.",
    ],
  },
  {
    slug: "offline-and-pwa",
    title: "Offline support & PWA",
    summary: "Install MusafirCaffe and keep key pages available offline.",
    category: "travel",
    body: [
      "Add the app from your browser using the web manifest.",
      "The service worker caches the app shell and recent pages.",
      "If you lose connectivity, you are redirected to the Offline page.",
    ],
  },
  {
    slug: "accessibility-audit",
    title: "Accessibility audit notes",
    summary: "Production a11y checklist covering skip links, labels, focus, and motion.",
    category: "quality",
    body: [
      "Skip link targets #main-content on every page.",
      "Forms expose labels, required fields, and role=status feedback.",
      "Interactive cards use focus-visible outlines in brand teal.",
      "Motion respects prefers-reduced-motion in navbar and home animations.",
      "Error and offline states use role=alert for assistive tech.",
    ],
  },
  {
    slug: "seo-audit",
    title: "SEO audit notes",
    summary: "Canonical metadata, sitemap, robots, and structured data coverage.",
    category: "quality",
    body: [
      "createPageMetadata standardizes title, description, canonical, OG, and Twitter tags.",
      "/sitemap.xml enumerates core marketing and catalog routes.",
      "/robots.txt allows public crawl and blocks /admin, /dashboard, /api.",
      "JSON-LD covers Organization, WebSite, FAQPage, and Product offers on commerce pages.",
    ],
  },
  {
    slug: "performance-audit",
    title: "Performance & Lighthouse notes",
    summary: "Image remote patterns, font display swap, and loading skeletons.",
    category: "quality",
    body: [
      "Fonts use display: swap to avoid invisible text.",
      "Route-level loading.tsx skeletons reduce layout shift perception.",
      "next/image remotePatterns whitelist Unsplash only.",
      "Security headers enable HSTS and frame restrictions without blocking core UX.",
      "PWA caching prefers network for HTML and cache-first for static assets.",
    ],
  },
  {
    slug: "security-review",
    title: "Security review notes",
    summary: "Auth gates, validation, headers, and payment-ready boundaries.",
    category: "quality",
    body: [
      "Admin and dashboard routes require authenticated sessions; staff roles gate CMS.",
      "APIs validate payloads with Zod before mutating stores.",
      "Contact and review submissions never trust client-only checks alone.",
      "Payment checkout issues mock intents unless a provider secret is present.",
      "CSP/HSTS/XFO headers ship from next.config for production hardening.",
    ],
  },
];

export function getHelpArticle(slug: string) {
  return helpArticles.find((article) => article.slug === slug) ?? null;
}

export function getHelpArticleSlugs() {
  return helpArticles.map((article) => article.slug);
}
