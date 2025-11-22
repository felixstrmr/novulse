"use client";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useId, useState } from "react";
import { toast } from "sonner";
import { upsertTaskStatusesAction } from "@/actions/upsert-task-statuses-action";
import TaskStatusesItem from "@/components/features/settings-statuses/task-statuses-item";
import { Button } from "@/components/ui/button";
import type { TaskStatus } from "@/types";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r % 4) + 8;
    return v.toString(16);
  });
}

export default function TaskStatusesEditor({
  statuses: initialStatuses,
}: {
  statuses: TaskStatus[];
}) {
  const router = useRouter();
  const [statuses, setStatuses] = useState<TaskStatus[]>(initialStatuses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { execute, isExecuting } = useAction(upsertTaskStatusesAction, {
    onExecute: () => {
      toast.loading("Saving statuses...", {
        id: "save-statuses",
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: "save-statuses",
      });
    },
    onSuccess: () => {
      toast.success("Statuses saved successfully", {
        id: "save-statuses",
      });
      setHasChanges(false);
      router.refresh();
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setStatuses((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex).map(
          (item, index) => ({
            ...item,
            order: index,
          })
        );

        setHasChanges(true);
        return newItems;
      });
    }
  };

  const handleUpdate = (itemId: string, name: string) => {
    setStatuses((items) => {
      const updated = items.map((item) =>
        item.id === itemId ? { ...item, name } : item
      );
      setHasChanges(true);
      return updated;
    });
  };

  const handleDelete = (itemId: string) => {
    setStatuses((items) => {
      const filtered = items.filter((item) => item.id !== itemId);
      const reordered = filtered.map((item, index) => ({
        ...item,
        order: index,
      }));
      setHasChanges(true);
      return reordered;
    });
  };

  const handleAdd = () => {
    const newStatus: TaskStatus = {
      id: generateUUID(),
      name: "New Status",
      icon: "circle",
      color: "#6b7280",
      order: statuses.length,
      is_default: false,
    } as unknown as TaskStatus;

    setStatuses((items) => [...items, newStatus]);
    setEditingId(newStatus.id);
    setHasChanges(true);
  };

  const handleSave = () => {
    execute({
      statuses: statuses.map((status) => ({
        id: status.id,
        name: status.name,
        icon: status.icon,
        color: status.color,
        order: status.order,
        is_default: status.is_default,
      })),
    });
  };

  const id = useId();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col rounded-lg bg-muted p-0.5">
        <div className="flex items-center justify-between p-2.5">
          <h2 className="font-semibold tracking-tight">Task statuses</h2>
          <div className="flex items-center gap-1.5">
            <Button
              disabled={isExecuting}
              onClick={handleAdd}
              size="sm"
              variant="outline"
            >
              Add
            </Button>
            {hasChanges && (
              <Button
                isLoading={isExecuting}
                onClick={handleSave}
                size="sm"
                variant="default"
              >
                Save
              </Button>
            )}
          </div>
        </div>
        <DndContext id={id} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext
            items={statuses.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="rounded-md border">
              {statuses.map((status) => (
                <TaskStatusesItem
                  isEditing={editingId === status.id}
                  key={status.id}
                  onDelete={handleDelete}
                  onEditEnd={() => setEditingId(null)}
                  onEditStart={setEditingId}
                  onUpdate={handleUpdate}
                  status={status}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
