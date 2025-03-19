import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authServices } from '@/domains/services/GoogleAuth.services';
import { Toast } from '@/components/ui/toast';

export const useGoogleAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            const response = await authServices.loginWithGoogle();
            window.location.href = response.url;
        } catch (error) {
            console.error('Google Login Error:', error);
            Toast({
                title: 'Error',
                children: 'Failed to connect to Google. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleCallback = async (code: string) => {
        try {
            setIsLoading(true);
            const response = await authServices.handleGoogleCallback(code);
            localStorage.setItem('auth_token', response.token);

            Toast({
                title: 'Success',
                children: 'Successfully logged in with Google!',
            });

            router.push('/dashboard');
            return response;
        } catch (error) {
            console.error('Google Callback Error:', error);
            Toast({
                title: 'Error',
                children: 'Failed to authenticate with Google. Please try again.',
                variant: 'destructive',
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        loginWithGoogle,
        handleGoogleCallback,
    };
};