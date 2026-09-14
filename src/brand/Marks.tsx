import { cn } from "@/lib/cn";

/**
 * The identity system, drawn rather than imaged so it stays crisp at every
 * size and can take the surface's colour.
 *
 * 1 — Primary wordmark   HABITS over a spaced STUDIO
 * 2 — Compact symbol     the interlocking HS brush monogram
 * 3 — Sleeve lockup      symbol / wordmark, repeated, for sleeve tape
 */

/**
 * The compact symbol: an H whose stems are crossed by one brush sweep.
 *
 * Drawn as filled shapes rather than strokes so the weight can swell through
 * the middle of a stroke and taper at its ends — a stroked path is uniform,
 * and reads geometric instead of written.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8", className)} aria-hidden="true" focusable="false">
      <g transform="rotate(-5 32 32)" fill="currentColor">
        {/* The two stems: wider at the top, tapering as they fall. */}
        <path d="M22.5 5 L29 5.6 L25.8 59 L20.4 58.2 Z" />
        <path d="M41.5 5 L48 5.6 L44.8 59 L39.4 58.2 Z" />
        {/* The bar, kept light so the sweep stays dominant. */}
        <path d="M23.8 28.4 L46.2 29.6 L46 34 L23.6 32.8 Z" />
        {/* The sweep: a ring, thicker through the lower left where a brush
            would load, thinner as it lifts away to the right. */}
        <path
          fillRule="evenodd"
          d="M8.5 33.5 C8.5 19.5 26 10.5 43.5 14 C57.5 16.8 63 28 57 36.5
             C50 46.5 27.5 50.5 15.5 44.5 C10.8 42.1 8.5 38.2 8.5 33.5 Z
             M15.6 33.8 C15.6 24.6 29.5 18.2 42.3 20.8 C51.6 22.7 55.4 30 51.4 35.6
             C45.8 43.4 28.3 45.6 19.4 40.9 C16.8 39.5 15.6 36.9 15.6 33.8 Z"
        />
        {/* The tail the brush leaves as it comes off the page. */}
        <path d="M55.6 35.2 C59.4 33.6 61.6 31.4 62.4 28.6 C62.9 32.6 61 36.2 57.4 38.4 Z" />
      </g>
    </svg>
  );
}

/** Primary wordmark. `stacked` is the portfolio lockup; inline is for nav. */
export function Wordmark({
  className,
  stacked = true,
  size = "md",
}: {
  className?: string;
  stacked?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const scale = {
    sm: "text-mark-sm",
    md: "text-mark-md",
    lg: "text-mark-lg",
    xl: "text-mark-xl",
  }[size];

  if (!stacked) {
    return (
      <span className={cn("font-display font-bold uppercase", scale, className)}>
        Habits <span className="font-medium">Studio</span>
      </span>
    );
  }

  // The size class sits on the wrapper so the STUDIO line's em-based size and
  // tracking resolve against the mark itself, not against inherited body text.
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", scale, className)}>
      <span className="font-display font-extrabold uppercase leading-[0.9]">Habits</span>
      <span
        className="font-body font-medium uppercase"
        style={{
          fontSize: "0.155em",
          letterSpacing: "0.62em",
          textIndent: "0.62em",
          marginTop: "0.28em",
        }}
      >
        Studio
      </span>
    </span>
  );
}

/** Header/nav lockup: symbol beside the wordmark, optically aligned. */
export function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram className="h-6 w-6 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-extrabold uppercase tracking-[0.06em]">
          Habits
        </span>
        <span className="spec-sm mt-1 text-bone-soft">Studio</span>
      </span>
    </span>
  );
}

/**
 * The sleeve lockup: symbol, wordmark, symbol — the tape that runs down a
 * sleeve. `repeat` sets how many units to draw.
 */
export function SleeveLockup({
  repeat = 3,
  className,
}: {
  repeat?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-6", className)}>
      {Array.from({ length: repeat }, (_, index) => (
        <span key={index} className="inline-flex items-center gap-6">
          <Monogram className="h-5 w-5 shrink-0" />
          <span className="inline-flex flex-col items-center leading-none">
            <span className="font-display text-base font-extrabold uppercase tracking-[0.08em]">
              Habits
            </span>
            <span className="spec-sm mt-0.5 opacity-70">Studio</span>
          </span>
        </span>
      ))}
      <Monogram className="h-5 w-5 shrink-0" />
    </span>
  );
}
