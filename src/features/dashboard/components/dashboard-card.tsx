interface DashboardCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  accent?: string;
}

export function DashboardCard({ title, description, children, accent = "border-slate-200" }: DashboardCardProps) {
  return (
    <section className={`rounded-[24px] border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${accent}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
