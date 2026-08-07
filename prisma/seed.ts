/**
 * Production seed — upserts catalogs, CMS, monetization, and help content.
 * Run: npm run db:seed
 */
import { hash } from "bcryptjs";
import { getCmsSeedPayload } from "../src/features/admin/data/cms-store";
import { helpArticles } from "../src/features/content/help-articles";
import {
  affiliatePartners,
  flightOffers,
  gearOffers,
  hotelOffers,
  membershipPlans,
  tourOffers,
} from "../src/features/monetization/data";

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


function buildSearchText(parts: Array<string | null | undefined>) {
  return parts
    .filter((part): part is string => Boolean(part && String(part).trim()))
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Minimal structural client used by seed helpers (avoids coupling to generated types).
type SeedPrisma = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  destination: { upsert: (args: any) => Promise<unknown> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cafe: { upsert: (args: any) => Promise<unknown> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guide: { upsert: (args: any) => Promise<unknown> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  communityPost: { upsert: (args: any) => Promise<unknown> };
};

async function upsertDestination(client: SeedPrisma, payload: Record<string, unknown>) {
  const slug = String(payload.slug);
  const name = String(payload.name);
  const countryName = String(payload.country ?? "");
  const cityName = String(payload.city ?? payload.name ?? "");
  const summary = String(payload.tagline ?? payload.description ?? "").slice(0, 500);
  const description = String(payload.description ?? "");
  const searchText = buildSearchText([
    name,
    cityName,
    countryName,
    summary,
    description,
    ...(Array.isArray(payload.tags) ? (payload.tags as string[]) : []),
  ]);
  return client.destination.upsert({
    where: { slug },
    create: {
      slug,
      name,
      countryName,
      cityName,
      region: typeof payload.region === "string" ? payload.region : null,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      status: "published",
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
    update: {
      name,
      countryName,
      cityName,
      region: typeof payload.region === "string" ? payload.region : null,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
  });
}

async function upsertCafe(client: SeedPrisma, payload: Record<string, unknown>) {
  const slug = String(payload.slug);
  const name = String(payload.name);
  const countryName = String(payload.country ?? "");
  const cityName = String(payload.city ?? "");
  const summary = String(payload.tagline ?? payload.description ?? "").slice(0, 500);
  const description = String(payload.description ?? "");
  const amenities = Array.isArray(payload.amenities) ? (payload.amenities as string[]) : [];
  const searchText = buildSearchText([name, cityName, countryName, summary, description, ...amenities]);
  return client.cafe.upsert({
    where: { slug },
    create: {
      slug,
      name,
      countryName,
      cityName,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      status: "published",
      amenities,
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
    update: {
      name,
      countryName,
      cityName,
      summary,
      description,
      heroImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      coverImage: typeof payload.heroImage === "string" ? payload.heroImage : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      amenities,
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
  });
}

async function upsertGuide(client: SeedPrisma, payload: Record<string, unknown>) {
  const slug = String(payload.slug);
  const title = String(payload.title);
  const authorName = String(
    (payload.author as { name?: string } | undefined)?.name ?? payload.authorName ?? "Editor",
  );
  const excerpt = String(payload.excerpt ?? payload.summary ?? "");
  const searchText = buildSearchText([title, authorName, excerpt, String(payload.body ?? "")]);
  return client.guide.upsert({
    where: { slug },
    create: {
      slug,
      title,
      excerpt,
      body: typeof payload.body === "string" ? payload.body : "",
      authorName,
      coverImage:
        typeof payload.coverImage === "string"
          ? payload.coverImage
          : typeof payload.heroImage === "string"
            ? payload.heroImage
            : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      status: "published",
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
    update: {
      title,
      excerpt,
      body: typeof payload.body === "string" ? payload.body : "",
      authorName,
      coverImage:
        typeof payload.coverImage === "string"
          ? payload.coverImage
          : typeof payload.heroImage === "string"
            ? payload.heroImage
            : null,
      rating: Number(payload.rating ?? 0),
      reviewCount: Number(payload.reviewCount ?? 0),
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
  });
}

async function upsertCommunity(client: SeedPrisma, payload: Record<string, unknown>) {
  const slug = String(payload.slug);
  const title = String(payload.title);
  const authorName = String(payload.authorName ?? payload.authorSlug ?? "Traveler");
  const excerpt = String(payload.excerpt ?? "").slice(0, 500);
  const body = Array.isArray(payload.body)
    ? (payload.body as string[]).join("\n\n")
    : String(payload.body ?? "");
  const searchText = buildSearchText([title, authorName, excerpt, body]);
  return client.communityPost.upsert({
    where: { slug },
    create: {
      slug,
      title,
      body,
      excerpt,
      authorName,
      coverImage: typeof payload.coverImage === "string" ? payload.coverImage : typeof payload.heroImage === "string" ? payload.heroImage : null,
      status: "published",
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
    update: {
      title,
      body,
      excerpt,
      authorName,
      coverImage: typeof payload.coverImage === "string" ? payload.coverImage : typeof payload.heroImage === "string" ? payload.heroImage : null,
      tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
      searchText,
      payload,
    },
  });
}


async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL not set — aborting seed.");
    return;
  }

  const { PrismaPg } = await import("@prisma/adapter-pg");
  const { PrismaClient } = await import("../src/generated/prisma/client");
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const {
    getAllDestinations,
  } = await import("../src/features/destinations/data/destinations-store");
  const { getAllCafes } = await import("../src/features/cafes/data/cafes-store");
  const { getAllGuides, getAllAuthors } = await import(
    "../src/features/guides/data/guides-store"
  );
  const { getAllStories, getAllTravelers } = await import(
    "../src/features/community/data/community-store"
  );
  const homeContent = await import("../src/features/home/data/content");

  try {
    const cms = getCmsSeedPayload();

    const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? "Admin@12345";
    const bootstrapHash = await hash(bootstrapPassword, 12);

    for (const user of cms.users) {
      const isBootstrapAdmin = user.email === "admin@musafircaffe.com";

      const upserted = await prisma.user.upsert({
        where: { email: user.email },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: mapRole(user.role),
          emailVerified: user.emailVerified,
          image: user.image ?? null,
          password: isBootstrapAdmin ? bootstrapHash : "",
        },
        update: {
          name: user.name,
          role: mapRole(user.role),
          emailVerified: user.emailVerified,
          // Always re-sync bootstrap admin password so production recoveries stick
          // even when an older seed left a null/wrong hash in place.
          ...(isBootstrapAdmin ? { password: bootstrapHash } : {}),
        },
      });
      await prisma.profile.upsert({
        where: { userId: upserted.id },
        create: {
          userId: upserted.id,
          displayName: user.name,
        },
        update: { displayName: user.name },
      });
    }

    for (const category of cms.categories) {
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

    for (const tag of cms.tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        create: { id: tag.id, name: tag.name, slug: tag.slug },
        update: { name: tag.name },
      });
    }

    const destinations = getAllDestinations();
    for (const destination of destinations) {
      await upsertDestination(prisma as SeedPrisma, destination as unknown as Record<string, unknown>);
    }

    const cafes = getAllCafes();
    for (const cafe of cafes) {
      await upsertCafe(prisma as SeedPrisma, cafe as unknown as Record<string, unknown>);
      const gallery = cafe.gallery ?? [];
      const cafeRow = await prisma.cafe.findUnique({ where: { slug: cafe.slug } });
      if (cafeRow) {
        await prisma.cafeImage.deleteMany({ where: { cafeId: cafeRow.id } });
        for (const [index, image] of gallery.entries()) {
          await prisma.cafeImage.create({
            data: {
              cafeId: cafeRow.id,
              url: image.src,
              alt: image.alt,
              sortOrder: index,
            },
          });
        }
      }
    }

    for (const author of getAllAuthors()) {
      await prisma.guideAuthor.upsert({
        where: { slug: author.slug },
        create: {
          slug: author.slug,
          name: author.name,
          bio: author.bio,
          avatarUrl: author.avatar,
          payload: author as unknown as object,
        },
        update: {
          name: author.name,
          bio: author.bio,
          avatarUrl: author.avatar,
          payload: author as unknown as object,
        },
      });
    }

    const guides = getAllGuides();
    for (const guide of guides) {
      await upsertGuide(prisma as SeedPrisma, guide as unknown as Record<string, unknown>);
    }

    for (const traveler of getAllTravelers()) {
      await prisma.communityTraveler.upsert({
        where: { slug: traveler.slug },
        create: {
          slug: traveler.slug,
          name: traveler.name,
          bio: traveler.bio,
          avatarUrl: traveler.avatar,
          payload: traveler as unknown as object,
        },
        update: {
          name: traveler.name,
          bio: traveler.bio,
          avatarUrl: traveler.avatar,
          payload: traveler as unknown as object,
        },
      });
    }

    const stories = getAllStories();
    for (const story of stories) {
      await upsertCommunity(prisma as SeedPrisma, story as unknown as Record<string, unknown>);
    }

    for (const plan of membershipPlans) {
      await prisma.membershipPlan.upsert({
        where: { slug: plan.slug },
        create: {
          id: plan.id,
          slug: plan.slug,
          name: plan.name,
          description: plan.description,
          priceMonthly: plan.priceMonthly,
          priceYearly: plan.priceYearly,
          features: [...plan.features],
          highlighted: Boolean(plan.highlighted),
        },
        update: {
          name: plan.name,
          description: plan.description,
          priceMonthly: plan.priceMonthly,
          priceYearly: plan.priceYearly,
          features: [...plan.features],
          highlighted: Boolean(plan.highlighted),
        },
      });
    }

    for (const partner of affiliatePartners) {
      await prisma.affiliatePartner.upsert({
        where: { id: partner.id },
        create: partner,
        update: {
          name: partner.name,
          network: partner.network,
          category: partner.category,
          commissionLabel: partner.commissionLabel,
          trackingParam: partner.trackingParam,
        },
      });
    }

    const offers = [...hotelOffers, ...flightOffers, ...tourOffers, ...gearOffers];
    for (const offer of offers) {
      await prisma.commerceOffer.upsert({
        where: { slug: offer.slug },
        create: {
          id: offer.id,
          slug: offer.slug,
          category: offer.category,
          title: offer.title,
          summary: offer.summary,
          location: offer.location,
          priceFrom: offer.priceFrom,
          currency: offer.currency,
          rating: offer.rating,
          reviewCount: offer.reviewCount,
          affiliatePartner: offer.affiliatePartner,
          image: offer.image,
          featured: Boolean(offer.featured),
          tags: [...offer.tags],
          searchText: `${offer.title} ${offer.summary} ${offer.location}`.toLowerCase(),
        },
        update: {
          title: offer.title,
          summary: offer.summary,
          location: offer.location,
          priceFrom: offer.priceFrom,
          rating: offer.rating,
          reviewCount: offer.reviewCount,
          image: offer.image,
          featured: Boolean(offer.featured),
          tags: [...offer.tags],
          searchText: `${offer.title} ${offer.summary} ${offer.location}`.toLowerCase(),
        },
      });
    }

    for (const article of helpArticles) {
      await prisma.helpArticle.upsert({
        where: { slug: article.slug },
        create: {
          slug: article.slug,
          title: article.title,
          summary: article.summary,
          category: article.category,
          body: [...article.body],
        },
        update: {
          title: article.title,
          summary: article.summary,
          category: article.category,
          body: [...article.body],
        },
      });
    }

    const homePayload = {
      destinations: homeContent.destinations,
      cafes: homeContent.cafes,
      guides: homeContent.guides,
      testimonials: homeContent.testimonials,
      stats: homeContent.stats,
      categories: homeContent.categories,
      instagramPosts: homeContent.instagramPosts,
    };

    await prisma.websiteSetting.upsert({
      where: { key: "site" },
      create: {
        key: "site",
        label: "Site settings",
        value: {
          siteName: "MusafirCaffe",
          supportEmail: "hello@musafircaffe.com",
          defaultLocale: "en",
        },
      },
      update: {},
    });

    await prisma.seoPage.upsert({
      where: { path: "/" },
      create: {
        path: "/",
        title: "MusafirCaffe — Coffee travel, cafés & guides",
        description: "Discover destinations, cafés, and community guides for coffee travelers.",
        noIndex: false,
      },
      update: {},
    });

    await prisma.homepageContent.upsert({
      where: { key: "home" },
      create: {
        key: "home",
        payload: homePayload as object,
      },
      update: {
        payload: homePayload as object,
      },
    });

    console.log("Production seed complete:", {
      destinations: destinations.length,
      cafes: cafes.length,
      guides: guides.length,
      stories: stories.length,
      offers: offers.length,
      helpArticles: helpArticles.length,
    });

    // Final guarantee: bootstrap admin always has a working password hash,
    // even if earlier upserts skipped it or the fixture email mismatched.
    const adminEmail = "admin@musafircaffe.com";
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!admin) {
      await prisma.user.create({
        data: {
          name: "Amina Admin",
          email: adminEmail,
          password: bootstrapHash,
          role: "admin",
          emailVerified: true,
          preferences: { create: {} },
          profile: { create: { displayName: "Amina Admin" } },
        },
      });
      console.log("Created missing bootstrap admin");
    } else {
      const { compare } = await import("bcryptjs");
      const valid =
        Boolean(admin.password) &&
        (await compare(bootstrapPassword, admin.password!));
      if (!valid || admin.role !== "admin") {
        await prisma.user.update({
          where: { id: admin.id },
          data: {
            password: bootstrapHash,
            role: "admin",
            emailVerified: true,
          },
        });
        console.log("Repaired bootstrap admin password/role");
      } else {
        console.log("Bootstrap admin password verified OK");
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
