import { Suspense } from "react";
import SettingsSidebar from "@/components/layout/workspace/settings-sidebar";
import SettingsSidebarSkeleton from "@/components/layout/workspace/settings-sidebar-skeleton";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-full gap-1">
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar />
      </Suspense>
      <div className="flex size-full rounded-xl bg-background">{children}</div>
    </div>
  );
}
