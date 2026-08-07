import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Users"
      description="Manage travelers, editors, moderators, and admins."
      activeHref={`${ROUTES.admin}/users`}
    >
      <ResourceManager
        resource="users"
        title="Users"
        apiBase="/api/admin/users"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "emailVerified", label: "Verified" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "email", label: "Email", required: true },
          {
            key: "role",
            label: "Role",
            type: "select",
            options: [
              { label: "Traveler", value: "traveler" },
              { label: "Editor", value: "editor" },
              { label: "Moderator", value: "moderator" },
              { label: "Admin", value: "admin" },
              { label: "Café owner", value: "cafe-owner" },
              { label: "Guide creator", value: "guide-creator" },
            ],
          },
          {
            key: "emailVerified",
            label: "Email verified",
            type: "select",
            options: [
              { label: "False", value: "false" },
              { label: "True", value: "true" },
            ],
          },
        ]}
      />
    </AdminShell>
  );
}
