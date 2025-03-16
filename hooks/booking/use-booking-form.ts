import { Bookingdetail, BookingPayload } from "@/domains/models/booking";
import { BookingSchema, bookingSchema, cancelSchema, CancelSchema, descriptionSchema, DescriptionSchema } from "@/domains/schemas/booking";
import { FileService } from "@/domains/services/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBookingMutation, useCancelBookingMutation, useDescriptionMutation, usePayBookingMutation } from "./use-booking";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { toast, useToast } from "../use-toast";
import React, { useEffect, useState } from "react";

export const useBookingForm = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { createBooking } = useBookingMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: number]: number;
  }>({});

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: "",
      startdate: new Date(),
      enddate: new Date(new Date().setDate(new Date().getDate() + 7)), // Default to 7 days from now
      bookingdetails: [
        {
          description: "",
          designFile: [],
          unitprice: 0,
        },
      ],
    },
  });

  // Function to handle file uploads independently
  const handleFileUpload = async (
    file: File,
    detailIndex: number
  ): Promise<string> => {
    // Set uploading state
    setIsUploading(true);
    setUploadProgress((prev) => ({ ...prev, [detailIndex]: 0 }));

    try {
      // Show uploading toast
      toast({
        title: "Uploading file",
        description: `Uploading image for item ${detailIndex + 1}...`,
      });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const currentProgress = prev[detailIndex] || 0;
          if (currentProgress < 90) {
            return { ...prev, [detailIndex]: currentProgress + 10 };
          }
          return prev;
        });
      }, 500);

      // Upload the file
      const response = await FileService.post.upload(file);

      // Clear interval and set to 100%
      clearInterval(progressInterval);
      setUploadProgress((prev) => ({ ...prev, [detailIndex]: 100 }));

      // Success toast
      toast({
        title: "Upload complete",
        description: `Image for item ${detailIndex + 1} uploaded successfully.`,
      });

      return response.data;
    } catch (error) {
      // Error toast
      toast({
        title: "Upload failed",
        description: `Failed to upload image for item ${detailIndex + 1}.`,
        variant: "destructive",
      });
      console.error("File upload error:", error);
      throw error;
    } finally {
      setUploadProgress((prev) => ({ ...prev, [detailIndex]: 0 }));
      setIsUploading(false);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    // Validate dates
    const now = new Date();
    const startDate = new Date(data.startdate);
    const endDate = new Date(data.enddate);

    

    // Ensure end date is after start date
    if (endDate <= startDate) {
      toast({
        title: "Invalid end date",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    // Check that all items have files
    const missingFiles = data.bookingdetails.some(
      (detail) => !detail.designFile || detail.designFile.length === 0
    );

    if (missingFiles) {
      toast({
        title: "Missing files",
        description: "Please upload at least one image for each item.",
        variant: "destructive",
      });
      return;
    }

    // Show toast for starting the submission
    toast({
      title: "Processing",
      description: "Preparing your booking submission...",
    });

    setIsLoading(true);

    try {
      // Adjust dates properly
      const adjustedStartDate = new Date(data.startdate);
      // No need to add 7 hours or 1 day if you're sending ISO strings

      // Upload all files in parallel with better error handling
      const newBookingDetails: Bookingdetail[] = await Promise.all(
        data.bookingdetails.map(async (detail, index) => {
          try {
            const url = await handleFileUpload(detail.designFile[0], index);
            return {
              description: detail.description.toString(),
              designFile: url,
              unitprice: detail.unitprice || 100000, // Default price if not set
            };
          } catch (error) {
            throw new Error(`Failed to upload file for item ${index + 1}`);
          }
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
          toast({
            title: "Submission failed",
            description: "Failed to create booking. Please try again.",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    onSubmit,
    isLoading: isLoading || createBooking.isPending,
    isUploading,
    uploadProgress,
  };
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