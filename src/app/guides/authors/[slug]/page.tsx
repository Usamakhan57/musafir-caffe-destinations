import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import { guideAuthorRoute } from "@/constants";
import { AuthorProfile } from "@/features/guides";
import {
  getAllAuthors,
  getAuthorBySlug,
  getGuidesByAuthor,
} from "@/features/guides/data/guides-loader";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return { title: "Author not found" };
  }

  const guides = await getGuidesByAuthor(author.slug);
  const title = `${author.name} — Travel Guide Author`;
  const description = `${author.bio} ${guides.length} published guides on MusafirCaffe.`;
  const url = `${siteConfig.url}${guideAuthorRoute(author.slug)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: author.avatar, alt: author.name }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [author.avatar],
    },
  };
}

export default async function GuideAuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return <AuthorProfile slug={slug} />;
}
