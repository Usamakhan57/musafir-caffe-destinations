import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminCategoriesPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Categories"
      description="Organize content taxonomy for destinations, cafés, and guides."
      activeHref={`${ROUTES.admin}/categories`}
    >
      <ResourceManager
        resource="categories"
        title="Categories"
        supportsStatusBulk={false}
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "scope", label: "Scope" },
          { key: "description", label: "Description" },
        ]}
        createFields={[
          { key: "name", label: "Name", required: true },
          { key: "slug", label: "Slug", required: true },
          { key: "scope", label: "Scope" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
      />
    </AdminShell>
  );
}
