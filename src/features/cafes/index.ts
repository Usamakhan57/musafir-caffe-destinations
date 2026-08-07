/**
 * Cafés feature — listing + detail pages for curated cafés.
 *
 * This follows the same feature-based architecture as the destinations module
 * so future data-source changes stay contained to this package.
 */
export {
  CafeCard,
  CafesGrid,
  CafesToolbar,
  CafesListingHero,
  PaginationControls,
  CafeHero,
  Gallery,
  AmenitiesSection,
  HighlightsSection,
  ReviewsSection,
  NearbyCafesSection,
  RelatedDestinationsSection,
  CafeActions,
  AboutStorySection,
  ScoresSection,
  MenuHighlightsSection,
  ContactInfoSection,
  FoodOptionsSection,
  NearbyAttractionsSection,
  MapPlaceholderSection,
  SignatureCoffeeBanner,
} from "./components";

export { getFilterOptions } from "./data/cafes-store";
/** Prefer `./data/cafes-loader` in Server Components / route handlers. */
export {
  getAllCafes,
  getCafeBySlug,
  getCafeSlugs,
  getNearbyCafes,
} from "./data/cafes-store";

export {
  CAFES_PAGE_SIZE,
  parseCafeFilters,
  filterCafes,
  sortCafes,
  paginate,
  buildCafeQuery,
} from "./lib/query";

export { isCafeOpenNow } from "./data/enrich-cafe";

export type {
  CafeCategory,
  CoffeeType,
  CafeSortOption,
  PriceLevel,
  CafeSummary,
  CafeDetail,
  CafeFilters,
  FilterOptions,
  PaginatedResult,
  GalleryImage,
  Review,
  MenuHighlight,
  NearbyAttraction,
  MapPlaceholder,
} from "./types";

export { CAFE_CATEGORIES, CAFE_SORT_OPTIONS, COFFEE_TYPES } from "./types";
