import Link from "next/link";

import { AuthCard, LoginForm } from "@/features/auth";
import { ROUTES } from "@/constants";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-14 sm:px-8 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(15,118,110,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 100%, rgba(245,158,11,0.12), transparent 50%)",
        }}
      />
      <div className="relative w-full max-w-md">
        <AuthCard
          title="Welcome back"
          description="Sign in to your MusafirCaffe account."
          footer={{
            text: "Don't have an account?",
            linkText: "Sign up",
            href: ROUTES.register,
          }}
        >
          <LoginForm />
          <p className="text-center text-xs text-[#6B7280]">
            <Link
              href={ROUTES.forgotPassword}
              className="font-medium text-[#0F766E] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
            >
              Forgot your password?
            </Link>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}
