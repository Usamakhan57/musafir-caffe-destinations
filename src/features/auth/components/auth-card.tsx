import Link from "next/link";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: {
    text: string;
    linkText: string;
    href: string;
  };
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-7 rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_24px_60px_-36px_rgba(15,118,110,0.35)] sm:p-8">
      <div className="flex flex-col gap-2 text-center">
        <div className="mx-auto mb-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F766E] text-lg font-semibold text-white">
          M
        </div>
        <h1 className="font-serif text-2xl font-semibold text-[#111827] sm:text-[1.65rem]">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
      </div>
      {children}
      {footer ? (
        <p className="text-center text-sm text-[#6B7280]">
          {footer.text}{" "}
          <Link
            href={footer.href}
            className="font-semibold text-[#0F766E] underline-offset-2 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
          >
            {footer.linkText}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
