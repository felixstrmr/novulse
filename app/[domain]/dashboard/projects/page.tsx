import { Suspense } from "react";
import Projects from "@/components/_pages/projects";
import ProjectsSkeleton from "@/components/_pages/projects/skeleton";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getWorkspaceSubdomain(domain);

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <Projects subdomain={subdomain} />
    </Suspense>
  );
}
