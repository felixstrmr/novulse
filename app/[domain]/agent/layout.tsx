import { Suspense } from "react";
import AgentSidebar from "@/components/agent/agent-sidebar";
import AgentSidebarSkeleton from "@/components/skeletons/agent-sidebar-skeleton";

export default function AgentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  return (
    <div className="flex size-full">
      <Suspense fallback={<AgentSidebarSkeleton />}>
        <AgentSidebar params={params} />
      </Suspense>

      {children}
    </div>
  );
}
