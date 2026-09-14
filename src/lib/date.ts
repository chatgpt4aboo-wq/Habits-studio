/**
 * Local-date helpers. Every date in Habits Studio is a calendar day in the
 * user's own timezone, represented as an ISO `yyyy-mm-dd` string — never a
 * timestamp. That keeps marks stable across timezones and DST, and makes the
 * whole engine trivially testable.
 */

export type ISODate = string;

const pad = (n: number) => String(n).padStart(2, "0");

export function toISO(date: Date): ISODate {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Parses `yyyy-mm-dd` into a Date at *local* midnight. */
export function fromISO(iso: ISODate): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function todayISO(): ISODate {
  return toISO(new Date());
}

export function isISODate(value: unknown): value is ISODate {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = fromISO(value);
  return !Number.isNaN(parsed.getTime()) && toISO(parsed) === value;
}

export function addDays(iso: ISODate, amount: number): ISODate {
  const date = fromISO(iso);
  date.setDate(date.getDate() + amount);
  return toISO(date);
}

/** Whole days from `a` to `b`; negative when `b` precedes `a`. */
export function daysBetween(a: ISODate, b: ISODate): number {
  const MS_PER_DAY = 86_400_000;
  // Compare UTC midnights so a DST shift cannot produce 23h/25h rounding.
  const utc = (iso: ISODate) => {
    const [y, m, d] = iso.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((utc(b) - utc(a)) / MS_PER_DAY);
}

/** 0 = Sunday … 6 = Saturday. */
export function weekdayOf(iso: ISODate): number {
  return fromISO(iso).getDay();
}

/** Monday-first by default, matching the studio's week strip. */
export function startOfWeek(iso: ISODate, weekStartsOn = 1): ISODate {
  const shift = (weekdayOf(iso) - weekStartsOn + 7) % 7;
  return addDays(iso, -shift);
}

export function eachDay(from: ISODate, to: ISODate): ISODate[] {
  const out: ISODate[] = [];
  const total = daysBetween(from, to);
  if (total < 0) return out;
  for (let i = 0; i <= total; i++) out.push(addDays(from, i));
  return out;
}

/** The last `count` days, oldest first, ending on `end` inclusive. */
export function lastDays(end: ISODate, count: number): ISODate[] {
  return eachDay(addDays(end, -(count - 1)), end);
}

export const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];
export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDay(iso: ISODate): string {
  const date = fromISO(iso);
  return `${WEEKDAY_SHORT[date.getDay()]} ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

export function formatLongDay(iso: ISODate): string {
  const date = fromISO(iso);
  return `${WEEKDAY_LONG[date.getDay()]}, ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function monthShort(iso: ISODate): string {
  return MONTHS_SHORT[fromISO(iso).getMonth()];
}

/** "Today", "Yesterday", or a short date — for quiet, human labels. */
export function relativeDayLabel(iso: ISODate, today: ISODate = todayISO()): string {
  const delta = daysBetween(today, iso);
  if (delta === 0) return "Today";
  if (delta === -1) return "Yesterday";
  if (delta === 1) return "Tomorrow";
  return formatDay(iso);
}
