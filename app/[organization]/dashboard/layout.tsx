import { Suspense } from "react";
import DashboardHeader from "@/components/headers/dashboard-header";
import DashboardSidebar from "@/components/sidebars/dashboard-sidebar";
import DashboardHeaderSkeleton from "@/components/skeletons/dashboard-header-skeleton";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex size-full gap-1 bg-muted p-1 dark:bg-muted/50">
      <DashboardSidebar />
      <div className="flex size-full flex-col gap-1">
        <Suspense fallback={<DashboardHeaderSkeleton />}>
          <DashboardHeader />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
