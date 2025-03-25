import axiosInstance from "@/configs/axios.config";
import {
  BookingCustomerDetailResponse,
  BookingDetailResponse,
  BookingParams,
  BookingPayload,
  BookingPayloadResponse,
  BookingResponse,
  CancelBookingPayload,
  DescriptionPayload,
} from "@/domains/models/booking";
import { Cancel } from "axios";
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

    detail: async (
      bookingId: string
    ): Promise<RootResponse<BookingDetailResponse>> => {
      try {
        const response = await axiosInstance.get(
          `/bookingsdetails/bookings/${bookingId}/details`
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    customerDetail: async (
      bookingId: string
    ): Promise<RootResponse<BookingCustomerDetailResponse>> => {
      try {
        const response = await axiosInstance.get(
          `/bookingsdetails/bookings/${bookingId}/details/customer`
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
        console.log("response", response.data);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {
    payBooking: async (bookingId: string): Promise<RootResponse<string>> => {
      try {
        const response = await axiosInstance.put(
          `/bookings/${bookingId}/payment`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    repayBooking: async (bookingId: string): Promise<RootResponse<string>> => {
      try {
        const response = await axiosInstance.put(
          `/bookings/${bookingId}/repay`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    publicBooking: async (bookingId: string): Promise<RootResponse<string>> => {
      try {
        const response = await axiosInstance.put(
          `/bookings/public?bookingId=${bookingId}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    noteDescription: async (
      data: DescriptionPayload
    ): Promise<RootResponse<string>> => {
      try {
        const response = await axiosInstance.put(`/bookingsdetails`, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    cancelBooking: async (
      bookingId: string,
      data: CancelBookingPayload
    ): Promise<RootResponse<string>> => {
      try {
        const response = await axiosInstance.put(
          `/bookings/${bookingId}/cancel`,
          data
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  delete: {},
};
