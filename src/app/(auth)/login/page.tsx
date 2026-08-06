import Link from "next/link";

import { AuthCard, LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthCard
        title="Welcome back"
        description="Sign in to your MusafirCaffe account."
        footer={{ text: "Don't have an account?", linkText: "Sign up", href: "/register" }}
      >
        <LoginForm />
        <p className="text-center text-xs text-coffee-400">
          <Link href="/forgot-password" className="hover:text-forest-600">
            Forgot your password?
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
