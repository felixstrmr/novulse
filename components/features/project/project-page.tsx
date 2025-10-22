import { notFound } from "next/navigation";
import { getProject } from "@/queries/project";
import { getSubdomain } from "@/utils/domain";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ domain: string; projectId: string }>;
}) {
  const { domain, projectId } = await params;
  const subdomain = getSubdomain(domain);

  const project = await getProject(subdomain, projectId);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </div>
  );
}
