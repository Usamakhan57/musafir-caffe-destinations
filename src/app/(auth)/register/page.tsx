import { AuthCard, RegisterForm } from "@/features/auth";
import { ROUTES } from "@/constants";

export default function RegisterPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-14 sm:px-8 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(15,118,110,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 100%, rgba(20,184,166,0.12), transparent 50%)",
        }}
      />
      <div className="relative w-full max-w-md">
        <AuthCard
          title="Create an account"
          description="Join the MusafirCaffe community."
          footer={{
            text: "Already have an account?",
            linkText: "Sign in",
            href: ROUTES.login,
          }}
        >
          <RegisterForm />
        </AuthCard>
      </div>
    </div>
  );
}
