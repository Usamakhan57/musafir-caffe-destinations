import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, MediaLibrary, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminMediaPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Media library"
      description="Register image URLs and manage the CMS gallery."
      activeHref={`${ROUTES.admin}/media`}
    >
      <MediaLibrary />
    </AdminShell>
  );
}
