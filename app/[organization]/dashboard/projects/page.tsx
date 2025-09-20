import Link from "next/link";
import EmptyState from "@/components/empty-state";
import { ProjectIcon } from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ProjectsKanbanView from "@/components/views/projects/projects-kanban-view";
import { extractDomain } from "@/lib/utils";
import { getProjects } from "@/queries/projects";

type Props = {
  params: Promise<{ organization: string }>;
};

export default async function Page({ params }: Props) {
  const { organization } = await params;
  const domain = extractDomain(organization);

  const projects = await getProjects(domain);

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
          <Badge variant="secondary">{projects.length}</Badge>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/projects/create"
        >
          Create project
        </Link>
      </div>
      {projects.length > 0 ? (
        <ProjectsKanbanView projects={projects} />
      ) : (
        <div className="flex size-full items-center justify-center">
          <EmptyState
            button={
              <Link
                className={buttonVariants({ variant: "default" })}
                href="/dashboard/projects/create"
              >
                Create project
              </Link>
            }
            description="Create a project to get started"
            icon={ProjectIcon}
            title="No projects found"
          />
        </div>
      )}
    </div>
  );
}
