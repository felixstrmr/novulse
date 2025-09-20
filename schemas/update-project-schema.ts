import z from "zod";

export const updateProjectSchema = z.object({
  id: z.uuid().min(1),
  oldStatus: z
    .enum(["Not Started", "In Progress", "On Hold", "Completed"])
    .optional(),
  newStatus: z
    .enum(["Not Started", "In Progress", "On Hold", "Completed"])
    .optional(),
});
