"use client";

import { cn } from "@/lib/utils";

interface LoadingPulseProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "accent" | "white";
  className?: string;
}

export function LoadingPulse({
  size = "md",
  color = "primary",
  className,
}: LoadingPulseProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    white: "bg-white",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        className={cn(
          "absolute rounded-full opacity-75 animate-ping",
          sizeClasses[size],
          colorClasses[color],
          "opacity-20"
        )}
      />
      <div
        className={cn("relative rounded-full", colorClasses[color], {
          "w-4 h-4": size === "sm",
          "w-6 h-6": size === "md",
          "w-8 h-8": size === "lg",
          "w-12 h-12": size === "xl",
        })}
      />
    </div>
  );
}
