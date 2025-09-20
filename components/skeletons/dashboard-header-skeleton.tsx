import { DashboardIcon } from "@/components/icons/dashboard-icon";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background px-4 py-2">
      <DashboardIcon className="size-3.5" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-7 w-[80.14px] rounded-md" />
        <Skeleton className="size-7 rounded-md" />
        <Skeleton className="size-7 rounded-md" />
      </div>
    </div>
  );
}
