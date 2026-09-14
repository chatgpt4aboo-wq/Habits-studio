import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { formatLongDay, relativeDayLabel, type ISODate } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { GridLegend } from "@/components/charts/PracticeGrid";
import { MomentumLine } from "@/components/charts/MomentumLine";
import { dayDigest, dueOn, isMarked, momentum, overallRate } from "@/features/habits/engine";
import { useStudio } from "@/features/habits/store";
import { HabitForm } from "@/features/habits/components/HabitForm";
import { PracticeCard } from "@/features/habits/components/PracticeCard";
import { PracticeRow } from "@/features/habits/components/PracticeRow";
import { WeekStrip } from "@/features/habits/components/WeekStrip";
import type { Habit, HabitDraft } from "@/features/habits/types";

type View = "today" | "all" | "shelf";

export default function Studio() {
  const studio = useStudio();
  const [day, setDay] = useState<ISODate>(studio.today);
  const [view, setView] = useState<View>("today");
  const [editing, setEditing] = useState<Habit | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const digest = useMemo(() => dayDigest(studio.active, day), [studio.active, day]);
  const series = useMemo(() => momentum(studio.active, studio.today, 14), [studio.active, studio.today]);
  const fortnight = useMemo(() => overallRate(studio.active, studio.today, 14), [studio.active, studio.today]);
  const due = useMemo(() => dueOn(studio.active, day), [studio.active, day]);
  const open = due.filter((habit) => !isMarked(habit, day));
  const kept = due.filter((habit) => isMarked(habit, day));
  const bonus = studio.active.filter((habit) => !due.includes(habit) && isMarked(habit, day));

  const openForm = (habit: Habit | null) => {
    setEditing(habit);
    setFormOpen(true);
  };

  const submit = (draft: HabitDraft) => {
    if (editing) studio.update(editing.id, draft);
    else studio.create(draft);
  };

  const dayLabel = relativeDayLabel(day, studio.today);

  return (
    <div className="wrap py-10">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{formatLongDay(day)}</p>
          <h1 className="mt-2 font-display text-display-lg">
            {digest.due === 0
              ? "Nothing due."
              : open.length === 0
                ? `${dayLabel} is complete.`
                : `${open.length} left ${dayLabel === "Today" ? "today" : dayLabel.toLowerCase()}.`}
          </h1>
          <p className="mt-2 max-w-prose text-ink-soft">
            {digest.due === 0
              ? "A clear day is a legitimate result. Design a practice when you are ready for one."
              : `${digest.kept} of ${digest.due} practices kept. Marks are saved the moment you make them.`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ProgressRing value={digest.ratio} size={64} label={`${digest.kept}/${digest.due}`} />
          <Button onClick={() => openForm(null)}>
            <Plus className="h-4 w-4" />
            New practice
          </Button>
        </div>
      </header>

      <div className="mt-8">
        <WeekStrip habits={studio.active} selected={day} today={studio.today} onSelect={setDay} />
        {day !== studio.today ? (
          <p className="mt-2 flex items-center gap-2 text-[0.8125rem] text-ink-faint">
            Marking {dayLabel.toLowerCase()}.
            <button
              type="button"
              onClick={() => setDay(studio.today)}
              className="text-kelp underline underline-offset-4"
            >
              Back to today
            </button>
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          label="Studio view"
          value={view}
          onChange={setView}
          segments={[
            { value: "today", label: dayLabel },
            { value: "all", label: `All practices (${studio.active.length})` },
            { value: "shelf", label: `Shelf (${studio.shelved.length})` },
          ]}
        />
        <Link
          to="/insights"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          See the whole picture
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {studio.habits.length === 0 ? (
        <EmptyStudio onCreate={() => openForm(null)} onSeed={studio.loadSeed} />
      ) : view === "today" ? (
        <div className="mt-4 space-y-4">
          <Panel className="overflow-hidden">
            {due.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-ink-faint">
                Nothing is due {dayLabel.toLowerCase()}. Rest days are part of the cadence.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {[...open, ...kept].map((habit) => (
                  <PracticeRow
                    key={habit.id}
                    habit={habit}
                    day={day}
                    today={studio.today}
                    onToggle={() => studio.toggle(habit.id, day)}
                    onOpen={() => openForm(habit)}
                  />
                ))}
              </ul>
            )}
          </Panel>

          {studio.active.length > 0 ? (
            <Panel>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-5 py-3.5">
                <h2 className="text-[0.9375rem] font-medium text-ink">Last fourteen days</h2>
                <p className="text-[0.8125rem] text-ink-faint tnum">
                  {fortnight === null ? "Nothing due yet" : `${Math.round(fortnight * 100)}% of due practices kept`}
                </p>
              </div>
              <div className="px-5 py-5">
                <MomentumLine series={series} height={108} />
              </div>
            </Panel>
          ) : null}

          {bonus.length > 0 ? (
            <Panel className="overflow-hidden">
              <p className="border-b border-line px-5 py-2.5 eyebrow">Bonus marks</p>
              <ul className="divide-y divide-line">
                {bonus.map((habit) => (
                  <PracticeRow
                    key={habit.id}
                    habit={habit}
                    day={day}
                    today={studio.today}
                    onToggle={() => studio.toggle(habit.id, day)}
                    onOpen={() => openForm(habit)}
                  />
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>
      ) : (
        <div className="mt-4">
          <GridLegend className="mb-4" />
          <div className="grid gap-4 lg:grid-cols-2">
            {(view === "all" ? studio.active : studio.shelved).map((habit) => (
              <PracticeCard
                key={habit.id}
                habit={habit}
                today={studio.today}
                onToggle={(target) => studio.toggle(habit.id, target)}
                onEdit={() => openForm(habit)}
                onShelve={() => studio.shelve(habit.id)}
                onUnshelve={() => studio.unshelve(habit.id)}
                onRemove={() => studio.remove(habit.id)}
              />
            ))}
          </div>
          {(view === "all" ? studio.active : studio.shelved).length === 0 ? (
            <Panel className="px-5 py-10 text-center">
              <p className="text-sm text-ink-faint">
                {view === "all"
                  ? "Every practice is on the shelf right now."
                  : "The shelf is empty. Practices you pause will wait here with their history."}
              </p>
            </Panel>
          ) : null}
        </div>
      )}

      <HabitForm
        open={formOpen}
        habit={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={submit}
      />
    </div>
  );
}

function EmptyStudio({ onCreate, onSeed }: { onCreate: () => void; onSeed: () => void }) {
  return (
    <Panel className="mt-4 px-6 py-14 text-center">
      <Badge tone="kelp">Empty studio</Badge>
      <h2 className="mx-auto mt-4 max-w-md font-display text-display-md">
        Two practices is a good first studio.
      </h2>
      <p className="mx-auto mt-3 max-w-prose text-ink-soft">
        Pick something you could do on your worst day, give it a cadence, and mark it tonight.
        You can always add the ambitious one later.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4" />
          Design a practice
        </Button>
        <Button variant="secondary" onClick={onSeed}>
          <Sparkles className="h-4 w-4" />
          Load the demo studio
        </Button>
      </div>
    </Panel>
  );
}
