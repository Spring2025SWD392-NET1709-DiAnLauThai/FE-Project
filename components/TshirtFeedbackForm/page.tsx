"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFeedbackForm } from "@/hooks/feedback/use-feedback-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface TshirtFeedbackFormProps {
  tshirtId: string;
}

export default function TshirtFeedbackForm({
  tshirtId,
}: TshirtFeedbackFormProps) {
  const router = useRouter();

  // Use the feedback form hook
  const { form, handleSubmit, isSubmitting } = useFeedbackForm(tshirtId);

  // Get form values for star rating display
  const watchRating = form.watch("rating");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          watchRating >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="detail">Your feedback</FormLabel>
              <FormControl>
                <Textarea
                  id="detail"
                  placeholder="Share your thoughts about this t-shirt..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </Form>
  );
}
