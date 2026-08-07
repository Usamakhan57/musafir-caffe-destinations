import { createPageMetadata } from "@/shared/lib/seo";
import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import {
  DestinationsGrid,
  DestinationsListingHero,
  DestinationsToolbar,
  PaginationControls,
  getFilterOptions,
  parseDestinationFilters,
  filterDestinations,
  sortDestinations,
  paginate,
  DESTINATIONS_PAGE_SIZE,
} from "@/features/destinations";
import { getAllDestinations } from "@/features/destinations/data/destinations-loader";

export const metadata = createPageMetadata({
  title: "Destinations",
  description:
    "Browse premium coffee cities and travel destinations — filter by continent, country, city, budget, season, coffee culture, and digital-nomad friendliness.",
  path: ROUTES.destinations,
});

interface DestinationsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DestinationsPage({ searchParams }: DestinationsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseDestinationFilters(resolvedSearchParams);

  const allDestinations = await getAllDestinations();
  const filterOptions = getFilterOptions();

  const filtered = filterDestinations(allDestinations, filters);
  const sorted = sortDestinations(filtered, filters.sort);
  const { items, page, totalPages } = paginate(sorted, filters.page, DESTINATIONS_PAGE_SIZE);

  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      <DestinationsListingHero />

      <section className="mx-auto w-full max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <Breadcrumbs items={[{ label: "Destinations" }]} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <DestinationsToolbar
          filters={{ ...filters, page }}
          options={filterOptions}
          resultCount={filtered.length}
        />

        <div className="mt-10">
          <DestinationsGrid destinations={items} />
        </div>

        <PaginationControls filters={{ ...filters, page }} totalPages={totalPages} />
      </section>
    </main>
  );
}
