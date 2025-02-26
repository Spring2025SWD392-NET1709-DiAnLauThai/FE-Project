import { userService } from "@/domains/services/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { UserPayload } from "@/domains/models/user";

export const useUser = (page: number, size: number) => {
  return useQuery({
    queryKey: ["users", page, size],
    queryFn: () => userService.get.list({ page, size }),
  });
};

export const useCreateUser = () => {
  const toast = useToast();
  const createUserMutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (payload: UserPayload) =>
      await userService.post.account(payload),
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

export const useUpdateUser = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (payload: UserPayload) => {
      console.log("Update mutation payload:", payload);

      if (!payload.id) {
        throw new Error("User ID is required");
      }

      // Use the ID for the URL path but also keep it in the payload
      return await userService.put.account(payload.id, payload);
    },
    onSuccess: (data) => {
      toast.toast({
        title: "Update user success",
        description: "User updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Update failed", error);
      toast.toast({
        title: "Update failed",
        description: "Failed to update user",
        variant: "destructive",
      });
    },
  });

  return { updateUserMutation };
};
