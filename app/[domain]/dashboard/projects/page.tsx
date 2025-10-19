import { Suspense } from "react";
import ProjectsPage from "@/components/features/projects/projects-page";
import ProjectsPageSkeleton from "@/components/skeletons/projects-page-skeleton";
import { getSubdomain } from "@/utils/domain";

export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsPage subdomain={subdomain} />
    </Suspense>
  );
}
