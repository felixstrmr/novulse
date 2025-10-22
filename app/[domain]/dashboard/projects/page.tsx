import { Suspense } from "react";
import ProjectsPage from "@/components/features/projects/projects-page";
import ProjectsPageSkeleton from "@/components/skeletons/projects-page-skeleton";

export default function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsPage params={params} />
    </Suspense>
  );
}
