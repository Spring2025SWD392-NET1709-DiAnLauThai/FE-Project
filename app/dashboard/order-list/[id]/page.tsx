import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Edit,
  FileText,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

// This would typically come from an API call using the ID from the route
const bookingData = {
  bookingDetailId: "56ace20c-20e7-4a71-a0b4-57311ac73aa6",
  code: "1234567890",
  designFile:
    "http://res.cloudinary.com/dnkxutxce/image/upload/v1741430086/js9sj0ghbizbqvzihkpq.png",
  description: "<p>ádasdasdasd</p>",
  unitPrice: 100000,
  // Additional mock data for the UI
  status: "Pending",
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  bookingDate: "2023-06-15",
  bookingTime: "14:30",
};

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    code,
    designFile,
    description,
    unitPrice,
    status,
    customerName,
    customerEmail,
    bookingDate,
    bookingTime,
  } = bookingData;

  // Format price as currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(unitPrice);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/order-list">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to bookings</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Booking Details</h1>
          <Badge
            variant={
              status === "Pending"
                ? "outline"
                : status === "Completed"
                ? "success"
                : "secondary"
            }
          >
            {status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
              <CardDescription>Booking ID: {code}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Customer
                  </p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{customerName}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {customerEmail}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Booking Date & Time
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{bookingDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{bookingTime}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Pricing
                  </p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{formattedPrice}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="p-3 bg-muted rounded-md text-sm"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Design File</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="relative w-full aspect-square mb-4 border rounded-md overflow-hidden">
                      <Image
                        src={designFile || "/placeholder.svg"}
                        alt="Design File"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Design
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
              <Button variant="outline" className="w-full">
                Send Reminder
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                Cancel Booking
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
