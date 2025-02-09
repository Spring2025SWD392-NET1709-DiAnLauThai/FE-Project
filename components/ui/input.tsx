import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, label, ...props }, ref) => {
    return (
      <div className="gap-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-muted-foreground"
          >
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm space-x-2",
            className
          )}
        >
          {leftIcon && <div className="flex items-center">{leftIcon}</div>}
          <input
            type={type}
            className={cn(
              "focus:outline-none focus:border-transparent w-full focus:bg-transparent focus:text-foreground bg-transparent",
              className
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && <div className="flex items-center">{rightIcon}</div>}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
