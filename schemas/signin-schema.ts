import z from "zod";

export const signinSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password is required"),
});
