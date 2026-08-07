import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Coffee, Lightbulb, Quote } from "lucide-react";

import type { GuideContentBlock } from "../types";

interface GuideArticleContentProps {
  blocks: readonly GuideContentBlock[];
}

export function GuideArticleContent({ blocks }: GuideArticleContentProps) {
  return (
    <div className="prose-guide space-y-6 text-[1.05rem] leading-8 text-[#374151]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={`${block.id}-${index}`}
                id={block.id}
                className="scroll-mt-28 font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={`p-${index}`} className="text-pretty">
                {block.text}
              </p>
            );
          case "callout":
            return (
              <aside
                key={`c-${index}`}
                className={`rounded-2xl border p-5 sm:p-6 ${
                  block.variant === "warning"
                    ? "border-amber-200 bg-amber-50 text-amber-950"
                    : "border-sky-200 bg-sky-50 text-sky-950"
                }`}
                role="note"
              >
                <div className="flex items-start gap-3">
                  {block.variant === "warning" ? (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
                  ) : (
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                  )}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider">{block.title}</p>
                    <p className="mt-2 text-sm leading-7 sm:text-base">{block.text}</p>
                  </div>
                </div>
              </aside>
            );
          case "quote":
            return (
              <blockquote
                key={`q-${index}`}
                className="relative rounded-2xl border border-slate-200 bg-[#FAFAF9] px-6 py-6 sm:px-8"
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-[#2563EB]/20" aria-hidden />
                <p className="font-serif text-xl leading-relaxed text-[#111827] sm:text-2xl">
                  “{block.text}”
                </p>
                {block.attribution ? (
                  <footer className="mt-4 text-sm font-medium text-[#6B7280]">
                    — {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={`i-${index}`} className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(min-width:1024px) 720px, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-2 text-center text-sm text-[#6B7280]">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function GuideCoffeeFoods({
  coffee,
  foods,
}: {
  coffee: readonly { name: string; note: string }[];
  foods: readonly { name: string; note: string }[];
}) {
  if (coffee.length === 0 && foods.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {coffee.length > 0 ? (
        <section
          aria-labelledby="coffee-recs-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2
            id="coffee-recs-heading"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-[#111827]"
          >
            <Coffee className="h-5 w-5 text-[#2563EB]" aria-hidden />
            Coffee recommendations
          </h2>
          <ul className="mt-4 space-y-4">
            {coffee.map((item) => (
              <li key={item.name}>
                <p className="font-semibold text-[#111827]">{item.name}</p>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {foods.length > 0 ? (
        <section
          aria-labelledby="local-foods-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2
            id="local-foods-heading"
            className="font-serif text-xl font-semibold text-[#111827]"
          >
            Local foods
          </h2>
          <ul className="mt-4 space-y-4">
            {foods.map((item) => (
              <li key={item.name}>
                <p className="font-semibold text-[#111827]">{item.name}</p>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export function GuideFaqSection({
  faqs,
}: {
  faqs: readonly { question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="guide-faq-heading" className="mt-4">
      <h2 id="guide-faq-heading" className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-[#111827] marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {faq.question}
                <span className="text-[#2563EB] transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-[#6B7280] sm:text-base">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function GuideCommentsPlaceholder() {
  return (
    <section
      aria-labelledby="comments-heading"
      className="rounded-3xl border border-dashed border-slate-300 bg-[#FAFAF9] p-8 text-center"
    >
      <h2 id="comments-heading" className="font-serif text-xl font-semibold text-[#111827]">
        Comments
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        Community comments are coming soon. Share this guide with a fellow traveler in the meantime.
      </p>
      <Link
        href="#guide-article"
        className="mt-4 inline-flex text-sm font-semibold text-[#2563EB] underline-offset-2 hover:underline"
      >
        Back to article
      </Link>
    </section>
  );
}
