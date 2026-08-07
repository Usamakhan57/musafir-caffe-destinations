import { StoryDetailSkeleton } from "@/features/community";

export default function StoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <StoryDetailSkeleton />
    </div>
  );
}
