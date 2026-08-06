import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { notificationsData } from "@/features/dashboard/data/dashboard-data";
import { ROUTES } from "@/constants/routes";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const unread = notificationsData.filter((item) => item.unread);
  const read = notificationsData.filter((item) => !item.unread);

  return (
    <DashboardShell session={session} title="Notifications" description="Review updates without losing the signal of what matters most." activePath={ROUTES.dashboardNotifications}>
      <div className="space-y-5">
        <DashboardPage title="Unread" description="Priority updates and time-sensitive notices.">
          <div className="space-y-3">
            {unread.length > 0 ? unread.map((item) => (
              <div key={item.id} className="rounded-[22px] border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.message}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">{item.time}</span>
                </div>
              </div>
            )) : <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">You’re fully up to date.</p>}
          </div>
        </DashboardPage>

        <DashboardPage title="Read" description="A compact archive of past updates.">
          <div className="space-y-3">
            {read.map((item) => (
              <div key={item.id} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.message}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
