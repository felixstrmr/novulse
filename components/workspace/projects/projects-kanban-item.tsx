"use client";

import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";
import type { Project } from "@/types";

export default function ProjectsKanbanItem({ project }: { project: Project }) {
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
      className="flex w-full rounded-md border border-input bg-background p-3 shadow-xs"
      href={`/dashboard/projects/${project.id}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {project.name}
    </Link>
  );
}
