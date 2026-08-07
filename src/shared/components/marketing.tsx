import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs, type BreadcrumbItem } from "@/shared/components/breadcrumbs";
import { Container, Section, SectionHeading } from "@/shared/ui";
import { cn } from "@/shared/utils";

interface MarketingHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
}

/** Premium page hero used across marketing/content pages — not for homepage. */
export function MarketingHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
}: MarketingHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[#FAFAF9]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 12% 0%, rgba(15,118,110,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 92% 20%, rgba(245,158,11,0.1), transparent 50%)",
        }}
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0F766E]">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#111827] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6B7280] sm:text-lg sm:leading-8">
            {description}
          </p>
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}

interface ContentCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export function ContentCard({ icon, title, description, href }: ContentCardProps) {
  const body = (
    <>
      {icon ? (
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          {icon}
        </div>
      ) : null}
      <h3 className="font-serif text-xl font-semibold text-[#111827]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7280] sm:text-[15px]">{description}</p>
      {href ? (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F766E]">
          Learn more
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block rounded-[22px] border border-[#E5E7EB] bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#0F766E]/30 hover:shadow-[0_20px_40px_-28px_rgba(15,118,110,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] sm:p-7"
      >
        {body}
      </Link>
    );
  }

  return (
    <article className="rounded-[22px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
      {body}
    </article>
  );
}

interface ContentGridProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3;
}

export function ContentGrid({ children, className, columns = 3 }: ContentGridProps) {
  return (
    <div
      className={cn(
        "grid gap-5 sm:gap-6",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ContentCtaProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function ContentCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: ContentCtaProps) {
  return (
    <Section tone="muted">
      <Container>
        <div className="overflow-hidden rounded-[28px] border border-[#0F766E]/15 bg-[#0F766E] px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href={primaryHref}
                className="inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-6 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(92,64,51,0.7)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {primaryLabel}
              </Link>
              {secondaryHref && secondaryLabel ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex h-12 items-center justify-center rounded-[18px] border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

interface ProseSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "default" | "muted" | "white";
  align?: "left" | "center";
}

export function ProseSection({
  eyebrow,
  title,
  description,
  children,
  tone = "white",
  align = "left",
}: ProseSectionProps) {
  return (
    <Section tone={tone}>
      <Container>
        <div className={cn(align === "center" && "mx-auto flex flex-col items-center")}>
          <SectionHeading
            eyebrow={eyebrow ?? "MusafirCaffe"}
            title={title}
            description={description}
            align={align}
          />
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </Section>
  );
}
