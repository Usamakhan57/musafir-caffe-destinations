import { CardSkeleton, Skeleton } from "@/shared/ui";

export default function GuidesLoading() {
  return (
    <div className="overflow-x-hidden bg-white" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading travel guides…</span>
      <div className="min-h-[560px] bg-slate-200 sm:min-h-[640px]" />
      <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-16 sm:px-8 lg:px-12">
        <Skeleton className="h-3 w-28" rounded="full" />
        <Skeleton className="mt-4 h-10 w-80 max-w-full" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
