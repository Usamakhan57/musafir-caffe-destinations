import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Globe, Sparkles } from "lucide-react";

import { cafeRoute, communityStoryRoute, destinationRoute, ROUTES } from "@/constants";
import { getCafeBySlug } from "@/features/cafes/data/cafes-loader";
import { getDestinationBySlug } from "@/features/destinations/data/destinations-loader";
import { Breadcrumbs } from "@/shared/components";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import {
  getStoriesByAuthor,
  getStoriesBySlugs,
  getTravelerBySlug,
  getTravelerForStory,
} from "../data/community-loader";
import StoryCard from "./story-card";
import { TravelerFollowButton } from "./traveler-card";

interface TravelerProfileProps {
  slug: string;
}

export async function TravelerProfile({ slug }: TravelerProfileProps) {
  const traveler = getTravelerBySlug(slug);
  if (!traveler) return null;

  const published = await getStoriesByAuthor(traveler.slug);
  const savedStories = await getStoriesBySlugs(traveler.savedStorySlugs);
  const visitedDestinations = (
    await Promise.all(
      traveler.visitedDestinationSlugs.map((s) => getDestinationBySlug(s)),
    )
  ).filter(Boolean);
  const visitedCafes = (
    await Promise.all(traveler.visitedCafeSlugs.map((s) => getCafeBySlug(s)))
  ).filter(Boolean);
  const savedDestinations = (
    await Promise.all(
      traveler.savedDestinationSlugs.map((s) => getDestinationBySlug(s)),
    )
  ).filter(Boolean);
  const savedCafes = (
    await Promise.all(traveler.savedCafeSlugs.map((s) => getCafeBySlug(s)))
  ).filter(Boolean);

  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      <section className="border-b border-slate-200 bg-gradient-to-br from-[#EFF6FF] via-white to-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Community", href: ROUTES.community },
              { label: "Travelers" },
              { label: traveler.name },
            ]}
          />

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg sm:h-32 sm:w-32">
                <Image
                  src={traveler.avatar}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                    Traveler profile
                  </p>
                  {traveler.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      <BadgeCheck className="h-3 w-3" aria-hidden />
                      Verified
                    </span>
                  ) : null}
                  {traveler.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      Featured
                    </span>
                  ) : null}
                </div>
                <h1 className="mt-2 font-serif text-4xl font-semibold text-[#111827] sm:text-5xl">
                  {traveler.name}
                </h1>
                <p className="mt-2 text-sm font-medium text-[#6B7280]">{traveler.location}</p>
                <p className="mt-4 text-base leading-7 text-[#4B5563]">{traveler.bio}</p>
                <p className="mt-3 text-sm text-[#6B7280]">
                  {traveler.followers.toLocaleString()} followers · {traveler.following} following
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {traveler.social.instagram ? (
                    <a
                      href={traveler.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                    >
                      Instagram
                    </a>
                  ) : null}
                  {traveler.social.x ? (
                    <a
                      href={traveler.social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                    >
                      X / Twitter
                    </a>
                  ) : null}
                  {traveler.social.website ? (
                    <a
                      href={traveler.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                    >
                      <Globe className="h-4 w-4" aria-hidden />
                      Website
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            <TravelerFollowButton slug={traveler.slug} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl space-y-16 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <section aria-labelledby="visited-countries-heading">
          <SectionHeading
            id="visited-countries-heading"
            eyebrow="Travel map"
            title="Visited countries"
            align="left"
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {traveler.visitedCountries.map((country) => (
              <li
                key={country}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#374151] shadow-sm ring-1 ring-slate-200"
              >
                {country}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="published-stories-heading">
          <SectionHeading
            id="published-stories-heading"
            eyebrow="Published"
            title={`Stories by ${traveler.name}`}
            description={`${published.length} published ${published.length === 1 ? "story" : "stories"}.`}
            align="left"
          />
          <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
            {published.map((story) => (
              <StaggerItem key={story.slug}>
                <StoryCard story={story} author={getTravelerForStory(story)} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {visitedDestinations.length > 0 ? (
          <section aria-labelledby="traveler-destinations-heading">
            <SectionHeading
              id="traveler-destinations-heading"
              eyebrow="Visited"
              title="Visited destinations"
              align="left"
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visitedDestinations.map((destination) =>
                destination ? (
                  <li key={destination.slug}>
                    <Link
                      href={destinationRoute(destination.slug)}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-[#2563EB]/35"
                    >
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                        <Image
                          src={destination.heroImage}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{destination.name}</p>
                        <p className="text-sm text-[#6B7280]">{destination.country}</p>
                      </div>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        {visitedCafes.length > 0 ? (
          <section aria-labelledby="traveler-cafes-heading">
            <SectionHeading
              id="traveler-cafes-heading"
              eyebrow="Visited"
              title="Visited cafés"
              align="left"
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visitedCafes.map((cafe) =>
                cafe ? (
                  <li key={cafe.slug}>
                    <Link
                      href={cafeRoute(cafe.slug)}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-[#2563EB]/35"
                    >
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                        <Image
                          src={cafe.heroImage}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{cafe.name}</p>
                        <p className="text-sm text-[#6B7280]">
                          {cafe.city}, {cafe.country}
                        </p>
                      </div>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        {savedStories.length > 0 ? (
          <section aria-labelledby="saved-stories-heading">
            <SectionHeading
              id="saved-stories-heading"
              eyebrow="Saved"
              title="Saved posts"
              align="left"
            />
            <ul className="mt-6 space-y-2">
              {savedStories.map((story) => (
                <li key={story.slug}>
                  <Link
                    href={communityStoryRoute(story.slug)}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#2563EB]/35"
                  >
                    <span>{story.title}</span>
                    <span className="text-xs font-medium text-[#6B7280]">{story.destination}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {savedDestinations.length > 0 ? (
          <section aria-labelledby="saved-destinations-heading">
            <SectionHeading
              id="saved-destinations-heading"
              eyebrow="Saved"
              title="Saved destinations"
              align="left"
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {savedDestinations.map((destination) =>
                destination ? (
                  <li key={destination.slug}>
                    <Link
                      href={destinationRoute(destination.slug)}
                      className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#374151] shadow-sm ring-1 ring-slate-200 transition hover:text-[#2563EB]"
                    >
                      {destination.name}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        {savedCafes.length > 0 ? (
          <section aria-labelledby="saved-cafes-heading">
            <SectionHeading
              id="saved-cafes-heading"
              eyebrow="Saved"
              title="Saved cafés"
              align="left"
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {savedCafes.map((cafe) =>
                cafe ? (
                  <li key={cafe.slug}>
                    <Link
                      href={cafeRoute(cafe.slug)}
                      className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#374151] shadow-sm ring-1 ring-slate-200 transition hover:text-[#2563EB]"
                    >
                      {cafe.name}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
