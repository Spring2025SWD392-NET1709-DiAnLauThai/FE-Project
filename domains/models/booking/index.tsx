export interface BookingParams {
  page?: number;
  size?: number;
}

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
  totalPrice: number;
  totalQuantity: number;
  status: BookingStatus;
  startDate: Date;
  endDate: Date;
  code: string;
  title: string;
  assignedDesigner: string;
}

export interface BookingDetailGetParams {
  bookingId: string;
  page?: number;
  size?: number;
}

export interface BookingPayload {
  title: string;
  startdate: Date;
  enddate: Date;
  bookingdetails: Bookingdetail[];
}

export interface Bookingdetail {
  description: string;
  designFile: string;
  unitprice: number;
}

export interface BookingPayloadResponse {
  bookingId: string;
  totalPrice: number;
  totalQuantity: number;
  accountId: string;
  code: string;
  title: string;
  status: string;
  startdate: Date;
  enddate: Date;
  bookingDetails: BookingDetail[];
  vnpayurl: string;
}

export interface BookingDetail {
  bookingDetailId: string;
  bookingId: string;
  designId: string;
  designFile: string;
  description: string;
  unitPrice: number;
  assignedDesigner: string;
}


