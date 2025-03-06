"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingBarProps {
  height?: "xs" | "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "white";
  className?: string;
  duration?: number;
  indeterminate?: boolean;
  progress?: number;
}

export function LoadingBar({
  height = "md",
  color = "primary",
  className,
  duration = 2000,
  indeterminate = true,
  progress = 0,
}: LoadingBarProps) {
  const [width, setWidth] = useState(indeterminate ? 0 : progress);

  const heightClasses = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    white: "bg-white",
  };

  useEffect(() => {
    if (!indeterminate) {
      setWidth(progress);
      return;
    }

    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          return 0;
        }
        return prevWidth + 10;
      });
    }, duration / 10);

    return () => clearInterval(interval);
  }, [indeterminate, duration, progress]);

  return (
    <div
      className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        heightClasses[height],
        className
      )}
    >
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          heightClasses[height],
          colorClasses[color],
          indeterminate ? "animate-pulse" : ""
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
