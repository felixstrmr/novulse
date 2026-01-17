import { Suspense } from "react";
import AssetCreate from "@/components/assets/asset-create-page";
import AssetCreatePageSkeleton from "@/components/skeletons/asset-create-page-skeleton";

export default function AssetCreatePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<AssetCreatePageSkeleton />}>
      <AssetCreate params={params} />
    </Suspense>
  );
}
