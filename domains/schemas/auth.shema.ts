import { z } from "zod";

const REGEX_PHONE =
  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;

export const loginSchema = z.object({
  email: z.string().email(), // Email validation
  password: z.string().min(6), // Password must be at least 6 characters long
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().nonempty(),
  password: z.string().min(6),
  phone: z
    .string()
    .regex(REGEX_PHONE, "Only support Vietnamese phone number")
    .nonempty(),
  role: z.enum(["ADMIN", "CUSTOMER", "DESIGNER", "MANAGER"]),
});

export type LoginPayloadSchema = z.infer<typeof loginSchema>;
export type RegisterPayloadSchema = z.infer<typeof registerSchema>;

export type AuthPayload = LoginPayloadSchema & Partial<RegisterPayloadSchema>;
