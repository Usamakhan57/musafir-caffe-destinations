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
  const titleColor = theme === "dark" ? "text-cream-50" : "text-coffee-900";
  const bodyColor = theme === "dark" ? "text-cream-200/80" : "text-coffee-600";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-forest-600">
        <span aria-hidden className="h-px w-8 bg-forest-500" />
        {eyebrow}
        {align === "center" && <span aria-hidden className="h-px w-8 bg-forest-500" />}
      </span>
      <h2 id={id} className={`font-serif text-3xl leading-tight font-semibold sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description ? <p className={`text-lg leading-relaxed ${bodyColor}`}>{description}</p> : null}
    </div>
  );
}
