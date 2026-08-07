import { createPageMetadata } from "@/shared/lib/seo";
import { ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";
import { SectionHeading } from "@/shared/ui";
import {
  DestinationsGrid,
  DestinationsToolbar,
  PaginationControls,
  getAllDestinations,
  getFilterOptions,
  parseDestinationFilters,
  filterDestinations,
  sortDestinations,
  paginate,
  DESTINATIONS_PAGE_SIZE,
} from "@/features/destinations";

export const metadata = createPageMetadata({
  title: "Destinations",
  description:
    "Browse coffee towns and travel destinations around the world — search by name, filter by region, country, or category, and find your next trip.",
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
      <section className="mx-auto w-full max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        <Breadcrumbs items={[{ label: "Destinations" }]} />
        <SectionHeading
          eyebrow="Explore"
          title="Destinations worth a long coffee stop"
          description="Coffee towns, cultural capitals, and quiet retreats — search, filter, and find where your next trip should take you. Every listing is written for travelers who care about place, pace, and a great cup."
          align="left"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <DestinationsToolbar filters={{ ...filters, page }} options={filterOptions} resultCount={filtered.length} />

        <div className="mt-10">
          <DestinationsGrid destinations={items} />
        </div>

        <PaginationControls filters={{ ...filters, page }} totalPages={totalPages} />
      </section>
    </main>
  );
}
