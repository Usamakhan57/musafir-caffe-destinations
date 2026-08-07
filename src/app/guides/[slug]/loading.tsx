import { GuideDetailSkeleton } from "@/features/guides";

export default function GuideDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <GuideDetailSkeleton />
    </div>
  );
}
