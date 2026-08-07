"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Coffee, MapPin, Navigation, Route } from "lucide-react";

import { MAP_REGIONS } from "../lib/maps-weather";
import type { MapMarker, MapRegion } from "../types";

const TYPE_COLORS: Record<MapMarker["type"], string> = {
  destination: "bg-[#0F766E]",
  cafe: "bg-[#8B6914]",
  attraction: "bg-[#2563EB]",
  guide: "bg-[#7C3AED]",
};

function project(marker: MapMarker, region: MapRegion) {
  const latSpan = 0.08;
  const lngSpan = 0.12;
  const x = ((marker.lng - (region.center.lng - lngSpan / 2)) / lngSpan) * 100;
  const y = ((region.center.lat + latSpan / 2 - marker.lat) / latSpan) * 100;
  return {
    left: `${Math.min(92, Math.max(8, x))}%`,
    top: `${Math.min(88, Math.max(12, y))}%`,
  };
}

export function InteractiveMapExperience() {
  const [regionId, setRegionId] = useState(MAP_REGIONS[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(
    MAP_REGIONS[0].markers[0]?.id ?? null,
  );

  const region = useMemo(
    () => MAP_REGIONS.find((item) => item.id === regionId) ?? MAP_REGIONS[0],
    [regionId],
  );
  const selected = region.markers.find((m) => m.id === selectedId) ?? region.markers[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Regions
          </p>
          <ul className="mt-3 space-y-2">
            {MAP_REGIONS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setRegionId(item.id);
                    setSelectedId(item.markers[0]?.id ?? null);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                    item.id === region.id
                      ? "bg-[#F3FBF9] font-semibold text-[#0F766E]"
                      : "text-[#4B5563] hover:bg-[#FAFAF9]"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-[#9CA3AF]">{item.country}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 text-sm text-[#6B7280]">
          <p className="font-semibold text-[#111827]">Map legend</p>
          <ul className="mt-3 space-y-2">
            {(Object.keys(TYPE_COLORS) as MapMarker["type"][]).map((type) => (
              <li key={type} className="flex items-center gap-2 capitalize">
                <span className={`h-2.5 w-2.5 rounded-full ${TYPE_COLORS[type]}`} aria-hidden />
                {type}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="space-y-6">
        <section
          aria-label={`Interactive map of ${region.name}`}
          className="relative overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#E8F0EF] shadow-sm"
        >
          <div
            className="relative aspect-[16/11] w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(15,118,110,0.12), transparent 40%), radial-gradient(circle at 80% 30%, rgba(37,99,235,0.12), transparent 35%), linear-gradient(160deg, #DCEBE8 0%, #E7EEF8 55%, #F4F1EA 100%)",
            }}
          >
            <div className="absolute inset-6 rounded-[22px] border border-dashed border-[#0F766E]/25" />
            <p className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0F766E] shadow-sm">
              Placeholder map interface · no API key required
            </p>
            {region.markers.map((marker) => {
              const pos = project(marker, region);
              const active = marker.id === selected?.id;
              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => setSelectedId(marker.id)}
                  style={{ left: pos.left, top: pos.top }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white p-2 shadow-lg transition ${
                    TYPE_COLORS[marker.type]
                  } ${active ? "scale-125 ring-4 ring-white/70" : "hover:scale-110"}`}
                  aria-label={`${marker.type}: ${marker.label}`}
                  aria-pressed={active}
                >
                  <MapPin className="h-3.5 w-3.5 text-white" aria-hidden />
                </button>
              );
            })}
          </div>
        </section>

        {selected ? (
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
              Selected marker
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#111827]">
              {selected.label}
            </h2>
            <p className="mt-1 text-sm capitalize text-[#6B7280]">
              {selected.type} · {selected.subtitle}
            </p>
            <p className="mt-3 text-sm text-[#4B5563]">
              Coordinates placeholder: {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {selected.href ? (
                <Link
                  href={selected.href}
                  className="inline-flex h-11 items-center rounded-full bg-[#0F766E] px-4 text-sm font-semibold text-white"
                >
                  Open details
                </Link>
              ) : null}
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#E5E7EB] px-4 text-sm font-semibold text-[#374151]"
                aria-label="Directions placeholder"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Directions (coming soon)
              </button>
            </div>
          </section>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <NearbyList
            title="Nearby cafés"
            items={region.nearbyCafes}
            icon={<Coffee className="h-4 w-4 text-[#8B6914]" aria-hidden />}
          />
          <NearbyList
            title="Nearby attractions"
            items={region.nearbyAttractions}
            icon={<Route className="h-4 w-4 text-[#2563EB]" aria-hidden />}
          />
          <NearbyList
            title="Nearby guides"
            items={region.nearbyGuides}
            icon={<MapPin className="h-4 w-4 text-[#7C3AED]" aria-hidden />}
          />
        </div>
      </div>
    </div>
  );
}

function NearbyList({
  title,
  items,
  icon,
}: {
  title: string;
  items: readonly string[];
  icon: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
        {icon}
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-[#4B5563]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
