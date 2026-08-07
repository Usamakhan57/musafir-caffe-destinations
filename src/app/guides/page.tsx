import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";
import GuidesHero from "@/features/guides/components/hero";
import GuidesSearch from "@/features/guides/components/search";
import Categories from "@/features/guides/components/categories";
import FeaturedGuides from "@/features/guides/components/featured";
import LatestGuides from "@/features/guides/components/latest";
import EditorsPicks from "@/features/guides/components/editors-picks";
import TrendingGuides from "@/features/guides/components/trending";
import CountryExplorer from "@/features/guides/components/country-explorer";
import CoffeeGuides from "@/features/guides/components/coffee-guides";
import WorldMap from "@/features/guides/components/world-map";
import NewsletterCTA from "@/features/guides/components/newsletter";

export const metadata = createPageMetadata({
  title: "Guides",
  description:
    "Road-tested travel and coffee guides from MusafirCaffe — city itineraries, café crawls, and cultural notes for curious travelers.",
  path: ROUTES.guides,
});

export default function GuidesPage() {
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
        <WorldMap />
        <NewsletterCTA />
      </section>
    </main>
  );
}
