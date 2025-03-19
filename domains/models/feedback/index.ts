export interface FeedbackPayload {
  tshirtId: string,
  rating: 0,
  detail: string
}


export interface FeedbackResponse {
  feedbackId: string;
  rating: number;
  detail: string;
  username: string;
  createddate: string;
}