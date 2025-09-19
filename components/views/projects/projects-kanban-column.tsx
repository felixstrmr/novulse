"use client";

import { useDroppable } from "@dnd-kit/core";
import ProjectStatusIcon from "@/components/icons/dynamic/project-status-icon";
import { Badge } from "@/components/ui/badge";
import ProjectsKanbanItem from "@/components/views/projects/projects-kanban-item";
import type { PROJECT_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Props = {
  status: string;
  projects: Project[];
};

export default function ProjectsKanbanColumn({ status, projects }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
    data: {
      status,
    },
  });

  return (
    <div className="flex h-full flex-col gap-2" ref={setNodeRef}>
      <div className="flex items-center gap-2">
        <ProjectStatusIcon
          className="size-4"
          status={status as (typeof PROJECT_STATUSES)[number]}
        />
        <p className="text-sm">{status}</p>
        <Badge className="rounded-sm px-1 py-0 text-xs" variant="secondary">
          {projects.length}
        </Badge>
      </div>
      <div
        className={cn(
          "group h-full space-y-2 rounded-lg bg-muted p-2 dark:bg-muted/12.5",
          isOver && "bg-foreground/10 dark:bg-muted/25"
        )}
      >
        {projects.map((project) => (
          <ProjectsKanbanItem key={project.id} project={project} />
        ))}
        <div className="h-0 min-w-64" />
      </div>
    </div>
  );
}
