import axiosInstance from "@/configs/axios.config";
import {
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
    detail: async () => {},
  },
  post: {
    booking: async (
      payload: BookingPayload
    ): Promise<RootResponse<BookingPayloadResponse>> => {
      try {
        const response = await axiosInstance.post("/bookings", { payload });

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {},
  delete: {},
};
