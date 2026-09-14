import { addDays, relativeDayLabel, startOfWeek, WEEKDAY_INITIALS, weekdayOf, type ISODate } from "@/lib/date";
import { dayDigest } from "../engine";
import type { Habit } from "../types";
import { cn } from "@/lib/cn";

const rampClass = ["bg-ramp-0", "bg-ramp-1", "bg-ramp-2", "bg-ramp-3", "bg-ramp-4"];

/**
 * The current week as seven buttons. Selecting a day lets you mark or unmark it
 * — marking yesterday is a normal, expected thing to need.
 */
export function WeekStrip({
  habits,
  selected,
  today,
  onSelect,
}: {
  habits: Habit[];
  selected: ISODate;
  today: ISODate;
  onSelect: (day: ISODate) => void;
}) {
  const monday = startOfWeek(selected);
  const days = Array.from({ length: 7 }, (_, index) => addDays(monday, index));

  return (
    <div className="flex gap-1.5" role="group" aria-label="Choose a day this week">
      {days.map((day) => {
        const digest = dayDigest(habits, day);
        const future = day > today;
        const isSelected = day === selected;
        return (
          <button
            key={day}
            type="button"
            disabled={future}
            aria-current={isSelected ? "date" : undefined}
            onClick={() => onSelect(day)}
            title={
              future
                ? "Not yet"
                : `${relativeDayLabel(day, today)} — ${digest.kept} of ${digest.due} kept`
            }
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center gap-2 rounded-md border px-1 py-2.5 transition-colors",
              isSelected ? "border-ink bg-surface" : "border-line bg-surface/60 hover:border-line-strong",
              future && "opacity-40",
            )}
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-faint">
              {WEEKDAY_INITIALS[weekdayOf(day)]}
            </span>
            <span className="text-[0.8125rem] tnum text-ink">{Number(day.slice(-2))}</span>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                future ? "bg-transparent ring-1 ring-line" : rampClass[digest.step],
              )}
              aria-hidden="true"
            />
            <span className="sr-only">
              {digest.kept} of {digest.due} practices kept
            </span>
          </button>
        );
      })}
    </div>
  );
}
