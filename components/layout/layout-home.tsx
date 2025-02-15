import { cn } from "@/lib/utils";
import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="max-h-screen relative">
      <div className="absolute inset-0 w-[70%] bg-white min-h-screen" />
      <div className="absolute inset-0 left-[70%] right-0 bg-[#6B8FD4] min-h-screen" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
