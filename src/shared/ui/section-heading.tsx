interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  /** Optional id on the <h2>, for pairing with a parent `aria-labelledby`. */
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  id,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = theme === "dark" ? "text-white" : "text-[#111827]";
  const bodyColor = theme === "dark" ? "text-white/75" : "text-[#6B7280]";
  const eyebrowColor = theme === "dark" ? "text-[#99F6E4]" : "text-[#0F766E]";
  const ruleColor = theme === "dark" ? "bg-[#99F6E4]/50" : "bg-[#0F766E]/50";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${eyebrowColor}`}
      >
        <span aria-hidden className={`h-px w-8 ${ruleColor}`} />
        {eyebrow}
        {align === "center" ? (
          <span aria-hidden className={`h-px w-8 ${ruleColor}`} />
        ) : null}
      </span>
      <h2
        id={id}
        className={`font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`text-base leading-relaxed sm:text-lg sm:leading-8 ${bodyColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
