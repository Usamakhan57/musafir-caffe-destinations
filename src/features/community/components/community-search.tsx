"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ROUTES } from "@/constants";

import { COMMUNITY_CATEGORIES } from "../types";

export function CommunitySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    const q = query.trim();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (country) params.set("country", country);
    const qs = params.toString();
    router.push(
      qs ? `${ROUTES.community}?${qs}#browse-stories` : `${ROUTES.community}#browse-stories`,
    );
  }

  return (
    <div className="mx-auto w-[min(92%,1280px)] px-4 sm:px-6 lg:px-0">
      <form
        onSubmit={handleSearch}
        className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_25px_70px_-30px_rgba(2,6,23,0.2)] sm:p-5"
        role="search"
        aria-label="Search community"
      >
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-sm text-coffee-600">
              Search travelers, stories, destinations, and coffee tags
            </p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
              <label className="sr-only" htmlFor="community-search">
                Search query
              </label>
              <input
                id="community-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 rounded-2xl border border-transparent bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 sm:py-4"
                placeholder="Search traveler, story, destination, or coffee"
                aria-label="Search community"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end">
            <select
              className="h-12 min-w-0 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 sm:h-[64px]"
              aria-label="Filter by country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">All countries</option>
              <option value="Portugal">Portugal</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Austria">Austria</option>
              <option value="Australia">Australia</option>
              <option value="Thailand">Thailand</option>
              <option value="Japan">Japan</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Colombia">Colombia</option>
              <option value="France">France</option>
              <option value="Guatemala">Guatemala</option>
            </select>
            <select
              className="h-12 min-w-0 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 sm:h-[64px]"
              aria-label="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {COMMUNITY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="h-12 rounded-2xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] sm:h-[64px]"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
