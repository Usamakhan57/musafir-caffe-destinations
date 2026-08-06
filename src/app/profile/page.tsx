import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { AuthCard, ProfileForm, LogoutButton, AccountSettings } from "@/features/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user.role) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard title="Your profile" description="Manage your MusafirCaffe account.">
        <ProfileForm session={session} />
        <div className="flex justify-center">
          <LogoutButton />
        </div>
        <AccountSettings />
      </AuthCard>
    </div>
  );
}
