import Link from "next/link";

import { ROUTES } from "@/constants";

import { buildGuidesQuery } from "../lib/query";
import type { GuideFilters } from "../types";

interface GuidesPaginationProps {
  filters: GuideFilters;
  totalPages: number;
}

function pageNumbers(current: number, total: number): number[] {
  const pages = new Set<number>([1, total]);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function GuidesPagination({ filters, totalPages }: GuidesPaginationProps) {
  if (totalPages <= 1) return null;
  const pages = pageNumbers(filters.page, totalPages);

  return (
    <nav aria-label="Guides pagination" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={`${ROUTES.guides}${buildGuidesQuery(filters, { page: Math.max(1, filters.page - 1) })}`}
        aria-disabled={filters.page === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
          filters.page === 1
            ? "pointer-events-none border-[#E5E7EB] text-[#D1D5DB]"
            : "border-[#E5E7EB] text-[#374151] hover:border-[#0F766E] hover:text-[#0F766E]"
        }`}
        aria-label="Previous page"
      >
        ‹
      </Link>
      {pages.map((pageNum, idx) => {
        const prev = pages[idx - 1];
        const ellipsis = prev !== undefined && pageNum - prev > 1;
        return (
          <span key={pageNum} className="flex items-center gap-2">
            {ellipsis ? <span className="text-[#9CA3AF]">…</span> : null}
            <Link
              href={`${ROUTES.guides}${buildGuidesQuery(filters, { page: pageNum })}`}
              aria-current={pageNum === filters.page ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                pageNum === filters.page
                  ? "bg-[#0F766E] text-white"
                  : "text-[#374151] hover:bg-[#0F766E]/10"
              }`}
            >
              {pageNum}
            </Link>
          </span>
        );
      })}
      <Link
        href={`${ROUTES.guides}${buildGuidesQuery(filters, { page: Math.min(totalPages, filters.page + 1) })}`}
        aria-disabled={filters.page === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
          filters.page === totalPages
            ? "pointer-events-none border-[#E5E7EB] text-[#D1D5DB]"
            : "border-[#E5E7EB] text-[#374151] hover:border-[#0F766E] hover:text-[#0F766E]"
        }`}
        aria-label="Next page"
      >
        ›
      </Link>
    </nav>
  );
}
