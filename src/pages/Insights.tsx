import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, RotateCcw } from "lucide-react";
import { WEEKDAY_LONG, addDays } from "@/lib/date";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Stat } from "@/components/ui/Stat";
import { MomentumLine } from "@/components/charts/MomentumLine";
import { WeekdayBars } from "@/components/charts/WeekdayBars";
import {
  completion,
  currentRun,
  habitStats,
  momentum,
  overallRate,
  weekdayProfile,
  type Run,
} from "@/features/habits/engine";
import { useStudio } from "@/features/habits/store";
import { HabitGlyph } from "@/features/habits/components/HabitIcon";

type Range = "14" | "30" | "90";

export default function Insights() {
  const studio = useStudio();
  const [range, setRange] = useState<Range>("30");
  const days = Number(range);

  const series = useMemo(
    () => momentum(studio.active, studio.today, Math.min(days, 30)),
    [studio.active, studio.today, days],
  );
  const rate = useMemo(() => overallRate(studio.active, studio.today, days), [studio.active, studio.today, days]);
  const profile = useMemo(
    () => weekdayProfile(studio.active, studio.today, days),
    [studio.active, studio.today, days],
  );

  const totalMarks = studio.habits.reduce((sum, habit) => sum + Object.keys(habit.marks).length, 0);
  const bestRun = studio.active.reduce<Run & { name: string }>(
    (best, habit) => {
      const run = currentRun(habit, studio.today);
      return run.length > best.length ? { ...run, name: habit.name } : best;
    },
    { length: 0, unit: "day", name: "" },
  );
  const strongestDay = profile.reduce<{ weekday: number; rate: number } | null>((best, day) => {
    if (day.rate === null) return best;
    return best === null || day.rate > best.rate ? { weekday: day.weekday, rate: day.rate } : best;
  }, null);

  const download = () => {
    const blob = new Blob([studio.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `habits-studio-${studio.today}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (studio.active.length === 0) {
    return (
      <div className="wrap py-20 text-center">
        <h1 className="font-display text-display-lg">Nothing to read yet.</h1>
        <p className="mx-auto mt-3 max-w-prose text-ink-soft">
          Insights are built from your own marks. Design a practice, keep it for a few days, and
          this page starts saying something useful.
        </p>
        <ButtonLink to="/studio" className="mt-7" variant="secondary">
          Back to the studio
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="wrap py-10">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Link
            to="/studio"
            className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Studio
          </Link>
          <h1 className="mt-3 font-display text-display-lg">Insights</h1>
          <p className="mt-2 max-w-prose text-ink-soft">
            Everything here is counted from your marks — nothing is estimated, and days with
            nothing due are left blank rather than scored zero.
          </p>
        </div>
        <SegmentedControl
          label="Window"
          value={range}
          onChange={setRange}
          segments={[
            { value: "14", label: "14 days" },
            { value: "30", label: "30 days" },
            { value: "90", label: "90 days" },
          ]}
        />
      </header>

      <Panel className="mt-8 grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
        <Stat
          label={`Kept · ${days} days`}
          value={rate === null ? "—" : `${Math.round(rate * 100)}%`}
          context={`Across ${studio.active.length} practice${studio.active.length === 1 ? "" : "s"}`}
          className="border-b border-line sm:border-b-0 lg:border-b-0"
        />
        <Stat
          label="Longest live run"
          value={bestRun.length}
          unit={`${bestRun.unit}${bestRun.length === 1 ? "" : "s"}`}
          context={bestRun.name || "Nothing running yet"}
          className="border-b border-line sm:border-b-0"
        />
        <Stat
          label="Marks all time"
          value={totalMarks}
          context="Every day you showed up"
          className="border-b border-line sm:border-b-0 lg:border-b-0 lg:border-l"
        />
        <Stat
          label="Strongest day"
          value={strongestDay === null ? "—" : WEEKDAY_LONG[strongestDay.weekday].slice(0, 3)}
          context={
            strongestDay === null
              ? "Not enough data"
              : `${Math.round(strongestDay.rate * 100)}% kept on ${WEEKDAY_LONG[strongestDay.weekday]}s`
          }
        />
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <PanelHeader
            title="Momentum"
            hint={`Share of due practices kept each day, last ${series.length} days.`}
          />
          <div className="px-5 py-5">
            <MomentumLine series={series} />
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHeader title="By weekday" hint="Where the week holds and where it slips." />
          <div className="px-5 py-5">
            <WeekdayBars profile={profile} />
          </div>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Practice by practice" hint={`Kept against due over the last ${days} days.`} />
        <ul className="divide-y divide-line">
          {studio.active.map((habit) => {
            const stats = habitStats(habit, studio.today, days);
            const span = completion(habit, addDays(studio.today, -(days - 1)), studio.today);
            const pct = span.rate === null ? null : Math.round(span.rate * 100);
            return (
              <li key={habit.id} className="flex items-center gap-4 px-5 py-4">
                <HabitGlyph icon={habit.icon} color={habit.color} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.9375rem] font-medium text-ink">{habit.name}</p>
                  <p className="mt-0.5 text-[0.8125rem] text-ink-faint tnum">
                    {span.kept} kept of {span.due} due · run {stats.run.length} {stats.run.unit}
                    {stats.run.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="hidden w-40 sm:block">
                  <span className="relative block h-2.5 w-full overflow-hidden rounded-full bg-ramp-0">
                    {pct !== null ? (
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-ramp-3"
                        style={{ width: `${Math.max(pct === 0 ? 0 : 3, pct)}%` }}
                      />
                    ) : null}
                  </span>
                </div>
                <span className="w-12 shrink-0 text-right text-[0.9375rem] tnum text-ink">
                  {pct === null ? "—" : `${pct}%`}
                </span>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel className="mt-4 flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div>
          <h2 className="text-[0.9375rem] font-medium text-ink">Your data</h2>
          <p className="mt-0.5 text-[0.8125rem] text-ink-faint">
            Marks live in this browser only. Take them with you, or start over.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={download}>
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </Button>
          <Button variant="ghost" size="sm" onClick={studio.reset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Clear studio
          </Button>
        </div>
      </Panel>
    </div>
  );
}
