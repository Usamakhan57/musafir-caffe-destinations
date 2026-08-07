import { Suspense } from "react";

import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import { SmartSearchExperience, buildSearchIndex } from "@/features/ai-platform";

export const metadata = createPageMetadata({
  title: "Smart Search",
  description:
    "Search MusafirCaffe destinations, cafés, guides, community stories, and travelers in one place.",
  path: ROUTES.search,
});

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const index = await buildSearchIndex();

  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <Breadcrumbs items={[{ label: "Smart Search" }]} />
          <h1 className="mt-6 font-serif text-4xl font-semibold text-[#111827] sm:text-5xl">
            Smart Search
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#4B5563]">
            One search across destinations, cafés, guides, community stories, and travelers —
            with autocomplete, recent history, and trending queries.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-[28px] bg-[#E7E5E4]" aria-busy="true">
              <span className="sr-only">Loading search…</span>
            </div>
          }
        >
          <SmartSearchExperience index={index} initialQuery={q ?? ""} />
        </Suspense>
      </section>
    </main>
  );
}
