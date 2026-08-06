import { AuthCard, VerifyEmailForm } from "@/features/auth";

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <AuthCard title="Invalid link" description="This verification link is invalid or has expired.">
          <p className="text-center text-sm text-coffee-500">
            Please request a new verification email.
          </p>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Verify your email"
        description="Click the button below to verify your email address."
      >
        <VerifyEmailForm token={token} />
      </AuthCard>
    </div>
  );
}
