import type { ReactNode } from "react";

interface HomeSectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  id?: string;
}

export function HomeSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  id,
}: HomeSectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${action ? "sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:text-left" : ""}`}
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#111827] sm:text-4xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-[#6B7280] sm:text-lg sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
