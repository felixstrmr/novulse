import TemplatesEditorCanvas from "@/components/templates/templates-editor-canvas";
import TemplatesEditorMenubar from "@/components/templates/templates-editor-menubar";
import TemplatesEditorSidebarLeft from "@/components/templates/templates-editor-sidebar-left";
import TemplatesEditorSidebarRight from "@/components/templates/templates-editor-sidebar-right";

export default async function TemplatesEditor({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  return (
    <div className="fixed inset-0 flex size-full gap-1 bg-muted p-1">
      <TemplatesEditorMenubar />

      <TemplatesEditorSidebarLeft organizationId={organizationId} />
      <TemplatesEditorCanvas />
      <TemplatesEditorSidebarRight />
    </div>
  );
}
