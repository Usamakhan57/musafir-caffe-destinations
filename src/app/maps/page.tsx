import { Suspense } from "react";

import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import { InteractiveMapExperience } from "@/features/ai-platform";

export const metadata = createPageMetadata({
  title: "Interactive Maps",
  description:
    "Explore MusafirCaffe destination and café markers with nearby attractions, guides, and directions placeholders.",
  path: ROUTES.maps,
});

export default function MapsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Map",
    name: "MusafirCaffe Interactive Maps",
    description: "Placeholder map experience for destinations, cafés, attractions, and guides.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
        <section className="border-b border-[#E7E5E4] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
            <Breadcrumbs items={[{ label: "Interactive Maps" }]} />
            <h1 className="mt-6 font-serif text-4xl font-semibold text-[#111827] sm:text-5xl">
              Interactive Maps
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#4B5563]">
              Production-ready map interfaces with destination and café markers, nearby lists, and
              directions placeholders — no API key required.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <Suspense
            fallback={
              <div className="aspect-[16/11] animate-pulse rounded-[28px] bg-[#E7E5E4]" aria-busy="true">
                <span className="sr-only">Loading map…</span>
              </div>
            }
          >
            <InteractiveMapExperience />
          </Suspense>
        </section>
      </main>
    </>
  );
}
