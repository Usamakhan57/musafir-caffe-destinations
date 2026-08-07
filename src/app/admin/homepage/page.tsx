import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminHomepageCMSPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Homepage CMS"
      description="Edit homepage content documents stored in PostgreSQL."
      activeHref={`${ROUTES.admin}/homepage`}
    >
      <ResourceManager
        resource="homepage"
        title="Homepage CMS"
        supportsStatusBulk={false}
        columns={[
          { key: "key", label: "Key" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "key", label: "Key", required: true },
          { key: "payload", label: "JSON payload", type: "textarea", required: true },
        ]}
      />
    </AdminShell>
  );
}
