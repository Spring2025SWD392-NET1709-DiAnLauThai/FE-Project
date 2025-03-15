"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Check,
  Clock,
  DollarSign,
  InfoIcon,
  Package,
  Plus,
  User,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskDetail, BookingDetail } from "@/domains/models/tasks";
import { useParams } from "next/navigation";
import { useTaskDetail } from "@/hooks/tasks/use-task";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import AssignTShirtModal from "@/components/assign-tshirt/page";
import { toast } from "sonner";
import { TShirtResponse } from "@/domains/models/tshirt";
import { formatFromISOStringVN, FormatType } from "@/lib/format";

export default function TaskDetailPage() {
  const { id } = useParams();
  const [selectedBookingDetail, setSelectedBookingDetail] =
    useState<BookingDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  // Get task details from API
  const { data, isLoading, isError, refetch } = useTaskDetail(id as string);

  // We need to access the actual task data from the response
  const taskData: TaskDetail = data;

  const handleAssignTShirt = async (tshirtId: string) => {
    console.log("Attempting to assign T-shirt:", {
      tshirtId,
      bookingDetailId: selectedBookingDetail?.bookingDetailId,
      bookingDetail: selectedBookingDetail,
    });

    if (!selectedBookingDetail) {
      console.error("No booking detail selected");
      toast.error("No booking detail selected");
      return;
    }

    setIsAssigning(true);

    try {
      console.log("Assignment payload:", {
        bookingDetailId: selectedBookingDetail.bookingDetailId,
        tshirtId: tshirtId,
      });

      // After assignment is complete
      toast.success(
        `T-shirt ${tshirtId} assigned to booking detail ${selectedBookingDetail.bookingDetailId}`
      );

      // Refresh task data
      await refetch();

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Assignment error:", error);
      toast.error("Failed to assign T-shirt");
    } finally {
      setIsAssigning(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch (e) {
      return dateString || "N/A";
    }
  };

  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-500";

    switch (status) {
      case "DEPOSITED":
        return "bg-amber-500";
      case "COMPLETED":
        return "bg-green-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Handle opening the T-shirt assignment modal
  const handleOpenAssignModal = (bookingDetail: BookingDetail) => {
    console.log("Opening modal for booking detail:", bookingDetail);
    setSelectedBookingDetail(bookingDetail);
    setIsModalOpen(true);
  };

  // Handle loading state
  if (isLoading) {
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
  if (isError || !taskData) {
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
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Task Details Section (2/3) */}
        <div className="w-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {taskData.title || "Task Details"}
              </h1>
              <p className="text-muted-foreground">
                Task Code: {taskData.code || "N/A"}
              </p>
            </div>
            <Badge
              className={`${getStatusColor(taskData.bookingStatus)} text-white`}
            >
              {taskData.bookingStatus || "Unknown Status"}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">
                  {formatFromISOStringVN(
                    taskData.datecreated,
                    FormatType.DATETIME_VN
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {formatFromISOStringVN(
                    taskData.updateddate,
                    FormatType.DATETIME_VN
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">
                  {formatFromISOStringVN(
                    taskData.startdate,
                    FormatType.DATETIME_VN
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">
                  {formatFromISOStringVN(
                    taskData.enddate,
                    FormatType.DATETIME_VN
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Designer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                {taskData.designerName || "Not assigned"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="font-medium">
                    {(taskData.totalPrice || 0).toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{taskData.totalQuantity || 0}</p>
                </div>
              </div>

              <Separator />

              {taskData.bookingDetails && taskData.bookingDetails.length > 0 ? (
                taskData.bookingDetails.map((detail, index) => (
                  <div key={detail.bookingDetailId} className="space-y-4">
                    {/* Add a visible header for each booking detail with a number */}
                    <div className="flex items-center justify-between bg-muted rounded-md px-4 py-2">
                      <h3 className="font-medium">
                        Booking Detail #{index + 1}
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Description
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: detail.description || "",
                        }}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Booking Design Preview
                      </p>
                      <div className="border rounded-md p-2 inline-block">
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
                      <p className="text-sm font-medium mb-2 flex items-center justify-between">
                        <span>Assigned T-Shirt</span>
                        {!detail.tshirt && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenAssignModal(detail)}
                            className="text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Assign T-Shirt
                          </Button>
                        )}
                      </p>
                      {detail.tshirt ? (
                        <div className="flex items-center gap-4 border rounded-md p-4">
                          <Image
                            src={
                              detail.tshirt.imageUrl ||
                              "/placeholder.svg?height=150&width=150"
                            }
                            alt="Assigned T-Shirt"
                            width={100}
                            height={100}
                            className="object-contain rounded-md"
                          />
                          <div>
                            <p className="font-medium">{detail.tshirt.name}</p>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleOpenAssignModal(detail)}
                              className="text-xs mt-2 text-muted-foreground hover:text-foreground"
                            >
                              Change
                            </Button>
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

                    {/* Add a thicker separator between booking details */}
                    {index < taskData.bookingDetails.length - 1 && (
                      <Separator className="my-6 border-2" />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No booking details available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* T-Shirt Assignment Modal */}
      <AssignTShirtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssign={handleAssignTShirt}
        bookingDetail={selectedBookingDetail}
        isAssigning={isAssigning}
      />
    </div>
  );
}
