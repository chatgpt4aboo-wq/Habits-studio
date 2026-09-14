import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "volt";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all " +
  "disabled:pointer-events-none disabled:opacity-45 active:translate-y-px select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-kelp text-kelp-on hover:bg-kelp-hover shadow-soft",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink hover:bg-surface-sunken",
  ghost: "text-ink-soft hover:bg-surface-sunken hover:text-ink",
  volt: "bg-volt text-volt-on hover:brightness-[1.04] shadow-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-[0.8125rem]",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[0.9375rem]",
};

function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...props} />;
});

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: LinkProps & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
