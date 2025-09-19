import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProjectSidebar from "@/components/sidebars/project-sidebar";
import { db } from "@/db";
import { clients, projects } from "@/db/schema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
};

export default async function ProjectLayout({ children, params }: Props) {
  const { projectId } = await params;

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
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .where(eq(projects.id, projectId));

  if (!data) {
    notFound();
  }

  return (
    <div className="flex size-full gap-1">
      <ProjectSidebar project={data[0]} />
      {children}
    </div>
  );
}
