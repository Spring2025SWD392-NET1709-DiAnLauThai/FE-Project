import { userService } from "@/domains/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { UserPayload } from "@/domains/models/user";

export const useUser = (page: number, size: number) => {
  return useQuery({
    queryKey: ["users", page, size],
    queryFn: () => userService.getAllAccount({ page, size }),
  });
};

export const useCreateUser = () => {
  const toast = useToast(); 
  const createUserMutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (payload: UserPayload) =>
      await userService.createAccount(payload),
    onSuccess: (data) => {
      toast.toast({
        title: "Create user success",
        description: "Create success",
      });
      
    },
    onError: (error) => {
      console.log("Create failed", error);
    },
  });

  return { createUserMutation };
};

