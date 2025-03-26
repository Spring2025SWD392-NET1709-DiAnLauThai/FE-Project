"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetTshirtDetail } from "@/hooks/t-shirt/use-tshirt";
import { formatFromISOStringVN } from "@/lib/format";
import TshirtFeedbackForm from "@/components/TshirtFeedbackForm/page";
import { useGetFeedback } from "@/hooks/feedback/use-feedback";

export default function TshirtDetailPage() {
  const { id } = useParams();
  const { queryDetailTShirts, isLoadingDetail } = useGetTshirtDetail(id);
  const { data: feedbackData, isLoading: isLoadingFeedback } = useGetFeedback(
    id as string
  );

  const tshirtData = queryDetailTShirts.data?.data;
  const feedbacks = feedbackData?.data || [];

  return (
    <div className="flex flex-col items-center">
      <div className="container max-w-4xl py-8">
        {/* Back to T-shirts Button */}
        <div className="mb-6 flex justify-start">
          <Link
            href="/dashboard/t-shirt"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to T-shirts
          </Link>
        </div>

        {isLoadingDetail ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="w-full">
            {/* Product Details - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Image and Colors */}
              <div className="space-y-6">
                {/* Product Image */}
                <div className="w-full">
                  <div className="relative aspect-square overflow-hidden rounded-xl border bg-background shadow-sm">
                    <Image
                      src={tshirtData?.image_url || "/placeholder.svg"}
                      alt={tshirtData?.tshirtName || "T-shirt image"}
                      fill
                      className="object-cover transition-all duration-300 hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Available Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {tshirtData?.colors?.map((color) => (
                      <div
                        key={color.colorId}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="h-8 w-8 rounded-full border shadow-sm"
                          style={{ backgroundColor: color.colorCode }}
                        />
                        <span className="text-xs mt-1">{color.colorName}</span>
                      </div>
                    ))}
                    {(!tshirtData?.colors ||
                      tshirtData.colors.length === 0) && (
                      <p className="text-muted-foreground text-sm">
                        No colors available
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="space-y-6">
                {/* Product Title and Badge */}
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h1 className="text-3xl font-bold">
                      {tshirtData?.tshirtName}
                    </h1>
                    <Badge variant="outline" className="text-xs">
                      {tshirtData?.createdAt
                        ? formatFromISOStringVN(tshirtData.createdAt)
                        : "New"}
                    </Badge>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            (feedbacks.length > 0
                              ? feedbacks.reduce(
                                  (acc, curr) => acc + curr.rating,
                                  0
                                ) / feedbacks.length
                              : 0) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {feedbacks.length} reviews
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground">
                    {tshirtData?.description || "No description available"}
                  </p>
                </div>

                
              </div>
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* Customer Feedback Section - Centered */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Customer Reviews
          </h2>

          {isLoadingFeedback ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="flex flex-col items-center space-y-4">
              {feedbacks.map((feedback) => (
                <Card
                  key={feedback.feedbackId}
                  className="w-full max-w-2xl overflow-hidden border-muted/80"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {feedback.username?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {feedback.username || "Customer"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFromISOStringVN(feedback.createddate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            feedback.rating >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-sm">{feedback.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg max-w-xl mx-auto">
              <p>No reviews yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
