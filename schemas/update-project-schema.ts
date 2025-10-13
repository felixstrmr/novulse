import z from "zod";

export const updateProjectSchema = z.object({
  id: z.uuid().min(1),
  statusId: z.uuid().optional(),
});
