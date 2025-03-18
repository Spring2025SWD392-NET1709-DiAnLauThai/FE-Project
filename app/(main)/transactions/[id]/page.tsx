"use client";

import Image from "next/image";
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
import {
  FormatType,
  formatFromISOStringVN,
  formatPriceToVND,
} from "@/lib/format";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";
import { Textarea } from "@/components/ui/textarea";
import { useTransactionDetail } from "@/hooks/transaction/use-transaction";

export default function CustomerTransactionDetailPage() {
  const { id } = useParams();
  const { data: transactionData, isLoading } = useTransactionDetail(
    id as string
  );

  // Define status color variants
  const getStatusVariant = (status?: string) => {
    if (!status) return "secondary";

    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "success";
      case "pending":
      case "processing":
        return "warning";
      case "failed":
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (isLoading || !transactionData || !transactionData.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingDots />
      </div>
    );
  }

  // Correctly access the data from the API response using the proper property name
  const { transaction, bookingDetail } = transactionData.data;

  // Add logging to debug the response structure
  console.log("Transaction data:", transaction);
  console.log("Booking detail data:", bookingDetail);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Transaction Details
        </h1>
        <p className="text-muted-foreground">
          Transaction ID: {transaction.id}
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>{transaction.transactionName}</CardTitle>
              <CardDescription>
                Transaction Date:{" "}
                {formatFromISOStringVN(
                  transaction.transactionDate,
                  FormatType.DATETIME
                )}
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant(transaction.transactionStatus)}>
              {transaction.transactionStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Transaction Amount
                </h3>
                <div className="flex items-center">
                  <p className="font-bold">
                    {formatPriceToVND(transaction.transactionAmount)}vnđ
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Bank Code
                </h3>
                <div className="flex items-center">
                  <p>{transaction.bankCode}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Reason
                </h3>
                <div className="flex items-center">
                  <p>{transaction.reason || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Method
                </h3>
                <div className="flex items-center">
                  <p>{transaction.transactionMethod}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Type
                </h3>
                <div className="flex items-center">
                  <p>{transaction.transactionType || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {bookingDetail && bookingDetail.length > 0 && (
            <>
              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Booking Details ({bookingDetail.length} item
                  {bookingDetail.length !== 1 ? "s" : ""})
                </h3>
                <div className="grid gap-8">
                  {bookingDetail.map((detail, index) => (
                    <div
                      key={detail.bookingDetailId + "-" + index}
                      className="space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatPriceToVND(detail.unitPrice)}vnđ per unit
                        </p>
                      </div>
                      <div
                        className="text-sm mb-3"
                        dangerouslySetInnerHTML={{ __html: detail.description }}
                      />
                      {detail.designFile && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      )}

                      {index < bookingDetail.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
