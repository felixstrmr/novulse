import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { TasksIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import TasksView from "@/components/workspace/tasks/tasks-view";
import { extractDomain } from "@/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const domain = extractDomain(workspace);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <TasksIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-2xl tracking-tight">Tasks</h1>
        </div>
        <Button>Create task</Button>
      </div>
      <div className="flex size-full p-3">
        <Suspense
          fallback={
            <div className="flex size-full items-center justify-center">
              <Loader2 className="size-4 animate-spin" />
            </div>
          }
        >
          <TasksView domain={domain} />
        </Suspense>
      </div>
    </div>
  );
}
