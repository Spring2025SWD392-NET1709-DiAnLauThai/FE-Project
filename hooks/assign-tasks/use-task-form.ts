import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { useAssignDesignerMutation } from "./use-task";
import { useToast } from "../use-toast";
import { QueryKey } from "@/domains/stores/query-key";

// Create form schema
export const AssignDesignerSchema = z.object({
  designerId: z.string({
    required_error: "Please select a designer",
  }),
});

export type AssignDesignerFormValues = z.infer<typeof AssignDesignerSchema>;

export function useAssignDesignerForm(task: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { assignDesigner } = useAssignDesignerMutation();

  const form = useForm<AssignDesignerFormValues>({
    resolver: zodResolver(AssignDesignerSchema),
    defaultValues: {
      designerId: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    assignDesigner.mutate(
      {
        bookingId: task,
        designerId: values.designerId,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Designer assigned successfully",
          });
          queryClient.invalidateQueries({ queryKey: [QueryKey.DESIGNER.LIST] });
        },
        onError: (error) => {
          console.error("Error assigning designer:", error);
          toast({
            title: "Error",
            description: "Failed to assign designer. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isSubmitting: assignDesigner.isPending,
  };
}
