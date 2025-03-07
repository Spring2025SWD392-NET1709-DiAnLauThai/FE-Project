"use client";

import { useBookingDetailsQuery } from "@/hooks/booking/use-booking";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingResponse, BookingStatus } from "@/domains/models/booking";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { DataTablePagination } from "../table/Pagination";
import { PlusIcon } from "lucide-react";

interface BookingDetailModalProps {
  booking: BookingResponse;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDetailModal({
  booking,
  isOpen,
  onClose,
}: BookingDetailModalProps) {
  const [params, setParams] = useState({
    bookingId: booking.id,
    page: 1,
    size: 100,
  });

  const { data, isPending } = useBookingDetailsQuery(params);

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page: page,
    });
  };

  // Define badge color based on status
  const getBadgeClass = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case BookingStatus.CONFIRMED:
        return "bg-green-500 hover:bg-green-600 text-white";
      case BookingStatus.COMPLETE:
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case BookingStatus.DEPOSIT_PAID:
        return "bg-purple-500 hover:bg-purple-600 text-white";
      case BookingStatus.REFUNDED:
        return "bg-orange-500 hover:bg-orange-600 text-white";
      case BookingStatus.UNPAID:
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  // Calculate total from details
  const calculateTotal = () => {
    if (!data?.data?.content) return 0;
    return data.data.content.reduce((sum, item) => sum + item.unitPrice, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[100vh] overflow-y-auto">
        <DialogHeader className="my-5">
          <DialogTitle className="flex items-center justify-between">
            <span>Booking #{booking.code}</span>
            <Badge className={getBadgeClass(booking.status)}>
              {booking.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Booking Summary</TabsTrigger>
            <TabsTrigger value="details">Booking Details</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{booking.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Booking Code
                    </p>
                    <p className="font-medium">{booking.code}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Price
                    </p>
                    <p className="font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(booking.totalPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Quantity
                    </p>
                    <p className="font-medium">{booking.totalQuantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Start Date
                    </p>
                    <p className="font-medium">
                      {format(new Date(booking.startDate), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      End Date
                    </p>
                    <p className="font-medium">
                      {format(new Date(booking.endDate), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <Badge className={getBadgeClass(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-4 space-y-4">
            {isPending ? (
              <div className="h-48 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {data?.data?.content && data.data.content.length > 0 ? (
                  <>
                    {data.data.content.map((item, index) => (
                      <Card
                        key={item.bookingDetailId}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Design Image */}
                          <div className="w-full md:w-1/3 relative h-48 md:h-auto">
                            <Image
                              src={item.designFile}
                              alt="Design"
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder-image.png";
                              }}
                            />
                          </div>

                          {/* Design Details */}
                          <div className="p-4 w-full md:w-2/3">
                            <h3 className="font-semibold text-lg">
                              Design #{index + 1}
                            </h3>

                            <div className="mt-2 space-y-3">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Description
                                </p>
                                <p>
                                  {item.description ||
                                    "No description provided"}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Unit Price
                                  </p>
                                  <p className="font-medium">
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(item.unitPrice)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Design ID
                                  </p>
                                  <p className="font-mono text-xs truncate">
                                    {item.designId}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Desginer</div>
                          <div className="flex items-center text-sm text-blue-600">
                            <PlusIcon className="w-4 h-4 mr-1" />
                            <span>Assign Designer</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">Total Amount</div>
                          <div className="font-bold">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(calculateTotal())}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex items-center justify-end px-2">
                      <DataTablePagination
                        currentPage={(params.page || 0) + 1}
                        totalPages={data?.data?.totalPages || 1}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-muted-foreground">
                      No design details available for this booking.
                    </p>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
