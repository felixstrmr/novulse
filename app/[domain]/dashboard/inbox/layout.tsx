import { Suspense } from "react";
import InboxSidebar from "@/components/layout/inbox-sidebar";
import InboxSidebarSkeleton from "@/components/skeletons/inbox-sidebar-skeleton";

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-full gap-1">
      <Suspense fallback={<InboxSidebarSkeleton />}>
        <InboxSidebar />
      </Suspense>
      {children}
    </div>
  );
}
