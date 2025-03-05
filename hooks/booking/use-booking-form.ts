import { BookingSchema, bookingSchema } from "@/domains/schemas/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useBookingForm = () => {
  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: "",
      items: [{ description: "", image: [] }],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("data", data);
  });

  return { form, onSubmit };
};
