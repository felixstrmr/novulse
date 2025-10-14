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
import { updateProjectAction } from "@/actions/update-project-action";
import KanbanColumn from "@/components/_pages/projects/kanban/column";
import type { Project, ProjectStatus } from "@/types";

export default function Kanban({
  projects,
  statuses,
}: {
  projects: Project[];
  statuses: ProjectStatus[];
}) {
  const { execute, optimisticState: optimisticProjects } = useOptimisticAction(
    updateProjectAction,
    {
      currentState: projects,
      updateFn: (state, input) =>
        state.map((project) => {
          if (project.id === input.id && input.statusId) {
            return {
              ...project,
              status: input.statusId,
            };
          }
          return project;
        }),
    }
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over && active.data.current?.project.status !== over.id) {
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
      <div className="flex size-full gap-3 overflow-x-auto">
        {statuses.map((status) => (
          <KanbanColumn
            key={status.id}
            projects={optimisticProjects.filter(
              (project) => project.status === status.id
            )}
            status={status}
          />
        ))}
      </div>
    </DndContext>
  );
}
