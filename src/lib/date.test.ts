import { describe, expect, it } from "vitest";
import {
  addDays,
  daysBetween,
  eachDay,
  formatDay,
  fromISO,
  isISODate,
  lastDays,
  relativeDayLabel,
  startOfWeek,
  toISO,
  weekdayOf,
} from "./date";

describe("date helpers", () => {
  it("round-trips a local date", () => {
    const iso = "2026-03-09";
    expect(toISO(fromISO(iso))).toBe(iso);
    expect(fromISO(iso).getHours()).toBe(0);
  });

  it("pads months and days", () => {
    expect(toISO(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("validates ISO strings", () => {
    expect(isISODate("2026-02-28")).toBe(true);
    expect(isISODate("2026-02-30")).toBe(false);
    expect(isISODate("26-02-01")).toBe(false);
    expect(isISODate(20260201)).toBe(false);
  });

  it("adds days across month and year boundaries", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29"); // leap year
  });

  it("counts whole days regardless of DST", () => {
    expect(daysBetween("2026-01-01", "2026-01-08")).toBe(7);
    expect(daysBetween("2026-01-08", "2026-01-01")).toBe(-7);
    // US spring-forward and EU spring-forward windows.
    expect(daysBetween("2026-03-07", "2026-03-09")).toBe(2);
    expect(daysBetween("2026-03-28", "2026-03-30")).toBe(2);
  });

  it("starts weeks on Monday", () => {
    expect(startOfWeek("2026-03-11")).toBe("2026-03-09"); // Wed -> Mon
    expect(startOfWeek("2026-03-09")).toBe("2026-03-09"); // Mon -> itself
    expect(startOfWeek("2026-03-08")).toBe("2026-03-02"); // Sun -> previous Mon
    expect(startOfWeek("2026-03-08", 0)).toBe("2026-03-08"); // Sunday-first
  });

  it("enumerates inclusive ranges", () => {
    expect(eachDay("2026-03-09", "2026-03-11")).toEqual(["2026-03-09", "2026-03-10", "2026-03-11"]);
    expect(eachDay("2026-03-09", "2026-03-09")).toEqual(["2026-03-09"]);
    expect(eachDay("2026-03-11", "2026-03-09")).toEqual([]);
  });

  it("returns trailing windows ending on the given day", () => {
    const days = lastDays("2026-03-11", 3);
    expect(days).toEqual(["2026-03-09", "2026-03-10", "2026-03-11"]);
  });

  it("knows its weekdays", () => {
    expect(weekdayOf("2026-03-08")).toBe(0); // Sunday
    expect(weekdayOf("2026-03-09")).toBe(1); // Monday
  });

  it("formats human labels", () => {
    expect(formatDay("2026-03-09")).toBe("Mon 9 Mar");
    expect(relativeDayLabel("2026-03-09", "2026-03-09")).toBe("Today");
    expect(relativeDayLabel("2026-03-08", "2026-03-09")).toBe("Yesterday");
    expect(relativeDayLabel("2026-03-10", "2026-03-09")).toBe("Tomorrow");
    expect(relativeDayLabel("2026-03-01", "2026-03-09")).toBe("Sun 1 Mar");
  });
});
