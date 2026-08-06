import { AuthCard, RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Create an account"
        description="Join the MusafirCaffe community."
        footer={{ text: "Already have an account?", linkText: "Sign in", href: "/login" }}
      >
        <RegisterForm />
      </AuthCard>
    </div>
  );
}
