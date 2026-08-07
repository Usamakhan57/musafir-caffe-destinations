import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import { getNearbyCafes } from "@/features/cafes";
import { getNearbyDestinations } from "@/features/destinations";
import {
  BackToCommunityLink,
  CoffeeRecs,
  JourneyTimeline,
  RelatedStoriesSection,
  StoryActions,
  StoryBody,
  StoryBudget,
  StoryComments,
  StoryDetailHero,
  StoryGallery,
  TipsList,
  VisitedCafesSection,
  VisitedDestinationsSection,
  getStoriesBySlugs,
  getStoryBySlug,
  getStorySlugs,
  getTravelerForStory,
} from "@/features/community";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return { title: "Story not found" };
  }

  const title = story.title;
  const description = story.excerpt;
  const url = `${siteConfig.url}/community/stories/${story.slug}`;
  const author = getTravelerForStory(story);

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
      publishedTime: story.publishedAt,
      images: [{ url: story.heroImage, alt: story.title }],
      authors: author ? [author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [story.heroImage],
    },
  };
}

export default async function CommunityStoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const author = getTravelerForStory(story);
  if (!author) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}/community/stories/${story.slug}`;

  const [cafes, destinations, related] = await Promise.all([
    getNearbyCafes(story.visitedCafeSlugs),
    getNearbyDestinations(story.visitedDestinationSlugs),
    getStoriesBySlugs(story.relatedStorySlugs),
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
        name: "Community",
        item: `${siteConfig.url}/community`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: story.title,
        item: pageUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt,
    image: [story.heroImage, ...story.gallery.map((g) => g.src)],
    datePublished: story.publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${siteConfig.url}/community/travelers/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: pageUrl,
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: story.likes,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: story.commentsCount,
      },
    ],
  };

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

      <main className="flex flex-1 flex-col overflow-x-hidden bg-white">
        <StoryDetailHero story={story} author={author} pageUrl={pageUrl} />

        <div className="mx-auto w-full max-w-7xl space-y-14 px-5 py-12 sm:space-y-16 sm:px-8 sm:py-16 lg:px-12">
          <div className="lg:hidden">
            <StoryActions
              slug={story.slug}
              title={story.title}
              url={pageUrl}
              likes={story.likes}
            />
          </div>

          <StoryBody paragraphs={story.body} />
          <StoryGallery images={story.gallery} />
          <JourneyTimeline steps={story.journey} />
          <StoryBudget budget={story.budget} />
          <TipsList id="travel-tips-heading" title="Travel tips" tips={story.travelTips} />
          <CoffeeRecs items={story.coffeeRecommendations} />
          <TipsList id="packing-tips-heading" title="Packing tips" tips={story.packingTips} />

          <VisitedCafesSection cafes={cafes} />
          <VisitedDestinationsSection destinations={destinations} />
          <StoryComments comments={story.comments} />
          <RelatedStoriesSection stories={related} />
          <BackToCommunityLink />
        </div>
      </main>
    </>
  );
}
