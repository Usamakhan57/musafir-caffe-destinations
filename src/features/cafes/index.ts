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
  PaginationControls,
  CafeHero,
  Gallery,
  AmenitiesSection,
  HighlightsSection,
  ReviewsSection,
  NearbyCafesSection,
  RelatedDestinationsSection,
} from "./components";

export {
  getAllCafes,
  getCafeBySlug,
  getCafeSlugs,
  getNearbyCafes,
  getFilterOptions,
} from "./data/cafes-store";

export {
  CAFES_PAGE_SIZE,
  parseCafeFilters,
  filterCafes,
  sortCafes,
  paginate,
  buildCafeQuery,
} from "./lib/query";

export type {
  CafeCategory,
  CafeSortOption,
  PriceLevel,
  CafeSummary,
  CafeDetail,
  CafeFilters,
  FilterOptions,
  PaginatedResult,
  GalleryImage,
  Review,
} from "./types";

export { CAFE_CATEGORIES, CAFE_SORT_OPTIONS } from "./types";
