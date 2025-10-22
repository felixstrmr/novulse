import { Spinner } from "@/components/ui/spinner";

export default function TasksPageSkeleton() {
  return (
    <div className="flex size-full items-center justify-center">
      <Spinner />
    </div>
  );
}
