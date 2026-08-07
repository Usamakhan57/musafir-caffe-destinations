import Image from "next/image";

import type { GalleryImage } from "../types";

interface GalleryProps {
  images: readonly GalleryImage[];
}

export function Gallery({ images }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image, index) => (
        <div key={`${image.src}-${index}`} className="overflow-hidden rounded-2xl border border-cream-200/70 bg-cream-50 shadow-card">
          <div className="relative aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
