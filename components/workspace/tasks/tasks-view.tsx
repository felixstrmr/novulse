import Link from "next/link";
import { getTasks } from "@/queries/tasks";

export default async function TasksView({ domain }: { domain: string }) {
  const tasks = await getTasks(domain);

  return (
    <div>
      {tasks.map((task) => (
        <Link href={`/dashboard/tasks/${task.id}/${task.type}`} key={task.id}>
          {task.name}
        </Link>
      ))}
    </div>
  );
}
