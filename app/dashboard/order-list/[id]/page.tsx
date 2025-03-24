"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, Clock, DollarSign, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useBookingDetailsQuery } from "@/hooks/booking/use-booking";
import {
  formatFromISOStringVN,
  formatPriceToVND,
  FormatType,
} from "@/lib/format";
import { useUser } from "@/hooks/user/use-user";
import { Role } from "@/domains/enums";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAssignDesignerForm } from "@/hooks/tasks/use-task-form";

export default function BookingDetailPage() {
  const { id } = useParams();
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [localDesignerName, setLocalDesignerName] = useState<string | null>(
    null
  );
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [assignmentComplete, setAssignmentComplete] = useState(false);

  const { data: users, isLoading: usersLoading } = useUser({
    role: Role.DESIGNER,
    size: 100,
    page: 1,
  });
  const { data: booking, isLoading: bookingLoading } = useBookingDetailsQuery(
    id as string
  );

  const {
    form,
    onSubmit: originalSubmit,
    isSubmitting,
  } = useAssignDesignerForm(id as string);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const onSubmit = async (data: any) => {
    try {
      // Reset states
      setUpdateSuccessful(false);

      // Wait for the API call to complete
      await originalSubmit(data);

      // Set successful state
      setUpdateSuccessful(true);

      // Find the designer name
      if (selectedDesigner) {
        const designerName =
          users?.data.content.find((d) => d.id === selectedDesigner)?.name ||
          "";

        // Set the designer name
        setLocalDesignerName(designerName);

        // Delay the UI transition to ensure it's visible to user
        setTimeout(() => {
          // Set assignment complete to trigger the UI change
          setAssignmentComplete(true);
        }, 3000); // 2 second delay to show the success message
      }
    } catch (error) {
      console.error("Error assigning designer:", error);
    }
  };

  // Reset states when booking data changes
  useEffect(() => {
    if (booking?.data.designerName) {
      setAssignmentComplete(true);
    } else {
      setAssignmentComplete(false);
    }
  }, [booking]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DEPOSIT_PAID":
        return "bg-amber-500";
      case "COMPLETED":
        return "bg-green-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  if (
    bookingLoading ||
    usersLoading ||
    booking === undefined ||
    users === undefined
  ) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
          <p className="text-muted-foreground">
            Manage booking {booking?.data.code}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Badge className={getStatusColor(booking?.data.bookingStatus || "")}>
            {booking?.data.bookingStatus.replace("_", " ")}
          </Badge>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
            <CardDescription>
              Created on{" "}
              {formatFromISOStringVN(
                booking?.data.datecreated || new Date(),
                FormatType.DATETIME_VN
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Booking Code
                </p>
                <p className="font-medium">{booking?.data.code}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Title
                </p>
                <p className="font-medium">{booking?.data.title}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Start Date
                </p>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p>
                    {formatFromISOStringVN(
                      booking?.data.startdate || new Date(),
                      FormatType.DATETIME_VN
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  End Date
                </p>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p>
                    {formatFromISOStringVN(
                      booking?.data.enddate || new Date(),
                      FormatType.DATETIME_VN
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Price
                </p>
                <div className="flex items-center">
                  <p className="font-bold">
                    {formatPriceToVND(booking?.data.totalPrice || 0)} VNĐ
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p>
                    {formatFromISOStringVN(
                      booking?.data.updateddate || new Date(),
                      FormatType.DATETIME_VN
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Booking Details</h3>
              {booking?.data.bookingDetails.map((detail) => (
                <div key={detail.bookingDetailId} className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Description
                    </p>
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{ __html: detail.description }}
                    />
                    {/* <p>{detail.description}</p> */}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Unit Price
                    </p>
                    <p className="font-medium">
                      {formatPriceToVND(detail.unitPrice)} VNĐ
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Design File
                    </p>
                    <div className="border rounded-md overflow-hidden max-w-md">
                      <Image
                        src={detail.designFile || "/placeholder.svg"}
                        alt="Design File"
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.getValues());
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Assign Designer</CardTitle>
                <CardDescription>
                  Select a designer to work on this booking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {booking?.data.designerName ||
                (assignmentComplete && localDesignerName) ? (
                  <div className="p-4 border rounded-md bg-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-5 w-5 text-primary" />
                      <p className="font-medium text-lg">
                        {localDesignerName || booking?.data.designerName}
                      </p>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      Currently Assigned
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-4">
                      This booking is already assigned to the designer above. To
                      change the assignment, you need to remove the current
                      assignment first.
                    </p>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="designerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designer</FormLabel>
                        <Select
                          defaultValue={field.value}
                          {...field}
                          onValueChange={(value) => {
                            setSelectedDesigner(value);
                            field.onChange(value);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger id="designer">
                              <SelectValue placeholder="Select a designer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {users?.data?.content.map((designer) => (
                              <SelectItem key={designer.id} value={designer.id}>
                                {designer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {selectedDesigner && (
                            <section className="p-4 border rounded-md bg-muted/50">
                              <section className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">
                                  {
                                    users.data.content.find(
                                      (d) => d.id === selectedDesigner
                                    )?.name
                                  }
                                </p>
                              </section>
                              <p className="text-sm text-muted-foreground">
                                This designer will be notified about the
                                assignment and will have access to all booking
                                details.
                              </p>
                            </section>
                          )}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
              <CardFooter>
                {booking?.data.designerName ||
                (assignmentComplete && localDesignerName) ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    disabled
                  >
                    Already Assigned
                  </Button>
                ) : (
                  <Button className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Submitting..."
                      : updateSuccessful
                      ? "Successfully Assigned!"
                      : "Assign & Submit"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
