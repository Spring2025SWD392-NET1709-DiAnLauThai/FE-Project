import { z } from "zod";
import { UserRole, UserStatus } from "@/domains/models/user";

const REGEX_PHONE =
  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;


const validateMinAge = (dateStr: string): boolean => {
  const today = new Date();
  const birthDate = new Date(dateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If birth month is after current month or same month but birth day is after today
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 16;
};


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
    .regex(REGEX_PHONE, "Only support Vietnamese phone number")
    .nonempty(),
  address: z.string().default(""),
  dateOfBirth: z.preprocess(
    (val) => {
      if (!val) return new Date();
      const date = new Date(val);
      return date;
    },
    z.date().refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // If birth month is after current month or same month but birth day is after today
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 16;
    }, "User must be at least 16 years old")
  ),
  role: z.nativeEnum(UserRole, {
    required_error: "Please select a role.",
  }),
  status: z.nativeEnum(UserStatus).optional(),
  password: z.string().optional(),
});

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .regex(REGEX_PHONE, "Only support Vietnamese phone number")
    .nonempty(),
  address: z.string().optional(),
  dateOfBirth: z.preprocess(
    (val) => {
      if (!val) return new Date();
      const date = new Date(val);
      return date;
    },
    z.date().refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // If birth month is after current month or same month but birth day is after today
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 16;
    }, "User must be at least 16 years old")
  ),
  image: z.instanceof(File).optional(),
});

export type UserPayload = z.infer<typeof userFormSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;