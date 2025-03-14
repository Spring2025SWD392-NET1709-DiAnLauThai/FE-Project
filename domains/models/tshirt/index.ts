export interface TShirtResponse {
  id: string;
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
export interface TShirtParams extends RootRequest {}
