"use client";

import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";
import TasksKanbanItem from "@/components/tasks/tasks-kanban-item";
import { Button } from "@/components/ui/button";
import type { Task, TaskStatus } from "@/types";

export default function TasksKanbanColumn({
  taskStatus,
  tasks,
  setStatusId,
  setOpen,
}: {
  taskStatus: TaskStatus;
  tasks: Task[];
  setStatusId: (statusId: string) => void;
  setOpen: (open: boolean) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: taskStatus.id,
    data: {
      taskStatus,
    },
  });

  return (
    <div className="flex h-full flex-col" ref={setNodeRef}>
      <div className="flex min-w-64 items-center gap-2 pb-1.5">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: taskStatus.color }}
        />
        <p className="text-sm">{taskStatus.name}</p>
        <p className="text-muted-foreground text-xs">{tasks.length}</p>
      </div>
      <div className="relative h-full space-y-1 rounded-lg p-1">
        {tasks.map((task) => (
          <TasksKanbanItem key={task.id} task={task} />
        ))}
        {isOver && <div className="absolute h-1 w-64 rounded-lg bg-muted" />}
        <Button
          className="w-64"
          onClick={() => {
            setStatusId(taskStatus.id);
            setOpen(true);
          }}
          variant="outline"
        >
          <PlusIcon className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Create task</span>
        </Button>
      </div>
    </div>
  );
}
