import { Suspense } from "react";
import ProjectPage from "@/components/features/project/project-page";
import ProjectPageSkeleton from "@/components/skeletons/project-page-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string; projectId: string }>;
}) {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <ProjectPage params={params} />
    </Suspense>
  );
}
