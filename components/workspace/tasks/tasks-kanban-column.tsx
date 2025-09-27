"use client";

import { useDroppable } from "@dnd-kit/core";
import TasksKanbanItem from "@/components/workspace/tasks/tasks-kanban-item";
import type { Task, TaskStatus } from "@/types";
import { cn } from "@/utils";

export default function TasksKanbanColumn({
  taskStatus,
  tasks,
}: {
  taskStatus: TaskStatus;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: taskStatus.id,
    data: {
      taskStatus,
    },
  });

  return (
    <div className="flex h-full flex-col" ref={setNodeRef}>
      <div className="flex min-w-64 items-center gap-2 py-1.5">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: taskStatus.color }}
        />
        <p className="text-sm">{taskStatus.name}</p>
        <p className="text-muted-foreground text-xs">{tasks.length}</p>
      </div>
      <div
        className={cn(
          "h-full space-y-1 rounded-lg bg-muted/50 p-1",
          isOver && "bg-muted"
        )}
      >
        {tasks.map((task) => (
          <TasksKanbanItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
