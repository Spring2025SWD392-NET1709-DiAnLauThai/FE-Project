export interface TShirtResponse {
  tshirtId: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface TShirtPayload{
  description: string,
  imgurl: string,
  tshirtname: string,
  colorlist: [
    string
  ],
  imagefile: string
}

export interface AssignTshirt{
  tshirtId: string,
  bookingDetailId: string
}

export interface TShirtParams {
  keyword?: string;
  page?: number;
  size?: number;
  dateFrom?: string;
  dateTo?: string;
  sortDir?: "asc" | "desc";
  sortBy?: string;
}

export interface TShirtParams extends RootRequest {}
