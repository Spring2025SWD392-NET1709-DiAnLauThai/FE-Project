import { TShirtPayload } from "@/domains/models/tshirt";
import { AssignTshirt, AssignTshirtSchema, TShirt, TShirtSchema } from "@/domains/schemas/t-shirt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAssignTshirtMutation, useTshirtMutation } from "./use-tshirt";
import { useToast } from "../use-toast";
import { QueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { useEffect } from "react";
import { BookingDetail } from "@/domains/models/tasks";

export const useTshirtForm = (id?: string) => {
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { createTshirt, updateTshirt } = useTshirtMutation();

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

  const onSubmit = form.handleSubmit(async (data) => {
      // Fix the array type mismatch by converting to the expected tuple format
      const colorTuple = data.colorlist.length > 0 ? [data.colorlist[0]] : [""];
      
      
      const value: TShirtPayload = {
        description: data.description,
        imgurl: data.imgurl,
        tshirtname: data.tshirtname,
        colorlist: colorTuple as [string], // Convert to tuple with exactly one element
        imagefile: data.imagefile, // Use the URL from the upload response
      };

      console.log("Saving design:", value);

      if (id) {
        // Update existing t-shirt
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
              queryClient.invalidateQueries({ queryKey: [QueryKey.TSHIRT.LIST] });
            },
            onError: (error) => {
              console.error("Update error:", error);
              toast({
                title: "Error",
                description: "Failed to update t-shirt design",
                variant: "destructive",
              });
            },
          }
        );
      } else {
        // Create new t-shirt
        await createTshirt.mutate(value, {
          onSuccess: (response) => {
            toast({
              title: "Success",
              description: `${
                response.message || "T-shirt design created successfully"
              }`,
            });
            queryClient.invalidateQueries({ queryKey: [QueryKey.TSHIRT.LIST] });
            form.reset(); // Reset form after successful creation
          },
          onError: (error) => {
            console.error("Creation error:", error);
            toast({
              title: "Error",
              description: "Failed to create t-shirt design",
              variant: "destructive",
            });
          },
        });
      }
    
  });

  return {
    form,
    onSubmit,
    isLoading: createTshirt.isPending || updateTshirt.isPending,
  };
};

export const useAssignTshirtForm = ({ 
  bookingDetail, 
  selectedShirt 
}: { 
  bookingDetail: BookingDetail | null;
  selectedShirt: string | null;
}) => {
  const { toast } = useToast();
  const { assignTshirt } = useAssignTshirtMutation();
  const queryClient = new QueryClient();
  
  const form = useForm<AssignTshirt>({
    resolver: zodResolver(AssignTshirtSchema),
    defaultValues: {
      bookingDetailId: bookingDetail?.bookingDetailId || "",
      tshirtId: selectedShirt || "",
    },
  });

  // Update form values when props change
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

    await assignTshirt.mutate(value, {
      onSuccess: (response) => {
        toast({
          title: "Success",
          description: `${response.message || "T-shirt assigned successfully"}`,
        });
        queryClient.invalidateQueries({ queryKey: [QueryKey.TSHIRT.LIST] });
      },
      onError: (error) => {
        console.error("Assignment error:", error);
        toast({
          title: "Error",
          description: "T-Shirt is already assigned to another booking or failed to assign",
          variant: "destructive",
        });
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: assignTshirt.isPending,
  };
};
