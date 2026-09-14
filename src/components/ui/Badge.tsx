import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  neutral: "border-line bg-surface-sunken text-ink-soft",
  kelp: "border-transparent bg-kelp-tint text-kelp",
  volt: "border-transparent bg-volt/25 text-ink",
  clay: "border-transparent bg-clay-tint text-clay",
  outline: "border-line-strong bg-transparent text-ink-soft",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
