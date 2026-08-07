import { CardSkeleton, HeroSkeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col bg-[#FAFAF9]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <HeroSkeleton />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-12 sm:grid-cols-2 sm:px-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
