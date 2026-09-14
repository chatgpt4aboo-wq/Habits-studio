import { cn } from "@/lib/cn";

/**
 * The Stair — three ascending bars. Practice compounding, drawn as data.
 * The tallest bar always carries the accent; the rest stay in ink.
 */
export function Mark({
  className,
  accent = "kelp",
}: {
  className?: string;
  accent?: "kelp" | "volt" | "current";
}) {
  const accentClass =
    accent === "kelp" ? "fill-kelp" : accent === "volt" ? "fill-volt" : "fill-current";

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g className="fill-current">
        <rect x="6" y="19" width="5" height="7" rx="1.6" />
        <rect x="13.5" y="13" width="5" height="13" rx="1.6" />
      </g>
      <rect x="21" y="7" width="5" height="19" rx="1.6" className={accentClass} />
    </svg>
  );
}

/** The mark inside its containing tile — for avatars, favicons, app icons. */
export function MarkTile({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[28%] bg-ink text-paper",
        "h-10 w-10",
        className,
      )}
    >
      <Mark className="h-full w-full" accent="volt" />
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.0625rem] leading-none tracking-[-0.015em]", className)}>
      <span className="font-semibold">Habits</span>{" "}
      <span className="font-normal italic text-ink-soft">Studio</span>
    </span>
  );
}

/** Primary lockup: mark + wordmark, optically aligned. */
export function Lockup({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-ink", className)}>
      <Mark className={cn("h-[1.375rem] w-[1.375rem] shrink-0", markClassName)} />
      <Wordmark />
    </span>
  );
}
