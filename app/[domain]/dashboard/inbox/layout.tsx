import type { Metadata } from "next";
import { Suspense } from "react";
import InboxSidebar from "@/components/layout/workspace/inbox-sidebar";
import InboxSidebarSkeleton from "@/components/layout/workspace/inbox-sidebar-skeleton";

export const metadata: Metadata = {
  title: "Novulse • Inbox",
};

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-full gap-1 bg-muted">
      <Suspense fallback={<InboxSidebarSkeleton />}>
        <InboxSidebar />
      </Suspense>
      <div className="flex size-full rounded-xl bg-background">{children}</div>
    </div>
  );
}
