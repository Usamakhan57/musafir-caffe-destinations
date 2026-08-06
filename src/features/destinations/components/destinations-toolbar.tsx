"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { buildDestinationsQuery } from "../lib/query";
import type { DestinationFilters, FilterOptions, SortOption } from "../types";

interface DestinationsToolbarProps {
  filters: DestinationFilters;
  options: FilterOptions;
  resultCount: number;
}

const SORT_LABELS: Record<SortOption, string> = {
  recommended: "Recommended",
  rating: "Rating: High to low",
  name: "Name: A to Z",
  cafes: "Most cafés",
};

export function DestinationsToolbar({ filters, options, resultCount }: DestinationsToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [prevUrlSearch, setPrevUrlSearch] = useState(filters.search);
  const [searchValue, setSearchValue] = useState(filters.search);

  // Adjust local state during render (not in an effect) when the URL's
  // search value changes from elsewhere — e.g. the browser back button.
  if (filters.search !== prevUrlSearch) {
    setPrevUrlSearch(filters.search);
    setSearchValue(filters.search);
  }

  function navigate(overrides: Parameters<typeof buildDestinationsQuery>[1]) {
    const query = buildDestinationsQuery(filters, { page: 1, ...overrides });
    startTransition(() => {
      router.push(`${pathname}${query}`, { scroll: false });
    });
  }

  // Debounce the free-text search so we don't push a route change per keystroke.
  useEffect(() => {
    const currentQ = searchParams.get("q") ?? "";
    if (searchValue === currentQ) return;

    const timeout = setTimeout(() => {
      navigate({ q: searchValue || null });
    }, 350);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const hasActiveFilters = Boolean(
    filters.search || filters.country || filters.region || filters.category,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card flex flex-col gap-3 rounded-2xl p-3 shadow-card sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
          <svg
            className="h-5 w-5 shrink-0 text-coffee-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search destinations by name, country, or vibe..."
            aria-label="Search destinations"
            className="w-full bg-transparent text-sm text-coffee-900 placeholder:text-coffee-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-none">
          <select
            value={filters.region ?? ""}
            onChange={(event) => navigate({ region: event.target.value || null })}
            aria-label="Filter by region"
            className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none"
          >
            <option value="">All regions</option>
            {options.regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            value={filters.country ?? ""}
            onChange={(event) => navigate({ country: event.target.value || null })}
            aria-label="Filter by country"
            className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none"
          >
            <option value="">All countries</option>
            {options.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={filters.category ?? ""}
            onChange={(event) => navigate({ category: event.target.value || null })}
            aria-label="Filter by category"
            className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none"
          >
            <option value="">All categories</option>
            {options.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.sort}
            onChange={(event) => navigate({ sort: event.target.value })}
            aria-label="Sort destinations"
            className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-coffee-600" aria-live="polite">
        <span>
          {resultCount} {resultCount === 1 ? "destination" : "destinations"} found
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              startTransition(() => {
                router.push(pathname, { scroll: false });
              });
            }}
            className="font-medium text-forest-700 underline-offset-2 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
