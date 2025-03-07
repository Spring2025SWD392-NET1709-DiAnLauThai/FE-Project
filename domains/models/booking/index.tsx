export interface BookingParams { }
export enum BookingStatus {
  DEPOSIT_PAID = "DEPOSIT_PAID",
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  REFUNDED = "REFUNDED",
  UNPAID = "UNPAID",
}


export interface BookingResponse {
  id: string;
  code: string;
  title: string;
  totalPrice: number;
  totalQuantity: number;
  status: BookingStatus;
  startDate: Date | string;
  endDate: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface BookingRequest {
  title: string;
  items: BookingDetailRequest[];
}

export interface BookingDetailRequest {
  description: string;
  image: File[];
}

export interface BookingGetParams {
  page: number;
  size: number;
}

export interface BookingDetail {
  bookingDetailId: string;
  bookingId: string;
  designId: string;
  designFile: string;
  description: string;
  unitPrice: number;
}

export interface BookingDetailGetParams {
  bookingId: string;
  page?: number;
  size?: number;
}

export interface BookingDetailResponse {}
