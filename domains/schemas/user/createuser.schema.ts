import { z } from "zod";
import { UserRole } from "@/domains/models/user";

export const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[0-9]+$/, { 
      message: "Phone number must contain only digits" 
    })
    .regex(/^0\d{9}$/, {
      message: "Phone number must start with 0 and be exactly 10 digits"
    })
    .transform((val) => parseInt(val)), // Convert to number after validation
  address: z.string().default(""),
  dateOfBirth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : new Date()),
    z.date()
  ),

  role: z.nativeEnum(UserRole, {
    required_error: "Please select a role.",
  }),
});

export type UserPayload = z.infer<typeof userFormSchema>;