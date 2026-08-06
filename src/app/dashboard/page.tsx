import { auth } from "@/lib/auth";
import { DashboardHome } from "@/features/dashboard/components/dashboard-home";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return <DashboardHome session={session} />;
}
