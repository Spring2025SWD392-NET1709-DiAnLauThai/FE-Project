import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_API_KEY: z.string().min(1),
});

// Validate the environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

export const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_KEY } = env.data;
