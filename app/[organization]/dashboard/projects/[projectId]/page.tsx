import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/dashboard/projects/${projectId}/tasks/create"
          >
            Create task
          </Link>
        </div>
      </div>
    </div>
  );
}
