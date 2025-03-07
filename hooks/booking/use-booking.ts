import {
  BookingParams,
  BookingPayload,
  BookingResponse,
  BookingDetailGetParams,
} from "@/domains/models/booking";
import { BookingService } from "@/domains/services/booking";
import { QueryKey } from "@/domains/stores/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";

interface BookingQuery {
  params: BookingParams;
}

export const useBookingsQuery = ({ params }: BookingQuery) => {
  const bookingQuery = useQuery({
    queryKey: [QueryKey.BOOKING.LIST, params ? params : {}],
    queryFn: async () => await BookingService.get.list(params),
    initialData: {
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
      },
      message: "",
      code: 0,
    } as RootResponse<Pagination<BookingResponse>>,
  });

  return { bookingQuery };
};

export const useBookingDetailsQuery = (params: BookingDetailGetParams) => {
  return useQuery({
    queryKey: [QueryKey.BOOKING.DETAIL, params],
    queryFn: () => BookingService.get.getBookingDetails(params),
    enabled: !!params.bookingId,
  });
};

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
