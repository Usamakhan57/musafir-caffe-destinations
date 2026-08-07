/**
 * Travel Guides feature — listing, detail, and author pages.
 */
export { default as GuidesHero } from "./components/hero";
export { default as GuidesSearch } from "./components/search";
export { default as Categories } from "./components/categories";
export { default as FeaturedGuides } from "./components/featured";
export { default as LatestGuides } from "./components/latest";
export { default as EditorsPicks } from "./components/editors-picks";
export { default as TrendingGuides } from "./components/trending";
export { default as CountryExplorer } from "./components/country-explorer";
export { default as CoffeeGuides } from "./components/coffee-guides";
export { default as WorldMap } from "./components/world-map";
export { default as NewsletterCTA } from "./components/newsletter";
export { default as GuideCard } from "./components/guide-card";
export { GuidesToolbar } from "./components/guides-toolbar";
export { GuidesPagination } from "./components/guides-pagination";
export { GuidesEmptyState } from "./components/guides-empty-state";
export { GuidesSkeleton, GuideDetailSkeleton } from "./components/guides-skeleton";
export { BrowseGuidesSection } from "./components/browse-guides-section";
export { ReadingProgressBar } from "./components/reading-progress-bar";
export { GuideActions } from "./components/guide-actions";
export {
  GuideArticleContent,
  GuideCoffeeFoods,
  GuideFaqSection,
  GuideCommentsPlaceholder,
} from "./components/guide-article";
export { GuideDetailHero } from "./components/guide-detail-hero";
export { GuideToc, GuideStickySidebar } from "./components/guide-toc";
export {
  GuideGallery,
  NearbyCafesFromGuide,
  NearbyDestinationsFromGuide,
  RelatedGuidesSection as GuidesRelatedSection,
  BackToGuidesLink,
} from "./components/guide-detail-sections";
export { AuthorProfile } from "./components/author-profile";

export {
  getAllGuides,
  getGuideBySlug,
  getGuideSlugs,
  getGuidesBySlugs,
  getFeaturedGuides,
  getTrendingGuides,
  getEditorsPicks,
  getLatestGuides,
  getAllAuthors,
  getAuthorBySlug,
  getGuidesByAuthor,
  getGuideFilterOptions,
  getAuthorForGuide,
} from "./data/guides-store";

export {
  GUIDES_PAGE_SIZE,
  parseGuideFilters,
  filterGuides,
  sortGuides,
  paginate,
  buildGuidesQuery,
  getFilterOptionsForUI,
} from "./lib/query";

export type {
  GuideCategory,
  GuideSortOption,
  ReadingTimeFilter,
  GuideAuthor,
  GuideSummary,
  GuideDetail,
  GuideContentBlock,
  GuideFaq,
  GuideCoffeeRec,
  GuideLocalFood,
  GuideFilters,
  GuideFilterOptions,
  PaginatedResult,
} from "./types";

export { GUIDE_CATEGORIES, GUIDE_SORT_OPTIONS, READING_TIME_FILTERS } from "./types";
