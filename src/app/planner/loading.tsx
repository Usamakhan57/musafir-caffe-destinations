export default function PlannerLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12" aria-busy="true">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-[#E7E5E4]" />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="h-[480px] animate-pulse rounded-[28px] bg-[#E7E5E4]" />
        <div className="h-[480px] animate-pulse rounded-[28px] bg-[#E7E5E4]" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
