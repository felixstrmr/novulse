import z from "zod";

export const updateProjectSchema = z.object({
  id: z.uuid().min(1, "Project ID is required"),
  status: z.uuid().optional(),
});
