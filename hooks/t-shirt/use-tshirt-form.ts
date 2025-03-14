import { TShirtPayload } from "@/domains/models/tshirt";
import { TShirt, TShirtSchema } from "@/domains/schemas/t-shirt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTshirtMutation } from "./use-tshirt";
import { useToast } from "../use-toast";
import { QueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";

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
      imagefile: "",
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
