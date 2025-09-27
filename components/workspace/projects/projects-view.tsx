import ProjectsKanbanView from "@/components/workspace/projects/projects-kanban-view";
import { getProjectStatuses } from "@/queries/project-statuses";
import { getProjects } from "@/queries/projects";

export default async function ProjectsView({ domain }: { domain: string }) {
  const [projects, projectStatuses] = await Promise.all([
    getProjects(domain),
    getProjectStatuses(domain),
  ]);

  if (projects.length === 0) {
    return (
      <div className="flex size-full items-center justify-center">
        No projects found
      </div>
    );
  }

  return (
    <ProjectsKanbanView projectStatuses={projectStatuses} projects={projects} />
  );
}
