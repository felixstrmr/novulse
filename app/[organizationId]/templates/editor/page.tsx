import { Suspense } from "react";
import TemplatesEditorPageSkeleton from "@/components/skeletons/create-template-page-skeleton";
import TemplatesEditor from "@/components/templates/templates-editor-page";

export default function TemplatesEditorPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  return (
    <Suspense fallback={<TemplatesEditorPageSkeleton />}>
      <TemplatesEditor params={params} />
    </Suspense>
  );
}
