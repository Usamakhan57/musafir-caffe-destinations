"use client";

import { Cloud, CloudRain, CloudSun, Droplets, Sun, Wind } from "lucide-react";

import { getWeatherForCity } from "../lib/maps-weather";
import type { WeatherDay } from "../types";

function WeatherIcon({ icon }: { icon: WeatherDay["icon"] }) {
  switch (icon) {
    case "sun":
      return <Sun className="h-4 w-4 text-amber-500" aria-hidden />;
    case "rain":
      return <CloudRain className="h-4 w-4 text-sky-600" aria-hidden />;
    case "cloud":
      return <Cloud className="h-4 w-4 text-slate-500" aria-hidden />;
    default:
      return <CloudSun className="h-4 w-4 text-amber-500" aria-hidden />;
  }
}

interface WeatherWidgetProps {
  city: string;
}

export function WeatherWidget({ city }: WeatherWidgetProps) {
  const weather = getWeatherForCity(city);

  return (
    <section
      aria-labelledby="weather-widget-heading"
      className="rounded-[28px] border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-white to-[#F3FBF9] p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Weather
          </p>
          <h2 id="weather-widget-heading" className="mt-2 font-serif text-2xl font-semibold text-[#111827]">
            {weather.city}
          </h2>
          <p className="text-sm text-[#6B7280]">{weather.country}</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-4xl text-[#111827]">{weather.currentC}°</p>
          <p className="text-sm text-[#6B7280]">{weather.condition}</p>
        </div>
      </div>

      <dl className="mt-5 flex flex-wrap gap-4 text-sm text-[#4B5563]">
        <div className="inline-flex items-center gap-1.5">
          <Droplets className="h-4 w-4 text-[#2563EB]" aria-hidden />
          <dt className="sr-only">Humidity</dt>
          <dd>{weather.humidity}% humidity</dd>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Wind className="h-4 w-4 text-[#2563EB]" aria-hidden />
          <dt className="sr-only">Wind</dt>
          <dd>{weather.windKph} km/h wind</dd>
        </div>
      </dl>

      <p className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm text-[#4B5563]">
        <span className="font-semibold text-[#111827]">Best visiting season:</span>{" "}
        {weather.bestSeason}
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {weather.forecast.map((day) => (
          <li
            key={day.label}
            className="rounded-2xl border border-white bg-white/90 p-3 text-center shadow-sm"
          >
            <p className="text-xs font-semibold text-[#6B7280]">{day.label}</p>
            <div className="mt-2 flex justify-center">
              <WeatherIcon icon={day.icon} />
            </div>
            <p className="mt-2 text-sm font-semibold text-[#111827]">
              {day.highC}° / {day.lowC}°
            </p>
            <p className="mt-1 text-[11px] text-[#6B7280]">{day.condition}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
