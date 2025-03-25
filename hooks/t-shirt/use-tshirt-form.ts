import { TShirtPayload, TShirtUpdatePayload } from "@/domains/models/tshirt";
import {
  AssignTshirt,
  AssignTshirtSchema,
  TShirt,
  TShirtCreateSchema,
  TShirtUpdateSchema,
} from "@/domains/schemas/t-shirt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAssignTshirtMutation, useTshirtMutation } from "./use-tshirt";
import { useToast } from "../use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { useEffect, useState } from "react";
import { BookingDetail } from "@/domains/models/tasks";
import { FileService } from "@/domains/services/file";

export const useCreateTshirtForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { createTshirt } = useTshirtMutation();
  const [isUploading, setIsUploading] = useState(false);

  // Use create schema only
  const form = useForm<TShirt>({
    resolver: zodResolver(TShirtCreateSchema),
    defaultValues: {
      tshirtname: "",
      description: "",
      imgurl: "",
      colorlist: [],
      imagefile: "",
    },
  });

  const onSubmit = async (e: any) => {
    const imageFile = e.imageFile;
    const zipFile = e.zipFile;

    if (e.preventDefault) {
      e.preventDefault();
    }

    return form.handleSubmit(async (data) => {
      try {
        setIsUploading(true);
        console.log("CREATE form data:", data);
        const colorTuple = data.colorlist || [];

        let imageUrl = data.imgurl || "";

        if (imageFile) {
          try {
            const imageResponse = await FileService.post.upload(imageFile);
            imageUrl = imageResponse.data;
            console.log("Image uploaded successfully:", imageUrl);
          } catch (error) {
            console.error("Image upload error:", error);
            toast({
              title: "Image Upload Failed",
              description: "Could not upload design image",
              variant: "destructive",
            });
            setIsUploading(false);
            return;
          }
        }

        let zipFileUrl = data.imagefile || "";

        if (zipFile) {
          try {
            const zipResponse = await FileService.post.uploadZip(zipFile);
            zipFileUrl = zipResponse.data;
            console.log("ZIP uploaded successfully:", zipFileUrl);
          } catch (error) {
            console.error("ZIP upload error:", error);
            toast({
              title: "Source Files Upload Failed",
              description: "Could not upload source files",
              variant: "destructive",
            });
            setIsUploading(false);
            return;
          }
        }

        setIsUploading(false);

        const createValue: TShirtPayload = {
          description: data.description,
          imgurl: imageUrl,
          tshirtname: data.tshirtname,
          colorlist: colorTuple as [string],
          imagefile: zipFileUrl,
        };


        return await createTshirt.mutateAsync(createValue, {
          onSuccess: (response) => {
            toast({
              title: "Success",
              description: `${
                response.message || "T-shirt design created successfully"
              }`,
            });
            queryClient.invalidateQueries({
              queryKey: [QueryKey.TSHIRT.LIST],
            });

            form.reset({
              tshirtname: "",
              description: "",
              imgurl: "",
              colorlist: [],
              imagefile: "",
            });

            if (e.resetFiles && typeof e.resetFiles === "function") {
              e.resetFiles();
            }
          },
          onError: (error) => {
            console.error("Creation error:", error);
            toast({
              title: "Error",
              description: "Failed to create T-shirt design",
              variant: "destructive",
            });
          },
        });
      } catch (error) {
        console.error("Create submission error:", error);
        toast({
          title: "Error",
          description: "An error occurred while processing your request",
          variant: "destructive",
        });
        setIsUploading(false);
      }
    })(e);
  };

  return {
    form,
    onSubmit,
    isLoading: createTshirt.isPending,
    isUploading,
  };
};

export const useUpdateTshirtForm = (initialData?: Partial<TShirt>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { updateTshirt } = useTshirtMutation();
  const [isUploading, setIsUploading] = useState(false);

  // Use update schema only
  const form = useForm<TShirt>({
    resolver: zodResolver(TShirtUpdateSchema),
    defaultValues: {
      tshirtId: initialData?.tshirtId || "",
      tshirtname: initialData?.tshirtname || "",
      description: initialData?.description || "",
      imageFile: initialData?.imageFile || "",
      imageUrl: initialData?.imageUrl || "",
      createdAt: initialData?.createdAt || "",
    },
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        tshirtId: initialData.tshirtId || "",
        tshirtname: initialData.tshirtname || "",
        description: initialData.description || "",
        imageFile: initialData.imageFile || "",
        imageUrl: initialData.imageUrl || "",
        createdAt: initialData.createdAt || "",
      });
    }
    console.log("Initialized UPDATE T-shirt form");
  }, [initialData, form]);

  const onSubmit = async (e: any) => {
    const imageFile = e.imageFile;
    const zipFile = e.zipFile;

    if (e.preventDefault) {
      e.preventDefault();
    }

    return form.handleSubmit(async (data) => {
      try {
        if (!data.tshirtId) {
          toast({
            title: "Error",
            description: "Missing T-shirt ID for update",
            variant: "destructive",
          });
          return;
        }

        setIsUploading(true);
        console.log("UPDATE form data:", data);

        let imageUrl = data.imageUrl || "";

        if (imageFile) {
          try {
            const imageResponse = await FileService.post.upload(imageFile);
            imageUrl = imageResponse.data;
            console.log("Image uploaded successfully:", imageUrl);
          } catch (error) {
            console.error("Image upload error:", error);
            toast({
              title: "Image Upload Failed",
              description: "Could not upload design image",
              variant: "destructive",
            });
            setIsUploading(false);
            return;
          }
        }

        let zipFileUrl = data.imageFile || "";

        if (zipFile) {
          try {
            const zipResponse = await FileService.post.uploadZip(zipFile);
            zipFileUrl = zipResponse.data;
            console.log("ZIP uploaded successfully:", zipFileUrl);
          } catch (error) {
            console.error("ZIP upload error:", error);
            toast({
              title: "Source Files Upload Failed",
              description: "Could not upload source files",
              variant: "destructive",
            });
            setIsUploading(false);
            return;
          }
        }

        setIsUploading(false);

        // Update payload - specific to update operation
        const updateValue: TShirtUpdatePayload = {
          tshirtId: data.tshirtId,
          name: data.tshirtname,
          description: data.description,
          imageFile: zipFileUrl,
          imageUrl: imageUrl,
          createdAt: data.createdAt || new Date(),
        };

        console.log("Updating design with payload:", updateValue);

        return await updateTshirt.mutateAsync(updateValue, {
          onSuccess: (response) => {
            toast({
              title: "Success",
              description: `${
                response.message || "T-shirt design updated successfully"
              }`,
            });
            queryClient.invalidateQueries({
              queryKey: [QueryKey.TSHIRT.LIST],
            });
            queryClient.invalidateQueries({
              queryKey: [QueryKey.TSHIRT.DETAIL, data.tshirtId],
            });
          },
          onError: (error) => {
            console.error("Update error:", error);
            toast({
              title: "Error",
              description: "Failed to update T-shirt design",
              variant: "destructive",
            });
          },
        });
      } catch (error) {
        console.error("Update submission error:", error);
        toast({
          title: "Error",
          description: "An error occurred while processing your request",
          variant: "destructive",
        });
        setIsUploading(false);
      }
    })(e);
  };

  return {
    form,
    onSubmit,
    isLoading: updateTshirt.isPending,
    isUploading,
  };
};

// Keep the assign T-shirt form as is
export const useAssignTshirtForm = ({
  bookingDetail,
  selectedShirt,
  taskId,
}: {
  bookingDetail: BookingDetail | null;
  selectedShirt: string | null;
  taskId: string;
}) => {
  const { toast } = useToast();
  const { assignTshirt } = useAssignTshirtMutation();
  const queryClient = useQueryClient();

  const form = useForm<AssignTshirt>({
    resolver: zodResolver(AssignTshirtSchema),
    defaultValues: {
      bookingDetailId: bookingDetail?.bookingDetailId || "",
      tshirtId: selectedShirt || "",
    },
  });

  useEffect(() => {
    if (bookingDetail?.bookingDetailId) {
      form.setValue("bookingDetailId", bookingDetail.bookingDetailId);
    }
    if (selectedShirt) {
      form.setValue("tshirtId", selectedShirt);
    }
  }, [bookingDetail, selectedShirt, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    const value: AssignTshirt = {
      bookingDetailId: data.bookingDetailId,
      tshirtId: data.tshirtId,
    };

    console.log("Assigning T-shirt:", value);

    return assignTshirt.mutateAsync(value, {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description: `${response.message || "T-shirt assigned successfully"}`,
        });

        // Invalidate the specific task query
        queryClient.invalidateQueries({
          queryKey: [QueryKey.TASK.DETAIL, taskId],
        });
      },
      onError: (error) => {
        console.error("Assignment error:", error);
        toast({
          title: "Error",
          description:
            "T-Shirt is already assigned to another booking or failed to assign",
          variant: "destructive",
        });
        throw error;
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: assignTshirt.isPending,
  };
};
