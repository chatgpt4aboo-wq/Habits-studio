import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { PracticeGrid } from "@/components/charts/PracticeGrid";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { seedHabits } from "@/features/habits/seed";
import { dayDigest, currentRun, describeCadence } from "@/features/habits/engine";
import { HabitGlyph } from "@/features/habits/components/HabitIcon";
import { todayISO } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";

/**
 * The hero shows the real product, not a picture of it: the same grid and the
 * same engine, running on the demo studio.
 */
export function Hero() {
  const today = todayISO();
  const demo = seedHabits(today);
  const digest = dayDigest(demo, today);

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="wrap grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="animate-rise-in">
          <Badge tone="volt">Practice studio · est. 2026</Badge>
          <h1 className="mt-6 font-display text-display-xl">
            Design the days
            <br />
            that design <em className="font-normal not-italic text-kelp">you.</em>
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">
            Habits Studio is a quiet workshop for a handful of practices. Choose a cadence, mark
            the day, and let twelve weeks of evidence do the arguing.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink to="/studio" size="lg">
              Open the studio
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink to="/brand" size="lg" variant="secondary">
              See the brand
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              { label: "Practices", value: "2–5" },
              { label: "Weeks in view", value: "12" },
              { label: "Accounts needed", value: "0" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1.5 font-display text-2xl tnum">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-in">
          {/* Decorative ruled backdrop — the studio's cutting mat. */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-xl opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--line)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line)) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)",
            }}
          />

          <Panel className="overflow-hidden shadow-lift">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <p className="eyebrow">Today</p>
                <p className="mt-1 font-display text-display-sm">
                  {digest.kept} of {digest.due} kept
                </p>
              </div>
              <ProgressRing value={digest.ratio} />
            </div>

            <ul className="divide-y divide-line">
              {demo.slice(0, 3).map((habit) => {
                const run = currentRun(habit, today);
                return (
                  <li key={habit.id} className="flex items-center gap-3.5 px-5 py-3.5">
                    <HabitGlyph icon={habit.icon} color={habit.color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{habit.name}</p>
                      <p className="truncate text-xs text-ink-faint">{describeCadence(habit.cadence)}</p>
                    </div>
                    {run.length > 0 ? (
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint tnum">
                        {run.length} {run.unit}
                        {run.length === 1 ? "" : "s"}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-5 py-4">
              <p className="eyebrow mb-3">{demo[0].name} · last 12 weeks</p>
              <PracticeGrid habit={demo[0]} today={today} />
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
