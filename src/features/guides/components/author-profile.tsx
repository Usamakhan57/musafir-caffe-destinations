import Image from "next/image";
import Link from "next/link";
import { Globe, Share2 } from "lucide-react";

import { cafeRoute, destinationRoute, ROUTES } from "@/constants";
import { getCafeBySlug } from "@/features/cafes";
import { getDestinationBySlug } from "@/features/destinations";
import { Breadcrumbs } from "@/shared/components";
import { SectionHeading, StaggerContainer, StaggerItem } from "@/shared/ui";

import {
  getAuthorBySlug,
  getAuthorForGuide,
  getGuidesByAuthor,
} from "../data/guides-store";
import GuideCard from "./guide-card";

interface AuthorProfileProps {
  slug: string;
}

export async function AuthorProfile({ slug }: AuthorProfileProps) {
  const author = getAuthorBySlug(slug);
  if (!author) return null;

  const guides = await getGuidesByAuthor(author.slug);
  const destinations = (
    await Promise.all(
      author.favoriteDestinationSlugs.map((s) => getDestinationBySlug(s)),
    )
  ).filter(Boolean);
  const cafes = (
    await Promise.all(author.favoriteCafeSlugs.map((s) => getCafeBySlug(s)))
  ).filter(Boolean);

  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAFAF9]">
      <section className="border-b border-slate-200 bg-gradient-to-br from-[#EFF6FF] via-white to-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <Breadcrumbs
            items={[
              { label: "Guides", href: ROUTES.guides },
              { label: "Authors" },
              { label: author.name },
            ]}
          />

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg sm:h-32 sm:w-32">
              <Image
                src={author.avatar}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Guide author
              </p>
              <h1 className="mt-2 font-serif text-4xl font-semibold text-[#111827] sm:text-5xl">
                {author.name}
              </h1>
              <p className="mt-2 text-sm font-medium text-[#6B7280]">{author.role}</p>
              <p className="mt-4 text-base leading-7 text-[#4B5563]">{author.bio}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {author.social.instagram ? (
                  <a
                    href={author.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                  >
                    <Share2 className="h-4 w-4" aria-hidden />
                    Instagram
                  </a>
                ) : null}
                {author.social.x ? (
                  <a
                    href={author.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                  >
                    X / Twitter
                  </a>
                ) : null}
                {author.social.website ? (
                  <a
                    href={author.social.website}
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
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl space-y-16 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <section aria-labelledby="author-guides-heading">
          <SectionHeading
            id="author-guides-heading"
            eyebrow="Published"
            title={`Guides by ${author.name}`}
            description={`${guides.length} published ${guides.length === 1 ? "guide" : "guides"} on MusafirCaffe.`}
            align="left"
          />
          <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
            {guides.map((guide) => (
              <StaggerItem key={guide.slug}>
                <GuideCard guide={guide} author={getAuthorForGuide(guide)} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {destinations.length > 0 ? (
          <section aria-labelledby="author-destinations-heading">
            <SectionHeading
              id="author-destinations-heading"
              eyebrow="Favorites"
              title="Favorite destinations"
              align="left"
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) =>
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

        {cafes.length > 0 ? (
          <section aria-labelledby="author-cafes-heading">
            <SectionHeading
              id="author-cafes-heading"
              eyebrow="Favorites"
              title="Favorite cafés"
              align="left"
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cafes.map((cafe) =>
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
      </div>
    </main>
  );
}
