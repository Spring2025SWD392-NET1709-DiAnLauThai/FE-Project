export interface BookingParams {}
export interface BookingResponse {
  id: string;
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
