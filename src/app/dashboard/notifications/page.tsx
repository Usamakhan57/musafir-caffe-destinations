import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { listNotifications } from "@/features/notifications/store";
import { ROUTES } from "@/constants/routes";

function formatRelative(iso: string) {
  const delta = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(delta / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const items = await listNotifications(session.user.id ?? "demo");
  const unread = items.filter((item) => item.unread);
  const read = items.filter((item) => !item.unread);

  return (
    <DashboardShell
      session={session}
      title="Notifications"
      description="Review updates without losing the signal of what matters most."
      activePath={ROUTES.dashboardNotifications}
    >
      <div className="space-y-5">
        <DashboardPage title="Unread" description="Priority updates and time-sensitive notices.">
          <div className="space-y-3">
            {unread.length > 0 ? (
              unread.map((item) => (
                <div key={item.id} className="rounded-[22px] border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.message}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                      {formatRelative(item.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                You’re fully up to date.
              </p>
            )}
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
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {formatRelative(item.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
