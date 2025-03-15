"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Check, Clock, DollarSign, InfoIcon, Package, User } from "lucide-react";

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
import { TaskDetail } from "@/domains/models/tasks";
import { useParams } from "next/navigation";
import { useTaskDetail } from "@/hooks/tasks/use-task";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";

export default function TaskDetailPage() {
  const { id } = useParams();
  const [selectedShirt, setSelectedShirt] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const availableTShirts = [
    {
      id: "1",
      name: "Basic White Tee",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "2",
      name: "Premium Cotton Black",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "3",
      name: "Slim Fit Gray",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: "4",
      name: "V-Neck Blue",
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  // Get task details from API
  const {
    data,
    isLoading,
    isError,
  } = useTaskDetail(id as string);

  // We need to access the actual task data from the response
  const taskData: TaskDetail = data;

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

  // Handle T-shirt assignment
  const handleAssignTShirt = () => {
    if (!selectedShirt) return;

    setIsAssigning(true);
    // Add your assignment logic here
    // You would typically call an API to assign the T-shirt

    // Simulate API call
    setTimeout(() => {
      setIsAssigning(false);
      // You'd typically update the UI or refetch data here
    }, 1500);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Task Details Section (2/3) */}
        <div className="w-full lg:w-2/3 space-y-6">
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
                  {formatDate(taskData.datecreated)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {formatDate(taskData.updateddate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDate(taskData.startdate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{formatDate(taskData.enddate)}</p>
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

              {taskData.bookingDetails &&
                taskData.bookingDetails.map((detail) => (
                  <div key={detail.bookingDetailId} className="space-y-4">
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
                        Design Preview
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

                    <Separator className="my-4" />

                    <div>
                      <p className="text-sm font-medium mb-2">
                        Assigned T-Shirt
                      </p>
                      {detail.tshirt ? (
                        <div className="flex items-center gap-4 border rounded-md p-4">
                          <Image
                            src={
                              detail.tshirt.image ||
                              "/placeholder.svg?height=150&width=150"
                            }
                            alt="Assigned T-Shirt"
                            width={100}
                            height={100}
                            className="object-contain rounded-md"
                          />
                          <div>
                            <p className="font-medium">{detail.tshirt.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {detail.tshirt.id}
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
                ))}
            </CardContent>
          </Card>
        </div>

        {/* T-Shirt Selection Section (1/3) */}
        <div className="w-full lg:w-1/3">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Assign T-Shirt
              </CardTitle>
              <CardDescription>
                Select a t-shirt to assign to this task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <RadioGroup
                  value={selectedShirt || ""}
                  onValueChange={setSelectedShirt}
                  className="space-y-4"
                >
                  {availableTShirts.map((shirt) => (
                    <div key={shirt.id} className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={shirt.id}
                        id={`shirt-${shirt.id}`}
                        className="mt-1"
                      />
                      <Label
                        htmlFor={`shirt-${shirt.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex flex-col sm:flex-row gap-3 border rounded-md p-3 hover:bg-muted">
                          <Image
                            src={shirt.image || "/placeholder.svg"}
                            alt={shirt.name}
                            width={100}
                            height={100}
                            className="object-cover rounded-md"
                          />
                          <div className="flex flex-col justify-center">
                            <p className="font-medium">{shirt.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {shirt.id}
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!selectedShirt || isAssigning}
                onClick={handleAssignTShirt}
              >
                {isAssigning ? (
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
