import { cn } from "@/shared/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  accent?: string;
}

export function DashboardCard({
  title,
  description,
  children,
  accent = "border-[#E5E7EB]",
}: DashboardCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-[0_14px_36px_-28px_rgba(15,118,110,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-28px_rgba(15,118,110,0.35)] sm:p-6",
        accent,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#111827]">{title}</h3>
          <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
