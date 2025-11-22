import z from "zod";

export const addClientSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  is_active: z.boolean(),
});
