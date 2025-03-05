import * as z from "zod";

export const bookingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        image: z
          .array(z.instanceof(File))
          .min(1, "At least one image is required")
          .max(8, "Maximum of 8 images allowed")
          .refine(
            (files) => {
              return files.every((file) => {
                const type = file.type.toLowerCase();
                return (
                  type === "image/png" ||
                  type === "image/jpeg" ||
                  type === "image/jpg"
                );
              });
            },
            {
              message: "Only PNG and JPEG images are allowed",
            }
          ),
      })
    )
    .min(1, "At least one item is required"),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
