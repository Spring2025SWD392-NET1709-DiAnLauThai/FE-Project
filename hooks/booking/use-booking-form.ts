import { Bookingdetail, BookingPayload } from "@/domains/models/booking";
import { BookingSchema, bookingSchema, cancelSchema, CancelSchema, descriptionSchema, DescriptionSchema } from "@/domains/schemas/booking";
import { FileService } from "@/domains/services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBookingMutation, useCancelBookingMutation, useDescriptionMutation } from "./use-booking";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { toast, useToast } from "../use-toast";
import React, { useEffect } from "react";

export const useBookingForm = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { createBooking } = useBookingMutation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

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
    const adjustedStartDate = new Date(data.startdate);
    adjustedStartDate.setHours(adjustedStartDate.getHours() + 7);
    adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);

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
      startdate: adjustedStartDate,
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

export const useUpdateDescription = (bookingDetailId: string) => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { updateDescription } = useDescriptionMutation();

  const form = useForm<DescriptionSchema>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      id: bookingDetailId,
      description: "",
    },
  });

  // Set booking detail ID when it changes
  useEffect(() => {
    if (bookingDetailId) {
      form.setValue("id", bookingDetailId);
    }
  }, [bookingDetailId, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    // Prepare the payload for the API call
    const payload = {
      id: bookingDetailId,
      description: data.description,
    };

    console.log("Updating description:", payload);

    await updateDescription.mutate(payload, {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description: response.message || "Note sent successfully",
        });

        // Invalidate relevant queries to refresh data
        queryClient.invalidateQueries({
          queryKey: [QueryKey.BOOKING.DETAIL, bookingDetailId],
        });

        // Reset the form description field
        form.reset({
          id: bookingDetailId,
          description: "",
        });
      },
      onError: (error) => {
        console.error("Error updating description:", error);
        toast({
          title: "Error",
          description: "Failed to send note. Please try again.",
          variant: "destructive",
        });
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: updateDescription.isPending,
    resetForm: () =>
      form.reset({
        id: bookingDetailId,
        description: "",
      }),
  };


};

export const useCancelBooking = (bookingId: string) => {
  const queryClient = useQueryClient();
  const { cancelBooking } = useCancelBookingMutation(bookingId);

  const form = useForm<CancelSchema>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    // Prepare the payload for the API call
    const payload = {
      bookingId: bookingId,
      note: data.note,
    };

    await cancelBooking.mutate(payload, {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description: response.message || "Cancelled successfully",
        });

        // Invalidate relevant queries to refresh data
        queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
        queryClient.invalidateQueries({
          queryKey: [QueryKey.BOOKING.DETAIL, bookingId],
        });

        // Reset the form
        form.reset();
      },
      onError: (error) => {
        console.error("Error cancelling booking:", error);
        toast({
          title: "Error",
          description: "Failed to cancel. Please try again.",
          variant: "destructive",
        });
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: cancelBooking.isPending,
  };
};