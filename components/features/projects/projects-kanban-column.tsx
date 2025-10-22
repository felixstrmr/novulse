"use client";

import { useDroppable } from "@dnd-kit/core";
import ProjectsKanbanItem from "@/components/features/projects/projects-kanban-item";
import type { Project, ProjectStatus } from "@/types";
import { cn } from "@/utils/ui";

export default function ProjectsKanbanColumn({
  status,
  projects,
}: {
  status: ProjectStatus;
  projects: Project[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id,
    data: {
      status,
    },
  });

  return (
    <div className="flex h-full flex-col" ref={setNodeRef}>
      <div
        className={cn(
          "flex h-fit flex-col rounded-lg border bg-muted p-1",
          isOver && "bg-muted-foreground/15"
        )}
      >
        <div className="flex min-w-64 items-center gap-2 p-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: status.color }}
          />
          <p className="text-sm">{status.name}</p>
          <p className="text-muted-foreground text-xs">{projects.length}</p>
        </div>
        {projects.length > 0 && (
          <div className="relative h-full space-y-0.5">
            {projects.map((project) => (
              <ProjectsKanbanItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
