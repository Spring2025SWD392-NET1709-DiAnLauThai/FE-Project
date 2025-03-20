import { Bookingdetail, BookingPayload } from "@/domains/models/booking";
import {
  BookingSchema,
  bookingSchema,
  cancelSchema,
  CancelSchema,
  descriptionSchema,
  DescriptionSchema,
} from "@/domains/schemas/booking";
import { FileService } from "@/domains/services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useBookingMutation,
  useCancelBookingMutation,
  useDescriptionMutation,
  usePayBookingMutation,
  usePublicBooking,
} from "./use-booking";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { toast, useToast } from "../use-toast";
import React, { useEffect, useState } from "react";

export const useBookingForm = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { createBooking } = useBookingMutation();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
    // Validate deadline date
    const deadlineDate = new Date(data.enddate);
    const adjustedStartDate = new Date(data.startdate);
    adjustedStartDate.setHours(adjustedStartDate.getHours() + 7);
    adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
    
    if (deadlineDate <= adjustedStartDate) {
      toast({
        title: "Invalid Deadline",
        description:
          "Deadline date must be at least (number of booking details + 1) days after start date",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setIsUploading(true);
    

    try {
      const newBookingDetails: Bookingdetail[] = await Promise.all(
        data.bookingdetails.map(async (detail) => {
          try {
            const response = await FileService.post.upload(detail.designFile[0]);
            return {
              description: detail.description.toString(),
              designFile: response.data,
              unitprice: detail.unitprice,
            };
          } catch (error) {
            console.error("Error uploading file:", error);
            toast({
              title: "Upload Failed",
              description: "Failed to upload design file. Please try again.",
              variant: "destructive",
            });
            throw error;
          }
        })
      );
      
      setIsUploading(false);

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
          toast({
            title: "Booking Failed",
            description: "Failed to create booking. Please try again.",
            variant: "destructive",
          });
        },
        onSettled: () => {
          setIsLoading(false);
        }
      });
    } catch (error) {
      setIsLoading(false);
      setIsUploading(false);
    }
  });

  return { form, onSubmit, isLoading: createBooking.isPending, isUploading };
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

// Add this hook to your use-booking-form.ts file

export const usePublicBookingMutation = (bookingId: string) => {
  const queryClient = useQueryClient();
  const { publicBooking } = usePublicBooking(bookingId);
  const { toast } = useToast();

  const handlePublish = async () => {
    if (!bookingId) {
      toast({
        title: "Error",
        description: "Booking ID is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await publicBooking.mutate(undefined, {
        onSuccess: (response) => {
          toast({
            title: "Success",
            description: response.message || "Booking published successfully",
          });

          // Invalidate relevant queries to refresh data
          queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
          queryClient.invalidateQueries({
            queryKey: [QueryKey.BOOKING.DETAIL, bookingId],
          });
        },
        onError: (error) => {
          console.error("Error publishing booking:", error);
          toast({
            title: "Error",
            description: "Failed to publish booking. Please try again.",
            variant: "destructive",
          });
          throw error;
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    handlePublish,
    isLoading: publicBooking.isPending,
  };
};

export const usePayBooking = (bookingId: string) => {
  const queryClient = useQueryClient();
  const { payBooking } = usePayBookingMutation(bookingId);
  const { toast } = useToast();

  // No need for a complex form since this is just a payment submission
  // We'll keep a simple form structure in case you want to add notes or other fields later
  const form = useForm({
    defaultValues: {
      bookingId: bookingId,
    },
  });

  // Set booking ID when it changes
  const onSubmit = form.handleSubmit(async () => {
    await payBooking.mutate(void 0, {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description: response.message,
        });

        // Check if there's a payment URL in the response and redirect
        if (
          response.data &&
          typeof response.data === "string" &&
          response.data.includes("vnpayment.vn")
        ) {
          // Redirect to payment gateway
          window.location.href = response.data;
        } else {
          // Invalidate relevant queries to refresh data
          queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
          queryClient.invalidateQueries({
            queryKey: [QueryKey.BOOKING.DETAIL, bookingId],
          });
        }

        // Reset the form
        form.reset();
      },
      onError: (error) => {
        console.error("Error processing payment:", error);
        toast({
          title: "Error",
          description: "Failed to process payment. Please try again.",
          variant: "destructive",
        });
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: payBooking.isPending,
  };
};
