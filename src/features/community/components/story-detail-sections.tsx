import Image from "next/image";
import Link from "next/link";

import { CafeCard, type CafeSummary } from "@/features/cafes";
import { DestinationCard, type DestinationSummary } from "@/features/destinations";
import { ROUTES } from "@/constants";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import { getTravelerForStory } from "../data/community-store";
import type { CommunityStory } from "../types";
import StoryCard from "./story-card";

export function StoryGallery({
  images,
}: {
  images: readonly { src: string; alt: string }[];
}) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="story-gallery-heading">
      <h2
        id="story-gallery-heading"
        className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
      >
        Gallery
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width:640px) 50vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function JourneyTimeline({
  steps,
}: {
  steps: CommunityStory["journey"];
}) {
  if (steps.length === 0) return null;

  return (
    <section aria-labelledby="journey-timeline-heading">
      <h2
        id="journey-timeline-heading"
        className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
      >
        Journey timeline
      </h2>
      <ol className="relative mt-8 space-y-6 border-l-2 border-[#2563EB]/25 pl-6">
        {steps.map((step) => (
          <li key={`${step.day}-${step.title}`} className="relative">
            <span
              className="absolute -left-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#2563EB] shadow"
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
              {step.day}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-[#111827]">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#6B7280]">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StoryBudget({ budget }: { budget: CommunityStory["budget"] }) {
  return (
    <section
      aria-labelledby="story-budget-heading"
      className="rounded-3xl border border-slate-200 bg-[#FAFAF9] p-6 sm:p-8"
    >
      <h2 id="story-budget-heading" className="font-serif text-2xl font-semibold text-[#111827]">
        Budget
      </h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Total</dt>
          <dd className="mt-1 font-serif text-3xl text-[#111827]">{budget.total}</dd>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <dt className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Daily</dt>
          <dd className="mt-1 font-serif text-3xl text-[#111827]">{budget.daily}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-7 text-[#6B7280]">{budget.notes}</p>
    </section>
  );
}

export function TipsList({
  id,
  title,
  tips,
}: {
  id: string;
  title: string;
  tips: readonly string[];
}) {
  if (tips.length === 0) return null;

  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {tips.map((tip) => (
          <li
            key={tip}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-[#4B5563]"
          >
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CoffeeRecs({
  items,
}: {
  items: CommunityStory["coffeeRecommendations"];
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="coffee-recs-heading">
      <h2
        id="coffee-recs-heading"
        className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
      >
        Coffee recommendations
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-semibold text-[#111827]">{item.name}</p>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">{item.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StoryComments({
  comments,
}: {
  comments: CommunityStory["comments"];
}) {
  return (
    <section aria-labelledby="story-comments-heading">
      <h2
        id="story-comments-heading"
        className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
      >
        Comments
      </h2>
      {comments.length === 0 ? (
        <p className="mt-4 text-sm text-[#6B7280]">Be the first to leave a comment.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={comment.authorAvatar}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{comment.authorName}</p>
                  <p className="text-xs text-[#6B7280]">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#4B5563]">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-[#FAFAF9] p-5 text-sm text-[#6B7280]">
        Interactive commenting is coming soon — share the story with a fellow traveler in the meantime.
      </div>
    </section>
  );
}

export function VisitedCafesSection({ cafes }: { cafes: readonly CafeSummary[] }) {
  if (cafes.length === 0) return null;

  return (
    <section aria-labelledby="visited-cafes-heading">
      <SectionHeading
        id="visited-cafes-heading"
        eyebrow="Cafés"
        title="Visited cafés"
        description="Stops this traveler loved along the route."
        align="left"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </section>
  );
}

export function VisitedDestinationsSection({
  destinations,
}: {
  destinations: readonly DestinationSummary[];
}) {
  if (destinations.length === 0) return null;

  return (
    <section aria-labelledby="visited-destinations-heading">
      <SectionHeading
        id="visited-destinations-heading"
        eyebrow="Destinations"
        title="Visited destinations"
        description="Places woven into this journey."
        align="left"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </section>
  );
}

export function RelatedStoriesSection({ stories }: { stories: readonly CommunityStory[] }) {
  if (stories.length === 0) return null;

  return (
    <section aria-labelledby="related-stories-heading">
      <SectionHeading
        id="related-stories-heading"
        eyebrow="Keep reading"
        title="Related stories"
        description="More community journeys travelers read next."
        align="left"
      />
      <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
        {stories.map((story) => (
          <StaggerItem key={story.slug}>
            <StoryCard story={story} author={getTravelerForStory(story)} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function BackToCommunityLink() {
  return (
    <div className="border-t border-slate-200 pt-10">
      <Link
        href={ROUTES.community}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-[#2563EB] transition hover:border-[#2563EB]/40"
      >
        ← Back to Community
      </Link>
    </div>
  );
}

export function StoryBody({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-8 text-[#374151]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="text-pretty">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
