import {
  addDays,
  daysBetween,
  eachDay,
  lastDays,
  startOfWeek,
  todayISO,
  weekdayOf,
  type ISODate,
} from "@/lib/date";
import type { Cadence, Habit } from "./types";

/**
 * Everything the studio knows how to calculate. Pure functions over plain
 * data — no React, no storage, no clock beyond an explicit `today` argument,
 * which is what makes the whole thing testable.
 */

export type DayStatus =
  /** Kept. */
  | "marked"
  /** Due today and still open. */
  | "pending"
  /** Was due, not kept. */
  | "missed"
  /** Not due (rest day, before the practice existed, or shelved). */
  | "off"
  /** Hasn't happened yet. */
  | "future";

export interface Run {
  length: number;
  unit: "day" | "week";
}

export interface HabitStats {
  run: Run;
  longestRun: Run;
  /** Kept ÷ due across the window, 0–1. `null` when nothing was due. */
  rate: number | null;
  kept: number;
  due: number;
  marksAllTime: number;
  dueToday: boolean;
  doneToday: boolean;
  lastMark: ISODate | null;
}

export function isActive(habit: Habit, on: ISODate): boolean {
  if (on < habit.createdAt) return false;
  if (habit.shelvedAt && on > habit.shelvedAt) return false;
  return true;
}

/** Is this practice due on this day? Weekly cadences accept any day. */
export function isScheduled(habit: Habit, on: ISODate): boolean {
  if (!isActive(habit, on)) return false;
  switch (habit.cadence.type) {
    case "daily":
      return true;
    case "days":
      return habit.cadence.days.includes(weekdayOf(on));
    case "weekly":
      return true;
  }
}

export function isMarked(habit: Habit, on: ISODate): boolean {
  return habit.marks[on] === true;
}

/** Returns a new habit with the day toggled. Never mutates. */
export function toggleMark(habit: Habit, on: ISODate): Habit {
  const marks = { ...habit.marks };
  if (marks[on]) delete marks[on];
  else marks[on] = true;
  return { ...habit, marks };
}

export function markCount(habit: Habit): number {
  return Object.keys(habit.marks).length;
}

export function lastMark(habit: Habit): ISODate | null {
  const days = Object.keys(habit.marks).sort();
  return days.length ? days[days.length - 1] : null;
}

export function marksInWeek(habit: Habit, anyDayOfWeek: ISODate): number {
  const start = startOfWeek(anyDayOfWeek);
  return eachDay(start, addDays(start, 6)).filter((day) => isMarked(habit, day)).length;
}

/** How many days a week this cadence asks for — used for copy and forecasts. */
export function weeklyLoad(cadence: Cadence): number {
  switch (cadence.type) {
    case "daily":
      return 7;
    case "days":
      return cadence.days.length;
    case "weekly":
      return cadence.times;
  }
}

export function describeCadence(cadence: Cadence): string {
  switch (cadence.type) {
    case "daily":
      return "Every day";
    case "days": {
      const initials = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const days = [...cadence.days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
      if (days.length === 0) return "No days chosen";
      if (days.length === 7) return "Every day";
      if (days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d))) return "Weekdays";
      if (days.length === 2 && days.includes(0) && days.includes(6)) return "Weekends";
      return days.map((d) => initials[d]).join(" · ");
    }
    case "weekly":
      return cadence.times === 1 ? "Once a week" : `${cadence.times}× a week`;
  }
}

export function dayStatus(habit: Habit, on: ISODate, today: ISODate = todayISO()): DayStatus {
  if (on > today) return "future";
  if (isMarked(habit, on)) return "marked";
  if (!isScheduled(habit, on)) return "off";
  // A flexible weekly cadence has no per-day obligation, so an unmarked day
  // is simply blank rather than a miss.
  if (habit.cadence.type === "weekly") return "off";
  if (on === today) return "pending";
  return "missed";
}

/**
 * The current run: consecutive kept days (or, for weekly cadences, consecutive
 * weeks that hit their target). A day that is still open today never breaks it.
 */
export function currentRun(habit: Habit, today: ISODate = todayISO()): Run {
  if (habit.cadence.type === "weekly") {
    const target = Math.max(1, habit.cadence.times);
    let weeks = 0;
    let cursor = startOfWeek(today);
    // The week in progress only counts once it has already hit target.
    if (marksInWeek(habit, cursor) < target) cursor = addDays(cursor, -7);
    while (cursor >= startOfWeek(habit.createdAt)) {
      if (marksInWeek(habit, cursor) < target) break;
      weeks++;
      cursor = addDays(cursor, -7);
    }
    return { length: weeks, unit: "week" };
  }

  let days = 0;
  let cursor = today;
  if (isScheduled(habit, today) && !isMarked(habit, today)) cursor = addDays(today, -1);
  while (cursor >= habit.createdAt) {
    if (isScheduled(habit, cursor)) {
      if (!isMarked(habit, cursor)) break;
      days++;
    } else if (isMarked(habit, cursor)) {
      // Bonus day outside the cadence — keeps the run alive, doesn't inflate it.
    }
    cursor = addDays(cursor, -1);
  }
  return { length: days, unit: "day" };
}

export function longestRun(habit: Habit, today: ISODate = todayISO()): Run {
  if (habit.cadence.type === "weekly") {
    const target = Math.max(1, habit.cadence.times);
    let best = 0;
    let streak = 0;
    const firstWeek = startOfWeek(habit.createdAt);
    const thisWeek = startOfWeek(today);
    for (let week = firstWeek; week <= thisWeek; week = addDays(week, 7)) {
      const hit = marksInWeek(habit, week) >= target;
      // Don't punish the week still in progress.
      if (!hit && week === thisWeek) break;
      streak = hit ? streak + 1 : 0;
      best = Math.max(best, streak);
    }
    return { length: best, unit: "week" };
  }

  let best = 0;
  let streak = 0;
  for (const day of eachDay(habit.createdAt, today)) {
    const scheduled = isScheduled(habit, day);
    const marked = isMarked(habit, day);
    if (scheduled && marked) {
      streak++;
      best = Math.max(best, streak);
    } else if (!scheduled) {
      // Rest day (or a bonus mark on one): the run carries over untouched.
      continue;
    } else if (day === today) {
      break; // today is still open
    } else {
      streak = 0;
    }
  }
  return { length: best, unit: "day" };
}

/** Kept vs. due over a trailing window. Bonus days count, but never above 100%. */
export function completion(
  habit: Habit,
  from: ISODate,
  to: ISODate,
): { kept: number; due: number; rate: number | null } {
  const span = eachDay(from, to).filter((day) => isActive(habit, day));
  const kept = span.filter((day) => isMarked(habit, day)).length;

  let due: number;
  if (habit.cadence.type === "weekly") {
    due = Math.round((span.length / 7) * Math.max(1, habit.cadence.times));
  } else {
    due = span.filter((day) => isScheduled(habit, day)).length;
  }

  if (due <= 0) return { kept, due: 0, rate: null };
  return { kept, due, rate: Math.min(1, kept / due) };
}

export function habitStats(
  habit: Habit,
  today: ISODate = todayISO(),
  windowDays = 30,
): HabitStats {
  const from = addDays(today, -(windowDays - 1));
  const { kept, due, rate } = completion(habit, from, today);
  return {
    run: currentRun(habit, today),
    longestRun: longestRun(habit, today),
    rate,
    kept,
    due,
    marksAllTime: markCount(habit),
    dueToday: isScheduled(habit, today),
    doneToday: isMarked(habit, today),
    lastMark: lastMark(habit),
  };
}

/** Practices due on a given day, in display order. */
export function dueOn(habits: Habit[], on: ISODate): Habit[] {
  return habits.filter((habit) => !habit.shelvedAt && isScheduled(habit, on));
}

export interface DayDigest {
  iso: ISODate;
  due: number;
  kept: number;
  ratio: number;
  /** 0–4 bucket for the sequential grid ramp. */
  step: 0 | 1 | 2 | 3 | 4;
}

export function dayDigest(habits: Habit[], on: ISODate): DayDigest {
  const due = habits.filter((habit) => isScheduled(habit, on)).length;
  const kept = habits.filter((habit) => isActive(habit, on) && isMarked(habit, on)).length;
  const ratio = due === 0 ? 0 : Math.min(1, kept / due);
  const step = (ratio === 0 ? 0 : Math.min(4, Math.ceil(ratio * 4))) as DayDigest["step"];
  return { iso: on, due, kept, ratio, step };
}

/** A trailing series of digests — the studio's momentum line. */
export function momentum(habits: Habit[], today: ISODate, days = 14): DayDigest[] {
  return lastDays(today, days).map((day) => dayDigest(habits, day));
}

/** Rolling completion across a window: kept ÷ due for all practices. */
export function overallRate(habits: Habit[], today: ISODate, days = 30): number | null {
  let kept = 0;
  let due = 0;
  for (const habit of habits) {
    const result = completion(habit, addDays(today, -(days - 1)), today);
    kept += result.kept;
    due += result.due;
  }
  if (due === 0) return null;
  return Math.min(1, kept / due);
}

export interface WeekdayProfile {
  weekday: number;
  kept: number;
  due: number;
  rate: number | null;
}

/** Which days of the week actually hold up — the most useful thing we compute. */
export function weekdayProfile(
  habits: Habit[],
  today: ISODate,
  days = 56,
): WeekdayProfile[] {
  const buckets: WeekdayProfile[] = Array.from({ length: 7 }, (_, weekday) => ({
    weekday,
    kept: 0,
    due: 0,
    rate: null,
  }));

  for (const day of lastDays(today, days)) {
    if (day > today) continue;
    const bucket = buckets[weekdayOf(day)];
    for (const habit of habits) {
      if (!isScheduled(habit, day)) continue;
      bucket.due++;
      if (isMarked(habit, day)) bucket.kept++;
    }
  }

  return buckets.map((bucket) => ({
    ...bucket,
    rate: bucket.due === 0 ? null : bucket.kept / bucket.due,
  }));
}

/** Monday-first columns of 7 cells, oldest week first — the practice grid. */
export function gridWeeks(
  habit: Habit,
  weeks: number,
  today: ISODate = todayISO(),
): { iso: ISODate; status: DayStatus }[][] {
  const firstMonday = addDays(startOfWeek(today), -7 * (weeks - 1));
  return Array.from({ length: weeks }, (_, week) => {
    const monday = addDays(firstMonday, week * 7);
    return eachDay(monday, addDays(monday, 6)).map((iso) => ({
      iso,
      status: dayStatus(habit, iso, today),
    }));
  });
}

/** Days since the practice was last kept — `null` if never. */
export function daysSinceLastMark(habit: Habit, today: ISODate = todayISO()): number | null {
  const last = lastMark(habit);
  return last ? daysBetween(last, today) : null;
}
