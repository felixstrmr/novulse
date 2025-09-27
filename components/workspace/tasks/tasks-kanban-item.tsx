"use client";

import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";
import type { Task } from "@/types";

export default function TasksKanbanItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
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
      href={`/dashboard/tasks/${task.id}/${task.type}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.name}
    </Link>
  );
}
