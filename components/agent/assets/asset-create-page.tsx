import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import CreateAssetForm from "@/components/forms/create-asset-form";
import { getAssetCategories } from "@/queries/asset-categories/get-asset-categories";
import { getAssetLocations } from "@/queries/asset-locations/get-asset-location";
import { getAssetManufacturers } from "@/queries/asset-manufacturers/get-asset-manufacturers";
import { getAssetModels } from "@/queries/asset-models/get-asset-models";
import { getAssetStatuses } from "@/queries/asset-statuses/get-asset-statuses";
import { getSubdomain } from "@/utils/domain";

export default async function AssetCreate({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const subdomain = getSubdomain(domain);

  const [categories, manufacturers, models, statuses, locations] =
    await Promise.all([
      getAssetCategories(subdomain),
      getAssetManufacturers(subdomain),
      getAssetModels(subdomain),
      getAssetStatuses(subdomain),
      getAssetLocations(subdomain),
    ]);

  return (
    <div className="mx-auto w-full max-w-2xl py-12">
      <Link
        className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        href="/agent/assets"
      >
        <ArrowLeftIcon className="size-4" />
        <span className="text-sm">Back</span>
      </Link>
      <div className="mt-6 space-y-6">
        <h1 className="font-semibold text-2xl tracking-tight">Create asset</h1>
        <CreateAssetForm
          categories={categories}
          locations={locations}
          manufacturers={manufacturers}
          models={models}
          statuses={statuses}
        />
      </div>
    </div>
  );
}
