import { notFound } from "next/navigation";
import { getProject } from "@/queries/projects";

export default async function ProjectHeader({
  subdomain,
  projectId,
}: {
  subdomain: string;
  projectId: string;
}) {
  const project = await getProject(subdomain, projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex items-center border-b p-3">
      <h1 className="font-semibold text-2xl tracking-tight">{project.name}</h1>
    </div>
  );
}
