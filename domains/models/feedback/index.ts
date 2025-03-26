export interface FeedbackPayload {
  tshirtId: string,
  rating: number,
  detail: string
}


export interface FeedbackResponse {
  feedbackId: string;
  rating: number;
  detail: string;
  username: string;
  createddate: string;
}