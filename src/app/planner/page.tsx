import { siteConfig } from "@/config";
import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import { AiPlannerExperience } from "@/features/ai-platform";

export const metadata = createPageMetadata({
  title: "AI Trip Planner",
  description:
    "Generate personalized MusafirCaffe itineraries with cafés, attractions, budget estimates, and packing checklists.",
  path: ROUTES.planner,
});

export default function PlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MusafirCaffe AI Trip Planner",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    url: `${siteConfig.url}${ROUTES.planner}`,
    description:
      "Generate personalized coffee-forward travel itineraries with budget and packing guidance.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
        <section className="border-b border-[#E7E5E4] bg-gradient-to-br from-[#F3FBF9] via-white to-[#EFF6FF]">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
            <Breadcrumbs items={[{ label: "AI Trip Planner" }]} />
            <h1 className="mt-6 font-serif text-4xl font-semibold text-[#111827] sm:text-5xl">
              AI Trip Planner
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563] sm:text-lg">
              Build a coffee-forward itinerary in seconds — daily plans, café stops, attractions,
              estimated budget, and packing checklist.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a href={ROUTES.search} className="font-semibold text-[#0F766E] hover:underline">
                Smart search
              </a>
              <a href={ROUTES.maps} className="font-semibold text-[#0F766E] hover:underline">
                Interactive maps
              </a>
              <a href={ROUTES.budget} className="font-semibold text-[#0F766E] hover:underline">
                Budget estimator
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <AiPlannerExperience />
        </section>
      </main>
    </>
  );
}
