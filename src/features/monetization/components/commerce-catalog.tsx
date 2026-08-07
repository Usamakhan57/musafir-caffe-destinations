import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config";
import { ContentCard, ContentCta, ContentGrid, MarketingHero, ProseSection } from "@/shared/components";
import { JsonLd } from "@/shared/components/json-ld";
import { productOfferJsonLd } from "@/shared/lib/structured-data";

import { buildAffiliateUrl } from "../data";
import type { CommerceOffer } from "../types";

interface CommerceCatalogProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  path: string;
  offers: CommerceOffer[];
  ctaTitle: string;
  ctaDescription: string;
}

export function CommerceCatalog({
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  path,
  offers,
  ctaTitle,
  ctaDescription,
}: CommerceCatalogProps) {
  return (
    <main className="flex flex-1 flex-col">
      {offers.map((offer) => (
        <JsonLd
          key={offer.id}
          data={productOfferJsonLd({
            name: offer.title,
            description: offer.summary,
            url: `${siteConfig.url}${path}`,
            image: offer.image,
            price: offer.priceFrom,
            currency: offer.currency,
            category: offer.category,
          })}
        />
      ))}

      <MarketingHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[{ label: breadcrumbLabel }]}
      />

      <ProseSection eyebrow="Featured" title="Curated partner picks">
        <ContentGrid columns={2}>
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="overflow-hidden rounded-[22px] border border-[#E5E7EB] bg-white"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={offer.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                  {offer.location}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[#111827]">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{offer.summary}</p>
                <p className="mt-4 text-sm font-semibold text-[#111827]">
                  From {offer.currency} {offer.priceFrom}
                  <span className="ml-2 font-normal text-[#6B7280]">
                    · {offer.rating.toFixed(1)} ({offer.reviewCount})
                  </span>
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Partner: {offer.affiliatePartner}
                </p>
                <Link
                  href={buildAffiliateUrl(offer, path)}
                  rel="sponsored noopener noreferrer"
                  target="_blank"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#5C4033] via-[#6F4E37] to-[#8B6914] px-5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  View offer
                </Link>
              </div>
            </article>
          ))}
        </ContentGrid>
      </ProseSection>

      <ProseSection
        eyebrow="Transparency"
        title="Affiliate-ready structure"
        description="Offers use tracked partner links. Commissions never change editorial café or guide rankings."
      >
        <ContentGrid columns={2}>
          <ContentCard
            title="Disclosure"
            description="When you book via partner links, MusafirCaffe may earn a commission at no extra cost to you."
          />
          <ContentCard
            title="Editorial firewall"
            description="Destination and café scores stay independent from affiliate performance."
          />
        </ContentGrid>
      </ProseSection>

      <ContentCta
        title={ctaTitle}
        description={ctaDescription}
        primaryHref="/membership"
        primaryLabel="See membership"
        secondaryHref="/affiliate"
        secondaryLabel="Partner program"
      />
    </main>
  );
}
