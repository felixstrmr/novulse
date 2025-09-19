import { eq } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ProjectsKanbanView from "@/components/views/projects-kanban-view";
import { db } from "@/db";
import { clients, organizations, projects } from "@/db/schema";
import { extractDomain } from "@/lib/utils";

type Props = {
  params: Promise<{ organization: string }>;
};

export default async function Page({ params }: Props) {
  const { organization } = await params;
  const domain = extractDomain(organization);

  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      status: projects.status,
      priority: projects.priority,
      startDate: projects.startDate,
      endDate: projects.endDate,
      clientId: clients.id,
      clientName: clients.name,
    })
    .from(projects)
    .innerJoin(organizations, eq(projects.organizationId, organizations.id))
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .where(eq(organizations.slug, domain));

  return (
    <div className="flex size-full flex-col rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
          <Badge variant="secondary">{data.length}</Badge>
        </div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/dashboard/projects/create"
        >
          Create project
        </Link>
      </div>
      <ProjectsKanbanView projects={data} />
    </div>
  );
}
