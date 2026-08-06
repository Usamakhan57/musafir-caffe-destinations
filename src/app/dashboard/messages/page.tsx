import { auth } from "@/lib/auth";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { messageThreadsData } from "@/features/dashboard/data/dashboard-data";
import { ROUTES } from "@/constants/routes";

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const activeThread = messageThreadsData[0];

  return (
    <DashboardShell session={session} title="Messages" description="A focused place to keep your conversations organized and private." activePath={ROUTES.dashboardMessages}>
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <DashboardPage title="Conversations" description="Your recent discussions and priority threads.">
          <div className="space-y-3">
            {messageThreadsData.map((thread) => (
              <div key={thread.id} className={`rounded-[22px] border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${thread.unread ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{thread.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{thread.role}</p>
                  </div>
                  {thread.online && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
                </div>
                <p className="mt-3 text-sm text-slate-600">{thread.preview}</p>
              </div>
            ))}
          </div>
        </DashboardPage>

        <DashboardPage title="Live chat" description="A modern conversation view for your next exchange.">
          <div className="rounded-[24px] border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">{activeThread.name}</p>
                <p className="text-sm text-slate-600">{activeThread.role}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Live</span>
            </div>
            <div className="mt-5 space-y-3">
              {activeThread.messages.map((message) => (
                <div key={message.id} className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.from === "me" ? "ml-auto bg-blue-600 text-white" : "bg-white text-slate-700"}`}>
                  <p>{message.content}</p>
                  <p className={`mt-2 text-[11px] uppercase tracking-[0.18em] ${message.from === "me" ? "text-blue-100" : "text-slate-400"}`}>{message.time}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm text-slate-600">Attach a photo or note to keep the conversation rich and practical.</div>
          </div>
        </DashboardPage>
      </div>
    </DashboardShell>
  );
}
