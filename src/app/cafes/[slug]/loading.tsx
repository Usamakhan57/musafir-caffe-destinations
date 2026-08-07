import { Skeleton } from "@/shared/ui";

export default function CafeDetailLoading() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading café…</span>
      <div className="min-h-[420px] bg-[#111827]" />
      <div className="mx-auto w-full max-w-7xl space-y-6 px-5 py-14 sm:px-8 lg:px-12">
        <Skeleton className="h-8 w-64" rounded="full" />
        <Skeleton className="h-24 w-full max-w-3xl" rounded="2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" rounded="2xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" rounded="2xl" />
      </div>
    </div>
  );
}
