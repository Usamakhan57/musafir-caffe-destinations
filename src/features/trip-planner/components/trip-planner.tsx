"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { accommodationOptions, coffeePreferences, interests, plannerDestinations, transportOptions, travelStyles } from "../data/mock-destinations";
import { buildTripPlan, tripPlannerRepository } from "../lib/planner-service";
import type { GeneratedTripPlan, TripPlannerAccommodation, TripPlannerBudget, TripPlannerFormData, TripPlannerTransport } from "../types";

const initialFormData: TripPlannerFormData = {
  destination: plannerDestinations[0].name,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  travelers: 2,
  budget: "mid-range",
  budgetAmount: 2800,
  travelStyle: "slow travel",
  coffeePreferences: [coffeePreferences[0]],
  interests: [interests[0]],
  accommodationType: "boutique hotel",
  transportPreference: "hybrid",
  notes: "Keep the pace elegant and relaxed.",
};

const steps = [
  { key: "destination", title: "Destination", description: "Choose a place that fits the mood of the route." },
  { key: "dates", title: "Dates", description: "Set the length and group size." },
  { key: "budget", title: "Budget", description: "Shape the comfort level and daily spend." },
  { key: "style", title: "Style", description: "Choose the rhythm of the trip." },
  { key: "coffee", title: "Coffee", description: "Highlight the rituals you want to protect." },
  { key: "interests", title: "Interests", description: "Add your cultural and lifestyle priorities." },
  { key: "review", title: "Generate", description: "Turn the route into a polished itinerary." },
] as const;

export function TripPlanner() {
  const [formData, setFormData] = useState<TripPlannerFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedTripPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedTripIds, setSavedTripIds] = useState<string[]>(() => tripPlannerRepository.getSavedTrips().map((item) => item.id));
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState("Create a plan that feels calm, curated, and ready to book.");

  const activeStep = steps[currentStep];

  const summary = useMemo(() => {
    const destination = plannerDestinations.find((item) => item.name === formData.destination) ?? plannerDestinations[0];
    return {
      destination,
      days: Math.max(3, Math.round((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / 86_400_000) + 1),
    };
  }, [formData.destination, formData.endDate, formData.startDate]);

  function updateForm<K extends keyof TripPlannerFormData>(key: K, value: TripPlannerFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleChip(field: "coffeePreferences" | "interests", value: string) {
    setFormData((prev) => {
      const values = prev[field];
      const next = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
      return { ...prev, [field]: next };
    });
  }

  function goNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function goBack() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function handleGenerate() {
    setIsGenerating(true);
    setStatusMessage("Drafting your route and itinerary...");

    window.setTimeout(() => {
      const plan = buildTripPlan(formData);
      setGeneratedPlan(plan);
      setIsGenerating(false);
      setStatusMessage("Your itinerary is ready for review.");
    }, 800);
  }

  async function handleSaveTrip() {
    if (!generatedPlan) {
      return;
    }

    const next = tripPlannerRepository.saveTrip(generatedPlan);
    setSavedTripIds(next.map((item) => item.id));
    setStatusMessage("Trip saved to your dashboard workspace.");
  }

  async function handleDuplicateTrip() {
    if (!generatedPlan) {
      return;
    }

    const next = tripPlannerRepository.duplicateTrip(generatedPlan);
    setSavedTripIds(next.map((item) => item.id));
    setStatusMessage("A duplicate version is ready for changes.");
  }

  async function handleShareTrip() {
    if (!generatedPlan) {
      return;
    }

    const shared = await tripPlannerRepository.shareTrip(generatedPlan);
    setStatusMessage(shared ? "Trip shared successfully." : "Sharing is unavailable here, but the summary is ready to copy.");
  }

  function handleFavoriteTrip() {
    if (!generatedPlan) {
      return;
    }

    const next = favoriteIds.includes(generatedPlan.id) ? favoriteIds.filter((id) => id !== generatedPlan.id) : [...favoriteIds, generatedPlan.id];
    setFavoriteIds(next);
    setStatusMessage(next.includes(generatedPlan.id) ? "Trip bookmarked as a favorite." : "Favorite removed.");
  }

  function handleExportPdf() {
    if (!generatedPlan) {
      return;
    }

    tripPlannerRepository.exportPdf(generatedPlan);
    setStatusMessage("Print view opened for export.");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-6 text-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.6)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-100">AI Trip Planner</p>
            <h2 className="mt-2 text-3xl font-semibold">A premium trip builder for your next elegant escape.</h2>
            <p className="mt-3 max-w-2xl text-sm text-blue-50/90">The experience follows your destination, budget, pace, and coffee preferences to produce a calm itinerary with a clear structure and smart next steps.</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur">
            <p className="font-semibold">Progress</p>
            <p className="mt-1 text-blue-50/90">{generatedPlan ? "Itinerary ready" : `${currentStep + 1}/${steps.length} guided steps`}</p>
            <p className="mt-1 text-blue-50/80">Saved plans: {savedTripIds.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Planner flow</p>
            <div className="mt-4 space-y-3">
              {steps.map((step, index) => {
                const completed = index < currentStep || Boolean(generatedPlan);
                const active = index === currentStep && !generatedPlan;

                return (
                  <div key={step.key} className={`rounded-2xl border px-3 py-3 ${active ? "border-blue-200 bg-blue-50" : completed ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${active ? "bg-blue-600 text-white" : completed ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{step.title}</p>
                        <p className="text-sm text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Current brief</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{summary.destination.name}</p>
            <p className="mt-2 text-sm text-slate-600">{summary.days} days · {formData.travelers} travelers · {formData.budgetAmount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} target</p>
            <p className="mt-3 text-sm text-slate-600">{formData.notes}</p>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <AnimatePresence mode="wait">
            {!generatedPlan ? (
              <motion.div key={activeStep.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Choose your destination</h3>
                      <p className="mt-1 text-sm text-slate-600">Think of a place with both atmosphere and easy coffee stops.</p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {plannerDestinations.map((destination) => (
                        <button key={destination.name} type="button" onClick={() => updateForm("destination", destination.name)} className={`rounded-[20px] border p-4 text-left transition ${formData.destination === destination.name ? "border-blue-400 bg-blue-50 shadow-sm" : "border-slate-200 bg-white hover:border-blue-200"}`}>
                          <p className="font-semibold text-slate-900">{destination.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{destination.region}</p>
                          <p className="mt-2 text-sm text-slate-500">{destination.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Select travel dates</h3>
                      <p className="mt-1 text-sm text-slate-600">The planner will shape pacing and daily rhythm around your arrival and departure.</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <span className="mb-2 block font-semibold text-slate-900">Start date</span>
                        <input type="date" value={formData.startDate} onChange={(event) => updateForm("startDate", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
                      </label>
                      <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <span className="mb-2 block font-semibold text-slate-900">End date</span>
                        <input type="date" value={formData.endDate} onChange={(event) => updateForm("endDate", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
                      </label>
                    </div>
                    <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <span className="mb-2 block font-semibold text-slate-900">Travelers</span>
                      <input type="number" min="1" max="8" value={formData.travelers} onChange={(event) => updateForm("travelers", Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
                    </label>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Choose your budget</h3>
                      <p className="mt-1 text-sm text-slate-600">The planner will tune hotel suggestions and the feel of each day.</p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {(["value", "mid-range", "comfortable", "luxury"] as TripPlannerBudget[]).map((level) => (
                        <button key={level} type="button" onClick={() => updateForm("budget", level)} className={`rounded-2xl border p-4 text-left capitalize transition ${formData.budget === level ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-200"}`}>
                          {level.replace("-", " ")}
                        </button>
                      ))}
                    </div>
                    <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <span className="mb-2 block font-semibold text-slate-900">Budget target</span>
                      <input type="range" min="1200" max="9000" step="100" value={formData.budgetAmount} onChange={(event) => updateForm("budgetAmount", Number(event.target.value))} className="w-full" />
                      <p className="mt-2 text-sm font-semibold text-slate-900">{formData.budgetAmount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</p>
                    </label>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Choose your travel style</h3>
                      <p className="mt-1 text-sm text-slate-600">The itinerary will match the rhythm you want the trip to have.</p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {travelStyles.map((style) => (
                        <button key={style} type="button" onClick={() => updateForm("travelStyle", style)} className={`rounded-2xl border px-4 py-3 text-left capitalize transition ${formData.travelStyle === style ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-200"}`}>
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Coffee preferences</h3>
                      <p className="mt-1 text-sm text-slate-600">The route will include cafés and rituals that fit how you like to pause.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {coffeePreferences.map((item) => (
                        <button key={item} type="button" onClick={() => toggleChip("coffeePreferences", item)} className={`rounded-full px-3 py-2 text-sm ${formData.coffeePreferences.includes(item) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Activities and interests</h3>
                      <p className="mt-1 text-sm text-slate-600">Add your cultural and lifestyle priorities to shape the daily flow.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((item) => (
                        <button key={item} type="button" onClick={() => toggleChip("interests", item)} className={`rounded-full px-3 py-2 text-sm ${formData.interests.includes(item) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <span className="mb-2 block font-semibold text-slate-900">Accommodation</span>
                        <select value={formData.accommodationType} onChange={(event) => updateForm("accommodationType", event.target.value as TripPlannerAccommodation)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                          {accommodationOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </label>
                      <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <span className="mb-2 block font-semibold text-slate-900">Transport</span>
                        <select value={formData.transportPreference} onChange={(event) => updateForm("transportPreference", event.target.value as TripPlannerTransport)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                          {transportOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </label>
                    </div>
                    <label className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <span className="mb-2 block font-semibold text-slate-900">Notes</span>
                      <textarea value={formData.notes} onChange={(event) => updateForm("notes", event.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" />
                    </label>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">Review your planner brief</h3>
                      <p className="mt-1 text-sm text-slate-600">Everything is shaped to feel elegant and practical before the itinerary is generated.</p>
                    </div>
                    <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">Trip brief</p>
                      <p className="mt-2">{formData.destination} · {summary.days} days · {formData.travelers} travelers · {formData.travelStyle} · {formData.budget}</p>
                      <p className="mt-2">Coffee: {formData.coffeePreferences.join(", ")}</p>
                      <p className="mt-2">Interests: {formData.interests.join(", ")}</p>
                    </div>
                    <button type="button" onClick={handleGenerate} disabled={isGenerating} className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                      {isGenerating ? "Generating itinerary..." : "Generate AI itinerary"}
                    </button>
                  </div>
                )}

                <div className="flex justify-between gap-3 pt-2">
                  <button type="button" onClick={goBack} disabled={currentStep === 0} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50">Back</button>
                  <button type="button" onClick={goNext} disabled={currentStep === steps.length - 1} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Next step</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="itinerary" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">Generated itinerary</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-950">{generatedPlan.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{generatedPlan.subtitle}</p>
                    </div>
                    <div className="rounded-2xl border border-blue-200 bg-white/80 px-4 py-3 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">{generatedPlan.estimatedBudget}</p>
                      <p className="mt-1">Generated {generatedPlan.generatedAt}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-700">{generatedPlan.heroNote}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {generatedPlan.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{tag}</span>)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={handleSaveTrip} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Save Trip</button>
                  <button type="button" onClick={handleDuplicateTrip} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Duplicate Trip</button>
                  <button type="button" onClick={handleShareTrip} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Share Trip</button>
                  <button type="button" onClick={handleExportPdf} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Export PDF</button>
                  <button type="button" onClick={handleFavoriteTrip} className={`rounded-full px-4 py-2 text-sm font-semibold ${favoriteIds.includes(generatedPlan.id) ? "bg-amber-500 text-white" : "border border-slate-200 text-slate-700"}`}>
                    {favoriteIds.includes(generatedPlan.id) ? "★ Favorited" : "☆ Favorite Trip"}
                  </button>
                  <button type="button" onClick={() => setGeneratedPlan(null)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Edit details</button>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Daily timeline</p>
                  <div className="mt-4 space-y-3">
                    {generatedPlan.days.map((day) => (
                      <div key={day.day} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{day.title}</p>
                            <p className="mt-1 text-sm text-slate-600">{day.summary}</p>
                          </div>
                          <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700">Day {day.day}</div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {day.activities.map((activity) => <span key={activity} className="rounded-full bg-white px-3 py-1 text-sm text-slate-600">{activity}</span>)}
                        </div>
                        <p className="mt-3 text-sm text-slate-600">Coffee stops: {day.cafes.join(" · ")}</p>
                        <p className="mt-1 text-sm text-slate-600">Stay: {day.hotel}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Places to visit</p>
                    <div className="mt-4 space-y-3">
                      {generatedPlan.places.map((place) => (
                        <div key={place.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <p className="font-semibold text-slate-900">{place.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{place.area}</p>
                          <p className="mt-2 text-sm text-slate-500">{place.reason}</p>
                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{place.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Recommended cafés</p>
                    <div className="mt-4 space-y-3">
                      {generatedPlan.cafes.map((cafe) => (
                        <div key={cafe.name} className="rounded-2xl border border-blue-100 bg-blue-50 p-3">
                          <p className="font-semibold text-slate-900">{cafe.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{cafe.area}</p>
                          <p className="mt-2 text-sm text-slate-500">{cafe.whyItFits}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Hotels</p>
                    <div className="mt-4 space-y-3">
                      {generatedPlan.hotels.map((hotel) => (
                        <div key={hotel.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <p className="font-semibold text-slate-900">{hotel.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{hotel.type}</p>
                          <p className="mt-2 text-sm text-slate-500">{hotel.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Transportation</p>
                    <div className="mt-4 space-y-3">
                      {generatedPlan.transportation.map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Weather summary</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {generatedPlan.weatherSummary.map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{item}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Local tips</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {generatedPlan.localTips.map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Packing suggestions</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {generatedPlan.packingSuggestions.map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{item}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Maps placeholder</p>
                    <div className="mt-4 rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                      {generatedPlan.mapPlaceholder}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
        {statusMessage}
      </div>
    </div>
  );
}
