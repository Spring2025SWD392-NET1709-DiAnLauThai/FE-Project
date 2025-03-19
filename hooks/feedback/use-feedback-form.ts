import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { QueryKey } from "@/domains/stores/query-key";
import { FeedbackPayload } from "@/domains/models/feedback";
import { useCreateFeedback } from "./use-feedback";


// Define feedback schema using Zod for validation
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment must not exceed 500 characters"),
  tshirtId: z.string(),
});

// Define form type from schema
type FeedbackForm = z.infer<typeof feedbackSchema>;

export function useFeedbackForm(tshirtId: string) {
  // Access the query client for cache invalidation
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
    const createFeedback = useCreateFeedback().createFeedbackMutation;

    // Create feedback mutation
    
      const form = useForm<FeedbackForm>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
          rating: 0,
          comment: "",
          tshirtId: tshirtId,
        },
      });
        
        const onCreateFeedback = async (data: FeedbackForm) => {
          try {
            console.log("Submitting color data:", data);
            await createFeedback.mutateAsync(data);
            toast({
              title: "Success",
              description: "Color saved successfully",
            });
            queryClient.invalidateQueries({ queryKey: QueryKey.TSHIRT.DETAIL });
            form.reset();
            return true;
          } catch (error) {
            console.error("Error creating color:", error);
            toast({
              title: "Error",
              description: "You have already submitted feedback for this tshirt",
              variant: "destructive",
            });
            return false;
          }
        };
    
        const handleSubmit = form.handleSubmit((data) => {
          // Convert form data to ColorPayload format
          const feedbackPayload: FeedbackPayload = {
              tshirtId: data.tshirtId,
              rating: data.rating,
                comment: data.comment
          };
          
          console.log("Form data:", data);
          
          return onCreateFeedback(feedbackPayload);
        });
    
        return {
          form,
          handleSubmit,
          isSubmitting: createFeedback.isPending,
        };


    
}
