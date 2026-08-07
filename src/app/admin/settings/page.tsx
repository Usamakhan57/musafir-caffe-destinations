import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminWebsiteSettingsPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Website Settings"
      description="Key/value website configuration for production."
      activeHref={`${ROUTES.admin}/settings`}
    >
      <ResourceManager
        resource="settings"
        title="Website Settings"
        supportsStatusBulk={false}
        columns={[
          { key: "key", label: "Key" },
          { key: "label", label: "Label" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          { key: "key", label: "Key", required: true },
          { key: "label", label: "Label", required: true },
          { key: "value", label: "Value (JSON)", type: "textarea", required: true },
        ]}
      />
    </AdminShell>
  );
}
