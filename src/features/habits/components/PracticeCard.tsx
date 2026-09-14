import { useState } from "react";
import { ArchiveRestore, PackageOpen, Pencil, Trash2 } from "lucide-react";
import { relativeDayLabel, type ISODate } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { PracticeGrid } from "@/components/charts/PracticeGrid";
import { cn } from "@/lib/cn";
import { daysSinceLastMark, describeCadence, habitStats } from "../engine";
import type { Habit } from "../types";
import { HabitGlyph } from "./HabitIcon";
import { MarkButton } from "./MarkButton";

/** A practice in full: its history, its numbers, and the ways to change it. */
export function PracticeCard({
  habit,
  today,
  onToggle,
  onEdit,
  onShelve,
  onUnshelve,
  onRemove,
}: {
  habit: Habit;
  today: ISODate;
  onToggle: (day: ISODate) => void;
  onEdit: () => void;
  onShelve: () => void;
  onUnshelve: () => void;
  onRemove: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const stats = habitStats(habit, today);
  const idle = daysSinceLastMark(habit, today);
  const shelved = Boolean(habit.shelvedAt);

  return (
    <Panel as="article" className={cn("overflow-hidden", shelved && "opacity-80")}>
      <div className="flex items-start gap-3.5 border-b border-line px-5 py-4">
        <HabitGlyph icon={habit.icon} color={habit.color} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-display-sm">{habit.name}</h3>
            {shelved ? <Badge tone="outline">On the shelf</Badge> : null}
          </div>
          <p className="mt-1 text-[0.8125rem] text-ink-faint">
            {describeCadence(habit.cadence)}
            {habit.intention ? <span className="text-ink-soft"> · {habit.intention}</span> : null}
          </p>
        </div>
        {!shelved && stats.dueToday ? (
          <MarkButton
            marked={stats.doneToday}
            onToggle={() => onToggle(today)}
            name={habit.name}
            dayLabel={relativeDayLabel(today, today)}
            size="sm"
          />
        ) : null}
      </div>

      <dl className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <div className="px-5 py-3.5">
          <dt className="eyebrow">Run</dt>
          <dd className="mt-1 font-display text-xl tnum">
            {stats.run.length}
            <span className="ml-1 font-body text-xs font-normal text-ink-faint">
              {stats.run.unit}
              {stats.run.length === 1 ? "" : "s"}
            </span>
          </dd>
        </div>
        <div className="px-5 py-3.5">
          <dt className="eyebrow">30 days</dt>
          <dd className="mt-1 font-display text-xl tnum">
            {stats.rate === null ? "—" : `${Math.round(stats.rate * 100)}%`}
          </dd>
        </div>
        <div className="px-5 py-3.5">
          <dt className="eyebrow">Best run</dt>
          <dd className="mt-1 font-display text-xl tnum">
            {stats.longestRun.length}
            <span className="ml-1 font-body text-xs font-normal text-ink-faint">
              {stats.longestRun.unit}
              {stats.longestRun.length === 1 ? "" : "s"}
            </span>
          </dd>
        </div>
      </dl>

      <div className="px-5 py-4">
        <PracticeGrid habit={habit} today={today} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-sunken/50 px-5 py-3">
        <p className="text-xs text-ink-faint">
          {stats.marksAllTime === 0
            ? "No marks yet. The first one is the whole trick."
            : idle === 0
              ? `${stats.marksAllTime} marks · kept today`
              : `${stats.marksAllTime} marks · last kept ${idle} day${idle === 1 ? "" : "s"} ago`}
        </p>

        <div className="flex items-center gap-1">
          <IconAction label="Edit practice" onClick={onEdit} icon={Pencil} />
          {shelved ? (
            <IconAction label="Take off the shelf" onClick={onUnshelve} icon={ArchiveRestore} />
          ) : (
            <IconAction label="Move to the shelf" onClick={onShelve} icon={PackageOpen} />
          )}
          <IconAction
            label="Delete practice"
            onClick={() => setConfirming(true)}
            icon={Trash2}
            tone="clay"
          />
        </div>
      </div>

      {confirming ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-clay-tint px-5 py-3">
          <p className="text-[0.8125rem] text-ink">
            Delete <strong className="font-medium">{habit.name}</strong> and its {stats.marksAllTime}{" "}
            marks? The shelf keeps them; this doesn't.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
              Keep it
            </Button>
            <Button size="sm" variant="secondary" onClick={onRemove}>
              Delete
            </Button>
          </div>
        </div>
      ) : null}
    </Panel>
  );
}

function IconAction({
  label,
  onClick,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  onClick: () => void;
  icon: typeof Pencil;
  tone?: "neutral" | "clay";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
        tone === "clay"
          ? "text-ink-faint hover:bg-clay-tint hover:text-clay"
          : "text-ink-faint hover:bg-surface hover:text-ink",
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}
