import { ListTodoIcon, Loader2 } from "lucide-react";
import { Suspense } from "react";
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
      <div className="border-b p-3">
        <div className="flex items-center gap-2">
          <ListTodoIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-2xl tracking-tight">Tasks</h1>
        </div>
      </div>
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
  );
}
