import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full border border-line-dark bg-transparent px-4 spec text-bone",
          "placeholder:text-bone-soft/70 focus:border-bone-soft",
          className,
        )}
        {...props}
      />
    );
  },
);
