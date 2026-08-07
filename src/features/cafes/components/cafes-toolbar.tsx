"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { buildCafeQuery } from "../lib/query";
import type { CafeFilters, CafeSortOption, FilterOptions } from "../types";

interface CafesToolbarProps {
  filters: CafeFilters;
  options: FilterOptions;
  resultCount: number;
}

const SORT_LABELS: Record<CafeSortOption, string> = {
  rating: "Highest Rated",
  popular: "Most Popular",
  newest: "Newest",
  budget: "Budget",
  premium: "Premium",
};

const selectClassName =
  "h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15";

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
    const timeout = setTimeout(() => {
      navigate({ q: searchValue || null });
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.category ||
      filters.city ||
      filters.country ||
      filters.coffeeType ||
      filters.minRating ||
      filters.priceLevel ||
      filters.openNow !== null ||
      filters.outdoor !== null ||
      filters.wifi !== null ||
      filters.remoteWork !== null ||
      filters.petFriendly !== null ||
      filters.vegan !== null,
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
              placeholder="Search cafés by name, city, or coffee style…"
              aria-label="Search cafés"
              className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/15"
            />
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E] lg:px-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Advanced filters
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          <label className="block text-xs font-medium text-[#6B7280]">
            Country
            <select
              value={filters.country ?? ""}
              onChange={(e) => navigate({ country: e.target.value || null })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by country"
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
              onChange={(e) => navigate({ city: e.target.value || null })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by city"
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
            Category
            <select
              value={filters.category ?? ""}
              onChange={(e) => navigate({ category: e.target.value || null })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {options.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Coffee type
            <select
              value={filters.coffeeType ?? ""}
              onChange={(e) => navigate({ coffee: e.target.value || null })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by coffee type"
            >
              <option value="">All types</option>
              {options.coffeeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Rating
            <select
              value={filters.minRating ?? ""}
              onChange={(e) => navigate({ rating: e.target.value || null })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by rating"
            >
              <option value="">Any rating</option>
              {options.ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}+
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Price
            <select
              value={filters.priceLevel ?? ""}
              onChange={(e) => navigate({ price: e.target.value || null })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by price"
            >
              <option value="">Any price</option>
              {options.priceLevels.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Open now
            <select
              value={filters.openNow === null ? "" : filters.openNow ? "1" : "0"}
              onChange={(e) =>
                navigate({ open: e.target.value === "" ? null : e.target.value === "1" })
              }
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by open now"
            >
              <option value="">Any</option>
              <option value="1">Open now</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Outdoor seating
            <select
              value={filters.outdoor === null ? "" : filters.outdoor ? "1" : "0"}
              onChange={(e) =>
                navigate({ outdoor: e.target.value === "" ? null : e.target.value === "1" })
              }
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by outdoor seating"
            >
              <option value="">Any</option>
              <option value="1">Outdoor seating</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            WiFi
            <select
              value={filters.wifi === null ? "" : filters.wifi ? "1" : "0"}
              onChange={(e) =>
                navigate({ wifi: e.target.value === "" ? null : e.target.value === "1" })
              }
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by WiFi"
            >
              <option value="">Any</option>
              <option value="1">WiFi available</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Remote work
            <select
              value={filters.remoteWork === null ? "" : filters.remoteWork ? "1" : "0"}
              onChange={(e) =>
                navigate({ remote: e.target.value === "" ? null : e.target.value === "1" })
              }
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by remote work friendly"
            >
              <option value="">Any</option>
              <option value="1">Remote work friendly</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Pet friendly
            <select
              value={filters.petFriendly === null ? "" : filters.petFriendly ? "1" : "0"}
              onChange={(e) =>
                navigate({ pet: e.target.value === "" ? null : e.target.value === "1" })
              }
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by pet friendly"
            >
              <option value="">Any</option>
              <option value="1">Pet friendly</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Vegan options
            <select
              value={filters.vegan === null ? "" : filters.vegan ? "1" : "0"}
              onChange={(e) =>
                navigate({ vegan: e.target.value === "" ? null : e.target.value === "1" })
              }
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Filter by vegan options"
            >
              <option value="">Any</option>
              <option value="1">Vegan options</option>
            </select>
          </label>

          <label className="block text-xs font-medium text-[#6B7280]">
            Sort by
            <select
              value={filters.sort}
              onChange={(e) => navigate({ sort: e.target.value })}
              className={`mt-1.5 ${selectClassName}`}
              aria-label="Sort cafés"
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
          {resultCount} {resultCount === 1 ? "café" : "cafés"} found
        </span>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              startTransition(() => router.push(pathname, { scroll: false }));
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
