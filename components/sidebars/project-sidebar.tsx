import Link from "next/link";
import { ClientIcon } from "@/components/icons/client-icon";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import ProjectStatusIcon from "@/components/icons/dynamic/project-status-icon";
import { PriorityLowIcon } from "@/components/icons/priority-low-icon";
import { StatusIcon } from "@/components/icons/status-icon";
import type { PROJECT_PRIORITIES, PROJECT_STATUSES } from "@/lib/constants";
import type { Project } from "@/types";

type Props = {
  project: Project;
};

export default function ProjectSidebar({ project }: Props) {
  return (
    <div className="w-80 min-w-80 max-w-80 rounded-lg bg-background">
      <div className="flex items-center gap-2 border-b p-4">
        <div className="flex h-8 items-center">
          <h1 className="font-semibold text-2xl tracking-tight">
            {project.name}
          </h1>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <p className="text-muted-foreground text-xs">Details</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="flex w-24 items-center gap-1">
              <ClientIcon className="size-3.5 text-muted-foreground" />
              <p className="text-muted-foreground">Client</p>
            </div>
            <Link
              className="rounded-md px-2 py-1 hover:bg-muted"
              href={`/dashboard/clients/${project.clientId}`}
            >
              <p>{project.clientName}</p>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex w-24 items-center gap-1">
              <StatusIcon className="size-3.5 text-muted-foreground" />
              <p className="text-muted-foreground">Status</p>
            </div>
            <div className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted">
              <ProjectStatusIcon
                className="size-3.5"
                status={project.status as (typeof PROJECT_STATUSES)[number]}
              />
              <p>{project.status}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex w-24 items-center gap-1">
              <PriorityLowIcon className="size-3.5 text-muted-foreground" />
              <p className="text-muted-foreground">Priority</p>
            </div>

            <div className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted">
              <ProjectPriorityIcon
                className="size-3.5"
                priority={
                  project.priority as (typeof PROJECT_PRIORITIES)[number]
                }
              />
              <p>{project.priority}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
