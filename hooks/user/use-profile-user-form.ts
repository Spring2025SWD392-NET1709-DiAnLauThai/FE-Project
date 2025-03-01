import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../use-toast";
import { useDetailUser, useUpdateUserProfile } from "./use-user";
import {
  userProfileSchema,
  UserProfileFormData,
} from "@/domains/schemas/user/createuser.schema";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export const useUserProfileForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  // Get user ID from JWT token in cookies
  useEffect(() => {
    try {
      const cookies = parseCookies();
      const token = cookies.jwtCookie;
      if (token) {
        const decoded = jwtDecode<TokenResponse>(token);

        if (decoded.sub) {
          setUserId(decoded.sub);
        } else {
          toast({
            title: "Authentication Error",
            description: "User ID not found in token. Please log in again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Authentication Error",
          description: "Please log in again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Token decoding failed. Please log in again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useDetailUser(userId);

  const { updateProfileMutation } = useUpdateUserProfile();

  // Setup form with validation
  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
    },
    mode: "onChange",
  });

  // Set form values when user data is loaded
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setProfileImage(user.image_url || null);
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone ? String(user.phone) : "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth
          ? format(new Date(user.dateOfBirth), "yyyy-MM-dd")
          : "",
      });
    }
  }, [userData, form]);

  // Handle image upload (preview only)
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast({
        title: "File Too Large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Create a preview for the UI
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Set file in the form data
    form.setValue("image", file);
    form.trigger("image");

    setImageChanged(true);
  };

  // Handle form submission
  const onSubmit = async (formData: UserProfileFormData) => {
    if (!userData?.data) {
      toast({
        title: "Update Failed",
        description: "User information is incomplete",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const profileFormData = new FormData();

      // Add regular form fields
      profileFormData.append("id", userId);
      profileFormData.append("name", formData.name);
      profileFormData.append("phone", formData.phone);
      profileFormData.append("email", formData.email);

      if (formData.address) {
        profileFormData.append("address", formData.address);
      }

      if (formData.dateOfBirth) {
        const date = new Date(formData.dateOfBirth);
        const formattedDate = date.toISOString().split("T")[0];
        profileFormData.append("dateOfBirth", formattedDate);
      }

      // Add image file if provided
      if (imageChanged && formData.image) {
        profileFormData.append("imageFile", formData.image);
      } 
      // else if (userData.data.image_url) {
      //   // Giữ nguyên ảnh cũ nếu có
      //   profileFormData.append("imageFile", userData.data.image_url);
      // }

      // Send the request
      await updateProfileMutation.mutateAsync(profileFormData);
    } catch (error) {
      console.error("Profile update failed:", error);
      // Toast is already handled in the mutation
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: isLoading || updateProfileMutation.isPending,
    isLoadingUser,
    userData,
    error,
    profileImage,
    handleImageUpload,
  };
};
