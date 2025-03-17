import {
  BookingParams,
  BookingPayload,
  BookingResponse,
  CancelBookingPayload,
  DescriptionPayload,
} from "@/domains/models/booking";
import { BookingService } from "@/domains/services/booking";
import { QueryKey } from "@/domains/stores/query-key";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
// import { useRouter } from "next/navigation";

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
  const isLoading = bookingQuery.isLoading || bookingQuery.isFetching;

  return { bookingQuery, isLoading };
};

export const useBookingDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.BOOKING.DETAIL, id],
    queryFn: () => BookingService.get.detail(id),
    enabled: !!id,
  });
};

export const useCustomerBookingDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.BOOKING.DETAIL, id],
    queryFn: () => BookingService.get.customerDetail(id),
    enabled: !!id,
  });
};

export const useBookingMutation = () => {
  const { toast } = useToast();
  // const router = useRouter();
  const queryClient = new QueryClient();
  const createBooking = useMutation({
    mutationKey: [QueryKey.BOOKING.CREATE],
    mutationFn: async (payload: BookingPayload) =>
      await BookingService.post.booking(payload),
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
    },
  });

  return { createBooking };
};

export const useDescriptionMutation = () => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const updateDescription = useMutation({
    mutationKey: [QueryKey.BOOKING.UPDATE_DESCRIPTION],
    mutationFn: async (payload: DescriptionPayload) =>
      await BookingService.put.noteDescription(payload),
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "Error",
        description: "Failed to update booking. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.BOOKING.LIST] });
    },
  });

  return { updateDescription };
};

export const useCancelBookingMutation = (bookingId: string) => {
  const { toast } = useToast();
  const cancelBooking = useMutation({
    mutationKey: [QueryKey.BOOKING.CANCEL, bookingId],
    mutationFn: async (payload: CancelBookingPayload) =>
      await BookingService.put.cancelBooking(bookingId, payload),
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { cancelBooking };
};

export const usePayBookingMutation = (bookingId: string) => {
  const { toast } = useToast();
  const payBooking = useMutation({
    mutationKey: [QueryKey.BOOKING.PAY, bookingId],
    mutationFn: async () =>
      await BookingService.put.payBooking(bookingId),
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "Error",
        description: "Failed to pay booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { payBooking };
};