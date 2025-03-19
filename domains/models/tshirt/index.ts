import { TShirt } from './../../schemas/t-shirt.schema';
export interface TShirtResponse {
  tshirtId: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface TShirtAvailableResponse {
  tshirtId: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface TShirtPublicResponse {
  id: string;
  name: string;
  accountName: string;
  imageUrl: string;
  rating: string;
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

export interface TShirtParams extends RootRequest {}
