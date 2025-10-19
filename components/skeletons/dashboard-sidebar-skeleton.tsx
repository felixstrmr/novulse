import { Spinner } from "@/components/ui/spinner";

export default function DashboardSidebarSkeleton() {
  return (
    <aside className="flex min-w-64 max-w-64 items-center justify-center">
      <Spinner />
    </aside>
  );
}
