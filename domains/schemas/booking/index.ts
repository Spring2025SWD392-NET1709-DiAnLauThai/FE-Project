import * as z from "zod";

export const bookingSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Description is too long"),
  startdate: z.date(),
  enddate: z.date(),
  bookingdetails: z
    .array(
      z.object({
        description: z
          .string()
          .min(1, "Description is required")
          .max(255, "Description is too long"),
        designFile: z
          .array(z.instanceof(File))
          .min(1, "At least one image is required")
          .max(8, "Maximum of 8 images allowed")
          .refine(
            (files) =>
              files.every((file) =>
                ["image/png", "image/jpeg", "image/jpg"].includes(
                  file.type.toLowerCase()
                )
              ),
            { message: "Only PNG and JPEG images are allowed" }
          ),
        unitprice: z.number().min(1, "Unit price is required"),
      })
    )
    .min(1, "At least one item is required"),
});
  
export const descriptionSchema = z
  .object({
    id: z.string(),
    description: z.string(),
    }
);
  
export const cancelSchema = z.object({
  note: z.string().min(1, "Reason is required"),
});

export type CancelSchema = z.infer<typeof cancelSchema>;

export type DescriptionSchema = z.infer<typeof descriptionSchema>;

export type BookingSchema = z.infer<typeof bookingSchema>;
