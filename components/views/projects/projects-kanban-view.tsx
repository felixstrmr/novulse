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
import { updateProjectAction } from "@/actions/update-project-action";
import ProjectsKanbanColumn from "@/components/views/projects/projects-kanban-column";
import { PROJECT_STATUSES } from "@/lib/constants";
import type { Project } from "@/types";

type Props = {
  projects: Project[];
};

export default function ProjectsKanbanView({ projects }: Props) {
  const { execute, optimisticState } = useOptimisticAction(
    updateProjectAction,
    {
      currentState: projects,
      updateFn: (state, input) => {
        return state.map((project) => {
          if (project.id === input.id) {
            const newStatus = PROJECT_STATUSES.find(
              (s) => s === input.newStatus
            );
            if (newStatus) {
              return { ...project, status: newStatus };
            }
          }
          return project;
        });
      },
    }
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    // @ts-expect-error - active.data.current is not typed
    if (over && active.data.current.project.status !== over.id) {
      execute({
        id: active.id as string,
        // @ts-expect-error - active.data.current is not typed
        oldStatus: active.data.current.project.status,
        newStatus: over.id as (typeof PROJECT_STATUSES)[number],
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
      <div className="flex size-full gap-2 p-4">
        {PROJECT_STATUSES.map((status) => (
          <ProjectsKanbanColumn
            key={status}
            projects={optimisticState.filter(
              (project) => project.status === status
            )}
            status={status}
          />
        ))}
      </div>
    </DndContext>
  );
}
