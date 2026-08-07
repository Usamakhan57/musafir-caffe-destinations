import type { Metadata } from "next";

import { SectionHeading } from "@/shared/ui";
import { siteConfig } from "@/config";
import {
  CafesGrid,
  CafesToolbar,
  PaginationControls,
  getAllCafes,
  getFilterOptions,
  parseCafeFilters,
  filterCafes,
  sortCafes,
  paginate,
  CAFES_PAGE_SIZE,
} from "@/features/cafes";

export const metadata: Metadata = {
  title: "Cafés",
  description:
    "Explore curated cafés around the world — search by city, category, price, and rating, then discover the kind of coffee ritual that fits your next trip.",
  alternates: {
    canonical: `${siteConfig.url}/cafes`,
  },
  openGraph: {
    title: `Cafés | ${siteConfig.name}`,
    description:
      "Browse global cafés with thoughtful filters for atmosphere, rating, and price before you plan your next stop.",
    url: `${siteConfig.url}/cafes`,
  },
};

interface CafesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CafesPage({ searchParams }: CafesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseCafeFilters(resolvedSearchParams);

  const allCafes = await getAllCafes();
  const filterOptions = getFilterOptions();

  const filtered = filterCafes(allCafes, filters);
  const sorted = sortCafes(filtered, filters.sort);
  const { items, page, totalPages } = paginate(sorted, filters.page, CAFES_PAGE_SIZE);

  return (
      <main className="flex flex-1 flex-col bg-[#FAFAF9]">
        <section className="mx-auto w-full max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12">
          <SectionHeading
            eyebrow="Discover"
            title="Cafés"
            description="Find the kind of coffee room that fits your mood — from quiet specialty bars to grand historical salons."
            align="left"
          />
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
          <CafesToolbar filters={{ ...filters, page }} options={filterOptions} resultCount={filtered.length} />

          <div className="mt-10">
            <CafesGrid cafes={items} />
          </div>

          <PaginationControls filters={{ ...filters, page }} totalPages={totalPages} />
        </section>
      </main>
  );
}
