import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminNotificationCenterPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Notification Center"
      description="Create and manage system notifications."
      activeHref={`${ROUTES.admin}/notifications`}
    >
      <ResourceManager
        resource="notifications"
        title="Notification Center"
        supportsStatusBulk={false}
        columns={[
          { key: "title", label: "Title" },
          { key: "userId", label: "User" },
          { key: "kind", label: "Kind" },
          { key: "unread", label: "Unread" },
        ]}
        createFields={[
          { key: "userId", label: "User ID", required: true },
          { key: "kind", label: "Kind", required: true },
          { key: "title", label: "Title", required: true },
          { key: "message", label: "Message", type: "textarea", required: true },
          { key: "href", label: "Href" },
          { key: "unread", label: "Unread", type: "select", options: [{ label: "Unread", value: "true" }, { label: "Read", value: "false" }] },
        ]}
      />
    </AdminShell>
  );
}
