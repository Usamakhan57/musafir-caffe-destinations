import { Suspense } from "react";

import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import {
  BrowseGuidesSection,
  Categories,
  CoffeeGuides,
  CountryExplorer,
  EditorsPicks,
  FeaturedGuides,
  GuidesHero,
  GuidesSearch,
  LatestGuides,
  NewsletterCTA,
  TrendingGuides,
  WorldMap,
} from "@/features/guides";

export const metadata = createPageMetadata({
  title: "Guides",
  description:
    "Road-tested travel and coffee guides from MusafirCaffe — city itineraries, café crawls, and cultural notes for curious travelers.",
  path: ROUTES.guides,
});

interface GuidesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="overflow-x-hidden bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Guides" }]} />
      </div>
      <GuidesHero />
      <div className="-mt-[100px] sm:-mt-[120px]">
        <GuidesSearch />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <Categories />
        <FeaturedGuides />
        <TrendingGuides />
        <LatestGuides />
        <EditorsPicks />
        <CountryExplorer />
        <CoffeeGuides />
        <Suspense fallback={null}>
          <BrowseGuidesSection searchParams={resolvedSearchParams} />
        </Suspense>
        <WorldMap />
        <NewsletterCTA />
      </section>
    </main>
  );
}
