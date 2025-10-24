import { Suspense } from "react";
import SettingsSidebar from "@/components/layout/settings-sidebar";
import SettingsSidebarSkeleton from "@/components/skeletons/settings-sidebar-skeleton";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex size-full gap-1 bg-muted p-1">
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar />
      </Suspense>
      {children}
    </div>
  );
}
