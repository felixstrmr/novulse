import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientIcon } from "@/components/icons/client-icon";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import ProjectStatusIcon from "@/components/icons/dynamic/project-status-icon";
import ProjectNavbar from "@/components/navbars/project-navbar";
import { extractDomain } from "@/lib/utils";
import { getProjectUsersByProjectId } from "@/queries/project-users";
import { getProjectById } from "@/queries/projects";

type Props = {
  children: React.ReactNode;
  params: Promise<{ organization: string; projectId: string }>;
};

export default async function ProjectLayout({ children, params }: Props) {
  const { organization, projectId } = await params;
  const domain = extractDomain(organization);

  const [project, projectUsers] = await Promise.all([
    getProjectById(domain, projectId),
    getProjectUsersByProjectId(domain, projectId),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="size-full rounded-lg bg-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col py-12">
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/dashboard/projects"
        >
          <span className="text-sm">Back</span>
        </Link>
        <div className="mt-8 space-y-2">
          <h1 className="font-semibold text-2xl tracking-tight">
            {project.name}
          </h1>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <p className="mr-2 text-muted-foreground text-xs">Details</p>
          <div className="flex h-7 items-center gap-1.5 rounded-md bg-muted px-2 text-xs">
            <ProjectStatusIcon className="size-3.5" status={project.status} />
            {project.status}
          </div>
          <div className="flex h-7 items-center gap-1.5 rounded-md bg-muted px-2 text-xs">
            <ProjectPriorityIcon
              className="size-3.5"
              priority={project.priority}
            />
            {project.priority}
          </div>
          <div className="flex h-7 items-center gap-1.5 rounded-md bg-muted px-2 text-xs">
            <ClientIcon className="size-3.5" />
            {project.clientName}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <p className="mr-2 text-muted-foreground text-xs">Assignees</p>

          {projectUsers.map((user) => (
            <div
              className="flex h-7 items-center gap-1.5 rounded-md bg-muted px-2 text-xs"
              key={user.userId}
            >
              {user.userName}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ProjectNavbar projectId={projectId} />
        </div>
        {children}
      </div>
    </div>
  );
}
