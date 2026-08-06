import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { ROUTES } from "@/constants/routes";

export default async function CommunityPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell session={session} title="Community" description="Stay connected to your circle, your hosts, and the conversations that matter." activePath={ROUTES.dashboardCommunity}>
      <div className="space-y-5">
        <DashboardPage title="Community activity" description="The latest conversations shaping your circle.">
          <div className="space-y-3">
            {[
              ["Design cafés around the world", "12 new replies", "A thoughtful conversation on aesthetic routes"],
              ["Slow travel in winter", "4 new members", "A warm community of quiet travel lovers"],
            ].map(([title, meta, note]) => (
              <div key={title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{meta}</p>
                <p className="mt-2 text-sm text-slate-500">{note}</p>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
