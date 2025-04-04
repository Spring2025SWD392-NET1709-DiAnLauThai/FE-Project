"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  AlertCircle,
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
import {
  TaskDetail,
  BookingDetail,
  BookingStatus,
} from "@/domains/models/tasks";
import { useParams, useRouter } from "next/navigation";
import { useTaskDetail } from "@/hooks/tasks/use-task";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import AssignTShirtModal from "@/components/assign-tshirt/page";
import { toast } from "sonner";
import { formatFromISOStringVN, FormatType } from "@/lib/format";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserRole } from "@/domains/models/user";
import { useAuthStore } from "@/domains/stores/use-auth-store";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedBookingDetail, setSelectedBookingDetail] =
    useState<BookingDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isDesigner, setIsDesigner] = useState(false);

  const { user } = useAuthStore();
  useEffect(() => {
    if (user?.role === UserRole.DESIGNER) {
      setIsDesigner(true);
    } else {
      setIsDesigner(false);
    }
  }, [user]);

  const { data, isLoading, isError, refetch } = useTaskDetail(id as string);

  const taskData: TaskDetail = data;

  // Check if the task has started based on current date and task start date
  const currentDate = new Date();
  const taskStartDate = taskData?.startdate
    ? new Date(taskData.startdate)
    : null;
  const isTaskStarted = taskStartDate ? currentDate >= taskStartDate : false;

  const isTaskEditable =
    taskData &&
    taskData.bookingStatus !== BookingStatus.COMPLETED &&
    taskData.bookingStatus !== BookingStatus.CANCELLED;

  // Add check for task being started
  const canEditTask = isDesigner && isTaskEditable && isTaskStarted;

  const handleAssignTShirt = async (tshirtId: string) => {
    if (!isTaskStarted) {
      toast.error("Cannot assign T-shirts before the task has started");
      setIsModalOpen(false);
      return;
    }

    if (!canEditTask) {
      toast.error("You don't have permission to modify this task");
      setIsModalOpen(false);
      return;
    }

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

      toast.success(
        `T-shirt ${tshirtId} assigned to booking detail ${selectedBookingDetail.bookingDetailId}`
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Assignment error:", error);
      toast.error("Failed to assign T-shirt");
    } finally {
      setIsAssigning(false);
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

  const handleOpenAssignModal = (bookingDetail: BookingDetail) => {
    if (!isTaskStarted) {
      toast.error("Cannot assign T-shirts before the task has started");
      return;
    }

    if (!canEditTask) {
      toast.error("You don't have permission to modify this task");
      return;
    }

    console.log("Opening modal for booking detail:", bookingDetail);
    setSelectedBookingDetail(bookingDetail);
    setIsModalOpen(true);
  };

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
        <div className="w-full space-y-6">
          {/* Status alert for not started tasks */}
          {isDesigner && !isTaskStarted && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Task Not Started Yet</AlertTitle>
              <AlertDescription>
                This task is scheduled to start on{" "}
                {formatFromISOStringVN(
                  taskData.startdate,
                  FormatType.DATETIME_VN
                )}
                . You cannot assign T-shirts or confirm the task until it has
                started.
              </AlertDescription>
            </Alert>
          )}

          {/* Status alert for completed or cancelled tasks */}
          {!isTaskEditable && (
            <Alert
              variant={
                taskData.bookingStatus === BookingStatus.COMPLETED
                  ? "success"
                  : "destructive"
              }
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {taskData.bookingStatus === BookingStatus.COMPLETED
                  ? "Task Completed"
                  : "Task Cancelled"}
              </AlertTitle>
              <AlertDescription>
                This task is {taskData.bookingStatus.toLowerCase()} and cannot
                be modified.
              </AlertDescription>
            </Alert>
          )}

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
                    <div className="flex items-center justify-between bg-muted rounded-md px-4 py-2">
                      <h3 className="font-medium">
                        Booking Detail #{index + 1}
                      </h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/2">
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

                      <div className="md:w-1/2">
                        <p className="text-sm font-medium mb-2 flex items-center justify-between">
                          <span>Assigned T-Shirt</span>
                          {canEditTask && (
                            <>
                              {!detail.tshirt ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenAssignModal(detail)}
                                  className="text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Assign T-Shirt
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenAssignModal(detail)}
                                  className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                  Change
                                </Button>
                              )}
                            </>
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
                              width={400}
                              height={400}
                              className="object-contain rounded-md"
                            />
                            <div>
                              <p className="font-medium">
                                {detail.tshirt.name}
                              </p>
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

      {canEditTask && (
        <div className="mt-8 flex justify-center">
          <Button
            className="w-full max-w-md"
            onClick={() => {
              router.push(`/task-designer/${id}/confirm`);
            }}
          >
            Confirm Task
          </Button>
        </div>
      )}

      {/* Show disabled button with explanation if task hasn't started */}
      {isDesigner && !isTaskStarted && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <Button className="w-full max-w-md" disabled>
            Confirm Task
          </Button>
          <p className="text-sm text-muted-foreground">
            You can confirm this task after it starts on{" "}
            {formatFromISOStringVN(taskData.startdate, FormatType.DATETIME_VN)}
          </p>
        </div>
      )}

      {isDesigner && (
        <AssignTShirtModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAssign={handleAssignTShirt}
          bookingDetail={selectedBookingDetail}
          isAssigning={isAssigning}
          taskId={id as string}
        />
      )}
    </div>
  );
}
