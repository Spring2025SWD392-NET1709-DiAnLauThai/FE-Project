import axiosInstance from "@/configs/axios.config";
import {
  BookingGetParams,
  BookingResponse,
  BookingDetailGetParams,
  BookingDetail,
} from "@/domains/models/booking";

export const BookingServices = {
  post: {},
  get: {
    getAllBooking: async (
      params: BookingGetParams
    ): Promise<RootResponse<Pagination<BookingResponse>>> => {
      try {
        const response = await axiosInstance.get("/bookings", {
          params: {
            page: params.page,
            size: params.size,
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getBookingDetails: async (
      params: BookingDetailGetParams
    ): Promise<RootResponse<Pagination<BookingDetail>>> => {
      try {
        const response = await axiosInstance.get(
          `/bookingsdetails/bookings/${params.bookingId}/details`,
          {
            params: {
              page: params.page,
              size: params.size,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {},
  delete: {},
};
