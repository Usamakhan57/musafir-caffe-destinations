"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { buildCommunityQuery } from "../lib/query";
import type {
  CommunityFilterOptions,
  CommunityFilters,
  CommunitySortOption,
} from "../types";

interface CommunityToolbarProps {
  filters: CommunityFilters;
  options: CommunityFilterOptions;
  resultCount: number;
}

const SORT_LABELS: Record<CommunitySortOption, string> = {
  latest: "Latest",
  popular: "Most Popular",
  trending: "Trending",
  mostLiked: "Most Liked",
};

const selectClass =
  "h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15";

export function CommunityToolbar({
  filters,
  options,
  resultCount,
}: CommunityToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [prev, setPrev] = useState(filters.search);
  const [searchValue, setSearchValue] = useState(filters.search);

  if (filters.search !== prev) {
    setPrev(filters.search);
    setSearchValue(filters.search);
  }

  function navigate(overrides: Parameters<typeof buildCommunityQuery>[1]) {
    const query = buildCommunityQuery(filters, { page: 1, ...overrides });
    startTransition(() => router.push(`${pathname}${query}`, { scroll: false }));
  }

  useEffect(() => {
    const currentQ = searchParams.get("q") ?? "";
    if (searchValue === currentQ) return;
    const t = setTimeout(() => navigate({ q: searchValue || null }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const active = Boolean(
    filters.search ||
      filters.category ||
      filters.country ||
      filters.destination ||
      filters.traveler ||
      filters.coffee ||
      filters.tag,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[24px] border border-[#E5E7EB] bg-white/90 p-4 shadow-[0_16px_40px_-28px_rgba(37,99,235,0.28)] sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
              aria-hidden
            />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search stories, travelers, destinations, coffee…"
              aria-label="Search community stories"
              className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          <label className="block text-xs font-medium text-[#6B7280]">
            Category
            <select
              value={filters.category ?? ""}
              onChange={(e) => navigate({ category: e.target.value || null })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {options.categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Country
            <select
              value={filters.country ?? ""}
              onChange={(e) => navigate({ country: e.target.value || null })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Filter by country"
            >
              <option value="">All countries</option>
              {options.countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Destination
            <select
              value={filters.destination ?? ""}
              onChange={(e) => navigate({ destination: e.target.value || null })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Filter by destination"
            >
              <option value="">All destinations</option>
              {options.destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Traveler
            <select
              value={filters.traveler ?? ""}
              onChange={(e) => navigate({ traveler: e.target.value || null })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Filter by traveler"
            >
              <option value="">All travelers</option>
              {options.travelers.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Coffee
            <select
              value={filters.coffee ?? ""}
              onChange={(e) => navigate({ coffee: e.target.value || null })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Filter by coffee tag"
            >
              <option value="">All coffee tags</option>
              {options.coffeeTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Tag
            <select
              value={filters.tag ?? ""}
              onChange={(e) => navigate({ tag: e.target.value || null })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Filter by tag"
            >
              <option value="">All tags</option>
              {options.tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#6B7280]">
            Sort by
            <select
              value={filters.sort}
              onChange={(e) => navigate({ sort: e.target.value })}
              className={`mt-1.5 ${selectClass}`}
              aria-label="Sort stories"
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-[#6B7280]" aria-live="polite">
        <span>
          {resultCount} {resultCount === 1 ? "story" : "stories"} found
        </span>
        {active ? (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              startTransition(() => router.push(pathname, { scroll: false }));
            }}
            className="font-semibold text-[#2563EB] underline-offset-2 hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
