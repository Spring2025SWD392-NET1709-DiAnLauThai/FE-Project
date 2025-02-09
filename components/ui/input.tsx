import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="gap-2">
        {props.label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-muted-foreground"
          >
            {props.label}{" "}
            {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm space-x-2",
            className
          )}
        >
          {props.leftIcon && (
            <div className="flex items-center">{props.leftIcon}</div>
          )}
          <input
            type={type}
            className="focus:outline-none focus:border-transparent w-full"
            ref={ref}
            {...props}
          />

          {props.rightIcon && (
            <div className="flex items-center">{props.rightIcon}</div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
