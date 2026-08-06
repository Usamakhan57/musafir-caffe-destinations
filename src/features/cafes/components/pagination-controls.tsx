import Link from "next/link";

import { ROUTES } from "@/constants";

import { buildCafeQuery } from "../lib/query";
import type { CafeFilters } from "../types";

interface PaginationControlsProps {
  filters: CafeFilters;
  totalPages: number;
}

function pageNumbers(current: number, total: number): number[] {
  const window = 1;
  const pages = new Set<number>([1, total]);
  for (let page = current - window; page <= current + window; page++) {
    if (page >= 1 && page <= total) pages.add(page);
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function PaginationControls({ filters, totalPages }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const pages = pageNumbers(filters.page, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={`${ROUTES.cafes}${buildCafeQuery(filters, { page: Math.max(1, filters.page - 1) })}`}
        aria-label="Previous page"
        aria-disabled={filters.page === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors ${
          filters.page === 1
            ? "pointer-events-none border-cream-200 text-coffee-300"
            : "border-cream-300 text-coffee-700 hover:border-forest-500 hover:text-forest-700"
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {pages.map((pageNum, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev !== undefined && pageNum - prev > 1;

        return (
          <span key={pageNum} className="flex items-center gap-2">
            {showEllipsis && <span className="text-coffee-400">&hellip;</span>}
            <Link
              href={`${ROUTES.cafes}${buildCafeQuery(filters, { page: pageNum })}`}
              aria-current={pageNum === filters.page ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                pageNum === filters.page ? "bg-forest-600 text-cream-50" : "text-coffee-700 hover:bg-cream-200/60"
              }`}
            >
              {pageNum}
            </Link>
          </span>
        );
      })}

      <Link
        href={`${ROUTES.cafes}${buildCafeQuery(filters, { page: Math.min(totalPages, filters.page + 1) })}`}
        aria-label="Next page"
        aria-disabled={filters.page === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors ${
          filters.page === totalPages
            ? "pointer-events-none border-cream-200 text-coffee-300"
            : "border-cream-300 text-coffee-700 hover:border-forest-500 hover:text-forest-700"
        }`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
}
