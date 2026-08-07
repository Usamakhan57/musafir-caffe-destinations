"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

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
  budget: "Budget: Low to high",
  coffee: "Coffee score",
  nomad: "Nomad score",
};

const selectClassName =
  "h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15";

export function DestinationsToolbar({ filters, options, resultCount }: DestinationsToolbarProps) {
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

  function navigate(overrides: Parameters<typeof buildDestinationsQuery>[1]) {
    const query = buildDestinationsQuery(filters, { page: 1, ...overrides });
    startTransition(() => {
      router.push(`${pathname}${query}`, { scroll: false });
    });
  }

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
    filters.search ||
      filters.country ||
      filters.city ||
      filters.region ||
      filters.budget ||
      filters.season ||
      filters.coffeeCulture ||
      filters.nomadFriendly !== null ||
      filters.category,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[24px] border border-[#E5E7EB] bg-white/90 p-4 shadow-[0_16px_40px_-28px_rgba(15,118,110,0.28)] backdrop-blur-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
              aria-hidden
            />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by city, country, coffee culture, or vibe…"
              aria-label="Search destinations"
              className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/15"
            />
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E] lg:px-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Advanced filters
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <label className="block text-xs font-medium text-[#6B7280]">
            Continent
            <select
              value={filters.region ?? ""}
              onChange={(event) => navigate({ region: event.target.value || null })}
              aria-label="Filter by continent"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">All continents</option>
              {options.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Country
            <select
              value={filters.country ?? ""}
              onChange={(event) => navigate({ country: event.target.value || null })}
              aria-label="Filter by country"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">All countries</option>
              {options.countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            City
            <select
              value={filters.city ?? ""}
              onChange={(event) => navigate({ city: event.target.value || null })}
              aria-label="Filter by city"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">All cities</option>
              {options.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Budget
            <select
              value={filters.budget ?? ""}
              onChange={(event) => navigate({ budget: event.target.value || null })}
              aria-label="Filter by budget"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">Any budget</option>
              {options.budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Best season
            <select
              value={filters.season ?? ""}
              onChange={(event) => navigate({ season: event.target.value || null })}
              aria-label="Filter by best season"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">Any season</option>
              {options.seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Coffee culture
            <select
              value={filters.coffeeCulture ?? ""}
              onChange={(event) => navigate({ coffee: event.target.value || null })}
              aria-label="Filter by coffee culture"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">All cultures</option>
              {options.coffeeCultures.map((culture) => (
                <option key={culture} value={culture}>
                  {culture}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Digital nomad
            <select
              value={
                filters.nomadFriendly === null ? "" : filters.nomadFriendly ? "1" : "0"
              }
              onChange={(event) => {
                const value = event.target.value;
                navigate({
                  nomad: value === "" ? null : value === "1",
                });
              }}
              aria-label="Filter by digital nomad friendly"
              className={`mt-1.5 ${selectClassName}`}
            >
              <option value="">Any</option>
              <option value="1">Nomad friendly</option>
              <option value="0">Not required</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Sort by
            <select
              value={filters.sort}
              onChange={(event) => navigate({ sort: event.target.value })}
              aria-label="Sort destinations"
              className={`mt-1.5 ${selectClassName}`}
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
          {resultCount} {resultCount === 1 ? "destination" : "destinations"} found
        </span>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              startTransition(() => {
                router.push(pathname, { scroll: false });
              });
            }}
            className="font-semibold text-[#0F766E] underline-offset-2 hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
