"use client";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useOptimisticAction } from "next-safe-action/hooks";
import { parseAsIsoDate, parseAsString, useQueryStates } from "nuqs";
import { useId, useMemo } from "react";
import { updateTaskAction } from "@/actions/update-task-action";
import TasksListRow from "@/components/features/tasks/tasks-list-row";
import { TasksIcon } from "@/components/icons";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Task, TaskStatus } from "@/types";
import { formatToIsoDate } from "@/utils/date";

function matchesFilters(
  task: Task,
  filters: {
    client: string | null;
    project: string | null;
    targetDate: Date | null;
  }
) {
  if (filters.client && task.project.client !== filters.client) {
    return false;
  }

  if (filters.project && task.project.id !== filters.project) {
    return false;
  }

  if (filters.targetDate) {
    const filterDateString = formatToIsoDate(filters.targetDate);
    const taskDateString = task.target_date
      ? formatToIsoDate(task.target_date)
      : null;
    if (taskDateString !== filterDateString) {
      return false;
    }
  }

  return true;
}

export default function TasksList({
  tasks,
  statuses,
}: {
  tasks: Task[];
  statuses: TaskStatus[];
}) {
  const { execute, optimisticState: optimisticTasks } = useOptimisticAction(
    updateTaskAction,
    {
      currentState: tasks,
      updateFn: (state, input) =>
        state.map((task) => {
          if (task.id === input.id && input.statusId) {
            return {
              ...task,
              status: input.statusId,
            };
          }
          return task;
        }),
    }
  );

  const [filters] = useQueryStates({
    client: parseAsString,
    project: parseAsString,
    targetDate: parseAsIsoDate,
  });

  const filteredTasks = useMemo(() => {
    const hasAnyFilter = Boolean(
      filters.client || filters.project || filters.targetDate
    );

    if (!hasAnyFilter) {
      return optimisticTasks;
    }

    return optimisticTasks.filter((task) => matchesFilters(task, filters));
  }, [optimisticTasks, filters]);

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

  if (filteredTasks.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TasksIcon />
            </EmptyMedia>
            <EmptyTitle>No tasks found</EmptyTitle>
            <EmptyDescription>
              Create a new task to get started
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <DndContext id={id} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex flex-col gap-1.5">
        {statuses.map((status) => (
          <TasksListRow
            key={status.id}
            status={status}
            tasks={filteredTasks.filter((task) => task.status === status.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
