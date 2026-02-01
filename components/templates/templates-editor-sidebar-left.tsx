import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import TemplatesEditorLayers from "@/components/templates/templates-editor-layers";
import { buttonVariants } from "@/components/ui/button";

export default function TemplatesEditorSidebarLeft({
  organizationId,
}: {
  organizationId: string;
}) {
  return (
    <aside className="flex min-w-64 max-w-64 flex-col gap-3 rounded-xl border border-border/75 bg-background p-3 shadow-xs">
      <div className="flex items-center gap-2">
        <Link
          className={buttonVariants({ variant: "secondary", size: "icon" })}
          href={`/${organizationId}/templates`}
        >
          <ArrowLeftIcon />
        </Link>
        <h1 className="font-semibold text-xl tracking-tight">Untitled</h1>
      </div>
      <TemplatesEditorLayers />
    </aside>
  );
}
