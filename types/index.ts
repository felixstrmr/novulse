import type { getAssetCategories } from "@/queries/asset-categories/get-asset-categories";
import type { getAssetLocations } from "@/queries/asset-locations/get-asset-location";
import type { getAssetManufacturers } from "@/queries/asset-manufacturers/get-asset-manufacturers";
import type { getAssetModels } from "@/queries/asset-models/get-asset-models";
import type { getAssetRelations } from "@/queries/asset-relations/get-asset-relations";
import type { getAssetStatuses } from "@/queries/asset-statuses/get-asset-statuses";
import type { getWorkspaceUsers } from "@/queries/workspace-users/get-workspace-users";
import type { Database, Json } from "@/types/supabase";

export interface Workspace {
  id: string;
  domain: string;
  name: string;
  settings: Json;
}

export type WorkspaceUser = Awaited<
  ReturnType<typeof getWorkspaceUsers>
>[number];

export interface Asset {
  assigned_to: string | null;
  category: string & {
    id: string;
    name: string;
  };
  created_at: string;
  description: string | null;
  id: string;
  manufacturer:
    | (string & {
        id: string;
        name: string;
      })
    | null;
  model:
    | (string & {
        id: string;
        name: string;
      })
    | null;
  name: string;
  status: string & {
    id: string;
    color: string;
    name: string;
  };
  type: Database["public"]["Enums"]["asset_types"];
  workspace: string & {
    domain: string;
  };
}

export type AssetCategory = Awaited<
  ReturnType<typeof getAssetCategories>
>[number];

export type AssetManufacturer = Awaited<
  ReturnType<typeof getAssetManufacturers>
>[number];

export type AssetLocation = Awaited<
  ReturnType<typeof getAssetLocations>
>[number];

export type AssetRelation = Awaited<
  ReturnType<typeof getAssetRelations>
>[number];

export type AssetModel = Awaited<ReturnType<typeof getAssetModels>>[number];

export type AssetStatus = Awaited<ReturnType<typeof getAssetStatuses>>[number];
