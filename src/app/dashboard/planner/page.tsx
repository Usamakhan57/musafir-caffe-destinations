import { auth } from "@/lib/auth";
import { ROUTES } from "@/constants/routes";
import { DashboardPage, DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { TripPlanner } from "@/features/trip-planner";

export default async function PlannerPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <DashboardShell
      session={session}
      title="AI Trip Planner"
      description="Shape a premium, personalized route with a calm and beautifully structured itinerary experience."
      activePath={ROUTES.dashboardPlanner}
    >
      <DashboardPage title="Create your next itinerary" description="Choose your destination, pacing, and preferences, then generate a polished plan in minutes.">
        <TripPlanner />
      </DashboardPage>
    </DashboardShell>
  );
}
