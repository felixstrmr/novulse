import ProjectsKanban from "@/components/features/projects/projects-kanban";
import { getProjects } from "@/queries/project";
import { getProjectStatuses } from "@/queries/project-status";
import { getUniqueDomain } from "@/utils/domain";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const [statuses, projects] = await Promise.all([
    getProjectStatuses(uniqueDomain),
    getProjects(uniqueDomain),
  ]);

  return (
    <div className="flex size-full flex-col rounded-xl bg-background">
      <div className="flex items-center justify-between border-b p-3">
        <h1 className="flex h-8 items-center font-semibold text-xl tracking-tight">
          Projects
        </h1>
      </div>
      <div className="flex size-full p-3">
        <ProjectsKanban projects={projects} statuses={statuses} />
      </div>
    </div>
  );
}
