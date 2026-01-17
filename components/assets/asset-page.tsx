import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { getAssetRelations } from "@/queries/asset-relations/get-asset-relations";
import { getAsset } from "@/queries/assets/get-asset";
import { getSubdomain } from "@/utils/domain";

export default async function Asset({
  params,
}: {
  params: Promise<{ domain: string; assetId: string }>;
}) {
  const { domain, assetId } = await params;
  const subdomain = getSubdomain(domain);

  const [asset, relations] = await Promise.all([
    getAsset(subdomain, assetId),
    getAssetRelations(subdomain, assetId),
  ]);

  if (!asset) {
    notFound();
  }

  const childRelations = relations.filter(
    (relation) => relation.parent_asset.id === asset.id
  );

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            href="/agent/assets"
          >
            <ArrowLeftIcon />
          </Link>
          <h1 className="flex h-8 items-center font-semibold text-2xl tracking-tight">
            {asset.name}
          </h1>
          <Badge variant="secondary">
            <div
              className="mr-0.5 size-2 rounded-full"
              style={{ backgroundColor: asset.status.color }}
            />
            {asset.status.name}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="secondary">
            <MoreVerticalIcon />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 p-3">
        <div className="col-span-3 rounded-lg bg-zinc-900 p-3">
          <h2>Overview</h2>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <div className="rounded-lg bg-zinc-900 p-3">
            <h2>Quick Actions</h2>
          </div>
          <div className="rounded-lg bg-zinc-900 p-3">
            <h2>Related Assets</h2>
            {childRelations.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {relations.map((relation) => (
                  <div
                    className="group flex cursor-pointer items-center gap-2 rounded-md bg-muted p-3"
                    key={relation.id}
                  >
                    <AssetIcon className="size-4 text-muted-foreground" />
                    <Link
                      className="group-hover:underline"
                      href={`/agent/assets/${relation.child_asset.id}`}
                    >
                      {relation.child_asset.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
