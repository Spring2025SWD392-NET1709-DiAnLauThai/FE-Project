import axios from "axios";

export const loginWithGoogle = async (idToken: string) => {
    try {
        const response = await axios.post("/api/auth/google", { token: idToken });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Lỗi xác thực Google");
    }
};

export const getUserInfo = async () => {
    try {
        const response = await axios.get("/api/auth/user");
        return response.data;
    } catch (error) {
        throw new Error("Lỗi lấy thông tin người dùng");
    }
};

export const logout = async () => {
    try {
        await axios.post("/api/auth/logout");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    } catch (error) {
        throw new Error("Lỗi đăng xuất");
    }
};

export const refreshToken = async () => {
    try {
        const response = await axios.post("/api/auth/refresh");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        return response.data;
    } catch (error) {
        throw new Error("Lỗi làm mới token");
    }
};
