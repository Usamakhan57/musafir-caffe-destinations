import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminDashboard, AdminShell, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session || !isStaffRole(session.user.role)) {
    redirect("/login");
  }

  return (
    <AdminShell
      title="Manage the community, content, and operations."
      description="This workspace protects staff routes while providing a premium management experience for the full travel ecosystem."
      activeHref={ROUTES.admin}
    >
      <AdminDashboard />
    </AdminShell>
  );
}
