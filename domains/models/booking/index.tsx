export interface BookingParams {
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
  code: string;
  title: string;
}

export interface BookingDetailResponse {
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

interface BookingDetail {
  bookingDetailId: string;
  designId: string;
  designFile: string;
  description: string;
  unitPrice: number;
}
