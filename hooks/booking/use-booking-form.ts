import { Bookingdetail, BookingPayload } from "@/domains/models/booking";
import { BookingSchema, bookingSchema } from "@/domains/schemas/booking";
import { FileService } from "@/domains/services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBookingMutation } from "./use-booking";
import { QueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { useToast } from "../use-toast";
import React from "react";

export const useBookingForm = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { createBooking } = useBookingMutation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
    setIsLoading(true);
    const newBookingDetails: Bookingdetail[] = await Promise.all<Bookingdetail>(
      data.bookingdetails.map(async (detail) => {
        const url = await FileService.post
          .upload(detail.designFile[0])
          .then((data) => {
            setIsLoading(false);
            return data.data;
          })
          .catch((error) => {
            setIsLoading(false);

            console.error("error", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
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

    await createBooking.mutate(value, {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: `${data.message}`,
        });
        queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
        window.location.href = data.data.vnpayurl;
      },
      onError: (error) => {
        console.error("error", error);
      },
    });
  });

  return { form, onSubmit, isLoading: createBooking.isPending };
};
