import { SectionHeading } from "@/shared/ui";

import type { TravelTip } from "../types";

interface TravelTipsSectionProps {
  tips: readonly TravelTip[];
}

export function TravelTipsSection({ tips }: TravelTipsSectionProps) {
  if (tips.length === 0) return null;

  return (
    <section aria-labelledby="travel-tips-heading">
      <SectionHeading id="travel-tips-heading" eyebrow="Travel Tips" title="Good to know before you go" align="left" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {tips.map((tip) => (
          <li
            key={tip.title}
            className="flex gap-4 rounded-2xl border border-cream-200 bg-white p-5"
          >
            <span
              aria-hidden
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-coffee-900">{tip.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-coffee-600">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
