import { CardSkeleton, Skeleton } from "@/shared/ui";

export default function DestinationsLoading() {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pt-14"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading destinations…</span>
      <Skeleton className="h-3 w-24" rounded="full" />
      <Skeleton className="mt-4 h-10 w-64" rounded="full" />
      <Skeleton className="mt-4 h-16 w-full max-w-2xl" rounded="2xl" />
      <Skeleton className="mt-10 h-16 w-full" rounded="2xl" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
