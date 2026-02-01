import { Suspense } from "react";
import SettingsSidebar from "@/components/settings/settings-sidebar";
import SettingsSidebarSkeleton from "@/components/skeletons/settings-sidebar-skeleton";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}) {
  return (
    <div className="fixed inset-0 flex size-full bg-muted p-1">
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar params={params} />
      </Suspense>

      {children}
    </div>
  );
}
