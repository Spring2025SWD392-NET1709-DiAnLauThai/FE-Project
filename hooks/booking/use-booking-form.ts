import { Bookingdetail, BookingPayload } from "@/domains/models/booking";
import { BookingSchema, bookingSchema } from "@/domains/schemas/booking";
import { FileService } from "@/domains/services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBookingMutation } from "./use-booking";

export const useBookingForm = () => {
  const { createBooking } = useBookingMutation();

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: "",
      startdate: new Date(),
      enddate: new Date(),
      bookingdetails: [
        {
          description: "",
          designFile: [],
          unitprice: 0,
        },
      ],
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const newBookingDetails: Bookingdetail[] = await Promise.all<Bookingdetail>(
      data.bookingdetails.map(async (detail) => {
        const url = await FileService.post
          .upload(detail.designFile[0])
          .then((data) => data.data);

        return {
          description: detail.description.toString(),
          designFile: url,
          unitprice: detail.unitprice,
        };
      })
    );

    const value: BookingPayload = {
      title: data.title,
      startdate: data.startdate,
      enddate: data.enddate,
      bookingdetails: newBookingDetails,
    };

    createBooking.mutate(value, {
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (error) => {
        console.error("error", error);
      },
    });
  });

  return { form, onSubmit, isLoading: createBooking.isPending };
};
