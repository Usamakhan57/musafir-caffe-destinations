"use client";

import { useMemo, useState } from "react";
import { Calculator, Coffee, Utensils, Bus, Ticket, BedDouble } from "lucide-react";

import { PLANNER_CITIES } from "../lib/planner";
import { estimateBudget } from "../lib/planner";
import { BUDGET_TIERS, type BudgetTier } from "../types";

const fieldClass =
  "mt-1.5 h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15";

export function BudgetEstimatorExperience() {
  const [city, setCity] = useState(PLANNER_CITIES[0]);
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState<BudgetTier>("Mid-range");
  const [includeCoffeeCrawl, setIncludeCoffeeCrawl] = useState(true);
  const [includeActivities, setIncludeActivities] = useState(true);

  const breakdown = useMemo(
    () =>
      estimateBudget({
        city,
        days,
        travelers,
        tier,
        includeCoffeeCrawl,
        includeActivities,
      }),
    [city, days, travelers, tier, includeCoffeeCrawl, includeActivities],
  );

  const rows = [
    {
      label: "Accommodation",
      value: breakdown.accommodation,
      icon: <BedDouble className="h-4 w-4 text-[#0F766E]" aria-hidden />,
    },
    {
      label: "Food",
      value: breakdown.food,
      icon: <Utensils className="h-4 w-4 text-[#0F766E]" aria-hidden />,
    },
    {
      label: "Coffee",
      value: breakdown.coffee,
      icon: <Coffee className="h-4 w-4 text-[#0F766E]" aria-hidden />,
    },
    {
      label: "Transport",
      value: breakdown.transport,
      icon: <Bus className="h-4 w-4 text-[#0F766E]" aria-hidden />,
    },
    {
      label: "Activities",
      value: breakdown.activities,
      icon: <Ticket className="h-4 w-4 text-[#0F766E]" aria-hidden />,
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-[#0F766E]">
          <Calculator className="h-5 w-5" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Budget estimator</p>
        </div>
        <h2 className="mt-3 font-serif text-2xl font-semibold text-[#111827]">
          Trip cost calculator
        </h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          Estimate accommodation, food, coffee, transport, and activities for your next journey.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-medium text-[#6B7280]">
            City
            <select
              className={fieldClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {PLANNER_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Budget tier
            <select
              className={fieldClass}
              value={tier}
              onChange={(e) => setTier(e.target.value as BudgetTier)}
            >
              {BUDGET_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Days
            <input
              type="number"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 1)}
              className={fieldClass}
            />
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Travelers
            <input
              type="number"
              min={1}
              max={12}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value) || 1)}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="mt-5 space-y-3">
          <label className="flex items-center gap-3 text-sm text-[#374151]">
            <input
              type="checkbox"
              checked={includeCoffeeCrawl}
              onChange={(e) => setIncludeCoffeeCrawl(e.target.checked)}
              className="h-4 w-4 rounded border-[#E5E7EB] text-[#0F766E] focus:ring-[#0F766E]"
            />
            Include specialty coffee crawl premium
          </label>
          <label className="flex items-center gap-3 text-sm text-[#374151]">
            <input
              type="checkbox"
              checked={includeActivities}
              onChange={(e) => setIncludeActivities(e.target.checked)}
              className="h-4 w-4 rounded border-[#E5E7EB] text-[#0F766E] focus:ring-[#0F766E]"
            />
            Include paid activities & attractions
          </label>
        </div>
      </section>

      <section
        aria-labelledby="budget-results-heading"
        className="rounded-[28px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8"
      >
        <h2 id="budget-results-heading" className="font-serif text-2xl font-semibold text-[#111827]">
          Estimated breakdown
        </h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          Live estimate for {travelers} traveler{travelers > 1 ? "s" : ""} across {days} day
          {days > 1 ? "s" : ""} in {city}.
        </p>

        <dl className="mt-6 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 rounded-2xl bg-[#FAFAF9] px-4 py-3"
            >
              <dt className="inline-flex items-center gap-2 text-sm font-medium text-[#374151]">
                {row.icon}
                {row.label}
              </dt>
              <dd className="font-serif text-xl text-[#111827]">
                ${row.value.toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-2xl bg-[#0F766E] px-5 py-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Trip total
          </p>
          <p className="mt-2 font-serif text-4xl">${breakdown.total.toLocaleString()}</p>
          <p className="mt-2 text-sm text-white/80">
            ≈ ${breakdown.dailyPerPerson.toLocaleString()} per person / day
          </p>
        </div>
      </section>
    </div>
  );
}
