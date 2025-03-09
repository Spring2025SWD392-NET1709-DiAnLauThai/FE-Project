import { ColorPayload } from "@/domains/models/color";
import { useCreateColor } from "./use-colors";
import { toast } from "../use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { useForm } from "react-hook-form";

interface ColorForm { 
    colorForm: ColorPayload;
}

export function useColorsForm() { 
    const queryClient = useQueryClient();
    const createColorMutation = useCreateColor().createColorMutation;

    const form = useForm<ColorForm>({
      defaultValues: {
            colorForm: {
                colorName: "",
                colorCode: "",
            },
      },
    });
    
    const onCreateColor = async (data: ColorPayload) => {
        try {
          console.log("Submitting color data:", data);
          await createColorMutation.mutateAsync(data);
          toast({
            title: "Success",
            description: "Color saved successfully",
          });
          queryClient.invalidateQueries({ queryKey: QueryKey.COLOR.CREATE });
          form.reset();
          return true;
        } catch (error) {
          console.error("Error creating color:", error);
          toast({
            title: "Error",
            description: "Failed to create color",
            variant: "destructive",
          });
          return false;
        }
    };

    const handleSubmit = form.handleSubmit((data) => {
      // Convert form data to ColorPayload format
      const colorPayload: ColorPayload = {
        colorName: data.colorForm.colorName,
        colorCode: data.colorForm.colorCode,
      };
      
      console.log("Form data:", data);
      console.log("Submitting payload:", colorPayload);
      
      return onCreateColor(colorPayload);
    });

    return {
      form,
      onCreateColor,
      handleSubmit,
      isSubmitting: createColorMutation.isPending,
    };
}