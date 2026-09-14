import { useId, useState } from "react";
import { formatDay } from "@/lib/date";
import type { DayDigest } from "@/features/habits/engine";
import { cn } from "@/lib/cn";

/**
 * One series: the share of due practices kept each day. A single measure on a
 * single axis, so no legend — the heading names it. Hovering (or focusing) a
 * day moves a crosshair and reports the exact numbers.
 */
export function MomentumLine({
  series,
  height = 132,
  className,
}: {
  series: DayDigest[];
  height?: number;
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const gradientId = useId();

  if (series.length < 2) {
    return (
      <p className={cn("py-8 text-center text-sm text-ink-faint", className)}>
        A couple of days of marks and the line appears here.
      </p>
    );
  }

  const width = 100;
  const pad = 2;
  const x = (index: number) => pad + (index / (series.length - 1)) * (width - pad * 2);
  const y = (ratio: number) => height - 10 - ratio * (height - 26);

  const points = series.map((day, index) => ({ ...day, x: x(index), y: y(day.ratio) }));
  const line = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  const area = `${pad},${height - 10} ${line} ${width - pad},${height - 10}`;
  const hovered = active === null ? null : points[active];

  return (
    <div className={cn("relative pl-9", className)}>
      {/* Axis labels live in HTML: the SVG is non-uniformly scaled, which
          would distort any text drawn inside it. */}
      <span
        className="absolute left-0 -translate-y-1/2 font-mono text-[0.5625rem] uppercase tracking-[0.08em] text-ink-faint"
        style={{ top: y(1) }}
        aria-hidden="true"
      >
        100%
      </span>
      <span
        className="absolute left-0 -translate-y-1/2 font-mono text-[0.5625rem] uppercase tracking-[0.08em] text-ink-faint"
        style={{ top: y(0.5) }}
        aria-hidden="true"
      >
        50%
      </span>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        role="img"
        aria-label={`Daily completion over the last ${series.length} days`}
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--kelp))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--kelp))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Recessive reference lines at 50% and 100%. */}
        {[0.5, 1].map((ratio) => (
          <line
            key={ratio}
            x1={pad}
            x2={width - pad}
            y1={y(ratio)}
            y2={y(ratio)}
            className="stroke-line"
            strokeWidth="0.4"
            strokeDasharray={ratio === 1 ? undefined : "1.5 1.5"}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <polygon points={area} fill={`url(#${gradientId})`} />
        <polyline
          points={line}
          fill="none"
          className="stroke-kelp"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {hovered ? (
          <line
            x1={hovered.x}
            x2={hovered.x}
            y1={8}
            y2={height - 10}
            className="stroke-ink-faint"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {points.map((point, index) => (
          <g key={point.iso}>
            {/* Hit target, deliberately larger than the marker. */}
            <rect
              x={point.x - (width - pad * 2) / (series.length - 1) / 2}
              y={0}
              width={(width - pad * 2) / (series.length - 1)}
              height={height}
              fill="transparent"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              role="button"
              aria-label={`${formatDay(point.iso)}: ${point.kept} of ${point.due} kept`}
              className="outline-none focus-visible:fill-ink/5"
            />
            {(index === series.length - 1 || active === index) && (
              <circle
                cx={point.x}
                cy={point.y}
                r={active === index ? 3 : 2.4}
                className="fill-kelp stroke-surface"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>
        ))}
      </svg>

      <div className="mt-1 flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
        <span>{formatDay(series[0].iso)}</span>
        <span>{formatDay(series[series.length - 1].iso)}</span>
      </div>

      {hovered ? (
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 -translate-y-full rounded-md border border-line bg-surface px-2.5 py-1.5 shadow-lift"
          style={{ left: `${hovered.x}%` }}
        >
          <p className="whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
            {formatDay(hovered.iso)}
          </p>
          <p className="whitespace-nowrap text-[0.8125rem] tnum text-ink">
            {hovered.kept} of {hovered.due} kept
            <span className="ml-1.5 text-ink-faint">{Math.round(hovered.ratio * 100)}%</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
