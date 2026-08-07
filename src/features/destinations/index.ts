/**
 * Destinations feature — listing + detail pages for the destinations
 * users can browse and plan trips around.
 *
 * Feature-based architecture: this folder owns its
 *   components/  data/  lib/  types/
 * and exposes its public API through this barrel. Other features
 * should never import from `./components/...` etc. directly.
 */
export {
  RatingStars,
  DestinationCard,
  DestinationsGrid,
  DestinationsToolbar,
  DestinationsListingHero,
  PaginationControls,
  DestinationHero,
  Gallery,
  BestCafesSection,
  TravelTipsSection,
  ThingsToDoSection,
  NearbyDestinationsSection,
  ReviewsSection,
  DetailCta,
  ShareButtons,
  OverviewSection,
  HistorySection,
  CoffeeCultureSection,
  AttractionsSection,
  LocalFoodsSection,
  BestTimeSection,
  WeatherSection,
  BudgetEstimatorSection,
  TransportationSection,
  MapPlaceholderSection,
  FaqSection,
  RelatedGuidesSection,
} from "./components";

export {
  getAllDestinations,
  getDestinationBySlug,
  getDestinationSlugs,
  getNearbyDestinations,
  getFilterOptions,
} from "./data/destinations-store";

export {
  DESTINATIONS_PAGE_SIZE,
  parseDestinationFilters,
  filterDestinations,
  sortDestinations,
  paginate,
  buildDestinationsQuery,
} from "./lib/query";

export type {
  Region,
  Continent,
  Category,
  Season,
  CoffeeCulture,
  SortOption,
  PriceLevel,
  DestinationSummary,
  DestinationDetail,
  DestinationFilters,
  FilterOptions,
  PaginatedResult,
  GalleryImage,
  FeaturedCafe,
  TravelTip,
  Activity,
  Review,
  LocalFood,
  Attraction,
  WeatherMonth,
  BudgetBreakdown,
  TransportOption,
  FaqItem,
  RelatedGuide,
  MapPlaceholder,
} from "./types";

export {
  REGIONS,
  CATEGORIES,
  SORT_OPTIONS,
  SEASONS,
  COFFEE_CULTURES,
} from "./types";
