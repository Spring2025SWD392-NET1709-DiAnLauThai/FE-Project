import { ColorResponse } from "../color";

export interface TShirtResponse {
  tshirtId: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}                                                                                                                                                                        

export interface TShirtUpdatePayload{
  tshirtId: string;
  name: string;
  description: string;
  imageFile: string;
  imageUrl: string;
  createdAt: string | Date; // Can handle both string and Date objects
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

export interface TShirtDetailResponse {
  description: string;
  image_url: string;
  tshirtName: string;
  colors: [ColorResponse];
  imageFile: string;
  createdAt: Date;
}

export interface AssignTshirt{
  tshirtId: string,
  bookingDetailId: string
}

export interface TShirtParams extends RootRequest {}
