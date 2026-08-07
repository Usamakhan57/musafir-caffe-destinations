import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, MapPin, Sparkles } from "lucide-react";

import { communityTravelerRoute, ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";

import type { CommunityStory, Traveler } from "../types";
import { StoryActions } from "./story-actions";
import { TravelerFollowButton } from "./traveler-card";

interface StoryDetailHeroProps {
  story: CommunityStory;
  author: Traveler;
  pageUrl: string;
}

export function StoryDetailHero({ story, author, pageUrl }: StoryDetailHeroProps) {
  return (
    <header className="relative overflow-hidden bg-[#0B1220]">
      <div className="absolute inset-0">
        <Image
          src={story.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/70 to-[#0B1220]/35" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "Community", href: ROUTES.community },
            { label: story.title },
          ]}
          className="[&_ol]:text-white/70 [&_span[aria-current=page]]:text-white [&_a]:hover:text-white [&_svg]:text-white/40"
        />

        <div className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full bg-[#2563EB]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">
              {story.category}
            </p>
            {story.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Featured
              </span>
            ) : null}
          </div>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {story.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            {story.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden />
              {story.destination}, {story.country}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {story.readingMinutes} min read
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={communityTravelerRoute(author.slug)}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur transition hover:bg-white/15"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={author.avatar} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="flex items-center gap-1.5 font-semibold text-white">
                  {author.name}
                  {author.verified ? (
                    <BadgeCheck className="h-4 w-4 text-[#93C5FD]" aria-label="Verified" />
                  ) : null}
                </p>
                <p className="text-sm text-white/70">{author.location}</p>
              </div>
            </Link>
            <TravelerFollowButton slug={author.slug} />
          </div>

          <StoryActions
            slug={story.slug}
            title={story.title}
            url={pageUrl}
            likes={story.likes}
            className="mt-6"
          />
        </div>
      </div>
    </header>
  );
}
