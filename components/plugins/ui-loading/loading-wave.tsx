"use client";

import { cn } from "@/lib/utils";

interface LoadingWaveProps {
  className?: string;
  color?: "primary" | "secondary" | "accent" | "white";
  count?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function LoadingWave({
  className,
  color = "primary",
  count = 5,
  minHeight = 10,
  maxHeight = 30,
}: LoadingWaveProps) {
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    white: "bg-white",
  };

  return (
    <div className={cn("flex items-end justify-center gap-1 h-10", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 rounded-t-sm",
            colorClasses[color],
            "animate-wave"
          )}
          style={{
            height: `${minHeight}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}
