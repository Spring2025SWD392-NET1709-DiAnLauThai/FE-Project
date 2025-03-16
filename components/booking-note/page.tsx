import { useUpdateDescription } from "@/hooks/booking/use-booking-form";
import { useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface DetailNoteFormProps {
  detailId: string;
  isEditable: boolean;
  initialDescription?: string;
}

export function DetailNoteForm({
  detailId,
  isEditable,
  initialDescription,
}: DetailNoteFormProps) {
  const { form, onSubmit, isLoading } = useUpdateDescription(detailId);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditable || isLoading) return;

    setIsSending(true);
    try {
      await onSubmit();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder={
                      isEditable
                        ? "Enter your note here..."
                        : "Notes can only be added during the first half of the booking period."
                    }
                    disabled={!isEditable || isLoading || isSending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isEditable && (
            <Button
              type="submit"
              size="sm"
              className="self-end"
              disabled={isLoading || isSending}
            >
              {isSending ? "Sending..." : "Send Note"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
