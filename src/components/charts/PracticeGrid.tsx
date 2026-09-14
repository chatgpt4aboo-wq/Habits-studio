import { useMemo } from "react";
import { formatDay, monthShort } from "@/lib/date";
import { labelMonths } from "./monthAxis";
import { gridWeeks, type DayStatus } from "@/features/habits/engine";
import type { Habit } from "@/features/habits/types";
import { cn } from "@/lib/cn";

/**
 * Twelve weeks of one practice, Monday-first columns.
 *
 * Marks are binary, so the grid uses the two ends of the sequential kelp ramp
 * (empty → full) rather than a categorical palette; a miss is a hollow cell
 * hinted in clay, never a second hue competing with completion.
 */

/** Rows run Monday → Sunday, matching the engine's week layout. */
const ROW_INITIALS = ["M", "T", "W", "T", "F", "S", "S"];

const statusClass: Record<DayStatus, string> = {
  marked: "bg-ramp-4",
  pending: "bg-ramp-0 ring-1 ring-inset ring-kelp",
  missed: "bg-ramp-0 ring-1 ring-inset ring-clay/25",
  off: "bg-ramp-0/60",
  future: "bg-transparent ring-1 ring-inset ring-line",
};

const statusLabel: Record<DayStatus, string> = {
  marked: "kept",
  pending: "due today",
  missed: "missed",
  off: "not due",
  future: "upcoming",
};

export function PracticeGrid({
  habit,
  weeks = 12,
  today,
  className,
}: {
  habit: Habit;
  weeks?: number;
  today: string;
  className?: string;
}) {
  const columns = useMemo(() => gridWeeks(habit, weeks, today), [habit, weeks, today]);

  // One label per month, nudged along when the previous label is too close to
  // sit beside it — at phone widths two adjacent labels would collide.
  const monthLabels = labelMonths(columns.map((week) => monthShort(week[0].iso)));

  return (
    <div className={cn("flex max-w-[22rem] gap-1.5", className)}>
      <div className="flex shrink-0 flex-col gap-[2px] pt-[1.125rem]" aria-hidden="true">
        {ROW_INITIALS.map((initial, index) => (
          <span
            key={index}
            className={cn(
              "flex flex-1 items-center font-mono text-[0.5625rem] leading-none text-ink-faint",
              index % 2 === 0 ? "opacity-100" : "opacity-0",
            )}
          >
            {initial}
          </span>
        ))}
      </div>

      <table className="w-full table-fixed border-separate border-spacing-[2px]">
        <caption className="sr-only">
          {habit.name}: the last {weeks} weeks, one cell per day.
        </caption>
        <thead>
          <tr>
            {monthLabels.map((label, index) => (
              <th
                key={index}
                scope="col"
                className="p-0 pb-1 text-left font-mono text-[0.5625rem] font-normal uppercase tracking-[0.1em] text-ink-faint"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROW_INITIALS.map((_, row) => (
            <tr key={row}>
              {columns.map((week, column) => {
                const cell = week[row];
                return (
                  <td key={`${column}-${row}`} className="p-0">
                    <span
                      title={`${formatDay(cell.iso)} — ${statusLabel[cell.status]}`}
                      className={cn(
                        "block aspect-square w-full rounded-[2px] transition-colors",
                        statusClass[cell.status],
                      )}
                    >
                      <span className="sr-only">
                        {formatDay(cell.iso)}: {statusLabel[cell.status]}
                      </span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Legend for the grid — state is never communicated by colour alone. */
export function GridLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className)}>
      {(["marked", "missed", "off", "future"] as DayStatus[]).map((status) => (
        <li
          key={status}
          className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint"
        >
          <span className={cn("h-2.5 w-2.5 rounded-[2px]", statusClass[status])} />
          {statusLabel[status]}
        </li>
      ))}
    </ul>
  );
}
