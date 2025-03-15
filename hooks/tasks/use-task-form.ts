import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { useAssignDesignerMutation, useConfirmTaskMutation } from "./use-task";
import { useToast } from "../use-toast";
import { QueryKey } from "@/domains/stores/query-key";
import { TaskConfirm } from "@/domains/models/tasks";
import { AssignDesignerFormValues, AssignDesignerSchema } from "@/domains/schemas/t-shirt.schema";
import { ConfirmTaskFormValues, ConfirmTaskSchema } from "@/domains/schemas/task/task.schema";
import { useEffect } from "react";

// Create form schema


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
export function useTaskConfirm(id: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { confirmTask } = useConfirmTaskMutation();

  const form = useForm<ConfirmTaskFormValues>({
    resolver: zodResolver(ConfirmTaskSchema),
    defaultValues: {
      bookingId: id, // Set the ID as the default value
    },
  });

  // Override the form value with the id parameter to ensure consistency
  useEffect(() => {
    form.setValue("bookingId", id);
  }, [form, id]);

  const onSubmit = form.handleSubmit(async (values) => {
    // Extract the bookingId from the form values
    const bookingId = values.bookingId;
    
    // Log the actual ID being used
    console.log("Submitting confirmation with bookingId:", bookingId);
    
    // Call the mutation with the string ID, not an object
    confirmTask.mutate(
      
        bookingId,
      
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Task confirmed successfully",
          });
          queryClient.invalidateQueries({ queryKey: [QueryKey.TASK.LIST] });
        },
        onError: (error) => {
          console.error("Error confirm task:", error);
          toast({
            title: "Error",
            description: "Failed to confirm task. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isSubmitting: confirmTask.isPending,
  };

}
