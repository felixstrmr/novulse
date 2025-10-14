import { Suspense } from "react";
import Projects from "@/app/[domain]/dashboard/projects/_components/main";
import ProjectsSkeleton from "@/app/[domain]/dashboard/projects/_components/skeleton";
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
