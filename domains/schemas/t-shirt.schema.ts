import { z } from "zod";

export const TShirtSchema = z.object({
  description: z.string(),
  imgurl: z.string().url(),
  tshirtname: z.string(),
  colorlist: z.array(z.string()).min(1),
  imagefile: z.string(),
});

export const AssignTshirtSchema = z.object({
  tshirtId: z.string(),
  bookingDetailId: z.string(),
});

// Type inference
export type TShirt = z.infer<typeof TShirtSchema>;
export type AssignTshirt = z.infer<typeof AssignTshirtSchema>;