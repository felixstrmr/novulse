"use client";

import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import type { Task } from "@/types";

export default function TasksKanbanItem({ task }: { task: Task }) {
  const router = useRouter();

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
    <button
      className="flex w-full cursor-pointer rounded-md border bg-background p-3 shadow-xs"
      onClick={() => router.push(`/dashboard/tasks/${task.id}/${task.type}`)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.name}
    </button>
  );
}
