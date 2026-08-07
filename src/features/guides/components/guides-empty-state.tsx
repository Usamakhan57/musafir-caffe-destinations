import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { ROUTES } from "@/constants";

type GuidesEmptyStateProps = {
  hasActiveFilters?: boolean;
};

export function GuidesEmptyState({
  hasActiveFilters = false,
}: GuidesEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#0F766E]/25 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
        {hasActiveFilters ? (
          <Search className="h-6 w-6" aria-hidden />
        ) : (
          <BookOpen className="h-6 w-6" aria-hidden />
        )}
      </div>
      <h2 className="mt-5 font-serif text-2xl text-[#0B1F1A]">
        {hasActiveFilters ? "No guides match your filters" : "Guides coming soon"}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4B5563]">
        {hasActiveFilters
          ? "Try clearing a filter, broadening your search, or browsing featured guides below."
          : "Our editorial team is crafting premium travel stories. Check back soon."}
      </p>
      {hasActiveFilters ? (
        <Link
          href={ROUTES.guides}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F766E] px-5 text-sm font-semibold text-white transition hover:bg-[#0D9488]"
        >
          Clear all filters
        </Link>
      ) : null}
    </div>
  );
}
