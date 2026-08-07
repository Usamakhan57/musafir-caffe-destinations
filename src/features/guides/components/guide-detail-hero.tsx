import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Star } from "lucide-react";

import { guideAuthorRoute, ROUTES } from "@/constants";
import { Breadcrumbs } from "@/shared/components";

import type { GuideAuthor, GuideDetail } from "../types";
import { GuideActions } from "./guide-actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface GuideDetailHeroProps {
  guide: GuideDetail;
  author: GuideAuthor;
  pageUrl: string;
}

export function GuideDetailHero({ guide, author, pageUrl }: GuideDetailHeroProps) {
  return (
    <header className="relative overflow-hidden bg-[#0B1220]">
      <div className="absolute inset-0">
        <Image
          src={guide.heroImage}
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
            { label: "Guides", href: ROUTES.guides },
            { label: guide.title },
          ]}
          className="[&_ol]:text-white/70 [&_span[aria-current=page]]:text-white [&_a]:hover:text-white [&_svg]:text-white/40"
        />

        <div className="mt-10 max-w-3xl">
          <p className="inline-flex rounded-full bg-[#2563EB]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">
            {guide.category}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            {guide.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {guide.readingMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden />
              Published {formatDate(guide.publishedAt)}
            </span>
            {guide.updatedAt !== guide.publishedAt ? (
              <span>Updated {formatDate(guide.updatedAt)}</span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
              {guide.rating.toFixed(1)} · {guide.reviewCount} ratings
            </span>
          </div>

          <Link
            href={guideAuthorRoute(author.slug)}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur transition hover:bg-white/15"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src={author.avatar} alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-white">{author.name}</p>
              <p className="text-sm text-white/70">{author.role}</p>
            </div>
          </Link>

          <GuideActions
            slug={guide.slug}
            title={guide.title}
            url={pageUrl}
            className="mt-6"
          />
        </div>
      </div>
    </header>
  );
}
