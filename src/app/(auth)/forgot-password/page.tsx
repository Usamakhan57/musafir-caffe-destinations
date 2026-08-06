import { AuthCard, ForgotPasswordForm } from "@/features/auth";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Forgot password"
        description="Enter your email and we'll send you a reset link."
        footer={{ text: "Remember your password?", linkText: "Sign in", href: "/login" }}
      >
        <ForgotPasswordForm />
      </AuthCard>
    </div>
  );
}
