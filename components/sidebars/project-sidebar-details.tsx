import { format } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ClientIcon } from "@/components/icons/client-icon";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import ProjectStatusIcon from "@/components/icons/dynamic/project-status-icon";
import type { Project } from "@/types";

type Props = {
  project: Project;
};

export default function ProjectSidebarDetails({ project }: Props) {
  return (
    <div className="space-y-2 border-b p-4">
      <p className="text-muted-foreground text-xs">Details</p>
      <div className="flex items-center">
        <p className="w-20 text-muted-foreground text-sm">Client</p>
        <Link
          className="flex h-7 items-center gap-1.5 rounded-md px-2 hover:bg-muted"
          href={`/dashboard/clients/${project.clientId}`}
        >
          <ClientIcon className="size-3.5" />
          <span className="text-sm">
            <p>{project.clientName}</p>
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        <p className="w-20 text-muted-foreground text-sm">Status</p>
        <div className="flex h-7 items-center gap-1.5 rounded-md px-2 hover:bg-muted">
          <ProjectStatusIcon className="size-3.5" status={project.status} />
          <span className="text-sm">
            <p>{project.status}</p>
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <p className="w-20 text-muted-foreground text-sm">Priority</p>
        <div className="flex h-7 items-center gap-1.5 rounded-md px-2 hover:bg-muted">
          <ProjectPriorityIcon
            className="size-3.5"
            priority={project.priority}
          />
          <span className="text-sm">
            <p>{project.priority}</p>
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <p className="w-20 text-muted-foreground text-sm">Dates</p>
        <div className="flex items-center gap-2">
          <div className="flex h-7 items-center rounded-md px-2 hover:bg-muted">
            <span className="text-sm">
              {project.startDate ? (
                <p>{format(project.startDate, "PP")}</p>
              ) : (
                "No date"
              )}
            </span>
          </div>
          <ArrowRightIcon className="size-3.5" />
          <div className="flex h-7 items-center rounded-md px-2 hover:bg-muted">
            <span className="text-sm">
              {project.endDate ? (
                <p>{format(project.endDate, "PP")}</p>
              ) : (
                "No date"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
