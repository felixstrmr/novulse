"use client";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useOptimisticAction } from "next-safe-action/hooks";
import { parseAsString, useQueryStates } from "nuqs";
import { useId, useMemo } from "react";
import { updateProjectAction } from "@/actions/update-project-action";
import ProjectsKanbanColumn from "@/components/features/projects/projects-kanban-column";
import { ProjectsIcon } from "@/components/icons";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Project, ProjectStatus } from "@/types";

export default function ProjectsKanban({
  statuses,
  projects,
}: {
  statuses: ProjectStatus[];
  projects: Project[];
}) {
  const [filters] = useQueryStates({
    client: parseAsString,
  });

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) => project.client.id === filters.client || !filters.client
      ),
    [projects, filters.client]
  );

  const { execute, optimisticState: optimisticProjects } = useOptimisticAction(
    updateProjectAction,
    {
      currentState: filteredProjects,
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

  if (filteredProjects.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ProjectsIcon />
            </EmptyMedia>
            <EmptyTitle>No projects found</EmptyTitle>
            <EmptyDescription>
              Create a new project to get started
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <DndContext id={id} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex size-full gap-1.5 overflow-x-auto">
        {statuses.map((status) => (
          <ProjectsKanbanColumn
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
