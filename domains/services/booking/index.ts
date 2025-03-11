import axiosInstance from "@/configs/axios.config";
import {
  BookingDetailResponse,
  BookingParams,
  BookingDetailGetParams,
  BookingPayload,
  BookingPayloadResponse,
  BookingResponse,
  BookingDetail,

} from "@/domains/models/booking";
export const BookingService = {
  get: {
    list: async (
      params: BookingParams
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
    detail: async (
      id: string
    ): Promise<RootResponse<Pagination<BookingDetailResponse>>> => {
      try {
        const response = await axiosInstance.get(
          `/bookingsdetails/bookings/${id}/details`
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  post: {
    booking: async (
      payload: BookingPayload
    ): Promise<RootResponse<BookingPayloadResponse>> => {
      try {
        const response = await axiosInstance.post("/bookings", payload);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {},
  delete: {},
};
