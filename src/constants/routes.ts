/**
 * Typed route registry.
 * Reference these instead of hard-coding path strings, so route
 * changes stay refactor-safe.
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  profile: "/profile",
  dashboard: "/dashboard",
  dashboardTrips: "/dashboard/trips",
  dashboardPlanner: "/dashboard/planner",
  dashboardWishlist: "/dashboard/wishlist",
  dashboardCommunity: "/dashboard/community",
  dashboardMessages: "/dashboard/messages",
  dashboardNotifications: "/dashboard/notifications",
  dashboardAchievements: "/dashboard/achievements",
  dashboardProfile: "/dashboard/profile",
  dashboardAccount: "/dashboard/account",
  dashboardSecurity: "/dashboard/security",
  dashboardBilling: "/dashboard/billing",
  admin: "/admin",
  destinations: "/destinations",
  cafes: "/cafes",
  guides: "/guides",
  community: "/community",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  press: "/press",
  faq: "/faq",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  travelTips: "/travel-tips",
  digitalNomads: "/digital-nomads",
  help: "/help",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Detail route for a single destination. */
export function destinationRoute(slug: string): string {
  return `${ROUTES.destinations}/${slug}`;
}

/** Detail route for a single café. */
export function cafeRoute(slug: string): string {
  return `${ROUTES.cafes}/${slug}`;
}

/** Detail route for a single travel guide. */
export function guideRoute(slug: string): string {
  return `${ROUTES.guides}/${slug}`;
}

/** Public author profile for guide writers. */
export function guideAuthorRoute(slug: string): string {
  return `${ROUTES.guides}/authors/${slug}`;
}

/** Detail route for a community travel story. */
export function communityStoryRoute(slug: string): string {
  return `${ROUTES.community}/stories/${slug}`;
}

/** Public traveler profile in the community. */
export function communityTravelerRoute(slug: string): string {
  return `${ROUTES.community}/travelers/${slug}`;
}
