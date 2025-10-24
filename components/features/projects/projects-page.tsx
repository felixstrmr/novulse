import ProjectsKanban from "@/components/features/projects/projects-kanban";
import { ProjectsIcon } from "@/components/icons";
import { getProjects } from "@/queries/project";
import { getProjectStatuses } from "@/queries/project-status";
import { getSubdomain } from "@/utils/domain";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const [projects, statuses] = await Promise.all([
    getProjects(subdomain),
    getProjectStatuses(subdomain),
  ]);

  return (
    <div className="flex size-full flex-col overflow-hidden rounded-lg bg-background">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <ProjectsIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Projects</h1>
        </div>
      </div>
      <div className="size-full p-3">
        <ProjectsKanban projects={projects} statuses={statuses} />
      </div>
    </div>
  );
}
