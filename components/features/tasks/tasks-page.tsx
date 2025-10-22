import { getTasks } from "@/queries/task";
import { getSubdomain } from "@/utils/domain";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const tasks = await getTasks(subdomain);

  return (
    <div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
