/**
 * Prisma/Supabase seed entrypoint for the Admin CMS.
 *
 * Uses the in-memory CMS seed payload as the canonical bootstrap dataset.
 * When DATABASE_URL is configured, records are upserted into Postgres.
 * Without a database, the script still validates and prints the seed summary.
 */
import { getCmsSeedPayload } from "../src/features/admin/data/cms-store";

type SeedRole =
  | "traveler"
  | "cafe_owner"
  | "guide_creator"
  | "editor"
  | "moderator"
  | "admin";

function mapRole(role: string): SeedRole {
  switch (role) {
    case "cafe-owner":
      return "cafe_owner";
    case "guide-creator":
      return "guide_creator";
    case "editor":
      return "editor";
    case "moderator":
      return "moderator";
    case "admin":
      return "admin";
    default:
      return "traveler";
  }
}

async function main() {
  const payload = getCmsSeedPayload();
  const summary = {
    users: payload.users.length,
    categories: payload.categories.length,
    tags: payload.tags.length,
    destinations: payload.destinations.length,
    cafes: payload.cafes.length,
    guides: payload.guides.length,
    community: payload.community.length,
    reviews: payload.reviews.length,
    media: payload.media.length,
  };

  console.log("CMS seed payload ready:", summary);

  if (!process.env.DATABASE_URL) {
    console.log(
      "DATABASE_URL not set — seed payload validated in-memory only (Supabase-ready).",
    );
    return;
  }

  const { PrismaClient } = await import("../src/generated/prisma/client");
  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { Pool } = await import("pg");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    for (const user of payload.users) {
      await prisma.user.upsert({
        where: { email: user.email },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: mapRole(user.role),
          emailVerified: user.emailVerified,
          image: user.image ?? null,
        },
        update: {
          name: user.name,
          role: mapRole(user.role),
          emailVerified: user.emailVerified,
          image: user.image ?? null,
        },
      });
    }

    for (const category of payload.categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        create: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          scope: category.scope,
        },
        update: {
          name: category.name,
          description: category.description,
          scope: category.scope,
        },
      });
    }

    for (const tag of payload.tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        create: {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        },
        update: { name: tag.name },
      });
    }

    for (const destination of payload.destinations) {
      await prisma.cmsDestination.upsert({
        where: { slug: destination.slug },
        create: {
          id: destination.id,
          title: destination.title,
          slug: destination.slug,
          country: destination.country,
          city: destination.city,
          summary: destination.summary,
          status: destination.status,
          categoryId: destination.categoryId,
          coverImage: destination.coverImage,
          tags: destination.tags,
        },
        update: {
          title: destination.title,
          country: destination.country,
          city: destination.city,
          summary: destination.summary,
          status: destination.status,
          categoryId: destination.categoryId,
          coverImage: destination.coverImage,
          tags: destination.tags,
        },
      });
    }

    for (const cafe of payload.cafes) {
      await prisma.cmsCafe.upsert({
        where: { slug: cafe.slug },
        create: {
          id: cafe.id,
          name: cafe.name,
          slug: cafe.slug,
          city: cafe.city,
          country: cafe.country,
          summary: cafe.summary,
          status: cafe.status,
          categoryId: cafe.categoryId,
          coverImage: cafe.coverImage,
          tags: cafe.tags,
        },
        update: {
          name: cafe.name,
          city: cafe.city,
          country: cafe.country,
          summary: cafe.summary,
          status: cafe.status,
          categoryId: cafe.categoryId,
          coverImage: cafe.coverImage,
          tags: cafe.tags,
        },
      });
    }

    for (const guide of payload.guides) {
      await prisma.cmsGuide.upsert({
        where: { slug: guide.slug },
        create: {
          id: guide.id,
          title: guide.title,
          slug: guide.slug,
          authorName: guide.authorName,
          summary: guide.summary,
          status: guide.status,
          categoryId: guide.categoryId,
          coverImage: guide.coverImage,
          tags: guide.tags,
        },
        update: {
          title: guide.title,
          authorName: guide.authorName,
          summary: guide.summary,
          status: guide.status,
          categoryId: guide.categoryId,
          coverImage: guide.coverImage,
          tags: guide.tags,
        },
      });
    }

    for (const post of payload.community) {
      await prisma.cmsCommunityPost.upsert({
        where: { slug: post.slug },
        create: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          authorName: post.authorName,
          summary: post.summary,
          status: post.status,
          categoryId: post.categoryId,
          coverImage: post.coverImage,
          tags: post.tags,
        },
        update: {
          title: post.title,
          authorName: post.authorName,
          summary: post.summary,
          status: post.status,
          categoryId: post.categoryId,
          coverImage: post.coverImage,
          tags: post.tags,
        },
      });
    }

    for (const review of payload.reviews) {
      await prisma.review.upsert({
        where: { id: review.id },
        create: {
          id: review.id,
          targetType: review.targetType,
          targetId: review.targetId,
          targetName: review.targetName,
          rating: review.rating,
          body: review.body,
          status: review.status,
          authorName: review.authorName,
        },
        update: {
          targetType: review.targetType,
          targetId: review.targetId,
          targetName: review.targetName,
          rating: review.rating,
          body: review.body,
          status: review.status,
          authorName: review.authorName,
        },
      });
    }

    for (const asset of payload.media) {
      await prisma.mediaAsset.upsert({
        where: { id: asset.id },
        create: {
          id: asset.id,
          title: asset.title,
          url: asset.url,
          alt: asset.alt,
          mimeType: asset.mimeType,
          sizeBytes: asset.sizeBytes,
          folder: asset.folder,
        },
        update: {
          title: asset.title,
          url: asset.url,
          alt: asset.alt,
          mimeType: asset.mimeType,
          sizeBytes: asset.sizeBytes,
          folder: asset.folder,
        },
      });
    }

    console.log("CMS seed applied to database.");
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("CMS seed failed:", error);
  process.exit(1);
});
