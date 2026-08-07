import Link from "next/link";
import { Search, Users } from "lucide-react";

import { ROUTES } from "@/constants";

type CommunityEmptyStateProps = {
  hasActiveFilters?: boolean;
};

export function CommunityEmptyState({
  hasActiveFilters = false,
}: CommunityEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#2563EB]/25 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
        {hasActiveFilters ? (
          <Search className="h-6 w-6" aria-hidden />
        ) : (
          <Users className="h-6 w-6" aria-hidden />
        )}
      </div>
      <h2 className="mt-5 font-serif text-2xl text-[#0B1F1A]">
        {hasActiveFilters ? "No stories match your filters" : "Stories coming soon"}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4B5563]">
        {hasActiveFilters
          ? "Try clearing a filter or broadening your search across travelers and destinations."
          : "Our community is writing the next chapter. Check back soon."}
      </p>
      {hasActiveFilters ? (
        <Link
          href={ROUTES.community}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#2563EB] px-5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        >
          Clear all filters
        </Link>
      ) : null}
    </div>
  );
}

export function CommunitySkeleton() {
  return (
    <div className="space-y-10" aria-busy="true" aria-live="polite">
      <div className="h-28 animate-pulse rounded-2xl bg-[#E7E5E4]" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white"
          >
            <div className="aspect-[16/10] animate-pulse bg-[#E7E5E4]" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-24 animate-pulse rounded bg-[#E7E5E4]" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-[#E7E5E4]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#E7E5E4]" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading community stories…</span>
    </div>
  );
}

export function StoryDetailSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="h-72 animate-pulse rounded-3xl bg-[#E7E5E4] sm:h-96" />
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-[#E7E5E4]" />
        <div className="h-10 w-full animate-pulse rounded bg-[#E7E5E4]" />
        <div className="space-y-3 pt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-4 w-full animate-pulse rounded bg-[#E7E5E4]" />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading story…</span>
    </div>
  );
}
