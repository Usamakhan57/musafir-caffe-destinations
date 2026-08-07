"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useMemo, useState, useSyncExternalStore } from "react";
import { Clock, Search, TrendingUp } from "lucide-react";

import { ROUTES } from "@/constants";

import {
  TRENDING_SEARCHES,
  getSuggestions,
  pushRecentSearch,
  readRecentSearches,
  searchIndex,
} from "../lib/search";
import type { SearchResultItem, SearchResultType } from "../types";

const TYPE_LABELS: Record<SearchResultType | "all", string> = {
  all: "All",
  destination: "Destinations",
  cafe: "Cafés",
  guide: "Guides",
  story: "Community",
  traveler: "Travelers",
};

function subscribeRecent(onStoreChange: () => void) {
  window.addEventListener("musafir-recent-searches", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("musafir-recent-searches", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

interface SmartSearchExperienceProps {
  index: SearchResultItem[];
  initialQuery?: string;
}

export function SmartSearchExperience({
  index,
  initialQuery = "",
}: SmartSearchExperienceProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<SearchResultType | "all">("all");
  const recent = useSyncExternalStore(
    subscribeRecent,
    readRecentSearches,
    () => [] as string[],
  );
  const deferredQuery = useDeferredValue(query);

  const suggestions = useMemo(
    () => getSuggestions(index, deferredQuery),
    [index, deferredQuery],
  );

  const results = useMemo(
    () => searchIndex(index, deferredQuery, type),
    [index, deferredQuery, type],
  );

  function commitSearch(value: string) {
    const q = value.trim();
    if (!q) return;
    setQuery(q);
    pushRecentSearch(q);
    window.dispatchEvent(new Event("musafir-recent-searches"));
    router.replace(`${ROUTES.search}?q=${encodeURIComponent(q)}`, { scroll: false });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-4 shadow-[0_18px_44px_-30px_rgba(15,118,110,0.35)] sm:p-6">
        <label className="sr-only" htmlFor="smart-search-input">
          Search destinations, cafés, guides, community, and travelers
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]"
            aria-hidden
          />
          <input
            id="smart-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitSearch(query);
            }}
            placeholder="Search destinations, cafés, guides, stories, travelers…"
            className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] py-3 pl-12 pr-4 text-sm outline-none focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/15"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="smart-search-suggestions"
          />
        </div>

        {suggestions.length > 0 && query.trim() ? (
          <ul
            id="smart-search-suggestions"
            role="listbox"
            aria-label="Search suggestions"
            className="mt-3 divide-y divide-[#E5E7EB] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          >
            {suggestions.map((item) => (
              <li key={item.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => {
                    commitSearch(item.title);
                    router.push(item.href);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F3FBF9]"
                >
                  {item.image ? (
                    <span className="relative h-10 w-10 overflow-hidden rounded-lg">
                      <Image src={item.image} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[#111827]">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-[#6B7280]">
                      {TYPE_LABELS[item.type]} · {item.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Result type">
          {(Object.keys(TYPE_LABELS) as Array<SearchResultType | "all">).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={type === key}
              onClick={() => setType(key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                type === key
                  ? "bg-[#0F766E] text-white"
                  : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
              }`}
            >
              {TYPE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="recent-searches-heading"
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
        >
          <h2
            id="recent-searches-heading"
            className="flex items-center gap-2 text-sm font-semibold text-[#111827]"
          >
            <Clock className="h-4 w-4 text-[#0F766E]" aria-hidden />
            Recent searches
          </h2>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-[#6B7280]">Your recent searches will appear here.</p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-2">
              {recent.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => commitSearch(item)}
                    className="rounded-full bg-[#F3FBF9] px-3 py-1.5 text-xs font-semibold text-[#0F766E]"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="trending-searches-heading"
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
        >
          <h2
            id="trending-searches-heading"
            className="flex items-center gap-2 text-sm font-semibold text-[#111827]"
          >
            <TrendingUp className="h-4 w-4 text-[#0F766E]" aria-hidden />
            Trending searches
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => commitSearch(item)}
                  className="rounded-full bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="search-results-heading">
        <div className="flex items-end justify-between gap-3">
          <h2
            id="search-results-heading"
            className="font-serif text-2xl font-semibold text-[#111827]"
          >
            Results
          </h2>
          <p className="text-sm text-[#6B7280]" aria-live="polite">
            {results.length} match{results.length === 1 ? "" : "es"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-10 text-center text-sm text-[#6B7280]">
            No matches yet. Try a destination, café, traveler name, or coffee tag.
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex h-full gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F766E]/30"
                >
                  {item.image ? (
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                      {TYPE_LABELS[item.type]}
                    </span>
                    <span className="mt-1 block truncate font-semibold text-[#111827]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-[#6B7280]">{item.subtitle}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
