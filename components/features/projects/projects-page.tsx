import { BoxIcon } from "lucide-react";
import ProjectsKanban from "@/components/features/projects/projects-kanban";
import { getProjects } from "@/queries/project";
import { getProjectStatuses } from "@/queries/project-status";

export default async function ProjectsPage({
  subdomain,
}: {
  subdomain: string;
}) {
  const [projects, statuses] = await Promise.all([
    getProjects(subdomain),
    getProjectStatuses(subdomain),
  ]);

  return (
    <div className="flex size-full flex-col overflow-hidden rounded-lg bg-background">
      <div className="border-b p-3">
        <div className="flex items-center gap-1.5">
          <BoxIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Projects</h1>
        </div>
      </div>
      <div className="size-full p-3">
        <ProjectsKanban projects={projects} statuses={statuses} />
      </div>
    </div>
  );
}
