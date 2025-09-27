import CreateProjectForm from "@/components/forms/create-project-form";
import { getClients } from "@/queries/clients";
import { getProjectStatuses } from "@/queries/project-statuses";
import { extractDomain } from "@/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const domain = extractDomain(workspace);

  const [clients, projectStatuses] = await Promise.all([
    getClients(domain),
    getProjectStatuses(domain),
  ]);

  return (
    <div className="mx-auto w-full max-w-xl py-16">
      <h1>Create project</h1>
      <CreateProjectForm clients={clients} projectStatuses={projectStatuses} />
    </div>
  );
}
