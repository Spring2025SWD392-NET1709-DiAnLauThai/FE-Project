import { userService } from "@/domains/services/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { UserProfile, UserPayload, UserParams, UserPutPayload } from "@/domains/models/user";
import { QueryKey } from "@/domains/stores/query-key";

export const useUser = (
  params: UserParams = {
    page: 1,
    size: 10,
    keyword:"",
    sortDir: "asc",
    sortBy: "createdAt",
    ...params,
  }
) => {
  return useQuery({
    queryKey: [QueryKey.LIST_USER, params],
    queryFn: () => userService.get.list(params),
  });
};

export const useDetailUser = (id: string) => { 
  return useQuery({
    queryKey: [QueryKey.USER_PROFILE, id],
    queryFn: () => userService.get.userProfile(id),
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
    mutationFn: async (payload: UserPutPayload) => {
      console.log("Update mutation payload:", payload);

      // Use the ID for the URL path but also keep it in the payload
      return await userService.put.account(payload);
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

export const useUpdateUserProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationKey: [QueryKey.UPDATE_USER_PROFILE],
    mutationFn: async (formData: FormData) => {
      return await userService.put.updateProfile(formData);
    },
    onSuccess: (data) => {
      const message = data.message || "Your profile has been updated successfully";
      
      toast({
        title: "Profile Updated",
        description: message,
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.USER_PROFILE] });
    },
    onError: (error: any) => {
      console.error("Profile update failed:", error);
      
      const errorMessage = error.response?.data?.message || "There was a problem updating your profile";
      
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return { updateProfileMutation };
};

