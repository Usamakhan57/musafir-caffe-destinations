export default function DestinationsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:pt-36" aria-hidden>
      <div className="h-4 w-24 animate-pulse rounded-full bg-cream-200" />
      <div className="mt-4 h-10 w-64 animate-pulse rounded-full bg-cream-200" />
      <div className="mt-4 h-16 w-full max-w-2xl animate-pulse rounded-2xl bg-cream-200/70" />

      <div className="mt-10 h-16 w-full animate-pulse rounded-2xl bg-cream-200/70" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl bg-cream-100">
            <div className="aspect-[16/10] animate-pulse bg-cream-200" />
            <div className="space-y-2 p-5">
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-cream-200" />
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-cream-200" />
              <div className="h-3 w-full animate-pulse rounded-full bg-cream-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
