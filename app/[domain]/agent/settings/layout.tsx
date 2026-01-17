import { Suspense } from "react";
import SettingsSidebar from "@/components/agent/settings/settings-sidebar";
import SettingsSidebarSkeleton from "@/components/skeletons/settings-sidebar-skeleton";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex bg-background">
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar />
      </Suspense>

      {children}
    </div>
  );
}
