import { Suspense } from "react";
import ProjectSidebar from "@/components/sidebars/project-sidebar";
import { extractDomain } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  params: Promise<{ organization: string; projectId: string }>;
};

export default async function ProjectLayout({ children, params }: Props) {
  const { organization, projectId } = await params;
  const domain = extractDomain(organization);

  return (
    <div className="flex size-full gap-1">
      <Suspense
        fallback={
          <div className="w-96 min-w-96 max-w-96 rounded-lg bg-background" />
        }
      >
        <ProjectSidebar domain={domain} projectId={projectId} />
      </Suspense>
      {children}
    </div>
  );
}
