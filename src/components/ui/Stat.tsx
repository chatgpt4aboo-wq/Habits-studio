import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A hero number. No plot, so no axes and no legend: label, value, and at most
 * one line of context.
 */
export function Stat({
  label,
  value,
  unit,
  context,
  className,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  context?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-5 py-4", className)}>
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-display text-[2rem] leading-none tnum text-ink">
        {value}
        {unit ? <span className="ml-1 font-body text-sm font-normal text-ink-faint">{unit}</span> : null}
      </p>
      {context ? <p className="mt-1.5 text-[0.8125rem] text-ink-faint">{context}</p> : null}
    </div>
  );
}
