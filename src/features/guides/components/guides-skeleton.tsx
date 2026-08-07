export function GuidesSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true" aria-live="polite">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-[#E7E5E4]" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-2xl bg-[#E7E5E4]"
          />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white"
          >
            <div className="aspect-[16/10] animate-pulse bg-[#E7E5E4]" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-24 animate-pulse rounded bg-[#E7E5E4]" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-[#E7E5E4]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#E7E5E4]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-[#E7E5E4]" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading travel guides…</span>
    </div>
  );
}

export function GuideDetailSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="h-72 animate-pulse rounded-3xl bg-[#E7E5E4] sm:h-96" />
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-[#E7E5E4]" />
        <div className="h-10 w-full animate-pulse rounded bg-[#E7E5E4]" />
        <div className="h-6 w-2/3 animate-pulse rounded bg-[#E7E5E4]" />
        <div className="space-y-3 pt-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-full animate-pulse rounded bg-[#E7E5E4]"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading guide…</span>
    </div>
  );
}
