"use-client";
import { AuthServices } from "@/domains/services/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginPayload, RegisterPayload } from "@/domains/models/auth.model";

import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";
import { QueryKey } from "@/domains/stores/query-key";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const { push } = useRouter();

  const loginMutation = useMutation({
    mutationKey: [QueryKey.LOGIN],
    mutationFn: async (payload: LoginPayload) =>
      await AuthServices.login(payload),
    onSuccess: (data) => {
      toast({
        title: "Login success",
        description: "Welcome back",
      });
      const decoded: TokenResponse = jwtDecode(data.data.accessToken);

      login(data.data.accessToken, data.data.refreshToken);
      if (decoded.role === "ADMIN") {
        push("/dashboard");
        return;
      }
      push("/t-shirt");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
      });
    },
  });

  const registerMutation = useMutation({
    mutationKey: [QueryKey.REGISTER],
    mutationFn: async (payload: RegisterPayload) =>
      await AuthServices.register(payload),

    onSuccess: (data) => {
      toast({
        title: "Register success",
        description: "Welcome to T&D",
      });

      push("/login");

      console.log("Register success", data);
    },
    onError: (error) => {
      toast({
        title: "Register failed",
        description: error.message,
      });
    },
  });

  const useGoogleLogin = () => {
    return useQuery({
      queryKey: [QueryKey.GOOGLE_LOGIN],
      queryFn: async () => {
        try {
          const data = await AuthServices.googleLogin();
          if (data.code === 200 && data.data) {
            // Redirect to Google's auth page
            window.location.href = data.data;
          } else {
            toast({
              title: "Google Login Failed",
              description: "Failed to get Google authentication URL",
              variant: "destructive",
            });
          }
          return data;
        } catch (error: any) {
          toast({
            title: "Google Login Failed",
            description: error.message || "Failed to initiate Google login",
            variant: "destructive",
          });
          throw error;
        }
      },
      enabled: false,
    });
  };

  const useGoogleCallback = (code: string) => {
    return useQuery({
      queryKey: [QueryKey.GOOGLE_CALLBACK, code],
      queryFn: async() => {
        if (!code) {
          throw new Error("Authorization code is missing");
        }
        try {
          const response = await AuthServices.googleCallback(code);
            toast({
              title: "Login success",
              description: "Welcome back",
            });
    
            login(response.data.accessToken, response.data.refreshToken);
    
            const decoded: TokenResponse = jwtDecode(response.data.accessToken);
            if (decoded.role === "ADMIN") {
              push("/dashboard");
            } else {
              push("/t-shirt");
            }
        } catch (error: any) {
          toast({
            title: "Google Login Failed",
            description: error.message || "Failed to authenticate with Google",
            variant: "destructive",
          });
          push("/login");
          throw error;
          
        }
      },
      enabled: !!code, // Only run when code is available
    });
  };

  return { loginMutation, registerMutation, useGoogleLogin, useGoogleCallback };
};
