import z from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  statusId: z.uuid().min(1, "Status is required"),
  description: z.string().optional(),
  targetDate: z.string().optional(),
  clientId: z.uuid().optional(),
  projectId: z.uuid().optional(),
  priority: z.uuid().optional(),
});
