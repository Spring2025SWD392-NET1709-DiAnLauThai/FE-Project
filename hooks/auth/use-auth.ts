"use-client";
import { AuthServices } from "@/domains/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, RegisterPayload } from "@/domains/models/auth.model";

import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";
import { QueryKey } from "@/domains/stores/query-key";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const { replace, push } = useRouter();

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
      } else if (decoded.role === "DESIGNER") {
        push("/task-designer");
        return;
      } else if (decoded.role === "MANAGER") {
        push("/dashboard");
        return;
      }

      // Default for CUSTOMER
      push("/t-shirt");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: "Invalid email, password or your account is not active",
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

      replace("/login");

      console.log("Register success", data);
    },
    onError: (error) => {
      toast({
        title: "Register failed",
        description: error.message,
      });
    },
  });

  return { loginMutation, registerMutation };
};
