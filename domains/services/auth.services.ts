import axiosInstance from '@/configs/axios.config';
import { AuthPayload } from './../models/auth.model';
export const AuthServices = {
    login: async (payload: AuthPayload ): Promise<{token: string}> => {
        try {
            const response = await axiosInstance.post('/auth/signin', payload, {withCredentials: true});
            console.log(response.data.data.token);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
