import Link from "next/link";
import { AssetsTable } from "@/components/assets/assets-table";
import { columns } from "@/components/assets/assets-table-columns";
import { buttonVariants } from "@/components/ui/button";
import { getAssets } from "@/queries/assets/get-assets";
import { getSubdomain } from "@/utils/domain";

export default async function Assets({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);
  const assets = await getAssets(subdomain);

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between p-3">
        <h1 className="font-semibold text-2xl tracking-tight">Assets</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/agent/assets/create"
        >
          Create asset
        </Link>
      </div>
      <AssetsTable columns={columns} data={assets} />
    </div>
  );
}
