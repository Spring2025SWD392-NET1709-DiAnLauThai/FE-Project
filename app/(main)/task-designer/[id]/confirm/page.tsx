"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Package, ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskDetail } from "@/hooks/tasks/use-task";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTaskConfirm } from "@/hooks/tasks/use-task-form";
import { Form } from "@/components/ui/form";

export default function ConfirmTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  useEffect(() => {
    try {
      // Get the stored value
      const storedValue = localStorage.getItem("currentBookingId");

      if (!storedValue) {
        console.error("No booking ID found in localStorage");
        return;
      }

      // Parse the stored value if it's a JSON string
      let parsedValue;
      try {
        parsedValue = JSON.parse(storedValue);
      } catch (e) {
        // If it's not valid JSON, use the raw string
        parsedValue = storedValue;
      }

      let extractedId = "";

      // Extract the actual ID
      if (typeof parsedValue === "object" && parsedValue !== null) {
        // If it's an object, extract the ID property
        // Adjust the property name based on your actual data structure
        if (parsedValue.id) {
          extractedId = parsedValue.id;
        } else if (parsedValue.bookingId) {
          extractedId = parsedValue.bookingId;
        } else {
          // If we can't find a specific ID property, try the first available property
          const firstKey = Object.keys(parsedValue)[0];
          if (firstKey) {
            extractedId = String(parsedValue[firstKey]);
          }
        }
      } else if (parsedValue) {
        // If it's already a primitive value, use it directly
        extractedId = String(parsedValue);
      }

      // Log the extracted ID before setting state
      console.log("Extracted booking ID:", extractedId);

      // Set the state
      setBookingId(extractedId);
    } catch (error) {
      console.error("Error retrieving booking ID:", error);
    }
  }, []);

  // Get task details from API
  const { data, isLoading, isError } = useTaskDetail(id as string);

  // Get form logic from the hook - only pass bookingId when it's available
  const { form, onSubmit, isSubmitting } = useTaskConfirm(bookingId);

  

  // Handle loading state for task data or bookingId
  if (isLoading || !bookingId) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <LoadingDots />
          <p className="text-muted-foreground">Loading task details...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError || !data) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Failed to load task details
        </h2>
        <p className="mt-2 text-muted-foreground">
          There was a problem fetching the task information. Please try again
          later.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Task Details
        </Button>
      </div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Confirm Task Completion</h1>
        <p className="text-muted-foreground">
          Review the booking details and assigned T-shirts before confirming
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          {data.bookingDetails && data.bookingDetails.length > 0 ? (
            <div className="space-y-8">
              {data.bookingDetails.map((detail, index) => (
                <Card key={detail.bookingDetailId}>
                  <CardHeader>
                    <CardTitle>Booking Detail #{index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">
                          Booking Image Preview
                        </h3>
                        <div className="border rounded-md p-2">
                          <Image
                            src={
                              (detail.design && detail.design.designFile) ||
                              "/placeholder.svg"
                            }
                            alt="Design Preview"
                            width={300}
                            height={300}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Assigned T-Shirt</h3>
                        {detail.tshirt ? (
                          <div className="flex items-start gap-4 border rounded-md p-4">
                            <Image
                              src={detail.tshirt.imageUrl || "/placeholder.svg"}
                              alt="Assigned T-Shirt"
                              width={300}
                              height={300}
                              className="object-contain rounded-md"
                            />
                            <div>
                              <p className="font-medium">
                                {detail.tshirt.name}
                              </p>
                              <p
                                className="text-sm text-muted-foreground"
                                dangerouslySetInnerHTML={{
                                  __html: detail.tshirt.description || "",
                                }}
                              ></p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 border rounded-md p-4 bg-muted/50">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              No T-shirt assigned yet
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <div className="border rounded-md p-4 bg-muted/30">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: detail.description || "",
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No booking details available
            </div>
          )}

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-32"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={() => setIsConfirmDialogOpen(true)}
              className="w-32"
              disabled={
                isSubmitting ||
                !data.bookingDetails?.every((detail) => detail.tshirt)
              }
            >
              Confirm
            </Button>
          </div>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Task Completion</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this task? Once confirmed, you
              will not be able to make further changes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting && <LoadingDots />}
              {!isSubmitting && <Check className="h-4 w-4" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
