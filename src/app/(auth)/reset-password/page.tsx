import { AuthCard, ResetPasswordForm } from "@/features/auth";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <AuthCard title="Invalid link" description="This reset link is invalid or has expired.">
          <p className="text-center text-sm text-coffee-500">
            Please request a new password reset link.
          </p>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Reset your password"
        description="Choose a new password for your account."
        footer={{ text: "Remember your password?", linkText: "Sign in", href: "/login" }}
      >
        <ResetPasswordForm token={token} />
      </AuthCard>
    </div>
  );
}
