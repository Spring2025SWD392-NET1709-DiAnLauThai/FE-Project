"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAvailableTShirtsQuery } from "@/hooks/t-shirt/use-tshirt";
import { useParamStore } from "@/domains/stores/params-store";
import { BookingDetail } from "@/domains/models/tasks";
import { TShirtAvailableResponse } from "@/domains/models/tshirt";
import { Form } from "@/components/ui/form";
import { useAssignTshirtForm } from "@/hooks/t-shirt/use-tshirt-form";

export default function AssignTShirtModal({
  isOpen,
  onClose,
  onAssign,
  bookingDetail,
  isAssigning,
  taskId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (tshirtId: string) => void;
  bookingDetail: BookingDetail | null;
  isAssigning: boolean;
  taskId: string;
}) {
  const [selectedShirt, setSelectedShirt] = useState<string | null>(null);
  const { value } = useParamStore();

  const { form, onSubmit, isLoading } = useAssignTshirtForm({
    bookingDetail,
    selectedShirt,
    taskId,
  });

  const { queryAvailableTShirts, isLoadingAvaible, refetchAvailableTShirts } =
    useAvailableTShirtsQuery();

  const availableTShirts = queryAvailableTShirts?.data?.data || [];

  useEffect(() => {
    setSelectedShirt(null);
    refetchAvailableTShirts();
  }, [isOpen] );

  // Handle T-shirt selection
  const handleValueChange = (value: string) => {
    setSelectedShirt(value);
  };

  const handleAssign = async () => {
    if (!selectedShirt || !bookingDetail) {
      return;
    }

    try {
      await onSubmit();

      onClose();
    } catch (error) {
      console.error("Error in assignment:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAssign();
        }}
      >
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Assign T-Shirt</DialogTitle>
              <DialogDescription>
                Select a T-shirt to assign to this booking
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-medium">Booking Detail Information</h3>

                {bookingDetail ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Description
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: bookingDetail.description || "",
                        }}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Unit Price
                      </p>
                      <p className="font-medium">
                        {(bookingDetail.unitPrice || 0).toLocaleString()} VND
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Booking Image Preview
                      </p>
                      <div className="border rounded-md p-2 inline-block">
                        <Image
                          src={
                            (bookingDetail.design &&
                              bookingDetail.design.designFile) ||
                            "/placeholder.svg"
                          }
                          alt="Design Preview"
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center h-[200px] text-muted-foreground">
                    No booking detail selected
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Available T-Shirts</h3>

                {isLoadingAvaible ? (
                  <div className="flex flex-col justify-center items-center h-[300px] text-muted-foreground">
                    <Loader2 className="h-8 w-8 mb-2" />
                    <p>Loading available T-shirts...</p>
                  </div>
                ) : availableTShirts.length === 0 ? (
                  <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                    No T-shirts available
                  </div>
                ) : (
                  <ScrollArea className="h-[300px] pr-4">
                    <RadioGroup
                      value={selectedShirt || ""}
                      onValueChange={handleValueChange}
                      className="space-y-4"
                    >
                      {availableTShirts.map(
                        (shirt: TShirtAvailableResponse) => (
                          <div
                            key={shirt.tshirtId}
                            className="flex items-start space-x-3"
                          >
                            <RadioGroupItem
                              value={shirt.tshirtId}
                              id={`modal-shirt-${shirt.tshirtId}`}
                              className="mt-1"
                            />
                            <Label
                              htmlFor={`modal-shirt-${shirt.tshirtId}`}
                              className="flex-1 cursor-pointer"
                            >
                              <div
                                className={`flex gap-3 border rounded-md p-3 hover:bg-muted ${
                                  selectedShirt === shirt.tshirtId
                                    ? "bg-muted ring-2 ring-primary"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={shirt.imageUrl || "/placeholder.svg"}
                                  alt={shirt.name}
                                  width={80}
                                  height={80}
                                  className="object-cover rounded-md"
                                />
                                <div className="flex flex-col justify-center">
                                  <p className="font-medium">{shirt.name}</p>
                                  <p className="text-sm">{shirt.description}</p>
                                </div>
                              </div>
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </ScrollArea>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                onClick={handleAssign}
                disabled={!selectedShirt || isLoading || isAssigning}
                type="button"
              >
                {isLoading || isAssigning ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Assigning...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Assign T-Shirt
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
