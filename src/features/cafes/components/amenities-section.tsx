import type { CafeDetail } from "../types";

interface AmenitiesSectionProps {
  cafe: CafeDetail;
}

export function AmenitiesSection({ cafe }: AmenitiesSectionProps) {
  return (
    <section aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className="font-serif text-2xl font-semibold text-coffee-900 sm:text-3xl">
        Amenities & details
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cafe.amenities.map((amenity) => (
          <div key={amenity} className="rounded-2xl border border-cream-200/80 bg-cream-50 p-5 shadow-card">
            <p className="font-medium text-coffee-800">{amenity}</p>
            <p className="mt-2 text-sm leading-relaxed text-coffee-600">
              {amenity === "Wi‑Fi" && "Reliable connection for remote work and long stays."}
              {amenity === "Power outlets" && "Plenty of tables and sockets for device charging."}
              {amenity === "Indoor seating" && "A comfortable refuge for cooler weather or a slower afternoon."}
              {amenity === "Takeaway" && "Grab a cup on the move without missing your next stop."}
              {amenity === "Late-night service" && "Open late for a second round or a quiet nightcap."}
              {amenity === "Desserts" && "A pastry-focused menu that complements the coffee program."}
              {amenity === "Accessible entry" && "Step-free access and thoughtful amenities for all guests."}
              {amenity === "Classic menu" && "A traditional menu that honors the establishment's long history."}
              {amenity === "Rooftop seating" && "A terrace with a broad skyline view and a more relaxed pace."}
              {amenity === "Brunch" && "Perfect for a meal that pairs well with a long coffee session."}
              {amenity === "Quiet study area" && "A calm corner suited to reading, writing, or focused work."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
