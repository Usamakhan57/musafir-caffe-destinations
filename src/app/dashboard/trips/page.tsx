import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { tripsData } from "@/features/dashboard/data/dashboard-data";
import { getStatusClasses } from "@/features/dashboard/lib/dashboard-utils";
import { ROUTES } from "@/constants/routes";

export default async function TripsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="My Trips" description="Track every planned, active, and completed journey in one calm workspace." activePath={ROUTES.dashboardTrips}>
      <div className="space-y-5">
        <DashboardPage title="Upcoming journeys" description="Every route is arranged to feel calm, clear, and travel-ready.">
          <div className="grid gap-4 lg:grid-cols-2">
            {tripsData.map((trip) => (
              <div key={trip.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-blue-700">{trip.destination}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-950">{trip.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${getStatusClasses(trip.status)}`}>
                    {trip.status.replace("-", " ")}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{trip.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>{trip.dates}</span>
                  <span>•</span>
                  <span>{trip.progress}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trip.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DashboardPage>

        <DashboardPage title="Trip status" description="A clear view on your journey lifecycle.">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["Upcoming", "3"],
              ["Completed", "8"],
              ["Cancelled", "1"],
              ["AI planned", "2"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
