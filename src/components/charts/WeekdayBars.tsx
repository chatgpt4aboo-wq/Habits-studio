import { WEEKDAY_SHORT } from "@/lib/date";
import type { WeekdayProfile } from "@/features/habits/engine";
import { cn } from "@/lib/cn";

/**
 * Completion by day of the week — one series, so bars carry one hue and the
 * value is labelled directly. Days with nothing due say so rather than
 * rendering a misleading zero.
 */
export function WeekdayBars({
  profile,
  className,
}: {
  profile: WeekdayProfile[];
  className?: string;
}) {
  // Monday-first reading order.
  const ordered = [1, 2, 3, 4, 5, 6, 0].map((weekday) => profile[weekday]);
  const best = ordered.reduce<number | null>(
    (max, day) => (day.rate === null ? max : Math.max(max ?? 0, day.rate)),
    null,
  );

  return (
    <ul className={cn("space-y-2", className)}>
      {ordered.map((day) => {
        const rate = day.rate;
        const pct = rate === null ? 0 : Math.round(rate * 100);
        const empty = rate === null;
        const isBest = rate !== null && best !== null && rate === best && best > 0;
        return (
          <li key={day.weekday} className="flex items-center gap-3">
            <span className="w-9 shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
              {WEEKDAY_SHORT[day.weekday]}
            </span>
            <span
              className="relative h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-ramp-0"
              title={empty ? "Nothing due" : `${day.kept} of ${day.due} kept`}
            >
              {!empty && (
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full transition-[width] duration-500",
                    isBest ? "bg-kelp" : "bg-ramp-3",
                  )}
                  style={{ width: `${Math.max(pct === 0 ? 0 : 3, pct)}%` }}
                />
              )}
            </span>
            <span className="w-16 shrink-0 text-right text-[0.8125rem] tnum text-ink-soft">
              {empty ? <span className="text-ink-faint">—</span> : `${pct}%`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
