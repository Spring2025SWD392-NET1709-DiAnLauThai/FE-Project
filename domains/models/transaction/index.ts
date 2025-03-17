
export interface TransactionResponse {
  id: string;
  bookingId: string;
  transactionName: string;
  transactionMethod: string;
  transactionDate: Date;
  transactionAmount: number;
  transactionStatus: string;
  bankCode: string;
  reason: string;
  transactionType: string;
}

export interface BookingDetailItem {
  bookingId: string | null;
  bookingDetailId: string;
  designId: string | null;
  designFile: string;
  description: string;
  unitPrice: number;
}

export interface TransactionDetailResponse{
  transaction: TransactionResponse;
  bookingDetail: BookingDetailItem[];
}




export interface TransactionParams extends RootRequest {}
