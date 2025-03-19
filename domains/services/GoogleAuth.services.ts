import axiosInstance from "@/configs/axios.config";

const BASE_URL = "http://localhost:8080/api/auth/google";

export const authServices = {
    loginWithGoogle: async () => {
        try {
            // Thay đổi GET thành POST (tùy backend của bạn có yêu cầu không)
            const response = await axiosInstance.get(`${BASE_URL}/login`);
            return response.data;
        } catch (error) {
            console.error("Error during Google login:", error);
            throw error;
        }
    },

    handleGoogleCallback: async (code: string) => {
        try {
            // Kiểm tra backend có yêu cầu gửi `code` bằng `POST` hay không
            const response = await axiosInstance.post(`${BASE_URL}/callback`, { code });
            return response.data;
        } catch (error) {
            console.error("Error handling Google callback:", error);
            throw error;
        }
    },

    getUserInfo: async (token: string) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user info:", error);
            throw error;
        }
    }
};
