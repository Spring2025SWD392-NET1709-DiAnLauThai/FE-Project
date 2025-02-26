import { z } from "zod";
import { UserRole, UserStatus } from "@/domains/models/user";

export const userFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[0-9]+$/, {
      message: "Phone number must contain only digits",
    })
    .regex(/^0\d{9}$/, {
      message: "Phone number must start with 0 and be exactly 10 digits",
    }),
  address: z.string().default(""),
  dateOfBirth: z.preprocess(
    (val) => (val ? new Date(val) : new Date()),
    z.date()
  ),
  role: z.nativeEnum(UserRole, {
    required_error: "Please select a role.",
  }),
  status: z.nativeEnum(UserStatus).optional(),
  password: z.string().optional(),
});

export type UserPayload = z.infer<typeof userFormSchema>;