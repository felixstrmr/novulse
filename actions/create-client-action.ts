"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { authActionClient } from "@/lib/clients/action-client";
import { createClientSchema } from "@/schemas/create-client-schema";

export const createClientAction = authActionClient
  .metadata({
    name: "create-client-action",
  })
  .inputSchema(createClientSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { name, slug, website, image } = parsedInput;
    const { organizationId, organizationSlug } = ctx;

    await db.insert(clients).values({
      name,
      slug,
      website,
      image,
      organizationId,
    });

    revalidateTag(`clients-${organizationSlug}`);
    revalidatePath("/[organization]/dashboard/clients", "layout");
  });
