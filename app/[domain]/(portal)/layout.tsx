import { Suspense } from "react";
import PortalTopbar from "@/components/portal/portal-topbar";
import PortalTopbarSkeleton from "@/components/skeletons/portal-topbar-skeleton";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen">
      <div className="flex size-full flex-col">
        <Suspense fallback={<PortalTopbarSkeleton />}>
          <PortalTopbar />
        </Suspense>

        {children}
      </div>
    </main>
  );
}
