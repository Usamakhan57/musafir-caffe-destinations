import { CardSkeleton, Skeleton } from "@/shared/ui";

export default function CafesLoading() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading cafés…</span>
      <div className="min-h-[300px] bg-[#111827] sm:min-h-[360px]" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:px-12">
        <Skeleton className="h-3 w-28" rounded="full" />
        <Skeleton className="mt-8 h-28 w-full rounded-[24px]" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
