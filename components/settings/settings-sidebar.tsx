import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function SettingsSidebar({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 rounded-xl border border-border/75 bg-background p-3 shadow-xs">
      <Link
        className={buttonVariants({ variant: "secondary", size: "icon" })}
        href={`/${organizationId}`}
      >
        <ArrowLeftIcon />
      </Link>
    </aside>
  );
}
