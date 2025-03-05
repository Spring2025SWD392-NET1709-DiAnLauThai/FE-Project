import { BookingParams, BookingPayload } from "@/domains/models/booking";
import { BookingService } from "@/domains/services/booking";
import { QueryKey } from "@/domains/stores/query-key";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useToast } from "../use-toast";

interface BookingQuery {
  params: BookingParams;
}

export const useBookingsQuery = ({}: BookingQuery) => {};

export const useBookingDetailQuery = () => {};

export const useBookingMutation = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const createBooking = useMutation({
    mutationKey: [QueryKey.BOOKING.CREATE],
    mutationFn: async (payload: BookingPayload) =>
      await BookingService.post.booking(payload),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `${data.message}`,
      });
      window.location.href = data.data.vnpayurl;
    },

    onError: (error) => {
      console.error("error", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
    },
  });

  return { createBooking };
};
