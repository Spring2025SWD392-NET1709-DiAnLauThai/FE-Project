export interface TShirtResponse {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  
}
export interface TShirtParams extends RootRequest {}
export interface TShirtPayload {}
