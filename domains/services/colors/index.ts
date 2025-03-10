import axiosInstance from "@/configs/axios.config";
import { ColorPayload, ColorResponse } from "@/domains/models/color";

export const ColorService = {
    post: { 
        addColor: async (payload: ColorPayload): Promise<RootResponse<null>> => {
            try {
                const response = await axiosInstance.post("color", payload);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    },
    get: {
        getSavedColor: async (): Promise<RootResponse<ColorResponse[]>> => {
            try {
                const response = await axiosInstance.get("color");
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
    put: { },
    delete: { },
};
