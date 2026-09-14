import { useEffect, useMemo, useState } from "react";
import { WEEKDAY_SHORT } from "@/lib/date";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { cn } from "@/lib/cn";
import { describeCadence } from "../engine";
import { HABIT_COLORS, HABIT_ICONS, type Cadence, type Habit, type HabitDraft } from "../types";
import { iconFor, iconLabels } from "./icons";

const colorSwatch: Record<(typeof HABIT_COLORS)[number], string> = {
  kelp: "bg-kelp",
  volt: "bg-volt",
  clay: "bg-clay",
  ink: "bg-ink",
};

const colorNames: Record<(typeof HABIT_COLORS)[number], string> = {
  kelp: "Kelp",
  volt: "Volt",
  clay: "Clay",
  ink: "Ink",
};

const blank: HabitDraft = {
  name: "",
  intention: "",
  cadence: { type: "daily" },
  color: "kelp",
  icon: "sprout",
};

export function HabitForm({
  open,
  habit,
  onClose,
  onSubmit,
}: {
  open: boolean;
  /** Present when editing; absent when designing something new. */
  habit?: Habit | null;
  onClose: () => void;
  onSubmit: (draft: HabitDraft) => void;
}) {
  const [draft, setDraft] = useState<HabitDraft>(blank);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTouched(false);
    setDraft(
      habit
        ? {
            name: habit.name,
            intention: habit.intention,
            cadence: habit.cadence,
            color: habit.color,
            icon: habit.icon,
          }
        : blank,
    );
  }, [open, habit]);

  const nameError = useMemo(() => {
    if (!touched) return null;
    if (draft.name.trim().length === 0) return "Give the practice a name.";
    return null;
  }, [draft.name, touched]);

  const daysError =
    draft.cadence.type === "days" && draft.cadence.days.length === 0
      ? "Choose at least one day."
      : null;

  const submit = () => {
    setTouched(true);
    if (draft.name.trim().length === 0 || daysError) return;
    onSubmit({ ...draft, name: draft.name.trim(), intention: draft.intention.trim() });
    onClose();
  };

  const setCadenceType = (type: Cadence["type"]) => {
    setDraft((current) => {
      if (type === current.cadence.type) return current;
      if (type === "daily") return { ...current, cadence: { type: "daily" } };
      if (type === "days") return { ...current, cadence: { type: "days", days: [1, 3, 5] } };
      return { ...current, cadence: { type: "weekly", times: 3 } };
    });
  };

  const toggleDay = (day: number) => {
    setDraft((current) => {
      if (current.cadence.type !== "days") return current;
      const days = current.cadence.days.includes(day)
        ? current.cadence.days.filter((value) => value !== day)
        : [...current.cadence.days, day];
      return { ...current, cadence: { type: "days", days } };
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={habit ? "Edit practice" : "Design a practice"}
      description={
        habit
          ? "Changing the cadence keeps every mark you have already made."
          : "Small enough to keep on your worst day."
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{habit ? "Save practice" : "Add to studio"}</Button>
        </>
      }
    >
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <Field label="Practice" htmlFor="habit-name" hint={nameError ?? "A verb and a size. “Read ten pages.”"}>
          <Input
            id="habit-name"
            data-autofocus
            value={draft.name}
            maxLength={80}
            aria-invalid={nameError ? true : undefined}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            onBlur={() => setTouched(true)}
            placeholder="Read ten pages"
            className={cn(nameError && "border-clay")}
          />
        </Field>

        <Field
          label="Intention"
          htmlFor="habit-intention"
          hint="The “so that…”. You will read this on the days you don't feel like it."
        >
          <Textarea
            id="habit-intention"
            rows={2}
            maxLength={200}
            value={draft.intention}
            onChange={(event) => setDraft({ ...draft, intention: event.target.value })}
            placeholder="Paper books only, phone in the other room."
          />
        </Field>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[0.8125rem] font-medium text-ink">Cadence</span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
              {daysError ? "—" : describeCadence(draft.cadence)}
            </span>
          </div>

          <SegmentedControl
            label="Cadence type"
            value={draft.cadence.type}
            onChange={setCadenceType}
            segments={[
              { value: "daily", label: "Daily" },
              { value: "days", label: "Chosen days" },
              { value: "weekly", label: "n× a week" },
            ]}
          />

          {draft.cadence.type === "days" ? (
            <div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Days of the week">
                {[1, 2, 3, 4, 5, 6, 0].map((day) => {
                  const selected = draft.cadence.type === "days" && draft.cadence.days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleDay(day)}
                      className={cn(
                        "h-9 min-w-[2.75rem] rounded-md border px-2 text-[0.8125rem] transition-colors",
                        selected
                          ? "border-kelp bg-kelp-tint text-kelp"
                          : "border-line text-ink-soft hover:border-line-strong",
                      )}
                    >
                      {WEEKDAY_SHORT[day]}
                    </button>
                  );
                })}
              </div>
              {daysError ? <p className="mt-1.5 text-xs text-clay">{daysError}</p> : null}
            </div>
          ) : null}

          {draft.cadence.type === "weekly" ? (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Times per week">
              {[1, 2, 3, 4, 5, 6].map((times) => {
                const selected = draft.cadence.type === "weekly" && draft.cadence.times === times;
                return (
                  <button
                    key={times}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDraft({ ...draft, cadence: { type: "weekly", times } })}
                    className={cn(
                      "h-9 w-11 rounded-md border text-[0.8125rem] tnum transition-colors",
                      selected
                        ? "border-kelp bg-kelp-tint text-kelp"
                        : "border-line text-ink-soft hover:border-line-strong",
                    )}
                  >
                    {times}×
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Accent">
            <div className="flex gap-1.5" role="group" aria-label="Accent colour">
              {HABIT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-pressed={draft.color === color}
                  aria-label={colorNames[color]}
                  title={colorNames[color]}
                  onClick={() => setDraft({ ...draft, color })}
                  className={cn(
                    "h-9 w-9 rounded-md border-2 p-1 transition-colors",
                    draft.color === color ? "border-ink" : "border-transparent hover:border-line-strong",
                  )}
                >
                  <span className={cn("block h-full w-full rounded-sm", colorSwatch[color])} />
                </button>
              ))}
            </div>
          </Field>

          <Field label="Glyph">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Glyph">
              {HABIT_ICONS.map((icon) => {
                const Icon = iconFor(icon);
                return (
                  <button
                    key={icon}
                    type="button"
                    aria-pressed={draft.icon === icon}
                    aria-label={iconLabels[icon]}
                    title={iconLabels[icon]}
                    onClick={() => setDraft({ ...draft, icon })}
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
                      draft.icon === icon
                        ? "border-ink text-ink"
                        : "border-line text-ink-faint hover:border-line-strong hover:text-ink-soft",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
      </form>
    </Modal>
  );
}
