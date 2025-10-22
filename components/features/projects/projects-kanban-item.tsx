"use client";

import { useDraggable } from "@dnd-kit/core";
import { CalendarIcon, CalendarX2Icon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import type { Project } from "@/types";
import { formatRelativeTime } from "@/utils/date";
import { cn } from "@/utils/ui";

export default function ProjectsKanbanItem({ project }: { project: Project }) {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.id,
      data: {
        project,
      },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <button
      className={cn(
        "relative flex w-full cursor-pointer flex-col items-start gap-2 rounded-md border bg-background p-3 shadow-xs hover:bg-zinc-50",
        isDragging ? "z-50" : "z-40"
      )}
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <UserIcon className="size-3.5" />
          <span className="text-xs">{project.client.name}</span>
        </div>
        {project.priority && (
          <ProjectPriorityIcon
            className="size-3.5"
            icon={project.priority.icon}
            style={{ color: project.priority.color }}
          />
        )}
      </div>
      <div className="">
        <p className="text-sm">{project.name}</p>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        {project.start_date ? (
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-3.5" />
            <span className="text-xs">
              {formatRelativeTime(project.start_date)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-3.5" />
            <span className="text-muted-foreground text-xs">N/A</span>
          </div>
        )}
        <span>-</span>
        {project.target_date ? (
          <div className="flex items-center gap-1.5">
            <CalendarX2Icon className="size-3.5" />
            <span className="text-xs">
              {formatRelativeTime(project.target_date)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <CalendarX2Icon className="size-3.5" />
            <span className="text-muted-foreground text-xs">N/A</span>
          </div>
        )}
      </div>
    </button>
  );
}
