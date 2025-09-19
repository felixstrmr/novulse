import { notFound } from "next/navigation";
import ProjectSidebarActivity from "@/components/sidebars/project-sidebar-activity";
import ProjectSidebarDetails from "@/components/sidebars/project-sidebar-details";
import ProjectSidebarHeader from "@/components/sidebars/project-sidebar-header";
import ProjectSidebarMembers from "@/components/sidebars/project-sidebar-members";
import { getProjectUsersByProjectId } from "@/queries/project-users";
import { getProjectById } from "@/queries/projects";

type Props = {
  domain: string;
  projectId: string;
};

export default async function ProjectSidebar({ domain, projectId }: Props) {
  const [project, projectUsers] = await Promise.all([
    getProjectById(domain, projectId),
    getProjectUsersByProjectId(domain, projectId),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <aside className="w-96 min-w-96 max-w-96 rounded-lg bg-background">
      <ProjectSidebarHeader project={project} />
      <ProjectSidebarDetails project={project} />
      <ProjectSidebarMembers projectUsers={projectUsers} />
      <ProjectSidebarActivity />
    </aside>
  );
}
