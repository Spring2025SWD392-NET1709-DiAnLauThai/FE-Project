"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessBookingPage() {
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const message = searchParams?.get("message") || "";
  const router = useRouter();
  
  // Determine payment status
  const paymentSuccessful = status === "SUCCESS";
  const paymentFailed = status === "FAILED";

  // Log for debugging
  console.log("Payment status:", status);
  console.log("Message:", message);
  
  // Status icon based on payment status
  const getStatusIcon = () => {
    if (paymentFailed) {
      return <XCircle className="h-8 w-8 text-red-600" />;
    } else if (paymentSuccessful) {
      return <CheckCircle className="h-8 w-8 text-green-600" />;
    } else {
      return <AlertCircle className="h-8 w-8 text-yellow-600" />;
    }
  };

  // No more useEffect with automatic redirect
  // Removed the automatic redirect code

  const getStatusColor = () => {
    if (paymentFailed) {
      return "bg-red-100";
    } else if (paymentSuccessful) {
      return "bg-green-100";
    } else {
      return "bg-yellow-100";
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${getStatusColor()}`}
          >
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl font-bold">
            {paymentFailed
              ? "Payment Failed"
              : paymentSuccessful
                ? "Payment Successful"
                : "Payment Status"}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          {/* Display the message from the params */}
          <p className="mb-4">
            {message ? message : paymentFailed
              ? "Your payment was not successful. Please try again."
              : paymentSuccessful
                ? "Your payment has been processed successfully."
                : "We're checking the status of your payment."}
          </p>

          {paymentFailed && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              <p className="font-medium">
                Possible reasons for payment failure:
              </p>
              <ul className="list-disc pl-5 mt-2 text-left">
                <li>Insufficient funds in your account</li>
                <li>Payment was declined by your bank</li>
                <li>Connection timeout or network issue</li>
                <li>Transaction exceeded your daily limit</li>
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {paymentFailed ? (
            <>
              <Link href="/payment" className="w-full">
                <Button className="w-full" size="lg" variant="default">
                  Try Payment Again
                </Button>
              </Link>
              <Link href="/my-bookings" className="w-full">
                <Button className="w-full" size="lg" variant="outline">
                  View My Bookings
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="w-full">
                <Button className="w-full" size="lg">
                  Return to Homepage
                </Button>
              </Link>
              <Link href="/my-bookings" className="w-full">
                <Button className="w-full" size="lg" variant="outline">
                  View My Bookings
                </Button>
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
