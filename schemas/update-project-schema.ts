import z from "zod";

export const updateProjectSchema = z.object({
  id: z.uuid().min(1),
  status: z
    .enum(["Not Started", "In Progress", "On Hold", "Completed"])
    .optional(),
});
