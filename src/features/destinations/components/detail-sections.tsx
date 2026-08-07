import Image from "next/image";
import {
  Bus,
  CloudSun,
  Coffee,
  HelpCircle,
  History,
  Map as MapIcon,
  MapPinned,
  Utensils,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/shared/ui";

import type {
  Attraction,
  BudgetBreakdown,
  DestinationDetail,
  FaqItem,
  LocalFood,
  MapPlaceholder,
  RelatedGuide,
  TransportOption,
  WeatherMonth,
} from "../types";

export function OverviewSection({
  destination,
}: {
  destination: DestinationDetail;
}) {
  return (
    <section aria-labelledby="overview-heading" className="scroll-mt-28">
      <SectionHeading
        id="overview-heading"
        eyebrow="Overview"
        title={`About ${destination.name}`}
        description={destination.tagline}
        align="left"
      />
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg sm:leading-8">
        {destination.overview}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Coffee score", value: destination.coffeeScore.toFixed(1) },
          { label: "Nomad score", value: destination.nomadScore.toFixed(1) },
          { label: "Best season", value: destination.bestSeason },
          { label: "Budget", value: `${destination.budgetLabel} (${destination.priceLevel})` },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] px-4 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-[#111827]">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HistorySection({ history, name }: { history: string; name: string }) {
  return (
    <section aria-labelledby="history-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <History className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="history-heading"
          eyebrow="History"
          title={`The story of ${name}`}
          align="left"
        />
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg sm:leading-8">
        {history}
      </p>
    </section>
  );
}

export function CoffeeCultureSection({
  story,
  culture,
  name,
}: {
  story: string;
  culture: string;
  name: string;
}) {
  return (
    <section aria-labelledby="coffee-culture-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <Coffee className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="coffee-culture-heading"
          eyebrow="Coffee culture"
          title={`How ${name} drinks coffee`}
          description={culture}
          align="left"
        />
      </div>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg sm:leading-8">
        {story}
      </p>
    </section>
  );
}

export function AttractionsSection({ attractions }: { attractions: readonly Attraction[] }) {
  if (!attractions.length) return null;
  return (
    <section aria-labelledby="attractions-heading" className="scroll-mt-28">
      <SectionHeading
        id="attractions-heading"
        eyebrow="Best attractions"
        title="Landmarks worth the detour"
        align="left"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {attractions.map((item) => (
          <article
            key={item.name}
            className="overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_-28px_rgba(15,118,110,0.28)]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-[#111827]">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LocalFoodsSection({ foods }: { foods: readonly LocalFood[] }) {
  if (!foods.length) return null;
  return (
    <section aria-labelledby="foods-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <Utensils className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="foods-heading"
          eyebrow="Local foods"
          title="What to eat between cups"
          align="left"
        />
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <article
            key={food.name}
            className="overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={food.image}
                alt={food.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-[#111827]">{food.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{food.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BestTimeSection({
  bestSeason,
  seasons,
}: {
  bestSeason: string;
  seasons: readonly string[];
}) {
  return (
    <section aria-labelledby="best-time-heading" className="scroll-mt-28">
      <SectionHeading
        id="best-time-heading"
        eyebrow="Best time to visit"
        title={bestSeason}
        description={`Ideal seasons: ${seasons.join(", ")}. Plan café patios and walking days around these windows.`}
        align="left"
      />
    </section>
  );
}

export function WeatherSection({ weather }: { weather: readonly WeatherMonth[] }) {
  return (
    <section aria-labelledby="weather-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <CloudSun className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="weather-heading"
          eyebrow="Weather"
          title="What the seasons feel like"
          align="left"
        />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {weather.map((item) => (
          <div
            key={item.month}
            className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] p-5"
          >
            <p className="text-sm font-semibold text-[#0F766E]">{item.month}</p>
            <p className="mt-2 font-serif text-2xl font-semibold text-[#111827]">{item.tempC}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BudgetEstimatorSection({ budget }: { budget: BudgetBreakdown }) {
  return (
    <section aria-labelledby="budget-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <Wallet className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="budget-heading"
          eyebrow="Budget estimator"
          title="Typical daily spend"
          description={budget.note}
          align="left"
        />
      </div>
      <div className="mt-8 overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
        <dl className="divide-y divide-[#E5E7EB]">
          {[
            ["Lodging", budget.lodging],
            ["Meals", budget.meals],
            ["Coffee", budget.coffee],
            ["Local transport", budget.transport],
            ["Estimated daily total", budget.dailyTotal],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <dt className="text-sm font-medium text-[#6B7280]">{label}</dt>
              <dd className="text-sm font-semibold text-[#111827]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function TransportationSection({
  options,
}: {
  options: readonly TransportOption[];
}) {
  return (
    <section aria-labelledby="transport-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <Bus className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="transport-heading"
          eyebrow="Transportation"
          title="Getting around"
          align="left"
        />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {options.map((option) => (
          <article
            key={option.mode}
            className="rounded-[22px] border border-[#E5E7EB] bg-[#FAFAF9] p-5"
          >
            <h3 className="font-serif text-lg font-semibold text-[#111827]">{option.mode}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{option.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MapPlaceholderSection({ map }: { map: MapPlaceholder }) {
  return (
    <section aria-labelledby="map-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <MapIcon className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading
          id="map-heading"
          eyebrow="Map"
          title={map.label}
          description="Interactive maps coming soon — coordinates are ready for the next release."
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
        <div className="relative flex min-h-[240px] flex-col items-center justify-center gap-3 px-6 py-16 text-center sm:min-h-[300px]">
          <MapPinned className="h-10 w-10 text-[#0F766E]" aria-hidden />
          <p className="font-serif text-xl font-semibold text-[#111827]">{map.label}</p>
          <p className="text-sm text-[#6B7280]">
            {map.lat.toFixed(2)}°, {map.lng.toFixed(2)}°
          </p>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ faqs }: { faqs: readonly FaqItem[] }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="scroll-mt-28">
      <div className="flex items-start gap-3">
        <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F766E]/10 text-[#0F766E]">
          <HelpCircle className="h-5 w-5" aria-hidden />
        </div>
        <SectionHeading id="faq-heading" eyebrow="FAQ" title="Traveler questions" align="left" />
      </div>
      <div className="mt-8 divide-y divide-[#E5E7EB] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
        {faqs.map((item) => (
          <details key={item.question} className="group px-5 py-5 sm:px-6">
            <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-[#111827] [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                {item.question}
                <span className="text-[#0F766E] transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedGuidesSection({ guides }: { guides: readonly RelatedGuide[] }) {
  if (!guides.length) return null;
  return (
    <section aria-labelledby="guides-heading" className="scroll-mt-28">
      <SectionHeading
        id="guides-heading"
        eyebrow="Related guides"
        title="Keep reading"
        align="left"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="rounded-[22px] border border-[#E5E7EB] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0F766E]/30 hover:shadow-[0_16px_40px_-28px_rgba(15,118,110,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
          >
            <h3 className="font-serif text-lg font-semibold text-[#111827]">{guide.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{guide.excerpt}</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-[#0F766E]">Read guide</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
