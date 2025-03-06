"use client";

import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "white";
  className?: string;
}

export function LoadingDots({
  size = "md",
  color = "primary",
  className,
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5",
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    white: "bg-white",
  };

  const gapClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  };

  return (
    <div className={cn("flex items-center", gapClasses[size], className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size],
            colorClasses[color],
            "opacity-60 animate-bounce",
            {
              "animation-delay-200": i === 1,
              "animation-delay-400": i === 2,
            }
          )}
          style={{
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}
