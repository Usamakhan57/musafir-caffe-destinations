import { createPageMetadata } from "@/shared/lib/seo";
import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import {
  CafesGrid,
  CafesListingHero,
  CafesToolbar,
  PaginationControls,
  getFilterOptions,
  parseCafeFilters,
  filterCafes,
  sortCafes,
  paginate,
  CAFES_PAGE_SIZE,
} from "@/features/cafes";
import { getAllCafes } from "@/features/cafes/data/cafes-loader";

export const metadata = createPageMetadata({
  title: "Cafés",
  description:
    "Explore a premium café directory — filter by country, city, coffee type, amenities, rating, and price to find your next favorite cup.",
  path: ROUTES.cafes,
});

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
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      <CafesListingHero />

      <section className="mx-auto w-full max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <Breadcrumbs items={[{ label: "Cafés" }]} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <CafesToolbar
          filters={{ ...filters, page }}
          options={filterOptions}
          resultCount={filtered.length}
        />

        <div className="mt-10">
          <CafesGrid cafes={items} />
        </div>

        <PaginationControls filters={{ ...filters, page }} totalPages={totalPages} />
      </section>
    </main>
  );
}
