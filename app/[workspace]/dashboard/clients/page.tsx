import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { ClientsIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ClientsView from "@/components/workspace/clients/clients-view";
import { extractDomain } from "@/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const domain = extractDomain(workspace);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <ClientsIcon className="size-4 text-muted-foreground" />
          <h1 className="font-semibold text-2xl tracking-tight">Clients</h1>
        </div>
        <Button>Create client</Button>
      </div>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        }
      >
        <ClientsView domain={domain} />
      </Suspense>
    </div>
  );
}
