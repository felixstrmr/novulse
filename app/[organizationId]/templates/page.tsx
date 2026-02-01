import { Suspense } from "react";
import TemplatesPageSkeleton from "@/components/skeletons/templates-page-skeleton";
import Templates from "@/components/templates/templates-page";

export default function TemplatesPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  return (
    <Suspense fallback={<TemplatesPageSkeleton />}>
      <Templates params={params} />
    </Suspense>
  );
}
