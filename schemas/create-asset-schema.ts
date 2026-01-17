import z from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.uuid().min(1, "Category is required"),
  manufacturer: z.uuid().min(1, "Manufacturer is required"),
  model: z.uuid().min(1, "Model is required"),
  status: z.uuid().min(1, "Status is required"),
  location: z.uuid().optional(),
  assigned_to: z.uuid().optional(),
});
