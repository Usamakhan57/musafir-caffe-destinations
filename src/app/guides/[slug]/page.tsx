import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import { getNearbyCafes } from "@/features/cafes/data/cafes-loader";
import { getNearbyDestinations } from "@/features/destinations/data/destinations-loader";
import {
  BackToGuidesLink,
  GuideActions,
  GuideArticleContent,
  GuideCoffeeFoods,
  GuideCommentsPlaceholder,
  GuideDetailHero,
  GuideFaqSection,
  GuideGallery,
  GuideStickySidebar,
  GuideToc,
  GuidesRelatedSection,
  NearbyCafesFromGuide,
  NearbyDestinationsFromGuide,
  NewsletterCTA,
  ReadingProgressBar,
} from "@/features/guides";
import {
  getAuthorForGuide,
  getGuideBySlug,
  getGuideSlugs,
  getGuidesBySlugs,
} from "@/features/guides/data/guides-loader";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide not found" };
  }

  const title = guide.title;
  const description = guide.excerpt;
  const url = `${siteConfig.url}/guides/${guide.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [{ url: guide.heroImage, alt: guide.title }],
      authors: [getAuthorForGuide(guide)?.name].filter(Boolean) as string[],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [guide.heroImage],
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const author = getAuthorForGuide(guide);
  if (!author) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}/guides/${guide.slug}`;
  const tocItems = guide.content
    .filter((block): block is Extract<typeof block, { type: "heading" }> => block.type === "heading")
    .map((block) => ({ id: block.id, text: block.text }));

  const [nearbyCafes, nearbyDestinations, relatedGuides] = await Promise.all([
    getNearbyCafes(guide.nearbyCafeSlugs),
    getNearbyDestinations(guide.nearbyDestinationSlugs),
    getGuidesBySlugs(guide.relatedGuideSlugs),
  ]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${siteConfig.url}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: pageUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    image: [guide.heroImage, ...guide.gallery.map((g) => g.src)],
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${siteConfig.url}/guides/authors/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: pageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: guide.rating,
      reviewCount: guide.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const faqJsonLd =
    guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <ReadingProgressBar />

      <main className="flex flex-1 flex-col overflow-x-hidden bg-white">
        <GuideDetailHero guide={guide} author={author} pageUrl={pageUrl} />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="relative mb-10 overflow-hidden rounded-[28px]">
            <div className="relative aspect-[21/9] min-h-[220px] w-full">
              <Image
                src={guide.coverImage}
                alt={guide.title}
                fill
                sizes="(min-width:1280px) 1200px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_300px]">
            <article id="guide-article" className="min-w-0 space-y-12">
              <div className="lg:hidden space-y-6">
                <GuideActions slug={guide.slug} title={guide.title} url={pageUrl} />
                <GuideToc items={tocItems} />
              </div>

              <GuideArticleContent blocks={guide.content} />
              <GuideCoffeeFoods
                coffee={guide.coffeeRecommendations}
                foods={guide.localFoods}
              />
              <GuideGallery images={guide.gallery} />
              <GuideFaqSection faqs={guide.faqs} />
              <GuideCommentsPlaceholder />
            </article>

            <GuideStickySidebar items={tocItems}>
              <div className="rounded-3xl border border-slate-200 bg-[#FAFAF9] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                  Share this guide
                </p>
                <GuideActions
                  slug={guide.slug}
                  title={guide.title}
                  url={pageUrl}
                  className="mt-4 flex-col"
                />
                <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm text-[#6B7280]">
                  <div className="flex justify-between gap-3">
                    <dt>Destination</dt>
                    <dd className="font-medium text-[#111827]">{guide.destination}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Country</dt>
                    <dd className="font-medium text-[#111827]">{guide.country}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Category</dt>
                    <dd className="font-medium text-[#111827]">{guide.category}</dd>
                  </div>
                </dl>
              </div>
            </GuideStickySidebar>
          </div>

          <div className="mt-16 space-y-16">
            <NearbyCafesFromGuide cafes={nearbyCafes} />
            <NearbyDestinationsFromGuide destinations={nearbyDestinations} />
            <GuidesRelatedSection guides={relatedGuides} />
            <NewsletterCTA />
            <BackToGuidesLink />
          </div>
        </div>
      </main>
    </>
  );
}
