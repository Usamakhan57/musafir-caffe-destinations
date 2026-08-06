import React from "react";
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

export default function GuidesPage() {
  return (
    <main className="bg-white">
      <GuidesHero />
      <div className="-mt-[120px]"> {/* pull search under hero visually */}
        <GuidesSearch />
      </div>

      <section className="mx-auto max-w-[1400px] px-6 pt-24">
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
