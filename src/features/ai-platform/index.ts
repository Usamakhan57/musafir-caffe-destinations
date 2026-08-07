/**
 * AI Travel Platform — planner, smart search, maps, weather, and budget tools.
 * Additive feature package; does not modify existing product surfaces.
 */
export { AiPlannerExperience } from "./components/ai-planner-experience";
export { SmartSearchExperience } from "./components/smart-search";
export { InteractiveMapExperience } from "./components/interactive-map";
export { WeatherWidget } from "./components/weather-widget";
export { BudgetEstimatorExperience } from "./components/budget-estimator";

export {
  generateAiTripPlan,
  estimateBudget,
  getCountriesForPlanner,
  getCitiesForCountry,
  PLANNER_CITIES,
} from "./lib/planner";

export {
  buildSearchIndex,
  searchIndex,
  getSuggestions,
  TRENDING_SEARCHES,
  readRecentSearches,
  pushRecentSearch,
} from "./lib/search";

export { MAP_REGIONS, getWeatherForCity } from "./lib/maps-weather";

export type {
  AiPlannerInput,
  AiTripPlan,
  AiDayPlan,
  SearchResultItem,
  SearchResultType,
  MapMarker,
  MapRegion,
  WeatherSnapshot,
  WeatherDay,
  BudgetEstimatorInput,
  BudgetBreakdown,
  TravelParty,
  BudgetTier,
  TravelStyle,
} from "./types";

export {
  TRAVEL_PARTY,
  BUDGET_TIERS,
  TRAVEL_STYLES,
  COFFEE_PREFERENCES,
  FOOD_PREFERENCES,
} from "./types";
