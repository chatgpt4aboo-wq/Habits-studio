import { relativeDayLabel, type ISODate } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { currentRun, describeCadence, isMarked, isScheduled, marksInWeek } from "../engine";
import type { Habit } from "../types";
import { HabitGlyph } from "./HabitIcon";
import { MarkButton } from "./MarkButton";

/** One practice, on one day. The row for the Today list. */
export function PracticeRow({
  habit,
  day,
  today,
  onToggle,
  onOpen,
}: {
  habit: Habit;
  day: ISODate;
  today: ISODate;
  onToggle: () => void;
  onOpen?: () => void;
}) {
  const marked = isMarked(habit, day);
  const run = currentRun(habit, today);
  const bonus = !isScheduled(habit, day);

  return (
    <li
      className={cn(
        "flex items-center gap-3.5 px-4 py-3.5 transition-colors sm:px-5",
        marked ? "bg-kelp-tint/40" : "hover:bg-surface-sunken/50",
      )}
    >
      <HabitGlyph icon={habit.icon} color={habit.color} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {onOpen ? (
            <button
              type="button"
              onClick={onOpen}
              className={cn(
                "truncate text-left text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline",
                marked && "text-ink-soft",
              )}
            >
              {habit.name}
            </button>
          ) : (
            <span className="truncate text-[0.9375rem] font-medium text-ink">{habit.name}</span>
          )}
          {bonus ? <Badge tone="outline">Bonus</Badge> : null}
          {run.length > 0 ? (
            <Badge tone={marked ? "kelp" : "neutral"}>
              {run.length} {run.unit}
              {run.length === 1 ? "" : "s"}
            </Badge>
          ) : null}
        </div>
        <p className="mt-0.5 truncate text-[0.8125rem] text-ink-faint">
          {habit.cadence.type === "weekly"
            ? `${describeCadence(habit.cadence)} · ${marksInWeek(habit, day)} done this week`
            : habit.intention || describeCadence(habit.cadence)}
        </p>
      </div>

      <MarkButton
        marked={marked}
        onToggle={onToggle}
        name={habit.name}
        dayLabel={relativeDayLabel(day, today)}
      />
    </li>
  );
}
