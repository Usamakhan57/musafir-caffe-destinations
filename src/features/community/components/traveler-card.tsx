"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Sparkles, UserPlus, UserCheck } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

import { communityTravelerRoute } from "@/constants";

import type { Traveler } from "../types";

function followKey(slug: string) {
  return `musafir:follow:traveler:${slug}`;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("musafir-traveler-follow", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("musafir-traveler-follow", onChange);
  };
}

export function TravelerFollowButton({ slug }: { slug: string }) {
  const getFollowing = useCallback(
    () => window.localStorage.getItem(followKey(slug)) === "1",
    [slug],
  );
  const following = useSyncExternalStore(subscribe, getFollowing, () => false);

  function toggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (following) window.localStorage.removeItem(followKey(slug));
    else window.localStorage.setItem(followKey(slug), "1");
    window.dispatchEvent(new Event("musafir-traveler-follow"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={following}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB]/40 hover:text-[#2563EB]"
    >
      {following ? (
        <UserCheck className="h-4 w-4 text-[#2563EB]" aria-hidden />
      ) : (
        <UserPlus className="h-4 w-4" aria-hidden />
      )}
      {following ? "Following" : "Follow"}
    </button>
  );
}

export function TravelerMiniCard({ traveler }: { traveler: Traveler }) {
  return (
    <article className="card-hover rounded-3xl bg-white p-6 shadow-card transition-transform">
      <Link
        href={communityTravelerRoute(traveler.slug)}
        className="flex items-center gap-4"
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
          <Image
            src={traveler.avatar}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-1.5 text-lg font-semibold text-coffee-900">
            {traveler.name}
            {traveler.verified ? (
              <BadgeCheck className="h-4 w-4 text-[#2563EB]" aria-label="Verified traveler" />
            ) : null}
            {traveler.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                <Sparkles className="h-3 w-3" aria-hidden />
                Featured
              </span>
            ) : null}
          </div>
          <div className="text-sm text-coffee-500">{traveler.location}</div>
        </div>
      </Link>
      <p className="mt-4 text-sm leading-6 text-coffee-600">{traveler.specialty}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-[#6B7280]">
          {traveler.followers.toLocaleString()} followers · {traveler.following} following
        </p>
        <TravelerFollowButton slug={traveler.slug} />
      </div>
    </article>
  );
}
