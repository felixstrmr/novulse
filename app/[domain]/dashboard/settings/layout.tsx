import type { Metadata } from "next";
import { Suspense } from "react";
import SettingsSidebar from "@/components/layout/workspace/settings-sidebar";
import SettingsSidebarSkeleton from "@/components/layout/workspace/settings-sidebar-skeleton";

export const metadata: Metadata = {
  title: "Novulse • Settings",
};

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  return (
    <div className="flex size-full gap-1">
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar params={params} />
      </Suspense>
      <div className="flex size-full rounded-xl bg-background">
        <div className="mx-auto w-full max-w-5xl py-12">{children}</div>
      </div>
    </div>
  );
}
