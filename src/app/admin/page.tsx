import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AdminDashboard } from "@/features/admin";

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fbff_0%,#eff6ff_45%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_70px_-38px_rgba(15,23,42,0.35)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">Admin console</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Manage the community, content, and operations.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            This workspace now protects admin-only routes while providing a premium management experience for the full travel ecosystem.
          </p>
        </div>
        <AdminDashboard />
      </div>
    </main>
  );
}
