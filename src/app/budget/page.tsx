import { Suspense } from "react";

import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import { BudgetEstimatorExperience, WeatherWidget } from "@/features/ai-platform";

export const metadata = createPageMetadata({
  title: "Budget Estimator",
  description:
    "Estimate trip costs for accommodation, food, coffee, transport, and activities across MusafirCaffe destinations.",
  path: ROUTES.budget,
});

export default function BudgetPage() {
  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <Breadcrumbs items={[{ label: "Budget Estimator" }]} />
          <h1 className="mt-6 font-serif text-4xl font-semibold text-[#111827] sm:text-5xl">
            Budget Estimator
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#4B5563]">
            Calculate trip spend across stay, meals, coffee rituals, transport, and activities.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <Suspense
          fallback={
            <div className="h-80 animate-pulse rounded-[28px] bg-[#E7E5E4]" aria-busy="true">
              <span className="sr-only">Loading budget estimator…</span>
            </div>
          }
        >
          <BudgetEstimatorExperience />
        </Suspense>
        <WeatherWidget city="Lisbon" />
      </section>
    </main>
  );
}
