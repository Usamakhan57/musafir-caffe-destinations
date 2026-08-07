import { serializeJsonLd } from "@/shared/lib/structured-data";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Server-safe JSON-LD script tag for SEO structured data. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
