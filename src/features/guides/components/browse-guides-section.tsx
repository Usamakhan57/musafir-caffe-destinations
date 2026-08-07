import { Suspense } from "react";

import { SectionHeading } from "@/shared/ui";

import {
  getAllGuides,
  getAuthorForGuide,
  getGuideFilterOptions,
} from "../data/guides-store";
import {
  GUIDES_PAGE_SIZE,
  filterGuides,
  paginate,
  parseGuideFilters,
  sortGuides,
} from "../lib/query";
import type { GuideFilters } from "../types";
import GuideCard from "./guide-card";
import { GuidesEmptyState } from "./guides-empty-state";
import { GuidesPagination } from "./guides-pagination";
import { GuidesSkeleton } from "./guides-skeleton";
import { GuidesToolbar } from "./guides-toolbar";

function hasActiveFilters(filters: GuideFilters) {
  return Boolean(
    filters.search ||
      filters.category ||
      filters.country ||
      filters.destination ||
      filters.author ||
      filters.coffeeCulture ||
      filters.digitalNomad ||
      filters.readingTime ||
      filters.tag,
  );
}

interface BrowseGuidesSectionProps {
  searchParams: Record<string, string | string[] | undefined>;
}

async function BrowseGuidesInner({ searchParams }: BrowseGuidesSectionProps) {
  const filters = parseGuideFilters(searchParams);
  const all = await getAllGuides();
  const options = getGuideFilterOptions();
  const filtered = filterGuides(all, filters);
  const sorted = sortGuides(filtered, filters.sort);
  const { items, page, totalPages } = paginate(sorted, filters.page, GUIDES_PAGE_SIZE);
  const active = hasActiveFilters(filters);

  return (
    <>
      <GuidesToolbar
        filters={{ ...filters, page }}
        options={options}
        resultCount={filtered.length}
      />

      {items.length === 0 ? (
        <div className="mt-10">
          <GuidesEmptyState hasActiveFilters={active} />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((guide, index) => (
            <GuideCard
              key={guide.slug}
              guide={guide}
              author={getAuthorForGuide(guide)}
              priority={index < 3}
            />
          ))}
        </div>
      )}

      <GuidesPagination filters={{ ...filters, page }} totalPages={totalPages} />
    </>
  );
}

export function BrowseGuidesSection({ searchParams }: BrowseGuidesSectionProps) {
  return (
    <section id="browse-guides" className="mt-16 scroll-mt-24" aria-labelledby="browse-guides-heading">
      <SectionHeading
        id="browse-guides-heading"
        eyebrow="Browse"
        title="Search and filter every guide"
        description="Full-text search with category, destination, country, author, reading time, and tag filters."
        align="left"
      />
      <div className="mt-8">
        <Suspense fallback={<GuidesSkeleton />}>
          <BrowseGuidesInner searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
