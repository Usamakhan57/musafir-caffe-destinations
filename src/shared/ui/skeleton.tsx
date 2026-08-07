import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: "md" | "lg" | "xl" | "2xl" | "full";
}

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

export function Skeleton({
  className,
  rounded = "xl",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-[#E5E7EB] via-[#F3F4F6] to-[#E5E7EB] bg-[length:200%_100%]",
        roundedMap[rounded],
        className,
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-1/3" rounded="full" />
        <Skeleton className="h-5 w-2/3" rounded="full" />
        <Skeleton className="h-3 w-full" rounded="full" />
        <Skeleton className="h-3 w-4/5" rounded="full" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4"
        >
          <Skeleton className="h-12 w-12 shrink-0" rounded="xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" rounded="full" />
            <Skeleton className="h-3 w-3/4" rounded="full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6" aria-hidden>
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16" rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" rounded="full" />
          <Skeleton className="h-3 w-56" rounded="full" />
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-24 w-full" rounded="2xl" />
        <Skeleton className="h-24 w-full" rounded="2xl" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="space-y-3">
        <Skeleton className="h-3 w-28" rounded="full" />
        <Skeleton className="h-8 w-64" rounded="full" />
        <Skeleton className="h-4 w-full max-w-xl" rounded="full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="bg-[#FAFAF9] px-6 py-16 sm:px-8 lg:px-12" aria-hidden>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" rounded="full" />
          <Skeleton className="h-12 w-full max-w-md" rounded="xl" />
          <Skeleton className="h-12 w-4/5 max-w-sm" rounded="xl" />
          <Skeleton className="h-20 w-full max-w-xl" rounded="2xl" />
          <Skeleton className="h-14 w-full max-w-2xl" rounded="2xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full" rounded="2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
