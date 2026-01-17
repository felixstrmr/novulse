"use server";

import { updateTag } from "next/cache";
import { authActionClient } from "@/lib/clients/action-client";
import { createAssetSchema } from "@/schemas/create-asset-schema";

export const createAssetAction = authActionClient
  .metadata({ name: "createAssetAction" })
  .inputSchema(createAssetSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      name,
      description,
      category,
      manufacturer,
      model,
      status,
      location,
      assigned_to,
    } = parsedInput;
    const { supabase, domain, workspace } = ctx;

    const { data } = await supabase
      .from("asset_categories")
      .select("*")
      .eq("id", category)
      .single()
      .throwOnError();

    if (!data) {
      throw new Error("Asset category not found");
    }

    const id = crypto.randomUUID();
    const type = data.type;

    await supabase
      .from("assets")
      .insert({
        id,
        name,
        description,
        category,
        type,
        manufacturer,
        model,
        status,
        workspace,
        location,
        assigned_to,
      })
      .throwOnError();

    updateTag(`assets:${domain}`);

    return { id };
  });
