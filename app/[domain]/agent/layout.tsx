import { Suspense } from "react";
import AgentSidebar from "@/components/agent/agent-sidebar";
import AgentTopbar from "@/components/agent/agent-topbar";
import AgentSidebarSkeleton from "@/components/skeletons/agent-sidebar-skeleton";
import AgentTopbarSkeleton from "@/components/skeletons/agent-topbar-skeleton";

export default function AgentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  return (
    <main className="h-screen w-screen">
      <div className="flex size-full">
        <Suspense fallback={<AgentSidebarSkeleton />}>
          <AgentSidebar params={params} />
        </Suspense>

        <div className="flex size-full flex-col">
          <Suspense fallback={<AgentTopbarSkeleton />}>
            <AgentTopbar />
          </Suspense>

          {children}
        </div>
      </div>
    </main>
  );
}
