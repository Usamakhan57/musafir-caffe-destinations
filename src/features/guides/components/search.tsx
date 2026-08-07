"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ROUTES } from "@/constants";

export default function GuidesSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(
      q ? `${ROUTES.destinations}?q=${encodeURIComponent(q)}` : ROUTES.destinations,
    );
  };

  return (
    <div className="mx-auto -mt-20 w-[min(92%,1280px)] px-4 sm:-mt-24 sm:px-6 lg:px-0">
      <form
        onSubmit={handleSearch}
        className="rounded-[28px] bg-white p-4 shadow-[0_25px_70px_-30px_rgba(2,6,23,0.2)] sm:p-5"
        role="search"
        aria-label="Search guides"
      >
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="text-sm text-coffee-600">Search guides, cafés, and curated routes</p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
              <label className="sr-only" htmlFor="guides-search">
                Search query
              </label>
              <input
                id="guides-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 rounded-2xl border border-transparent bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 sm:py-4"
                placeholder="Search destination, café, or travel theme"
                aria-label="Search guides"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end">
            <select
              className="h-12 min-w-0 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 sm:h-[64px]"
              aria-label="Filter by region"
              defaultValue="all"
            >
              <option value="all">All regions</option>
            </select>
            <select
              className="h-12 min-w-0 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 sm:h-[64px]"
              aria-label="Filter by category"
              defaultValue="all"
            >
              <option value="all">All categories</option>
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
