import axios from 'axios';

export const loginWithGoogle = async (idToken: string) => {
    try {
        const response = await axios.post('/api/auth', { token: idToken });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Lỗi xác thực Google');
    }
};

