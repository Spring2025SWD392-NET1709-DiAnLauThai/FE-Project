import { create } from 'zustand';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  UserPayload,
  userFormSchema,
} from "@/domains/schemas/user/createuser.schema";
import { useCreateUser } from './use-user';
import { UserRole } from '@/domains/models/user';
import { useToast } from "../use-toast";

const defaultValues: Partial<UserPayload> = {
  name: "",
  email: "",
  phone: 0,
  address: "",
  dateOfBirth: undefined,
  role: UserRole.CUSTOMER,
};

export function useUserForm() {
  const { toast } = useToast();
  const createUserMutation = useCreateUser();
  const form = useForm<UserPayload>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserPayload) => {
    try {
      await createUserMutation.createUserMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      form.reset();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: createUserMutation.createUserMutation.isPending,
  };
}