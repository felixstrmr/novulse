import z from "zod";
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from "@/lib/constants";

export const createProjectSchema = z.object({
  clientId: z.uuid().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(PROJECT_STATUSES),
  priority: z.enum(PROJECT_PRIORITIES),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
