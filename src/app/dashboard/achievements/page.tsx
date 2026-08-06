import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export default async function AchievementsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Achievements" description="Celebrate the milestones, streaks, and travel stories that have shaped your journey." activePath={ROUTES.dashboardAchievements}>
      <div className="space-y-5">
        <DashboardPage title="Recent milestones" description="Your earned momentum and momentum to come.">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Coffee explorer", "10 cafés logged"],
              ["Weekend wanderer", "5 city breaks"],
            ].map(([title, value]) => (
              <div key={title} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
