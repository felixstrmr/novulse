"use client";

import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import type { Project } from "@/types";

export default function ProjectsKanbanItem({ project }: { project: Project }) {
  const router = useRouter();

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
    <button
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
      ref={setNodeRef}
      style={style}
      type="button"
      {...attributes}
      {...listeners}
      className="flex min-w-64 max-w-64 cursor-pointer flex-col items-start truncate rounded-md border bg-background p-3 shadow-xs"
    >
      {project.name}
    </button>
  );
}
