import axiosInstance from "@/configs/axios.config";
import { FeedbackPayload, FeedbackResponse } from "@/domains/models/feedback";

export const FeedbackService = {
    post: { 
        uploadFeedback: async (payload: FeedbackPayload): Promise<RootResponse<string>> => {
            try {
                const response = await axiosInstance.post(
                  "/feedback/tshirt",
                  payload
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    get: {
        getFeedbackById: async (tshirtId: string): Promise<RootResponse<FeedbackResponse>> => {
            try {
                const response = await axiosInstance.get(
                  `/feedback/tshirt/{tshirtId}?tshirtId=${tshirtId}`
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    put: { },
    delete: { },
};
