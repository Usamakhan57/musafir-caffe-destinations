import type { CafeDetail } from "../types";

interface AmenitiesSectionProps {
  cafe: CafeDetail;
}

const EXTRA_COPY: Record<string, string> = {
  "Wi‑Fi": "Reliable connection for remote work and long stays.",
  Wifi: "Reliable connection for remote work and long stays.",
  "Power outlets": "Plenty of tables and sockets for device charging.",
  "Indoor seating": "A comfortable refuge for cooler weather or a slower afternoon.",
  Takeaway: "Grab a cup on the move without missing your next stop.",
  "Late-night service": "Open late for a second round or a quiet nightcap.",
  Desserts: "A pastry-focused menu that complements the coffee program.",
  "Accessible entry": "Step-free access and thoughtful amenities for all guests.",
  "Classic menu": "A traditional menu that honors the establishment's long history.",
  "Rooftop seating": "A terrace with a broad skyline view and a more relaxed pace.",
  Brunch: "Perfect for a meal that pairs well with a long coffee session.",
  "Quiet study area": "A calm corner suited to reading, writing, or focused work.",
  Terrace: "Outdoor tables for people-watching and warmer afternoons.",
};

export function AmenitiesSection({ cafe }: AmenitiesSectionProps) {
  const derived = [
    cafe.hasWifi ? "Wi‑Fi" : null,
    cafe.hasOutdoorSeating ? "Outdoor seating" : null,
    cafe.remoteWorkFriendly ? "Remote work friendly" : null,
    cafe.petFriendly ? "Pet friendly" : null,
    cafe.veganOptions ? "Vegan options" : null,
  ].filter(Boolean) as string[];

  const amenities = Array.from(new Set([...derived, ...cafe.amenities]));

  return (
    <section aria-labelledby="amenities-heading" className="scroll-mt-28">
      <h2
        id="amenities-heading"
        className="font-serif text-2xl font-semibold text-[#111827] sm:text-3xl"
      >
        Amenities & details
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF9] p-5 shadow-[0_12px_30px_-24px_rgba(15,118,110,0.3)]"
          >
            <p className="font-medium text-[#111827]">{amenity}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {EXTRA_COPY[amenity] ??
                (amenity === "Outdoor seating"
                  ? "Patio or terrace seating when the weather cooperates."
                  : amenity === "Remote work friendly"
                    ? "Laptop-friendly tables with power and dependable wifi."
                    : amenity === "Pet friendly"
                      ? "Well-behaved pets welcome in designated areas."
                      : amenity === "Vegan options"
                        ? "Plant-based drinks and bites on the menu."
                        : "Thoughtfully considered for traveler comfort.")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
