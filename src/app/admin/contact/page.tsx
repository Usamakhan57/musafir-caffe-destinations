import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminContactInboxPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Contact Inbox"
      description="Review and triage inbound contact messages."
      activeHref={`${ROUTES.admin}/contact`}
    >
      <ResourceManager
        resource="contact"
        title="Contact Inbox"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Received" },
        ]}
        createFields={[
          { key: "status", label: "Status", type: "select", options: [{ label: "New", value: "new" }, { label: "Queued", value: "queued" }, { label: "Closed", value: "closed" }], required: true },
        ]}
      />
    </AdminShell>
  );
}
