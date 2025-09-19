import z from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  website: z.string().optional(),
  image: z.string().optional(),
});
