import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The portfolio's ruled line, optionally broken by a mark or a line of type —
 * the device that closes every page of the deck.
 */
export function Rule({
  children,
  tone = "light",
  className,
}: {
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "light" ? "bg-line-light" : "bg-line-dark";

  if (!children) return <div className={cn("h-px w-full", line, className)} />;

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <span className={cn("h-px min-w-[1.5rem] flex-1", line)} />
      {/* The label wraps rather than pushing the page wider at phone width. */}
      <span
        className={cn(
          "spec min-w-0 text-center",
          tone === "light" ? "text-ink-faint" : "text-bone-soft",
        )}
      >
        {children}
      </span>
      <span className={cn("h-px min-w-[1.5rem] flex-1", line)} />
    </div>
  );
}

/** A page header bar, as the deck sets it: range, slash, title. */
export function PageMark({
  range,
  title,
  className,
}: {
  range: string;
  title: string;
  className?: string;
}) {
  return (
    <p className={cn("spec text-navy", className)}>
      {range} / {title}
    </p>
  );
}
