import { Loader2 } from "lucide-react";

export default function DashboardSidebarSkeleton() {
  return (
    <div className="flex w-64 min-w-64 max-w-64 items-center justify-center rounded-lg bg-background p-3">
      <Loader2 className="size-4 animate-spin" />
    </div>
  );
}
