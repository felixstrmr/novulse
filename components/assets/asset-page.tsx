import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getAsset } from "@/queries/assets/get-asset";
import { getSubdomain } from "@/utils/domain";

export default async function Asset({
  params,
}: {
  params: Promise<{ domain: string; assetId: string }>;
}) {
  const { domain, assetId } = await params;
  const subdomain = getSubdomain(domain);
  const asset = await getAsset(subdomain, assetId);

  if (!asset) {
    notFound();
  }

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-2 p-3">
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
    </div>
  );
}
