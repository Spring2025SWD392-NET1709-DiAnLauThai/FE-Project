"use client";

import { useState } from "react";
import { ClipboardX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCancelBooking } from "@/hooks/booking/use-booking-form";
import { useRouter } from "next/navigation";

interface CancelBookingButtonProps {
  bookingId: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export function CancelBookingButton({
  bookingId,
  variant = "destructive",
  size = "default",
  disabled = false,
}: CancelBookingButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { form, onSubmit, isLoading } = useCancelBooking(bookingId);

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} disabled={disabled}>
          <ClipboardX className="h-4 w-4 mr-2" />
          Cancel Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for cancellation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please explain why you are cancelling this booking..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex space-x-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isLoading}>
                {isLoading ? "Cancelling..." : "Confirm Cancellation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
