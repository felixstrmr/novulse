import Link from "next/link";
import ProjectsHeader from "@/components/features/projects/projects-header";
import ProjectsKanban from "@/components/features/projects/projects-kanban";
import { ProjectsIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { getClients } from "@/queries/client";
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

  const [projects, statuses, clients] = await Promise.all([
    getProjects(subdomain),
    getProjectStatuses(subdomain),
    getClients(subdomain, "name", "asc"),
  ]);

  return (
    <div className="flex size-full flex-col overflow-hidden rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-1.5">
          <ProjectsIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-xl tracking-tight">Projects</h1>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/projects/create"
        >
          Create project
        </Link>
      </div>
      <div className="flex size-full flex-col gap-3 p-3">
        <ProjectsHeader clients={clients} />
        <ProjectsKanban projects={projects} statuses={statuses} />
      </div>
    </div>
  );
}
