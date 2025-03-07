import {
  BookingGetParams,
  BookingDetailGetParams,
} from "@/domains/models/booking";
import { BookingServices } from "@/domains/services/booking";
import { QueryKey } from "@/domains/stores/query-key";
import { useQuery } from "@tanstack/react-query";

export const useBookingsQuery = (params: BookingGetParams) => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_BOOKING, params],
    queryFn: () => BookingServices.get.getAllBooking(params),
  });
};
export const useBookingDetailsQuery = (params: BookingDetailGetParams) => {
  return useQuery({
    queryKey: [QueryKey.GET_BOOKING_DETAILS, params],
    queryFn: () => BookingServices.get.getBookingDetails(params),
    enabled: !!params.bookingId,
  });
};
export const useBookingMutation = () => {};
