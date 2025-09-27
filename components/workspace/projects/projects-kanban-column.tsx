"use client";

import { useDroppable } from "@dnd-kit/core";
import ProjectsKanbanItem from "@/components/workspace/projects/projects-kanban-item";
import type { Project, ProjectStatus } from "@/types";
import { cn } from "@/utils";

export default function ProjectsKanbanColumn({
  projectStatus,
  projects,
}: {
  projectStatus: ProjectStatus;
  projects: Project[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: projectStatus.id,
    data: {
      projectStatus,
    },
  });

  return (
    <div className="flex h-full flex-col" ref={setNodeRef}>
      <div className="flex min-w-64 items-center gap-2 py-1.5">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: projectStatus.color }}
        />
        <p className="text-sm">{projectStatus.name}</p>
        <p className="text-muted-foreground text-xs">{projects.length}</p>
      </div>
      <div
        className={cn(
          "h-full rounded-lg bg-muted/50 p-1",
          isOver && "bg-muted"
        )}
      >
        {projects.map((project) => (
          <ProjectsKanbanItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
