import { z } from "zod";

export const TShirtSchema = z.object({
  description: z.string(),
  imgurl: z.string().url(),
  tshirtname: z.string(),
  colorlist: z.array(z.string()).min(1),
});

// Type inference
export type TShirt = z.infer<typeof TShirtSchema>;
