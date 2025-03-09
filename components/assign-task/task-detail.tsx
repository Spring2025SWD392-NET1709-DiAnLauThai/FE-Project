"use client";

import { useState } from "react";
import { useBookingDetailsQuery } from "@/hooks/booking/use-booking";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, TaskStatus } from "@/domains/models/tasks";
import { format } from "date-fns";
import Image from "next/image";

interface TaskDetailModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailModal({
  task,
  isOpen,
  onClose,
}: TaskDetailModalProps) {
  // Set up booking query params
  const [bookingParams, setBookingParams] = useState({
    bookingId: task.bookingId || "",
    page: 1,
    size: 100,
  });

  // Fetch booking details
  const { data, isPending } = useBookingDetailsQuery(bookingParams);

  // Get badge color based on task status
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.ASSIGNED:
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case TaskStatus.COMPLETED:
        return "bg-green-500 hover:bg-green-600 text-white";
      case TaskStatus.DENIED:
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  // Calculate total from booking details
  const calculateTotal = () => {
    if (!data?.data?.content) return 0;
    return data.data.content.reduce((sum, item) => sum + item.unitPrice, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[100vh] overflow-y-auto">
        <DialogHeader className="my-5">
          <DialogTitle className="flex items-center justify-between">
            <span>Task #{task.taskId}</span>
            <Badge className={getStatusBadge(task.taskStatus as TaskStatus)}>
              {task.taskStatus}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="task" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="task">Task Summary</TabsTrigger>
            <TabsTrigger value="booking">Booking Details</TabsTrigger>
          </TabsList>

          {/* Task Summary tab content */}
          <TabsContent value="task" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Task ID
                    </p>
                    <p className="font-medium">{task.taskId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Assigned To
                    </p>
                    <p className="font-medium">
                      {task.designerName || "Not assigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Booking ID
                    </p>
                    <p className="font-medium truncate">{task.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Start Date
                    </p>
                    <p className="font-medium">
                      {task.startDate
                        ? format(new Date(task.startDate), "dd/MM/yyyy")
                        : "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Deadline
                    </p>
                    <p className="font-medium">
                      {task.endDate
                        ? format(new Date(task.endDate), "dd/MM/yyyy")
                        : "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <Badge
                      className={getStatusBadge(task.taskStatus as TaskStatus)}
                    >
                      {task.taskStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Details tab content */}
          <TabsContent value="booking" className="mt-4 space-y-4">
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
                              src={item.designFile || "/placeholder-image.png"}
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
