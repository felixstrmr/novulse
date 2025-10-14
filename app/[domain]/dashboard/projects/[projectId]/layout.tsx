import { Suspense } from "react";
import ProjectHeader from "@/app/[domain]/dashboard/projects/[projectId]/_components/header";
import HeaderSkeleton from "@/app/[domain]/dashboard/projects/[projectId]/_components/header-skeleleton";
import { getWorkspaceSubdomain } from "@/utils/workspace";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string; projectId: string }>;
}) {
  const { domain, projectId } = await params;
  const subdomain = getWorkspaceSubdomain(domain);

  return (
    <div className="flex size-full flex-col">
      <Suspense fallback={<HeaderSkeleton />}>
        <ProjectHeader projectId={projectId} subdomain={subdomain} />
      </Suspense>
      {children}
    </div>
  );
}
