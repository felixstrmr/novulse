import Kanban from "@/components/_pages/projects/kanban";
import { getProjectStatuses } from "@/queries/project-statuses";
import { getProjects } from "@/queries/projects";

export default async function Projects({ subdomain }: { subdomain: string }) {
  const [projects, statuses] = await Promise.all([
    getProjects(subdomain),
    getProjectStatuses(subdomain),
  ]);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center border-b p-3">
        <div className="flex items-center gap-1.5">
          <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
          <div className="rounded-sm bg-muted px-1.5 py-0.5">
            <p className="text-xs">{projects.length}</p>
          </div>
        </div>
      </div>
      <div className="flex size-full p-3">
        <Kanban projects={projects} statuses={statuses} />
      </div>
    </div>
  );
}
