import { Suspense } from "react";
import Assets from "@/components/agent/assets/assets-page";
import AssetsPageSkeleton from "@/components/skeletons/assets-page-skeleton";

export default function AssetsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<AssetsPageSkeleton />}>
      <Assets params={params} />
    </Suspense>
  );
}
