import ProjectStatusesEditor from "@/components/features/settings-statuses/project-statuses-editor";
import TaskStatusesEditor from "@/components/features/settings-statuses/task-statuses-editor";
import { getProjectStatuses } from "@/queries/project-statuses";
import { getTaskStatuses } from "@/queries/task-statuses";
import { getUniqueDomain } from "@/utils/domain";

export default async function SettingsStatusePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const uniqueDomain = getUniqueDomain(domain);

  const [projectStatuses, taskStatuses] = await Promise.all([
    getProjectStatuses(uniqueDomain),
    getTaskStatuses(uniqueDomain),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-lg tracking-tight">Statuses</h1>
      <ProjectStatusesEditor statuses={projectStatuses} />
      <TaskStatusesEditor statuses={taskStatuses} />
    </div>
  );
}
