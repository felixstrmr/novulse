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
      type,
      manufacturer,
      model,
      status,
      location,
      assigned_to,
    } = parsedInput;
    const { supabase, domain, workspace } = ctx;

    const id = crypto.randomUUID();

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
