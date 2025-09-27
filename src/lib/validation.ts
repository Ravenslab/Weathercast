import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, "Invalid phone number. Must start with 09 and be 11 digits."),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
