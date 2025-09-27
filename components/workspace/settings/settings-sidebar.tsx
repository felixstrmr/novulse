import Link from "next/link";

export default function SettingsSidebar() {
  return (
    <aside className="w-64 min-w-64 max-w-64 rounded-lg bg-background p-3">
      <Link href="/dashboard">Back</Link>
    </aside>
  );
}
