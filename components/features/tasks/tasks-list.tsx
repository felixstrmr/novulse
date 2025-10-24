"use client";

import { parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";
import TasksListRow from "@/components/features/tasks/tasks-list-row";
import type { Task, TaskStatus } from "@/types";

export default function TasksList({
  tasks,
  statuses,
}: {
  tasks: Task[];
  statuses: TaskStatus[];
}) {
  const [filters] = useQueryStates({
    client: parseAsString,
    project: parseAsString,
  });

  const filteredTasks = useMemo(() => {
    const hasClientFilter = Boolean(filters.client);
    const hasProjectFilter = Boolean(filters.project);

    if (!(hasClientFilter || hasProjectFilter)) {
      return tasks;
    }

    return tasks.filter((task) => {
      if (hasClientFilter && hasProjectFilter) {
        return (
          task.project.client === filters.client &&
          task.project.id === filters.project
        );
      }

      if (hasClientFilter) {
        return task.project.client === filters.client;
      }

      if (hasProjectFilter) {
        return task.project.id === filters.project;
      }

      return true;
    });
  }, [tasks, filters]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        {statuses.map((status) => (
          <TasksListRow
            key={status.id}
            status={status}
            tasks={filteredTasks.filter((task) => task.status === status.id)}
          />
        ))}
      </div>
    </div>
  );
}
