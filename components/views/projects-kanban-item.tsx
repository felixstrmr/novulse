"use client";

import { useDraggable } from "@dnd-kit/core";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ClientIcon } from "@/components/icons/client-icon";
import { ClockIcon } from "@/components/icons/clock-icon";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import type { PROJECT_PRIORITIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Props = {
  project: Project;
};

export default function ProjectsKanbanItem({ project }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: project.id,
    data: {
      project,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Link
      className={cn(
        "flex w-64 min-w-64 max-w-64 flex-col gap-3 rounded-md bg-background p-3 shadow-sm dark:bg-muted/50"
      )}
      href={`/dashboard/projects/${project.id}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className="flex items-center gap-1">
        <ClientIcon className="size-3.5 text-muted-foreground" />
        <p className="truncate text-muted-foreground text-xs">
          {project.clientName}
        </p>
        <ProjectPriorityIcon
          className="ml-auto size-3.5"
          priority={project.priority as (typeof PROJECT_PRIORITIES)[number]}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm">{project.name}</p>
      </div>
      <div className="flex gap-3">
        <div className="flex w-fit items-center gap-1 rounded-full bg-muted px-1 py-0.5 pr-1.5 text-muted-foreground">
          <ClockIcon className="size-3.5" />
          <p className="text-xs">
            {project.endDate
              ? formatDistanceToNow(project.endDate, { addSuffix: true })
              : "-"}
          </p>
        </div>
      </div>
    </Link>
  );
}
