import z from "zod";

export const upsertTaskStatusesSchema = z.object({
  statuses: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      icon: z.string(),
      color: z.string(),
      order: z.number(),
      is_default: z.boolean(),
    })
  ),
});
