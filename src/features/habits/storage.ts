import { isISODate } from "@/lib/date";
import { HABIT_COLORS, HABIT_ICONS, type Habit, type StudioState } from "./types";

export const STORAGE_KEY = "habits-studio:v1";

export const emptyState: StudioState = { version: 1, habits: [] };

/**
 * Whatever is in localStorage is untrusted: it may come from an older build,
 * another tab, or a hand-edited devtools session. Anything that doesn't parse
 * into a valid practice is dropped rather than allowed to crash the studio.
 */
export function parseState(raw: string | null): StudioState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return null;
    const habits = (data as { habits?: unknown }).habits;
    if (!Array.isArray(habits)) return null;
    const parsed = habits.map(parseHabit).filter((habit): habit is Habit => habit !== null);
    return { version: 1, habits: parsed };
  } catch {
    return null;
  }
}

function parseHabit(input: unknown): Habit | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if (typeof value.id !== "string" || typeof value.name !== "string") return null;
  if (!isISODate(value.createdAt)) return null;

  const cadence = parseCadence(value.cadence);
  if (!cadence) return null;

  const marks: Record<string, true> = {};
  if (value.marks && typeof value.marks === "object") {
    for (const [day, kept] of Object.entries(value.marks as Record<string, unknown>)) {
      if (kept === true && isISODate(day)) marks[day] = true;
    }
  }

  return {
    id: value.id,
    name: value.name.slice(0, 80),
    intention: typeof value.intention === "string" ? value.intention.slice(0, 200) : "",
    cadence,
    color: HABIT_COLORS.includes(value.color as never) ? (value.color as Habit["color"]) : "kelp",
    icon: HABIT_ICONS.includes(value.icon as never) ? (value.icon as Habit["icon"]) : "sprout",
    createdAt: value.createdAt,
    shelvedAt: isISODate(value.shelvedAt) ? value.shelvedAt : null,
    marks,
  };
}

function parseCadence(input: unknown): Habit["cadence"] | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if (value.type === "daily") return { type: "daily" };
  if (value.type === "days" && Array.isArray(value.days)) {
    const days = value.days
      .filter((day): day is number => typeof day === "number" && day >= 0 && day <= 6)
      .filter((day, index, all) => all.indexOf(day) === index);
    return days.length ? { type: "days", days } : null;
  }
  if (value.type === "weekly" && typeof value.times === "number") {
    return { type: "weekly", times: Math.min(7, Math.max(1, Math.round(value.times))) };
  }
  return null;
}

export function loadState(): StudioState | null {
  try {
    return parseState(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null; // private mode, blocked storage — the studio still runs
  }
}

export function saveState(state: StudioState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* nothing we can do, and nothing worth interrupting the user for */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
