import Link from "next/link";

export default function TaskSidebar() {
  return (
    <aside className="w-96 min-w-96 max-w-96 rounded-lg bg-background p-3">
      <Link href="/dashboard/tasks">Back</Link>
    </aside>
  );
}
