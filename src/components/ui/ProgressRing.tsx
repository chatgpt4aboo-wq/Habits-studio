import { cn } from "@/lib/cn";

/**
 * A single-value radial gauge. One measure, one hue — the number inside is the
 * label, so the ring never needs a legend.
 */
export function ProgressRing({
  value,
  size = 56,
  thickness = 5,
  label,
  className,
}: {
  /** 0–1. */
  value: number;
  size?: number;
  thickness?: number;
  label?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          className="stroke-ramp-0"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          className="stroke-kelp transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.8125rem] tnum text-ink">
        {label ?? `${Math.round(clamped * 100)}%`}
      </span>
    </div>
  );
}
