/**
 * Home feature — landing page of Musafir Caffe.
 *
 * Feature-based architecture: each feature folder owns its
 *   components/  hooks/  services/  types/  utils/
 * and exposes its public API through this barrel. Features never
 * import from each other's internals — shared code belongs in
 * `@/shared` or `@/lib`.
 */
export {
  Hero,
  PremiumCards,
  HeroStats,
  FeaturedDestinations,
  FeaturedCafes,
  TravelGuides,
  AiTripPlanner,
  CommunityStories,
  Testimonials,
  Newsletter,
} from "./components";
