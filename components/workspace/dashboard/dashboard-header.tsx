import DashboardHeaderBreadcrumb from "@/components/workspace/dashboard/dashboard-header-breadcrumb";

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background p-3">
      <DashboardHeaderBreadcrumb />
      <div className="size-8 rounded-md bg-primary" />
    </div>
  );
}
