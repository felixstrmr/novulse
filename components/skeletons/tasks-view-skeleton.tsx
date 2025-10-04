import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function TasksViewSkeleton() {
  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <Skeleton className="h-[24px] w-[45.67px]" />
        <Skeleton className="h-8 w-[97.03px]" />
      </div>
      <div className="flex size-full items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}
