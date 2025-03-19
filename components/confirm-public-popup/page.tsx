"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePublicBookingMutation } from "@/hooks/booking/use-booking-form";
import { GlobeIcon, Loader2 } from "lucide-react";
import { useState } from "react";

export function PublishBookingButton({ bookingId }: { bookingId: string }) {
  const [open, setOpen] = useState(false);
  const { handlePublish, isLoading } = usePublicBookingMutation(bookingId);

  const onPublish = async () => {
    try {
      await handlePublish();
      setOpen(false);
    } catch (error) {
      console.error("Error publishing booking:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
      >
        <GlobeIcon className="h-6 w-6" />
        <span>Publish</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to publish this booking? This will make the
              booking publicly available to the designer team.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={onPublish} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
