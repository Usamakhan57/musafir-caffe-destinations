import { DashboardSkeleton } from "@/shared/ui";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8" aria-busy="true">
      <span className="sr-only">Loading dashboard…</span>
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <DashboardSkeleton />
      </div>
    </div>
  );
}
