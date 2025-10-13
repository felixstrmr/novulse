import { useDraggable } from "@dnd-kit/core";
import { CalendarIcon, CalendarX2Icon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectPriorityIcon from "@/components/icons/dynamic/project-priority-icon";
import { formatRelativeTime } from "@/utils/date";

export default function KanbanItem({ project }: { project: any }) {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
      className="flex w-full min-w-64 max-w-64 cursor-pointer flex-col items-start rounded-md border bg-background shadow-xs"
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex w-full items-center justify-between p-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <UserIcon className="size-3.5" />
          <p className="text-xs">{project.client.name}</p>
        </div>
        {project.priority && (
          <ProjectPriorityIcon
            className="size-3.5"
            icon={project.priority?.icon}
            style={{ color: project.priority?.color }}
          />
        )}
      </div>
      <div className="px-3">
        <p className="text-sm">{project.name}</p>
      </div>
      <div className="flex items-center gap-1.5 p-3">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          <p className="text-xs">{formatRelativeTime(project.start_date)}</p>
        </div>
        <p className="text-muted-foreground text-xs">-</p>
        <div className="flex items-center gap-1.5">
          <CalendarX2Icon className="size-3.5 text-muted-foreground" />
          <p className="text-xs">{formatRelativeTime(project.target_date)}</p>
        </div>
      </div>
    </button>
  );
}
