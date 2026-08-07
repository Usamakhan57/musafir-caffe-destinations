-- Production database integration: countries, cities, catalogs, social graph, trips
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Extend review targets (Postgres 15+ supports IF NOT EXISTS)
DO $$ BEGIN
  ALTER TYPE "ReviewTargetType" ADD VALUE IF NOT EXISTS 'hotel';
  ALTER TYPE "ReviewTargetType" ADD VALUE IF NOT EXISTS 'tour';
  ALTER TYPE "ReviewTargetType" ADD VALUE IF NOT EXISTS 'gear';
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TYPE "BookmarkTargetType" AS ENUM ('destination', 'cafe', 'guide', 'community');
CREATE TYPE "LikeTargetType" AS ENUM ('destination', 'cafe', 'guide', 'community', 'comment');
CREATE TYPE "MediaProvider" AS ENUM ('url', 'supabase', 'local');

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bio" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "location" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "website" TEXT;
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");
CREATE INDEX IF NOT EXISTS "User_name_idx" ON "User"("name");

ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "title" TEXT;
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "authorEmail" TEXT;
CREATE INDEX IF NOT EXISTS "Review_targetType_targetId_idx" ON "Review"("targetType", "targetId");
CREATE INDEX IF NOT EXISTS "Review_status_idx" ON "Review"("status");

ALTER TABLE "MediaAsset" ADD COLUMN IF NOT EXISTS "provider" "MediaProvider" NOT NULL DEFAULT 'url';
ALTER TABLE "MediaAsset" ADD COLUMN IF NOT EXISTS "storagePath" TEXT;
CREATE INDEX IF NOT EXISTS "MediaAsset_folder_idx" ON "MediaAsset"("folder");

ALTER TABLE "AppNotification" DROP CONSTRAINT IF EXISTS "AppNotification_userId_fkey";
DO $$ BEGIN
  ALTER TABLE "AppNotification" ADD CONSTRAINT "AppNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "PaymentIntentRecord" ADD COLUMN IF NOT EXISTS "userId" TEXT;
DO $$ BEGIN
  ALTER TABLE "PaymentIntentRecord" ADD CONSTRAINT "PaymentIntentRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "Profile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "displayName" TEXT,
  "headline" TEXT,
  "avatarUrl" TEXT,
  "coverUrl" TEXT,
  "socials" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile"("userId");
DO $$ BEGIN
  ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "Country" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "code" TEXT,
  "flag" TEXT,
  "region" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Country_slug_key" ON "Country"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Country_code_key" ON "Country"("code");
CREATE INDEX IF NOT EXISTS "Country_name_idx" ON "Country"("name");

CREATE TABLE IF NOT EXISTS "City" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "countryId" TEXT NOT NULL,
  "lat" DOUBLE PRECISION,
  "lng" DOUBLE PRECISION,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "City_slug_key" ON "City"("slug");
CREATE INDEX IF NOT EXISTS "City_countryId_idx" ON "City"("countryId");
CREATE INDEX IF NOT EXISTS "City_name_idx" ON "City"("name");
DO $$ BEGIN
  ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "Destination" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "cityId" TEXT,
  "countryId" TEXT,
  "countryName" TEXT NOT NULL,
  "cityName" TEXT NOT NULL,
  "region" TEXT,
  "summary" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "heroImage" TEXT,
  "coverImage" TEXT,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "categoryId" TEXT,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "searchText" TEXT NOT NULL DEFAULT '',
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Destination_slug_key" ON "Destination"("slug");
CREATE INDEX IF NOT EXISTS "Destination_status_idx" ON "Destination"("status");
CREATE INDEX IF NOT EXISTS "Destination_countryName_idx" ON "Destination"("countryName");
CREATE INDEX IF NOT EXISTS "Destination_cityName_idx" ON "Destination"("cityName");
CREATE INDEX IF NOT EXISTS "Destination_rating_idx" ON "Destination"("rating");
CREATE INDEX IF NOT EXISTS "Destination_searchText_idx" ON "Destination" USING gin ("searchText" gin_trgm_ops);

CREATE TABLE IF NOT EXISTS "Cafe" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "cityId" TEXT,
  "countryId" TEXT,
  "countryName" TEXT NOT NULL,
  "cityName" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "heroImage" TEXT,
  "coverImage" TEXT,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "categoryId" TEXT,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "searchText" TEXT NOT NULL DEFAULT '',
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Cafe_slug_key" ON "Cafe"("slug");
CREATE INDEX IF NOT EXISTS "Cafe_status_idx" ON "Cafe"("status");
CREATE INDEX IF NOT EXISTS "Cafe_cityName_idx" ON "Cafe"("cityName");
CREATE INDEX IF NOT EXISTS "Cafe_rating_idx" ON "Cafe"("rating");
CREATE INDEX IF NOT EXISTS "Cafe_searchText_idx" ON "Cafe" USING gin ("searchText" gin_trgm_ops);

CREATE TABLE IF NOT EXISTS "CafeImage" (
  "id" TEXT NOT NULL,
  "cafeId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CafeImage_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "CafeImage_cafeId_idx" ON "CafeImage"("cafeId");

CREATE TABLE IF NOT EXISTS "GuideAuthor" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "bio" TEXT,
  "avatarUrl" TEXT,
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "GuideAuthor_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "GuideAuthor_slug_key" ON "GuideAuthor"("slug");

CREATE TABLE IF NOT EXISTS "Guide" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "body" TEXT NOT NULL DEFAULT '',
  "authorId" TEXT,
  "authorName" TEXT NOT NULL,
  "coverImage" TEXT,
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "categoryId" TEXT,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "searchText" TEXT NOT NULL DEFAULT '',
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Guide_slug_key" ON "Guide"("slug");
CREATE INDEX IF NOT EXISTS "Guide_status_idx" ON "Guide"("status");
CREATE INDEX IF NOT EXISTS "Guide_authorName_idx" ON "Guide"("authorName");
CREATE INDEX IF NOT EXISTS "Guide_searchText_idx" ON "Guide" USING gin ("searchText" gin_trgm_ops);

CREATE TABLE IF NOT EXISTS "CommunityTraveler" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "bio" TEXT,
  "avatarUrl" TEXT,
  "payload" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CommunityTraveler_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CommunityTraveler_slug_key" ON "CommunityTraveler"("slug");

CREATE TABLE IF NOT EXISTS "CommunityPost" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL DEFAULT '',
  "excerpt" TEXT,
  "authorName" TEXT NOT NULL,
  "travelerId" TEXT,
  "coverImage" TEXT,
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "categoryId" TEXT,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "likeCount" INTEGER NOT NULL DEFAULT 0,
  "commentCount" INTEGER NOT NULL DEFAULT 0,
  "searchText" TEXT NOT NULL DEFAULT '',
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CommunityPost_slug_key" ON "CommunityPost"("slug");
CREATE INDEX IF NOT EXISTS "CommunityPost_status_idx" ON "CommunityPost"("status");
CREATE INDEX IF NOT EXISTS "CommunityPost_searchText_idx" ON "CommunityPost" USING gin ("searchText" gin_trgm_ops);

CREATE TABLE IF NOT EXISTS "Comment" (
  "id" TEXT NOT NULL,
  "postId" TEXT,
  "parentId" TEXT,
  "authorId" TEXT,
  "authorName" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Comment_postId_idx" ON "Comment"("postId");
CREATE INDEX IF NOT EXISTS "Comment_parentId_idx" ON "Comment"("parentId");

CREATE TABLE IF NOT EXISTS "Bookmark" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "targetType" "BookmarkTargetType" NOT NULL,
  "targetId" TEXT NOT NULL,
  "targetSlug" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Bookmark_userId_targetType_targetId_key" ON "Bookmark"("userId", "targetType", "targetId");
CREATE INDEX IF NOT EXISTS "Bookmark_userId_idx" ON "Bookmark"("userId");

CREATE TABLE IF NOT EXISTS "Like" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "targetType" "LikeTargetType" NOT NULL,
  "targetId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Like_userId_targetType_targetId_key" ON "Like"("userId", "targetType", "targetId");
CREATE INDEX IF NOT EXISTS "Like_userId_idx" ON "Like"("userId");

CREATE TABLE IF NOT EXISTS "Follow" (
  "id" TEXT NOT NULL,
  "followerId" TEXT NOT NULL,
  "followingId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");
CREATE INDEX IF NOT EXISTS "Follow_followingId_idx" ON "Follow"("followingId");

CREATE TABLE IF NOT EXISTS "Trip" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "destination" TEXT,
  "startDate" TIMESTAMP(3),
  "endDate" TIMESTAMP(3),
  "shareSlug" TEXT,
  "isPublic" BOOLEAN NOT NULL DEFAULT false,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Trip_shareSlug_key" ON "Trip"("shareSlug");
CREATE INDEX IF NOT EXISTS "Trip_userId_idx" ON "Trip"("userId");

CREATE TABLE IF NOT EXISTS "Membership" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "planId" TEXT NOT NULL,
  "planName" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active',
  "interval" TEXT NOT NULL DEFAULT 'month',
  "renewsAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Membership_userId_status_idx" ON "Membership"("userId", "status");

CREATE TABLE IF NOT EXISTS "CommerceOffer" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "priceFrom" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "affiliatePartner" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "searchText" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CommerceOffer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CommerceOffer_slug_key" ON "CommerceOffer"("slug");
CREATE INDEX IF NOT EXISTS "CommerceOffer_category_status_idx" ON "CommerceOffer"("category", "status");

CREATE TABLE IF NOT EXISTS "MembershipPlan" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "priceMonthly" DOUBLE PRECISION NOT NULL,
  "priceYearly" DOUBLE PRECISION NOT NULL,
  "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "highlighted" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MembershipPlan_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "MembershipPlan_slug_key" ON "MembershipPlan"("slug");

CREATE TABLE IF NOT EXISTS "AffiliatePartner" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "network" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "commissionLabel" TEXT NOT NULL,
  "trackingParam" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AffiliatePartner_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "HomepageContent" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "HomepageContent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "HomepageContent_key_key" ON "HomepageContent"("key");

CREATE TABLE IF NOT EXISTS "HelpArticle" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "body" TEXT[],
  "status" "ContentStatus" NOT NULL DEFAULT 'published',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HelpArticle_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "HelpArticle_slug_key" ON "HelpArticle"("slug");
