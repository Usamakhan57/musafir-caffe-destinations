import Image from "next/image";

import { SectionHeading } from "@/shared/ui";

import type { Activity } from "../types";

interface ThingsToDoSectionProps {
  activities: readonly Activity[];
}

export function ThingsToDoSection({ activities }: ThingsToDoSectionProps) {
  if (activities.length === 0) return null;

  return (
    <section aria-labelledby="things-to-do-heading">
      <SectionHeading id="things-to-do-heading" eyebrow="Things To Do" title="Fill the hours between cups" align="left" />
      <div className="mt-8 flex flex-col gap-4">
        {activities.map((activity) => (
          <article
            key={activity.name}
            className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white shadow-card sm:flex-row"
          >
            <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-56">
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 p-5 sm:py-5 sm:pl-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-coffee-900">{activity.name}</h3>
                <span className="text-xs font-medium uppercase tracking-wide text-forest-600">
                  {activity.duration}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-coffee-600">{activity.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
