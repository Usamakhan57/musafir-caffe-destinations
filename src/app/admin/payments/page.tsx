import { redirect } from "next/navigation";

import { ROUTES } from "@/constants";
import { AdminShell, ResourceManager, isStaffRole } from "@/features/admin";
import { auth } from "@/lib/auth";

export default async function AdminPaymentsPage() {
  const session = await auth();
  if (!session || !isStaffRole(session.user.role)) redirect("/login");

  return (
    <AdminShell
      title="Payments"
      description="Inspect and update payment intent records."
      activeHref={`${ROUTES.admin}/payments`}
    >
      <ResourceManager
        resource="payments"
        title="Payments"
        supportsStatusBulk={false}
        columns={[
          { key: "providerId", label: "Provider ID" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created" },
        ]}
        createFields={[
          { key: "status", label: "Status", type: "select", options: [{ label: "Requires payment", value: "requires_payment_method" }, { label: "Succeeded", value: "succeeded" }, { label: "Canceled", value: "canceled" }], required: true },
        ]}
      />
    </AdminShell>
  );
}
