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
import ProjectsKanbanColumn from "@/components/workspace/projects/projects-kanban-column";
import type { Project, ProjectStatus } from "@/types";

export default function ProjectsKanbanView({
  projects,
  projectStatuses,
}: {
  projects: Project[];
  projectStatuses: ProjectStatus[];
}) {
  const { execute, optimisticState: optimisticProjects } = useOptimisticAction(
    updateProjectAction,
    {
      currentState: projects,
      updateFn: (state, input) =>
        state.map((project) => {
          if (project.id === input.id && input.statusId) {
            return { ...project, statusId: input.statusId };
          }
          return project;
        }),
    }
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over && active.data.current?.project.statusId !== over.id) {
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
      <div className="flex size-full gap-2">
        {projectStatuses.map((projectStatus) => (
          <ProjectsKanbanColumn
            key={projectStatus.id}
            projectStatus={projectStatus}
            projects={optimisticProjects.filter(
              (project) => project.statusId === projectStatus.id
            )}
          />
        ))}
      </div>
    </DndContext>
  );
}
