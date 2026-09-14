import type { ISODate } from "@/lib/date";

/** How often a practice is due. */
export type Cadence =
  /** Every day. */
  | { type: "daily" }
  /** Only on the chosen weekdays (0 = Sunday … 6 = Saturday). */
  | { type: "days"; days: number[] }
  /** Any `times` days within a Monday-first week. */
  | { type: "weekly"; times: number };

export const HABIT_COLORS = ["kelp", "volt", "clay", "ink"] as const;
export type HabitColor = (typeof HABIT_COLORS)[number];

export const HABIT_ICONS = [
  "sprout",
  "book",
  "run",
  "water",
  "pen",
  "moon",
  "guitar",
  "phone",
] as const;
export type HabitIcon = (typeof HABIT_ICONS)[number];

export interface Habit {
  id: string;
  name: string;
  /** The "so that…" behind the practice. Shown when a practice is opened. */
  intention: string;
  cadence: Cadence;
  color: HabitColor;
  icon: HabitIcon;
  createdAt: ISODate;
  /** Set when a practice is moved to the shelf; kept, never deleted, on pause. */
  shelvedAt: ISODate | null;
  /** Sparse set of kept days. Only completed days are stored. */
  marks: Record<ISODate, true>;
}

export interface HabitDraft {
  name: string;
  intention: string;
  cadence: Cadence;
  color: HabitColor;
  icon: HabitIcon;
}

export interface StudioState {
  version: 1;
  habits: Habit[];
}
