import { z } from "zod";

export const TShirtCreateSchema = z.object({
  description: z.string(),
  imgurl: z.string(),
  tshirtname: z.string(),
  colorlist: z.array(z.string()).min(1),
  imagefile: z.string(),
});

export const TShirtUpdateSchema = z.object({
  tshirtId: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  imageFile: z.string(),
  createdAt: z.union([z.string(), z.date()]),
});

export const AssignTshirtSchema = z.object({
  tshirtId: z.string(),
  bookingDetailId: z.string(),
});

export const AssignDesignerSchema = z.object({
  designerId: z.string({
    required_error: "Please select a designer",
  }),
});

export type AssignDesignerFormValues = z.infer<typeof AssignDesignerSchema>;

// Type inference
export type TShirtCreate = z.infer<typeof TShirtCreateSchema>;
export type TShirtUpdate = z.infer<typeof TShirtUpdateSchema>;
export type AssignTshirt = z.infer<typeof AssignTshirtSchema>;
export type TShirt = TShirtCreate & Partial<TShirtUpdate>;
