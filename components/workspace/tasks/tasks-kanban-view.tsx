"use client";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useOptimisticAction } from "next-safe-action/hooks";
import React from "react";
import { updateTaskAction } from "@/actions/update-task-action";
import TasksKanbanColumn from "@/components/workspace/tasks/tasks-kanban-column";
import type { Task, TaskStatus } from "@/types";

export default function TasksKanbanView({
  tasks,
  taskStatuses,
}: {
  tasks: Task[];
  taskStatuses: TaskStatus[];
}) {
  const { execute, optimisticState: optimisticTasks } = useOptimisticAction(
    updateTaskAction,
    {
      currentState: tasks,
      updateFn: (state, input) =>
        state.map((task) => {
          if (task.id === input.id && input.statusId) {
            return { ...task, statusId: input.statusId };
          }
          return task;
        }),
    }
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over && active.data.current?.task.statusId !== over.id) {
      execute({
        id: active.id as string,
        statusId: over.id as string,
      });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const id = React.useId();

  return (
    <DndContext id={id} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex size-full gap-2 overflow-x-auto">
        {taskStatuses.map((taskStatus) => (
          <TasksKanbanColumn
            key={taskStatus.id}
            taskStatus={taskStatus}
            tasks={optimisticTasks.filter(
              (task) => task.status.id === taskStatus.id
            )}
          />
        ))}
      </div>
    </DndContext>
  );
}
