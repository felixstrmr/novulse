"use client";

import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";
import KanbanItem from "@/components/_pages/projects/kanban/item";
import ProjectStatusIcon from "@/components/icons/dynamic/project-status-icon";
import { cn } from "@/utils/ui";

export default function KanbanColumn({
  status,
  projects,
}: {
  status: any;
  projects: any[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id,
    data: {
      status,
    },
  });

  return (
    <div
      className={cn(
        "flex h-fit flex-col rounded-lg px-0.5 pb-0.5",
        isOver ? "bg-foreground/10" : "bg-muted"
      )}
      ref={setNodeRef}
    >
      <div className="flex h-8 min-w-64 items-center gap-2 pr-0.5 pl-1.5">
        <ProjectStatusIcon
          className="size-3.5"
          icon={status.icon}
          style={{ color: status.color }}
        />
        <p className="text-sm">{status.name}</p>
        <p className="-mb-0.5 text-muted-foreground text-xs">
          {projects.length}
        </p>
        <button
          className="ml-auto flex size-6 cursor-pointer items-center justify-center rounded-sm hover:bg-foreground/10"
          type="button"
        >
          <PlusIcon className="size-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-1">
        {projects.map((project) => (
          <KanbanItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
