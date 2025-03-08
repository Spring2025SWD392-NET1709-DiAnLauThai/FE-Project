"use client";

import { Task, TaskStatus } from "@/domains/models/tasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import img from "@/public/images/your-background.jpg";
interface TaskDetailCardProps {
  task: Task;
}

export function TaskDetailCard({ task }: TaskDetailCardProps) {
  // Function to determine badge color based on status
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return "bg-yellow-500";
      case TaskStatus.PROGRESSING:
        return "bg-blue-500";
      case TaskStatus.COMPLETED:
        return "bg-green-500";
      case TaskStatus.CANCELLED:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{task.subject}</CardTitle>
            <CardDescription>Order ID: {task.bookingId}</CardDescription>
          </div>
          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Footline Image */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={img}
            alt="Footline Design"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-1">
              Designer
            </h3>
            <p>{task.designerName}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-1">
              Created At
            </h3>
            <p>{format(new Date(task.createdAt), "PPP")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-1">
              Updated At
            </h3>
            <p>{format(new Date(task.updatedAt), "PPP")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500 mb-1">
              Order ID
            </h3>
            <p>{task.bookingId}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-sm text-gray-500 mb-1">
            Description
          </h3>
          <p className="text-sm whitespace-pre-wrap">{task.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
