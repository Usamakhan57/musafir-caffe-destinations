import { CardSkeleton, HeroSkeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col bg-[#FAFAF9]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <HeroSkeleton />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
