import CreateTaskDialog from "@/components/dialogs/create-task-dialog";
import { Badge } from "@/components/ui/badge";
import { getTasksByProjectId } from "@/queries/tasks";

type Props = {
  params: Promise<{ organization: string; projectId: string }>;
};

export default async function Page({ params }: Props) {
  const { organization, projectId } = await params;

  const tasks = await getTasksByProjectId(organization, projectId);

  return (
    <div className="size-full rounded-lg bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl tracking-tight">Tasks</h1>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
        <div>
          <CreateTaskDialog />
        </div>
      </div>
    </div>
  );
}
