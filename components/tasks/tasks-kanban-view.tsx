"use client";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useOptimisticAction } from "next-safe-action/hooks";
import { useId } from "react";
import { updateTaskAction } from "@/actions/update-task-action";
import TasksKanbanColumn from "@/components/tasks/tasks-kanban-column";
import { useCreateTaskDialogStore } from "@/stores/use-create-task-dialog-store";
import type { Task, TaskStatus } from "@/types";

export default function TasksKanbanView({
  tasks,
  statuses,
}: {
  tasks: Task[];
  statuses: TaskStatus[];
}) {
  const { setStatusId, setOpen } = useCreateTaskDialogStore();

  const { execute, optimisticState: optimisticTasks } = useOptimisticAction(
    updateTaskAction,
    {
      currentState: tasks,
      updateFn: (state, input) =>
        state.map((task) => {
          if (task.status && input.statusId) {
            return {
              ...task,
              status: input.statusId,
            };
          }
          return task;
        }),
    }
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over && active.data.current?.task.status !== over.id) {
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

  const id = useId();

  return (
    <DndContext id={id} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex size-full gap-2 overflow-x-auto">
        {statuses.map((status) => (
          <TasksKanbanColumn
            key={status.id}
            setOpen={setOpen}
            setStatusId={setStatusId}
            taskStatus={status}
            tasks={optimisticTasks.filter((task) => task.status === status.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
