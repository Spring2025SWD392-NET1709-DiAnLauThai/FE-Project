"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarIcon,
  Clock,
  DollarSign,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useBookingDetailsQuery } from "@/hooks/booking/use-booking";
import { FormatType, formatFromISOStringVN } from "@/lib/format";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import { Textarea } from "@/components/ui/textarea";

export default function CustomerBookingDetailPage() {
  const { id } = useParams();
  const { data: booking, isLoading: bookingLoading } = useBookingDetailsQuery(
    id as string
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "DEPOSIT_PAID":
        return {
          color: "bg-amber-500",
          label: "Deposit Paid",
          description: "We've received your deposit. Your project is in queue.",
        };
      case "IN_PROGRESS":
        return {
          color: "bg-blue-500",
          label: "In Progress",
          description: "Our designers are currently working on your project.",
        };
      case "COMPLETED":
        return {
          color: "bg-green-500",
          label: "Completed",
          description: "Your project has been completed successfully.",
        };
      case "CANCELLED":
        return {
          color: "bg-red-500",
          label: "Cancelled",
          description: "This booking has been cancelled.",
        };
      default:
        return {
          color: "bg-gray-500",
          label: status.replace("_", " "),
          description: "Contact support for more information.",
        };
    }
  };

  const statusInfo = getStatusInfo(booking?.data.bookingStatus || "UNKNOWN");

  // Calculate days remaining
  const endDate = new Date(booking?.data.enddate || new Date());
  const today = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Calculate progress percentage
  const startDate = new Date(booking?.data.startdate || new Date());
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysPassed = Math.ceil(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const progressPercentage = Math.min(
    100,
    Math.max(0, Math.round((daysPassed / totalDays) * 100))
  );

  if (bookingLoading || !booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Your Booking Details
        </h1>
        <p className="text-muted-foreground">
          Booking Reference: {booking?.data.code}
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>{booking?.data.title}</CardTitle>
              <CardDescription>
                Created on{" "}
                {formatFromISOStringVN(
                  booking?.data.datecreated || new Date(),
                  FormatType.DATETIME_VN
                )}
              </CardDescription>
            </div>
            <Badge className={`${statusInfo.color} px-3 py-1 text-white`}>
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="bg-muted/40 rounded-lg p-4 mb-6">
            <p>{statusInfo.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Project Timeline
            </h3>
            <div className="w-full bg-muted rounded-full h-2.5 mb-2">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>
                {formatFromISOStringVN(
                  booking?.data.startdate || new Date(),
                  FormatType.DATETIME_VN
                )}
              </span>
              <span>
                {formatFromISOStringVN(
                  booking?.data.enddate || new Date(),
                  FormatType.DATETIME_VN
                )}
              </span>
            </div>
            {daysRemaining > 0 && (
              <p className="text-sm mt-2 text-center font-medium">
                {daysRemaining} days remaining
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Booking Period
                </h3>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p>
                    {formatFromISOStringVN(
                      booking?.data.startdate || new Date(),
                      FormatType.DATETIME_VN
                    )}{" "}
                    -{" "}
                    {formatFromISOStringVN(
                      booking?.data.enddate || new Date(),
                      FormatType.DATETIME_VN
                    )}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Total Price
                </h3>
                <div className="flex items-center">
                  <p className="font-bold">
                    {formatCurrency(booking?.data.totalPrice || 0)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Last Updated
                </h3>
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

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p>{booking?.data.totalQuantity}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Description
                </h3>
                <p>
                  {booking?.data.bookingDetails?.length ?? 0 > 1
                    ? `${booking?.data.bookingDetails.length} design items included`
                    : booking?.data.bookingDetails[0].description}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-medium mb-4">
              Your Design
              {booking?.data.bookingDetails?.length ?? 0 > 1 ? "s" : ""}
            </h3>
            <div className="grid gap-8">
              {booking?.data.bookingDetails.map((detail, index) => (
                <div
                  key={detail.bookingDetailId + "-" + index}
                  className="space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(detail.unitPrice)} per unit
                    </p>
                  </div>
                  <div
                    className="text-sm mb-3"
                    dangerouslySetInnerHTML={{ __html: detail.description }}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <Image
                        src={detail.designFile || "/placeholder.svg"}
                        alt={`Design ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="size-10" />
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Image
                        src={detail.designFile || "/placeholder.svg"}
                        alt={`Design ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h2>Note</h2>
                    <Textarea
                      className="resize-none"
                      // value={detail.note}
                      // disabled
                    />
                  </div>

                  {index < booking?.data.bookingDetails.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button className="w-full sm:w-auto">Contact Support</Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Download Details
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Need help with your booking? Contact our customer support at
          support@example.com
        </p>
      </div>
    </div>
  );
}
