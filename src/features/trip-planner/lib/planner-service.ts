import { plannerDestinations } from "../data/mock-destinations";
import type { GeneratedTripPlan, TripPlannerFormData } from "../types";

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en", { month: "short", day: "numeric" });
}

function budgetLabel(budget: TripPlannerFormData["budget"]): string {
  switch (budget) {
    case "luxury":
      return "Luxury";
    case "comfortable":
      return "Comfortable";
    case "mid-range":
      return "Mid-range";
    default:
      return "Value";
  }
}

function createTimeWindow(day: number): string {
  const windows = ["08:00", "10:30", "13:30", "18:00"];
  return windows[(day - 1) % windows.length];
}

export function buildTripPlan(input: TripPlannerFormData): GeneratedTripPlan {
  const destination = plannerDestinations.find((item) => item.name === input.destination) ?? plannerDestinations[0];
  const start = formatDate(input.startDate);
  const end = formatDate(input.endDate);
  const dayCount = Math.max(3, Math.round((new Date(input.endDate).getTime() - new Date(input.startDate).getTime()) / 86_400_000) + 1);
  const budgetValue = input.budgetAmount + input.travelers * 180 + dayCount * 140;
  const title = `${destination.name} ${budgetLabel(input.budget)} Route`;
  const subtitle = `${start} – ${end} · ${input.travelers} traveler${input.travelers > 1 ? "s" : ""}`;

  return {
    id: `${destination.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    title,
    subtitle,
    destination: destination.name,
    overview: `A ${input.travelStyle} plan designed around ${input.coffeePreferences[0] ?? "local coffee"}, ${input.interests[0] ?? "culture"}, and a ${input.accommodationType} stay.`,
    heroNote: `${destination.description} The day structure balances calm mornings, cultural depth, and time for lingering over coffee.`,
    estimatedBudget: `${budgetLabel(input.budget)} · ${new Intl.NumberFormat("en", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(budgetValue)}`,
    estimatedBudgetValue: budgetValue,
    days: Array.from({ length: dayCount }, (_, index) => ({
      day: index + 1,
      title: index === 0 ? "Arrival and slow start" : index === dayCount - 1 ? "Gentle finale" : `Day ${index + 1}`,
      summary: index === 0
        ? "Ease into the city with a warm welcome, a long breakfast, and a first cultural loop."
        : index === dayCount - 1
          ? "Leave space for one last market stop and a favorite café before departure."
          : "Blend a neighborhood walk with a landmark visit and a coffee pause at a local favorite.",
      activities: [
        `${input.interests[0] ?? "culture"} stop`,
        `${input.interests[1] ?? "local dining"} break`,
        `${input.travelStyle} route pacing`,
      ],
      cafes: [
        input.coffeePreferences[0] ?? "signature pour-over",
        input.coffeePreferences[1] ?? "late afternoon espresso",
      ],
      hotel: input.accommodationType,
    })),
    places: [
      { name: `${destination.name} Old Town`, area: "Historic core", reason: "Best for a first cultural loop and easy walking", time: `${createTimeWindow(1)}–11:30` },
      { name: "Local market circuit", area: "Neighborhood", reason: "Ideal for food-forward discovery and conversations", time: `12:00–15:00` },
      { name: "Sunset viewpoint", area: "Scenic edge", reason: "A calm closure to a day of movement and atmosphere", time: `17:30–20:00` },
    ],
    cafes: [
      { name: `${destination.name} Coffee House`, area: "Design quarter", whyItFits: `A refined pick for ${input.coffeePreferences[0] ?? "coffee lovers"}.` },
      { name: "Neighborhood roaster", area: "Local alley", whyItFits: `Perfect for ${input.travelStyle} pacing and a quieter break.` },
    ],
    hotels: [
      { name: `The ${destination.name} Residence`, type: input.accommodationType, reason: "Central, calm, and easy for day-to-day movement." },
      { name: `Harbor ${destination.name} Stay`, type: input.accommodationType, reason: "A softer option for longer stays and more flexibility." },
    ],
    transportation: [
      `Primary transit: ${input.transportPreference}`,
      `Suggested transfer: ${input.travelers > 2 ? "pre-booked private transfer" : "shared transfer"}`,
      `Airport connection: ${input.budget === "luxury" ? "VIP pickup" : "standard transfer"}`,
    ],
    weatherSummary: [
      "Mornings are likely to feel cool and comfortable for walking.",
      "Afternoon temperatures are ideal for lingering outdoors.",
      "A light jacket or layer will be useful in the evening.",
    ],
    localTips: [
      "Reserve the most popular cafés a day in advance if the route is busy.",
      "Keep a little time unstructured so the trip can breathe.",
      "Use a small cash reserve for neighborhood stops and market purchases.",
    ],
    packingSuggestions: [
      "A polished layer for evening plans",
      "Comfortable shoes for extended walking",
      "A compact umbrella and power bank",
    ],
    mapPlaceholder: "Map integration is ready for Google Maps or Mapbox when the travel API is connected.",
    generatedAt: new Date().toLocaleString("en", { dateStyle: "medium", timeStyle: "short" }),
    tags: [input.travelStyle, input.budget, input.transportPreference],
  };
}

function readStoredPlans(): GeneratedTripPlan[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem("musafir-trip-plans");
    return raw ? (JSON.parse(raw) as GeneratedTripPlan[]) : [];
  } catch {
    return [];
  }
}

function writeStoredPlans(plans: GeneratedTripPlan[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("musafir-trip-plans", JSON.stringify(plans));
}

export const tripPlannerRepository = {
  getSavedTrips() {
    return readStoredPlans();
  },
  saveTrip(plan: GeneratedTripPlan) {
    const plans = readStoredPlans();
    const next = [plan, ...plans.filter((item) => item.id !== plan.id)];
    writeStoredPlans(next);
    return next;
  },
  duplicateTrip(plan: GeneratedTripPlan) {
    const duplicate = { ...plan, id: `${plan.id}-copy-${Date.now()}`, title: `${plan.title} Copy` };
    return this.saveTrip(duplicate);
  },
  toggleFavorite(planId: string) {
    const favorites = readStoredPlans().filter((item) => item.id === planId);
    return favorites.length > 0;
  },
  async shareTrip(plan: GeneratedTripPlan) {
    if (typeof navigator === "undefined") {
      return false;
    }

    const shareText = `${plan.title}\n${plan.subtitle}\n${plan.estimatedBudget}`;

    if (navigator.share) {
      await navigator.share({ title: plan.title, text: shareText });
      return true;
    }

    await navigator.clipboard.writeText(shareText);
    return true;
  },
  exportPdf(plan: GeneratedTripPlan) {
    if (typeof window === "undefined") {
      return false;
    }

    window.dispatchEvent(new CustomEvent("planner:export", { detail: plan }));
    window.print();
    return true;
  },
};
