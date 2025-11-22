import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ProjectStatus } from "@/types";

export default function ProjectStatusesItem({
  status,
  onUpdate,
  onDelete,
  isEditing,
  onEditStart,
  onEditEnd,
}: {
  status: ProjectStatus;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  onEditStart: (id: string) => void;
  onEditEnd: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: status.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [editValue, setEditValue] = useState(status.name);

  useEffect(() => {
    if (isEditing) {
      setEditValue(status.name);
    }
  }, [isEditing, status.name]);

  const handleSave = useCallback(() => {
    if (editValue.trim() && editValue !== status.name) {
      onUpdate(status.id, editValue.trim());
    } else {
      setEditValue(status.name);
    }
    onEditEnd();
  }, [editValue, status.name, status.id, onUpdate, onEditEnd]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        setEditValue(status.name);
        onEditEnd();
      }
    },
    [handleSave, status.name, onEditEnd]
  );

  return (
    <div
      className="flex items-center gap-2 border-b bg-background p-2.5 first:rounded-t-md last:rounded-b-md last:border-b-0"
      ref={setNodeRef}
      style={style}
    >
      <button
        {...attributes}
        {...listeners}
        className="flex size-7 cursor-grab items-center justify-center rounded-md hover:bg-muted active:cursor-grabbing"
        type="button"
      >
        <GripVerticalIcon className="size-3.5 text-muted-foreground" />
      </button>
      {isEditing ? (
        <input
          autoFocus
          className="h-7 flex-1 text-sm focus:outline-none"
          onBlur={handleSave}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={editValue}
        />
      ) : (
        <button
          className="flex-1 cursor-pointer text-left text-sm"
          onClick={() => onEditStart(status.id)}
          type="button"
        >
          {status.name}
        </button>
      )}
      <Button
        className="text-destructive hover:text-destructive"
        onClick={() => onDelete(status.id)}
        size="icon-sm"
        variant="ghost"
      >
        <Trash2Icon className="size-3.5" />
      </Button>
    </div>
  );
}
