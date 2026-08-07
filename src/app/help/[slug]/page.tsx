import Link from "next/link";
import { notFound } from "next/navigation";

import { ROUTES, helpArticleRoute } from "@/constants";
import { getHelpArticle, getHelpArticleSlugs } from "@/features/content/help-articles";
import {
  ContentCta,
  MarketingHero,
  ProseSection,
} from "@/shared/components";
import { createPageMetadata } from "@/shared/lib/seo";

interface HelpArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getHelpArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HelpArticlePageProps) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) return { title: "Help article" };
  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: helpArticleRoute(slug),
  });
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <MarketingHero
        eyebrow="Help article"
        title={article.title}
        description={article.summary}
        breadcrumbs={[
          { label: "Help Center", href: ROUTES.help },
          { label: article.title },
        ]}
      />

      <ProseSection eyebrow={article.category} title="What to know">
        <div className="mx-auto max-w-3xl rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-8">
          <ul className="space-y-4 text-sm leading-relaxed text-[#4B5563] sm:text-[15px]">
            {article.body.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[#6B7280]">
            Need more?{" "}
            <Link href={ROUTES.contact} className="font-semibold text-[#0F766E] hover:underline">
              Contact support
            </Link>
            .
          </p>
        </div>
      </ProseSection>

      <ContentCta
        title="Back to Help Center"
        description="Browse more articles on accounts, membership, SEO, accessibility, and offline support."
        primaryHref={ROUTES.help}
        primaryLabel="All help topics"
        secondaryHref={ROUTES.faq}
        secondaryLabel="FAQ"
      />
    </main>
  );
}
