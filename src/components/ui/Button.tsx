import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 spec transition-colors select-none " +
  "disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  /** Bone on void — the primary action on a dark surface. */
  solid: "bg-bone text-ink hover:bg-white",
  /** Hairline on void. */
  outline: "border border-line-dark text-bone hover:border-bone-soft hover:bg-void-raised",
  ghost: "text-bone-soft hover:text-bone",
  /** Ink on bone — the primary action inside a sheet. */
  ink: "bg-ink text-bone hover:bg-navy",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-14 px-9",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "solid", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  ...props
}: LinkProps & { variant?: Variant; size?: Size }) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
