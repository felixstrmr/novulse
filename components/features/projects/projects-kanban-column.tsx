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
    <div className="h-full" ref={setNodeRef}>
      <div
        className={cn("rounded-lg p-0.5", isOver ? "bg-zinc-200" : "bg-muted")}
      >
        <div>
          <div className="flex items-center gap-2 p-1.5">
            <p className="text-muted-foreground text-sm">{status.name}</p>
            <p className="text-muted-foreground text-xs">{projects.length}</p>
          </div>
          {projects.length > 0 ? (
            <div className="space-y-1">
              {projects.map((project) => (
                <ProjectsKanbanItem key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="min-w-64 max-w-64" />
          )}
        </div>
      </div>
    </div>
  );
}
