import axiosInstance from "@/configs/axios.config";
import {
  BookingPayload,
  BookingPayloadResponse,
} from "@/domains/models/booking";

export const BookingService = {
  get: {
    list: async () => {},
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
