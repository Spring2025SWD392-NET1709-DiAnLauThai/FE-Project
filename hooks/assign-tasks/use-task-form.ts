import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as z from "zod";
import { useAssignDesignerMutation } from "./use-task";
import { useToast } from "../use-toast";
import { QueryKey } from "@/domains/stores/query-key";
import { Task } from "@/domains/models/tasks";
import { BookingResponse } from "@/domains/models/booking";

// Create form schema
const AssignDesignerSchema = z.object({
  designerId: z.string({
    required_error: "Please select a designer",
  }),
});

export type AssignDesignerFormValues = z.infer<typeof AssignDesignerSchema>;

export function useAssignDesignerForm(task: BookingResponse, onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { assignDesigner } = useAssignDesignerMutation();

  // Initialize form
  const form = useForm<AssignDesignerFormValues>({
    resolver: zodResolver(AssignDesignerSchema),
    defaultValues: {
      designerId: "",
    },
  });

  const onSubmit = async (values: AssignDesignerFormValues) => {
    setIsSubmitting(true);

    try {
      await assignDesigner.mutateAsync({
        bookingId: task.id, // Correct property name: bookingId instead of orderId
        designerId: values.designerId,
      });

      // Invalidate tasks query to refresh data
      queryClient.invalidateQueries({ queryKey: [QueryKey.DESIGNER.LIST] });

      onSuccess();
    } catch (error) {
      console.error("Error assigning designer:", error);
      toast({
        title: "Error",
        description: "Failed to assign designer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    formSchema: AssignDesignerSchema,
  };
}
