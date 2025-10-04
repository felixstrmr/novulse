import { Spinner } from "@/components/ui/spinner";

export default function DashboardSidebarSkeleton() {
  return (
    <div className="flex min-w-64 max-w-64 items-center justify-center rounded-lg bg-background">
      <Spinner />
    </div>
  );
}
