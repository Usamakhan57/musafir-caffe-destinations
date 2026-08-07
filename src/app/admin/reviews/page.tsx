import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminReviewsPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Reviews"
      description="Moderate traveler reviews across cafés, destinations, and guides."
      activeHref={`${ROUTES.admin}/reviews`}
    >
      <ResourceManager
        resource="reviews"
        title="Reviews"
        columns={[
          { key: "targetName", label: "Target" },
          { key: "rating", label: "Rating" },
          { key: "targetType", label: "Type" },
          { key: "status", label: "Status" },
          { key: "authorName", label: "Author" },
          { key: "updatedAt", label: "Updated" },
        ]}
        createFields={[
          {
            key: "targetType",
            label: "Target type",
            type: "select",
            options: [
              { label: "Café", value: "cafe" },
              { label: "Destination", value: "destination" },
              { label: "Guide", value: "guide" },
              { label: "Community", value: "community" },
            ],
            required: true,
          },
          { key: "targetId", label: "Target ID", required: true },
          { key: "targetName", label: "Target name", required: true },
          { key: "rating", label: "Rating (1-5)", type: "number", required: true },
          { key: "body", label: "Body", type: "textarea", required: true },
          { key: "authorName", label: "Author", required: true },
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
              { label: "Archived", value: "archived" },
            ],
          },
        ]}
      />
    </AdminShell>
  );
}
