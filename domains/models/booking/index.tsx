export interface BookingParams {}
export interface BookingResponse {
  id: string;
}
export interface BookingRequest {
  title: string;
  items: BookingDetailRequest[];
}

export interface BookingDetailRequest {
  description: string;
  image: File[];
}

export interface BookingDetailResponse {}
