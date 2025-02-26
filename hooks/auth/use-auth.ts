"use-client";
import { AuthServices } from "@/domains/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, RegisterPayload } from "@/domains/models/auth.model";

import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";
import { QueryKey } from "@/domains/stores/query-key";
import { useAuthStore } from "@/domains/stores/use-auth-store";

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
      push("/t-shirt");
      login(data.data.accessToken, data.data.refreshToken);
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

  return { loginMutation, registerMutation };
};
