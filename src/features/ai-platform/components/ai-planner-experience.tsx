"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  Backpack,
  Coffee,
  Compass,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react";

import { cafeRoute, destinationRoute, ROUTES } from "@/constants";

import {
  generateAiTripPlan,
  getCitiesForCountry,
  getCountriesForPlanner,
  PLANNER_CITIES,
} from "../lib/planner";
import {
  BUDGET_TIERS,
  COFFEE_PREFERENCES,
  FOOD_PREFERENCES,
  TRAVEL_PARTY,
  TRAVEL_STYLES,
  type AiPlannerInput,
  type AiTripPlan,
  type BudgetTier,
  type TravelParty,
  type TravelStyle,
} from "../types";
import { WeatherWidget } from "./weather-widget";

const fieldClass =
  "mt-1.5 h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15";

export function AiPlannerExperience() {
  const countries = useMemo(() => getCountriesForPlanner(), []);
  const [country, setCountry] = useState(countries[0] ?? "Portugal");
  const cities = getCitiesForCountry(country);
  const [city, setCity] = useState(cities[0] ?? PLANNER_CITIES[0]);
  const [budget, setBudget] = useState(1800);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("Mid-range");
  const [days, setDays] = useState(5);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Coffee Culture");
  const [coffeePreference, setCoffeePreference] = useState<string>(COFFEE_PREFERENCES[0]);
  const [foodPreference, setFoodPreference] = useState<string>(FOOD_PREFERENCES[0]);
  const [party, setParty] = useState<TravelParty>("Solo");
  const [notes, setNotes] = useState("");
  const [plan, setPlan] = useState<AiTripPlan | null>(null);
  const [isPending, startTransition] = useTransition();

  function onCountryChange(next: string) {
    setCountry(next);
    const nextCities = getCitiesForCountry(next);
    setCity(nextCities[0] ?? PLANNER_CITIES[0]);
  }

  function generate() {
    const input: AiPlannerInput = {
      budget,
      budgetTier,
      country,
      city,
      days,
      travelStyle,
      coffeePreference,
      foodPreference,
      party,
      notes,
    };
    startTransition(() => {
      // Simulate thoughtful generation latency for premium UX.
      window.setTimeout(() => {
        setPlan(generateAiTripPlan(input));
      }, 450);
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <section
        aria-labelledby="planner-form-heading"
        className="rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_44px_-30px_rgba(15,118,110,0.35)] sm:p-8"
      >
        <div className="flex items-center gap-2 text-[#0F766E]">
          <Sparkles className="h-5 w-5" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">AI Trip Planner</p>
        </div>
        <h2 id="planner-form-heading" className="mt-3 font-serif text-2xl font-semibold text-[#111827]">
          Shape your coffee journey
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Set budget, city, style, and preferences — we’ll craft a daily itinerary with cafés,
          attractions, and packing notes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-medium text-[#6B7280]">
            Country
            <select
              className={fieldClass}
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              aria-label="Country"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            City
            <select
              className={fieldClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="City"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Number of days
            <input
              type="number"
              min={2}
              max={14}
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 2)}
              className={fieldClass}
              aria-label="Number of days"
            />
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Budget (USD)
            <input
              type="number"
              min={300}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value) || 300)}
              className={fieldClass}
              aria-label="Budget in USD"
            />
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Budget style
            <select
              className={fieldClass}
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value as BudgetTier)}
            >
              {BUDGET_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Travel party
            <select
              className={fieldClass}
              value={party}
              onChange={(e) => setParty(e.target.value as TravelParty)}
            >
              {TRAVEL_PARTY.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Travel style
            <select
              className={fieldClass}
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as TravelStyle)}
            >
              {TRAVEL_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Coffee preference
            <select
              className={fieldClass}
              value={coffeePreference}
              onChange={(e) => setCoffeePreference(e.target.value)}
            >
              {COFFEE_PREFERENCES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280] sm:col-span-2">
            Food preference
            <select
              className={fieldClass}
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
            >
              {FOOD_PREFERENCES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280] sm:col-span-2">
            Notes (optional)
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-3 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15"
              placeholder="Slow mornings, laptop-friendly cafés, avoid early starts…"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={generate}
          disabled={isPending}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:bg-[#0D9488] disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          {isPending ? "Generating itinerary…" : "Generate AI trip plan"}
        </button>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#6B7280]">
          <Link href={ROUTES.budget} className="font-semibold text-[#0F766E] hover:underline">
            Open budget estimator
          </Link>
          <Link href={ROUTES.maps} className="font-semibold text-[#0F766E] hover:underline">
            Explore maps
          </Link>
          <Link href={ROUTES.search} className="font-semibold text-[#0F766E] hover:underline">
            Smart search
          </Link>
        </div>
      </section>

      <div className="space-y-6">
        <WeatherWidget city={city} />

        {!plan ? (
          <div className="rounded-[28px] border border-dashed border-[#0F766E]/25 bg-white p-8 text-center">
            <Compass className="mx-auto h-8 w-8 text-[#0F766E]" aria-hidden />
            <p className="mt-4 font-serif text-xl text-[#111827]">Your itinerary will appear here</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6B7280]">
              Generate a plan to see daily routes, suggested cafés, attractions, budget, and packing
              checklist.
            </p>
          </div>
        ) : (
          <AiPlannerResults plan={plan} />
        )}
      </div>
    </div>
  );
}

function AiPlannerResults({ plan }: { plan: AiTripPlan }) {
  return (
    <div className="space-y-6" aria-live="polite">
      <section className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
          Generated plan
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-[#111827]">{plan.title}</h3>
        <p className="mt-1 text-sm text-[#6B7280]">{plan.subtitle}</p>
        <p className="mt-3 text-sm text-[#4B5563]">{plan.weatherNote}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ["Total", `$${plan.estimatedBudget.total.toLocaleString()}`],
            ["Daily", `$${plan.estimatedBudget.daily.toLocaleString()}`],
            ["Coffee", `$${plan.estimatedBudget.coffee.toLocaleString()}`],
            ["Food", `$${plan.estimatedBudget.food.toLocaleString()}`],
            ["Stay", `$${plan.estimatedBudget.accommodation.toLocaleString()}`],
            ["Transport", `$${plan.estimatedBudget.transport.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#F3FBF9] p-3">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                {label}
              </dt>
              <dd className="mt-1 font-serif text-xl text-[#111827]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="daily-itinerary-heading">
        <h3
          id="daily-itinerary-heading"
          className="font-serif text-xl font-semibold text-[#111827]"
        >
          Daily itinerary
        </h3>
        <ol className="mt-4 space-y-4">
          {plan.days.map((day) => (
            <li
              key={day.day}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                Day {day.day}
              </p>
              <h4 className="mt-1 text-lg font-semibold text-[#111827]">{day.title}</h4>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{day.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#4B5563]">
                <li>
                  <strong className="text-[#111827]">Morning:</strong> {day.morning}
                </li>
                <li>
                  <strong className="text-[#111827]">Afternoon:</strong> {day.afternoon}
                </li>
                <li>
                  <strong className="text-[#111827]">Evening:</strong> {day.evening}
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {day.cafes.map((cafe) => (
                  <span
                    key={cafe}
                    className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]"
                  >
                    <Coffee className="h-3 w-3" aria-hidden />
                    {cafe}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-[#111827]">
            <Coffee className="h-4 w-4 text-[#0F766E]" aria-hidden />
            Suggested cafés
          </h3>
          <ul className="mt-4 space-y-3">
            {plan.suggestedCafes.map((cafe) => (
              <li key={cafe.name} className="text-sm">
                {cafe.slug ? (
                  <Link
                    href={cafeRoute(cafe.slug)}
                    className="font-semibold text-[#0F766E] hover:underline"
                  >
                    {cafe.name}
                  </Link>
                ) : (
                  <span className="font-semibold text-[#111827]">{cafe.name}</span>
                )}
                <p className="mt-1 text-[#6B7280]">{cafe.note}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-[#111827]">
            <MapPin className="h-4 w-4 text-[#0F766E]" aria-hidden />
            Suggested attractions
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#4B5563]">
            {plan.suggestedAttractions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-[#111827]">
          <Compass className="h-4 w-4 text-[#0F766E]" aria-hidden />
          Suggested destinations
        </h3>
        <ul className="mt-4 space-y-3">
          {plan.suggestedDestinations.map((dest) => (
            <li key={dest.name} className="text-sm">
              {dest.slug ? (
                <Link
                  href={destinationRoute(dest.slug)}
                  className="font-semibold text-[#0F766E] hover:underline"
                >
                  {dest.name}
                </Link>
              ) : (
                <span className="font-semibold text-[#111827]">{dest.name}</span>
              )}
              <p className="mt-1 text-[#6B7280]">{dest.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
        <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-[#111827]">
          <Backpack className="h-4 w-4 text-[#0F766E]" aria-hidden />
          Packing checklist
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {plan.packingChecklist.map((item) => (
            <li
              key={item}
              className="rounded-xl bg-[#FAFAF9] px-3 py-2 text-sm text-[#4B5563]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href={ROUTES.budget}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#0F766E]"
        >
          <Wallet className="h-4 w-4" aria-hidden />
          Refine budget
        </Link>
        <Link
          href={ROUTES.maps}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#0F766E]"
        >
          <MapPin className="h-4 w-4" aria-hidden />
          View on map
        </Link>
      </div>
    </div>
  );
}
