"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildCafeQuery } from "../lib/query";
import type { CafeFilters, FilterOptions, CafeSortOption } from "../types";

interface CafesToolbarProps {
  filters: CafeFilters;
  options: FilterOptions;
  resultCount: number;
}

const SORT_LABELS: Record<CafeSortOption, string> = {
  recommended: "Recommended",
  rating: "Highest rated",
  name: "Name A–Z",
  price: "Price level",
  reviews: "Most reviewed",
};

export function CafesToolbar({ filters, options, resultCount }: CafesToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [prevUrlSearch, setPrevUrlSearch] = useState(filters.search);
  const [searchValue, setSearchValue] = useState(filters.search);

  if (filters.search !== prevUrlSearch) {
    setPrevUrlSearch(filters.search);
    setSearchValue(filters.search);
  }

  function navigate(overrides: Parameters<typeof buildCafeQuery>[1]) {
    const query = buildCafeQuery(filters, { page: 1, ...overrides });
    startTransition(() => {
      router.push(`${pathname}${query}`, { scroll: false });
    });
  }

  useEffect(() => {
    const currentQ = searchParams.get("q") ?? "";
    if (searchValue === currentQ) return;

    const timeout = window.setTimeout(() => {
      navigate({ q: searchValue || null });
    }, 300);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const hasActiveFilters = Boolean(
    filters.search || filters.category || filters.city || filters.country || filters.minRating || filters.priceLevel,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card flex flex-col gap-3 rounded-2xl p-3 shadow-card lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/70 px-4 py-3">
          <svg className="h-5 w-5 shrink-0 text-coffee-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search cafés by name, city, or mood..."
            aria-label="Search cafés"
            className="w-full bg-transparent text-sm text-coffee-900 placeholder:text-coffee-400 focus:outline-none"
          />
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:flex xl:flex-none xl:flex-wrap">
          <select value={filters.category ?? ""} onChange={(event) => navigate({ category: event.target.value || null })} aria-label="Filter by category" className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none">
            <option value="">All categories</option>
            {options.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select value={filters.city ?? ""} onChange={(event) => navigate({ city: event.target.value || null })} aria-label="Filter by city" className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none">
            <option value="">All cities</option>
            {options.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select value={filters.country ?? ""} onChange={(event) => navigate({ country: event.target.value || null })} aria-label="Filter by country" className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none">
            <option value="">All countries</option>
            {options.countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select value={filters.minRating?.toString() ?? ""} onChange={(event) => navigate({ rating: event.target.value || null })} aria-label="Minimum rating" className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none">
            <option value="">Any rating</option>
            {options.ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating.toFixed(1)}+
              </option>
            ))}
          </select>

          <select value={filters.priceLevel ?? ""} onChange={(event) => navigate({ price: event.target.value || null })} aria-label="Filter by price" className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none">
            <option value="">Any price</option>
            {options.priceLevels.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>

          <select value={filters.sort} onChange={(event) => navigate({ sort: event.target.value })} aria-label="Sort cafés" className="rounded-xl bg-white/70 px-3 py-3 text-sm text-coffee-700 focus:outline-none">
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
          {resultCount} {resultCount === 1 ? "café" : "cafés"} found
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
