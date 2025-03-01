import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UserPayload,
  userFormSchema,
} from "@/domains/schemas/user/createuser.schema";
import { useCreateUser, useUpdateUser } from "./use-user";
import { UserRole, UserStatus } from "@/domains/models/user";
import { useToast } from "../use-toast";
import { useQueryClient } from "@tanstack/react-query";

const defaultValues: Partial<UserPayload> = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: undefined,
  role: UserRole.CUSTOMER,
  status: UserStatus.ACTIVE,
};

type UseUserFormOptions = {
  type: "create" | "update";
  defaultData?: UserPayload;
};

export function useUserForm(options: UseUserFormOptions = { type: "create" }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const form = useForm<UserPayload>({
    resolver: zodResolver(userFormSchema),
    defaultValues: options.defaultData || defaultValues,
  });

  const onCreateUser = async (data: UserPayload) => {
    try {
      await createUserMutation.createUserMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["create-user"] });
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

  const onUpdateUser = async (data: UserPayload) => {
    try {
      console.log("Update data raw:", data); // Debug log for raw form data

      // Check if we have the ID in the form data
      if (!data.id) {
        console.error("Missing user ID in update payload");

        // Check if we have the ID in the options.defaultData (which came from userAsPayload)
        if (options.defaultData?.id) {
          console.log(
            "Found ID in defaultData, using it instead:",
            options.defaultData.id
          );
          data = { ...data, id: options.defaultData.id };
        } else {
          toast({
            title: "Error",
            description: "User ID is missing",
            variant: "destructive",
          });
          return false;
        }
      }

      console.log("Final update data with ID:", data); // Log the final data

      // Now we should have the ID
      await updateUserMutation.updateUserMutation.mutateAsync(data);

      toast({
        title: "Success",
        description: "User updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      return true;
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = form.handleSubmit(
    options.type === "create" ? onCreateUser : onUpdateUser
  );

  const isLoading =
    options.type === "create"
      ? createUserMutation.createUserMutation.isPending
      : updateUserMutation.updateUserMutation.isPending;

  return {
    form,
    onSubmit: handleSubmit,
    isLoading,
    reset: (values?: UserPayload) => form.reset(values || defaultValues),
  };

  
}
