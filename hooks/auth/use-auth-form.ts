import { useAuth } from "./use-auth";
import { useForm } from "react-hook-form";
import {
  AuthPayload,
  loginSchema,
  registerSchema,
} from "@/domains/schemas/auth.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginPayload, RegisterPayload } from "@/domains/models/auth.model";

interface AuthFormHook {
  type: "login" | "register";
}

export const useAuthForm = ({ type }: AuthFormHook) => {
  const { loginMutation, registerMutation } = useAuth();
  const form = useForm<AuthPayload>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues:
      type === "login"
        ? { email: "", password: "" }
        : { email: "", password: "", name: "", role: "CUSTOMER", phone: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (type === "login") {
      await loginMutation.mutateAsync(data as LoginPayload);
    } else {
      await registerMutation.mutateAsync(data as RegisterPayload);
    }
  });
  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
