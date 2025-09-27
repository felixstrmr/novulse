import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  startDate: z.date().optional(),
  targetDate: z.date().optional(),
  priority: z.string().optional(),
  statusId: z.string().min(1),
  clientId: z.string().min(1),
});
