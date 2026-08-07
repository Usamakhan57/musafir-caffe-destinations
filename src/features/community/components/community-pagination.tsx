import Link from "next/link";

import { ROUTES } from "@/constants";

import { buildCommunityQuery } from "../lib/query";
import type { CommunityFilters } from "../types";

interface CommunityPaginationProps {
  filters: CommunityFilters;
  totalPages: number;
}

function pageNumbers(current: number, total: number): number[] {
  const pages = new Set<number>([1, total]);
  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function CommunityPagination({ filters, totalPages }: CommunityPaginationProps) {
  if (totalPages <= 1) return null;
  const pages = pageNumbers(filters.page, totalPages);

  return (
    <nav aria-label="Stories pagination" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={`${ROUTES.community}${buildCommunityQuery(filters, { page: Math.max(1, filters.page - 1) })}`}
        aria-disabled={filters.page === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
          filters.page === 1
            ? "pointer-events-none border-[#E5E7EB] text-[#D1D5DB]"
            : "border-[#E5E7EB] text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB]"
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
              href={`${ROUTES.community}${buildCommunityQuery(filters, { page: pageNum })}`}
              aria-current={pageNum === filters.page ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                pageNum === filters.page
                  ? "bg-[#2563EB] text-white"
                  : "text-[#374151] hover:bg-[#EFF6FF]"
              }`}
            >
              {pageNum}
            </Link>
          </span>
        );
      })}
      <Link
        href={`${ROUTES.community}${buildCommunityQuery(filters, { page: Math.min(totalPages, filters.page + 1) })}`}
        aria-disabled={filters.page === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
          filters.page === totalPages
            ? "pointer-events-none border-[#E5E7EB] text-[#D1D5DB]"
            : "border-[#E5E7EB] text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB]"
        }`}
        aria-label="Next page"
      >
        ›
      </Link>
    </nav>
  );
}
