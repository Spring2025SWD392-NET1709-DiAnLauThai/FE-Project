import axiosInstance from "@/configs/axios.config";
import {
  BookingDetailResponse,
  BookingParams,
  BookingPayload,
  BookingPayloadResponse,
  BookingResponse,
} from "@/domains/models/booking";

export const BookingService = {
  get: {
    list: async (
      params: BookingParams
    ): Promise<RootResponse<Pagination<BookingResponse>>> => {
      try {
        const response = await axiosInstance.get("/bookings", { params });

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
