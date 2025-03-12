export interface BookingParams {
  page: number;
  size: number;
}

export enum BookingStatus {
  DEPOSIT_PAID = "DEPOSIT_PAID",
  CONFIRMED = "CONFIRMED",
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  REFUNDED = "REFUNDED",
  UNPAID = "UNPAID",
}

export interface BookingDetailGetParams {
  bookingId: string;
  page?: number;
  size?: number;
}

export interface BookingResponse {
  id: string;
  totalPrice: number;
  totalQuantity: number;
  status: string;
  startDate: Date;
  endDate: Date;
  updateDate: Date;
  createdDate: Date;
  code: string;
  title: string;
  assignedDesigner: null;
}

export interface BookingDetailResponse {
  totalPrice: number;
  totalQuantity: number;
  bookingStatus: string;
  datecreated: Date;
  updateddate: Date;
  startdate: Date;
  enddate: Date;
  code: string;
  title: string;
  bookingDetails: BookingDetail[];
}

export interface BookingDetail {
  bookingDetailId: string;
  designFile: string;
  description: string;
  unitPrice: number;
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
