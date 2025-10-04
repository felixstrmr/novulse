"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateTaskDialogStore } from "@/stores/use-create-task-dialog-store";
import type { TaskPriority, TaskStatus } from "@/types";

export default function CreateTaskDialog({
  statuses,
  priorities,
}: {
  statuses: TaskStatus[];
  priorities: TaskPriority[];
}) {
  const { isOpen, setOpen } = useCreateTaskDialogStore();

  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Create task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle />
      </DialogContent>
    </Dialog>
  );
}
