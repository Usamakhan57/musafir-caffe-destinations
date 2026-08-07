import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminNewsletterPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Newsletter"
      description="Manage newsletter subscribers."
      activeHref={`${ROUTES.admin}/newsletter`}
    >
      <ResourceManager
        resource="newsletter"
        title="Newsletter"
        supportsStatusBulk={false}
        columns={[
          { key: "email", label: "Email" },
          { key: "name", label: "Name" },
          { key: "status", label: "Status" },
          { key: "source", label: "Source" },
        ]}
        createFields={[
          { key: "email", label: "Email", required: true },
          { key: "name", label: "Name" },
          { key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "active" }, { label: "Unsubscribed", value: "unsubscribed" }] },
          { key: "source", label: "Source" },
        ]}
      />
    </AdminShell>
  );
}
