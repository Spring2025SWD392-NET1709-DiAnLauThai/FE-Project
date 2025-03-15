import { z } from "zod";


export const ConfirmTaskSchema = z.object({
  bookingId: z.string({
    required_error: "Booking Id not found",
  }),
});

export type ConfirmTaskFormValues = z.infer<typeof ConfirmTaskSchema>;
