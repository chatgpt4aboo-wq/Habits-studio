import { addDays, lastDays, startOfWeek, todayISO, weekdayOf, type ISODate } from "@/lib/date";
import type { Habit } from "./types";

/**
 * A first-run studio that already looks lived-in. Marks are generated from a
 * deterministic hash, not Math.random, so a practice's history is stable
 * between reloads and identical in tests.
 */

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

interface SeedSpec {
  id: string;
  name: string;
  intention: string;
  cadence: Habit["cadence"];
  color: Habit["color"];
  icon: Habit["icon"];
  /** Chance a due day was kept, 0–1. */
  reliability: number;
  daysOfHistory: number;
}

const SPECS: SeedSpec[] = [
  {
    id: "seed-pages",
    name: "Morning pages",
    intention: "Three pages before email, so the day starts on paper.",
    cadence: { type: "daily" },
    color: "kelp",
    icon: "pen",
    reliability: 0.86,
    daysOfHistory: 96,
  },
  {
    id: "seed-walk",
    name: "Walk after lunch",
    intention: "Twenty minutes outside, no podcast.",
    cadence: { type: "days", days: [1, 2, 3, 4, 5] },
    color: "volt",
    icon: "run",
    reliability: 0.72,
    daysOfHistory: 84,
  },
  {
    id: "seed-read",
    name: "Read ten pages",
    intention: "Paper books only, phone in the other room.",
    cadence: { type: "daily" },
    color: "ink",
    icon: "book",
    reliability: 0.64,
    daysOfHistory: 70,
  },
  {
    id: "seed-strength",
    name: "Strength session",
    intention: "Three a week, whichever three the week allows.",
    cadence: { type: "weekly", times: 3 },
    color: "clay",
    icon: "sprout",
    reliability: 0.55,
    daysOfHistory: 63,
  },
  {
    id: "seed-guitar",
    name: "Guitar, fifteen minutes",
    intention: "Scales count. Noodling counts. Opening the case counts.",
    cadence: { type: "days", days: [2, 4, 6] },
    color: "kelp",
    icon: "guitar",
    reliability: 0.48,
    daysOfHistory: 49,
  },
];

function marksFor(spec: SeedSpec, today: ISODate): Record<ISODate, true> {
  const marks: Record<ISODate, true> = {};
  for (const day of lastDays(today, spec.daysOfHistory)) {
    // Leave most of today open: a demo studio with nothing left to do has
    // nothing to show. The first practice starts kept so the ring isn't empty.
    if (day === today && spec.id !== SPECS[0].id) continue;
    const due =
      spec.cadence.type === "days" ? spec.cadence.days.includes(weekdayOf(day)) : true;
    if (!due) continue;

    // Recent days are a little more reliable — habits that stuck, stuck lately.
    const recency = 1 - (Date.parse(today) - Date.parse(day)) / (spec.daysOfHistory * 86_400_000);
    const threshold = spec.reliability * (0.8 + 0.22 * recency);

    if (spec.cadence.type === "weekly") {
      // Cluster flexible practices into two or three days per week.
      const weekSlot = Math.floor(hash(`${spec.id}:${startOfWeek(day)}`) * 7);
      const offset = (weekdayOf(day) + 6) % 7;
      if (offset !== weekSlot && offset !== (weekSlot + 2) % 7 && offset !== (weekSlot + 4) % 7) {
        continue;
      }
    }

    if (hash(`${spec.id}:${day}`) < threshold) marks[day] = true;
  }
  return marks;
}

export function seedHabits(today: ISODate = todayISO()): Habit[] {
  return SPECS.map((spec) => ({
    id: spec.id,
    name: spec.name,
    intention: spec.intention,
    cadence: spec.cadence,
    color: spec.color,
    icon: spec.icon,
    createdAt: addDays(today, -(spec.daysOfHistory - 1)),
    shelvedAt: null,
    marks: marksFor(spec, today),
  }));
}
