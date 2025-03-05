import * as z from "zod";

export const bookingSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    startdate: z.date(),
    enddate: z.date(),
    bookingdetails: z
      .array(
        z.object({
          description: z.string().min(1, "Description is required"),
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
  })
  .refine(
    (data) =>
      data.enddate >
      new Date(
        data.startdate.getTime() +
          (data.bookingdetails.length + 1) * 24 * 60 * 60 * 1000
      ),
    {
      message:
        "End date must be at least (number of booking details + 1) days after start date",
      path: ["enddate"],
    }
  );

export type BookingSchema = z.infer<typeof bookingSchema>;
