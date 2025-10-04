import { Suspense } from "react";
import AppView from "@/components/app/app-view";
import AppViewSkeleton from "@/components/skeletons/app-view-skeleton";

export default function Page() {
  return (
    <div className="mx-auto flex size-full max-w-5xl flex-col py-12">
      <div className="pb-6">
        <h1 className="font-semibold text-2xl tracking-tight">Workspaces</h1>
      </div>
      <Suspense fallback={<AppViewSkeleton />}>
        <AppView />
      </Suspense>
    </div>
  );
}
