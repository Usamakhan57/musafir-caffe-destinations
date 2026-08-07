import { FeaturedStoriesSection } from "./story-sections";

/** Back-compat wrapper for the existing community home import. */
export default async function StoriesFeed() {
  return <FeaturedStoriesSection />;
}
