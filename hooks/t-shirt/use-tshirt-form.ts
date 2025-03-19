import { TShirtPayload } from "@/domains/models/tshirt";
import { AssignTshirt, AssignTshirtSchema, TShirt, TShirtSchema } from "@/domains/schemas/t-shirt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAssignTshirtMutation, useTshirtMutation } from "./use-tshirt";
import { useToast } from "../use-toast";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { useEffect, useState } from "react";
import { BookingDetail } from "@/domains/models/tasks";
import { FileService } from "@/domains/services/file";

export const useTshirtForm = (id?: string) => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { createTshirt, updateTshirt } = useTshirtMutation();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<TShirt>({
    resolver: zodResolver(TShirtSchema),
    defaultValues: {
      description: "",
      imgurl: "",
      tshirtname: "",
      colorlist: [],
      imagefile: "",
    },
  });

  // Update the onSubmit function

  const onSubmit = async (e: any) => {
    // Extract the file references from the custom event
    const imageFile = e.imageFile;
    const zipFile = e.zipFile;

    // Prevent default form submission behavior
    if (e.preventDefault) {
      e.preventDefault();
    }

    return form.handleSubmit(async (data) => {
      try {
        setIsUploading(true); 
        const colorTuple =
          data.colorlist.length > 0 ? [data.colorlist[0]] : [""];

        let imageUrl = "";
        if (imageFile) {
          const formData = new FormData();
          formData.append("file", imageFile);

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
            setIsUploading(false); // Reset uploading state on failure

            return;
          }
        }

        let zipFileUrl = "";
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
            setIsUploading(false); // Reset uploading state on failure

            return;
          }
        }


        setIsUploading(false);

        const value: TShirtPayload = {
          description: data.description,
          imgurl: imageUrl,
          tshirtname: data.tshirtname,
          colorlist: colorTuple as [string],
          imagefile: zipFileUrl,
        };

        console.log("Saving design with payload:", value);

        if (id) {
          await updateTshirt.mutate(
            { id, data: value },
            {
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
              },
              onError: (error) => {
                console.error("Update error:", error);
                toast({
                  title: "Error",
                  description: "Failed to update T-shirt design",
                  variant: "destructive",
                });
              },
            }
          );
        } else {
          await createTshirt.mutate(value, {
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
                description: "",
                imgurl: "",
                tshirtname: "",
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
        }
      } catch (error) {
        console.error("Submission error:", error);
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
    isLoading: createTshirt.isPending || updateTshirt.isPending,
    isUploading,
  };
};

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
