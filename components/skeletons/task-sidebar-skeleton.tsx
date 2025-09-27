import { Loader2 } from "lucide-react";

export default function TaskSidebarSkeleton() {
  return (
    <div className="flex min-w-96 max-w-96 items-center justify-center rounded-lg bg-background p-3">
      <Loader2 className="size-4 animate-spin" />
    </div>
  );
}
