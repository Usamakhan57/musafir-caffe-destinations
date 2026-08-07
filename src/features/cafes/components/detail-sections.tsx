import {
  Clock,
  Coffee,
  Globe,
  Laptop,
  Mail,
  Map as MapIcon,
  MapPinned,
  Phone,
  Utensils,
  Wifi,
} from "lucide-react";

import { SectionHeading } from "@/shared/ui";

import type { CafeDetail, MenuHighlight, NearbyAttraction } from "../types";
import { isCafeOpenNow } from "../data/enrich-cafe";

export function AboutStorySection({ cafe }: { cafe: CafeDetail }) {
  return (
    <section aria-labelledby="about-heading" className="scroll-mt-28">
      <SectionHeading
        id="about-heading"
        eyebrow="About"
        title={`About ${cafe.name}`}
        description={cafe.tagline}
        align="left"
      />
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg sm:leading-8">
        {cafe.about}
      </p>
      <h3 className="mt-10 font-serif text-xl font-semibold text-[#111827]">The story</h3>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg sm:leading-8">
        {cafe.story}
      </p>
    </section>
  );
}

export function ScoresSection({ cafe }: { cafe: CafeDetail }) {
  return (
    <section aria-labelledby="scores-heading" className="scroll-mt-28">
      <SectionHeading
        id="scores-heading"
        eyebrow="Scores"
        title="Quality at a glance"
        align="left"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Coffee, label: "Coffee quality", value: cafe.coffeeQualityScore.toFixed(1) },
          { icon: Laptop, label: "Remote work", value: cafe.remoteWorkScore.toFixed(1) },
          { icon: Wifi, label: "WiFi speed", value: cafe.wifiSpeed },
          {
            icon: Clock,
            label: "Status",
            value: isCafeOpenNow(cafe) ? "Open now" : "Closed now",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] px-4 py-5"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-[#111827]">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function MenuHighlightsSection({
  items,
  signature,
}: {
  items: readonly MenuHighlight[];
  signature: string;
}) {
  return (
    <section aria-labelledby="menu-heading" className="scroll-mt-28">
      <SectionHeading
        id="menu-heading"
        eyebrow="Menu highlights"
        title="What to order"
        description={`Signature coffee: ${signature}`}
        align="left"
      />
      <div className="mt-8 divide-y divide-[#E5E7EB] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-2 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6"
          >
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#111827]">{item.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-[#0F766E]">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactInfoSection({ cafe }: { cafe: CafeDetail }) {
  return (
    <section aria-labelledby="contact-heading" className="scroll-mt-28">
      <SectionHeading
        id="contact-heading"
        eyebrow="Visit"
        title="Hours, address & contact"
        align="left"
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-[#E5E7EB] bg-[#FAFAF9] p-5 sm:p-6">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E]">
            <Clock className="h-4 w-4" aria-hidden />
            Opening hours
          </p>
          <p className="mt-3 text-base font-semibold text-[#111827]">{cafe.openingHours}</p>
          <p className="mt-2 text-sm text-[#6B7280]">
            {isCafeOpenNow(cafe) ? "Open now (approx. local hours)." : "Currently closed (approx. local hours)."}
          </p>
          <p className="mt-6 text-sm font-semibold text-[#0F766E]">Address</p>
          <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{cafe.address}</p>
        </div>
        <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
          <ul className="space-y-4 text-sm text-[#4B5563]">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[#0F766E]" aria-hidden />
              <a href={`tel:${cafe.phone}`} className="hover:text-[#0F766E]">
                {cafe.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-[#0F766E]" aria-hidden />
              <a href={`mailto:${cafe.email}`} className="hover:text-[#0F766E]">
                {cafe.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="mt-0.5 h-4 w-4 text-[#0F766E]" aria-hidden />
              <a
                href={cafe.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F766E]"
              >
                Visit website
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {cafe.social.instagram ? (
              <a
                href={cafe.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-xs font-semibold text-[#374151] hover:border-[#0F766E]/35 hover:text-[#0F766E]"
              >
                Instagram
              </a>
            ) : null}
            {cafe.social.facebook ? (
              <a
                href={cafe.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-xs font-semibold text-[#374151] hover:border-[#0F766E]/35 hover:text-[#0F766E]"
              >
                Facebook
              </a>
            ) : null}
            {cafe.social.x ? (
              <a
                href={cafe.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-xs font-semibold text-[#374151] hover:border-[#0F766E]/35 hover:text-[#0F766E]"
              >
                X
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FoodOptionsSection({ options }: { options: readonly string[] }) {
  if (!options.length) return null;
  return (
    <section aria-labelledby="food-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <Utensils className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading id="food-heading" eyebrow="Food options" title="Beyond the cup" align="left" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {options.map((option) => (
          <span
            key={option}
            className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-medium text-[#374151]"
          >
            {option}
          </span>
        ))}
      </div>
    </section>
  );
}

export function NearbyAttractionsSection({
  attractions,
}: {
  attractions: readonly NearbyAttraction[];
}) {
  if (!attractions.length) return null;
  return (
    <section aria-labelledby="attractions-heading" className="scroll-mt-28">
      <SectionHeading
        id="attractions-heading"
        eyebrow="Nearby attractions"
        title="Worth the short walk"
        align="left"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {attractions.map((item) => (
          <article
            key={item.name}
            className="rounded-[22px] border border-[#E5E7EB] bg-white p-5"
          >
            <h3 className="font-serif text-lg font-semibold text-[#111827]">{item.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
              ~{item.walkMinutes} min walk
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MapPlaceholderSection({ cafe }: { cafe: CafeDetail }) {
  return (
    <section aria-labelledby="map-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <MapIcon className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="map-heading"
          eyebrow="Map"
          title={cafe.map.label}
          description="Interactive maps coming soon — pin coordinates are ready."
          align="left"
        />
      </div>
      <div className="relative mt-8 overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-[#E8EEF2]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 py-14 text-center sm:min-h-[280px]">
          <MapPinned className="h-10 w-10 text-[#0F766E]" aria-hidden />
          <p className="font-serif text-xl font-semibold text-[#111827]">{cafe.map.label}</p>
          <p className="text-sm text-[#6B7280]">
            {cafe.map.lat.toFixed(2)}°, {cafe.map.lng.toFixed(2)}°
          </p>
          <p className="max-w-md text-sm text-[#6B7280]">{cafe.address}</p>
        </div>
      </div>
    </section>
  );
}

export function SignatureCoffeeBanner({ cafe }: { cafe: CafeDetail }) {
  return (
    <section
      aria-labelledby="signature-heading"
      className="overflow-hidden rounded-[24px] border border-[#0F766E]/15 bg-[#0F766E] px-6 py-8 text-white sm:px-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#99F6E4]">
        Signature coffee
      </p>
      <h2 id="signature-heading" className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
        {cafe.signatureCoffee}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
        {cafe.coffeeType} · Coffee quality {cafe.coffeeQualityScore.toFixed(1)} / 10
      </p>
    </section>
  );
}
