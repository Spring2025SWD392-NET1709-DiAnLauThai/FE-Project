"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "line" | "circle" | "rect";
  width?: string;
  height?: string;
  count?: number;
  animated?: boolean;
}

export function LoadingSkeleton({
  className,
  variant = "line",
  width = "100%",
  height = "1rem",
  count = 1,
  animated = true,
}: LoadingSkeletonProps) {
  const baseClasses = cn(
    "bg-gray-200 dark:bg-gray-700",
    animated && "animate-pulse",
    className
  );

  const renderSkeleton = (index: number) => {
    switch (variant) {
      case "circle":
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded-full")}
            style={{
              width,
              height: height || width, // For circles, use width as height if not specified
            }}
          />
        );
      case "rect":
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded-md")}
            style={{ width, height }}
          />
        );
      case "line":
      default:
        return (
          <div
            key={index}
            className={cn(baseClasses, "rounded-md")}
            style={{ width, height }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </div>
  );
}
