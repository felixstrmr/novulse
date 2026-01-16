import { Suspense } from "react";
import Asset from "@/components/assets/asset-page";
import AssetPageSkeleton from "@/components/skeletons/asset-page-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string; assetId: string }>;
}) {
  return (
    <Suspense fallback={<AssetPageSkeleton />}>
      <Asset params={params} />
    </Suspense>
  );
}
