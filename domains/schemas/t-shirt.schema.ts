import { z } from "zod";

export const TShirtSchema = z.object({
  bookingDetailId: z.string(),
  description: z.string(),
  imgurl: z.string().url(), // Validates that the string is a valid URL
  tshirtname: z.string(),
  colorlist: z.array(z.string()).min(1), // Ensures at least one color is provided
});

// Type inference
export type TShirt = z.infer<typeof TShirtSchema>;
