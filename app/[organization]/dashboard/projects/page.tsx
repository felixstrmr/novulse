import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ProjectsKanbanView from "@/components/views/projects-kanban-view";
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
      <ProjectsKanbanView projects={projects} />
    </div>
  );
}
