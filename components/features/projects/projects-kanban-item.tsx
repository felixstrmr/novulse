"use client";

import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";
import { cn } from "@/utils/ui";

export default function ProjectsKanbanItem({ project }: { project: Project }) {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
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
    <button
      className={cn(
        "relative flex w-full cursor-pointer flex-col items-start gap-3 rounded-md border bg-background p-3 shadow-xs hover:bg-zinc-50",
        isDragging ? "z-50" : "z-40"
      )}
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p className="text-sm">{project.name}</p>
    </button>
  );
}
