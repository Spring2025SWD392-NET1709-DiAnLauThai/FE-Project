export interface Dashboard {
  year: number;
  startDate: Date;
  endDate: Date;
  monthlyIncome: BookingCompletedAmount[];
  bookingCreatedAmount: BookingCompletedAmount[];
  bookingCompletedAmount: BookingCompletedAmount[];
  tshirtCreatedAmount: BookingCompletedAmount[];
}

export interface BookingCompletedAmount {
  month: string;
  amount: number;
}

export interface DashboardParams {
  year: number;
  startDate: Date;
  endDate: Date;
}
