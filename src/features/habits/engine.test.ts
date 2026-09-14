import { describe, expect, it } from "vitest";
import {
  completion,
  currentRun,
  dayDigest,
  dayStatus,
  describeCadence,
  dueOn,
  gridWeeks,
  habitStats,
  isScheduled,
  longestRun,
  marksInWeek,
  momentum,
  overallRate,
  toggleMark,
  weekdayProfile,
  weeklyLoad,
} from "./engine";
import type { Cadence, Habit } from "./types";

// 2026-03-09 is a Monday, which keeps every week-boundary case readable.
const TODAY = "2026-03-09";

function makeHabit(overrides: Partial<Habit> = {}): Habit {
  return {
    id: "h1",
    name: "Morning pages",
    intention: "so the day starts on paper",
    cadence: { type: "daily" },
    color: "kelp",
    icon: "pen",
    createdAt: "2026-01-01",
    shelvedAt: null,
    marks: {},
    ...overrides,
  };
}

function withMarks(days: string[], overrides: Partial<Habit> = {}): Habit {
  return makeHabit({
    ...overrides,
    marks: Object.fromEntries(days.map((day) => [day, true as const])),
  });
}

describe("cadence", () => {
  it("schedules daily practices every day", () => {
    const habit = makeHabit();
    expect(isScheduled(habit, TODAY)).toBe(true);
    expect(isScheduled(habit, "2026-03-08")).toBe(true);
  });

  it("schedules chosen-day practices only on those weekdays", () => {
    const habit = makeHabit({ cadence: { type: "days", days: [1, 3, 5] } });
    expect(isScheduled(habit, "2026-03-09")).toBe(true); // Monday
    expect(isScheduled(habit, "2026-03-10")).toBe(false); // Tuesday
    expect(isScheduled(habit, "2026-03-11")).toBe(true); // Wednesday
  });

  it("never schedules a practice before it existed or after it was shelved", () => {
    const habit = makeHabit({ createdAt: "2026-03-05", shelvedAt: "2026-03-08" });
    expect(isScheduled(habit, "2026-03-04")).toBe(false);
    expect(isScheduled(habit, "2026-03-06")).toBe(true);
    expect(isScheduled(habit, TODAY)).toBe(false);
  });

  it("describes itself in the studio's own words", () => {
    expect(describeCadence({ type: "daily" })).toBe("Every day");
    expect(describeCadence({ type: "days", days: [1, 2, 3, 4, 5] })).toBe("Weekdays");
    expect(describeCadence({ type: "days", days: [0, 6] })).toBe("Weekends");
    expect(describeCadence({ type: "days", days: [3, 1] })).toBe("Mon · Wed");
    expect(describeCadence({ type: "weekly", times: 1 })).toBe("Once a week");
    expect(describeCadence({ type: "weekly", times: 3 })).toBe("3× a week");
  });

  it("reports its weekly load", () => {
    const cases: [Cadence, number][] = [
      [{ type: "daily" }, 7],
      [{ type: "days", days: [1, 3] }, 2],
      [{ type: "weekly", times: 4 }, 4],
    ];
    for (const [cadence, load] of cases) expect(weeklyLoad(cadence)).toBe(load);
  });
});

describe("marks", () => {
  it("toggles without mutating the original", () => {
    const habit = makeHabit();
    const marked = toggleMark(habit, TODAY);
    expect(marked.marks[TODAY]).toBe(true);
    expect(habit.marks[TODAY]).toBeUndefined();

    const unmarked = toggleMark(marked, TODAY);
    expect(unmarked.marks[TODAY]).toBeUndefined();
    expect(Object.keys(unmarked.marks)).toHaveLength(0);
  });

  it("counts marks inside a Monday-first week", () => {
    const habit = withMarks(["2026-03-08", "2026-03-09", "2026-03-11"]);
    // 2026-03-08 is the Sunday belonging to the *previous* week.
    expect(marksInWeek(habit, TODAY)).toBe(2);
    expect(marksInWeek(habit, "2026-03-08")).toBe(1);
  });
});

describe("runs", () => {
  it("counts consecutive kept days", () => {
    const habit = withMarks(["2026-03-07", "2026-03-08", "2026-03-09"]);
    expect(currentRun(habit, TODAY)).toEqual({ length: 3, unit: "day" });
  });

  it("does not break the run for a day that is still open", () => {
    const habit = withMarks(["2026-03-07", "2026-03-08"]);
    expect(currentRun(habit, TODAY)).toEqual({ length: 2, unit: "day" });
  });

  it("breaks the run on a missed day", () => {
    const habit = withMarks(["2026-03-06", "2026-03-08", "2026-03-09"]);
    expect(currentRun(habit, TODAY)).toEqual({ length: 2, unit: "day" });
  });

  it("carries the run across rest days", () => {
    // Mon/Wed/Fri practice: the weekend is not a miss.
    const habit = withMarks(["2026-03-04", "2026-03-06", "2026-03-09"], {
      cadence: { type: "days", days: [1, 3, 5] },
    });
    expect(currentRun(habit, TODAY)).toEqual({ length: 3, unit: "day" });
  });

  it("counts weekly cadences in weeks", () => {
    const habit = withMarks(
      [
        // Week of 23 Feb: 2 marks
        "2026-02-23",
        "2026-02-25",
        // Week of 2 Mar: 2 marks
        "2026-03-03",
        "2026-03-05",
        // Current week (9 Mar): only 1 so far
        "2026-03-09",
      ],
      { cadence: { type: "weekly", times: 2 }, createdAt: "2026-02-01" },
    );
    // Current week hasn't hit 2 yet, so it neither counts nor breaks.
    expect(currentRun(habit, TODAY)).toEqual({ length: 2, unit: "week" });
  });

  it("counts the week in progress once it hits target", () => {
    const habit = withMarks(["2026-03-03", "2026-03-05", "2026-03-09", "2026-03-10"], {
      cadence: { type: "weekly", times: 2 },
      createdAt: "2026-02-01",
    });
    expect(currentRun(habit, "2026-03-11")).toEqual({ length: 2, unit: "week" });
  });

  it("remembers the longest run even after a break", () => {
    const habit = withMarks([
      "2026-03-01",
      "2026-03-02",
      "2026-03-03",
      "2026-03-04",
      // missed 5 Mar
      "2026-03-08",
      "2026-03-09",
    ]);
    expect(longestRun(habit, TODAY)).toEqual({ length: 4, unit: "day" });
    expect(currentRun(habit, TODAY)).toEqual({ length: 2, unit: "day" });
  });

  it("returns a zero run for an untouched practice", () => {
    expect(currentRun(makeHabit(), TODAY)).toEqual({ length: 0, unit: "day" });
    expect(longestRun(makeHabit(), TODAY)).toEqual({ length: 0, unit: "day" });
  });
});

describe("completion", () => {
  it("measures kept against due", () => {
    const habit = withMarks(["2026-03-07", "2026-03-08", "2026-03-09"]);
    const result = completion(habit, "2026-03-03", TODAY); // 7 days
    expect(result.due).toBe(7);
    expect(result.kept).toBe(3);
    expect(result.rate).toBeCloseTo(3 / 7);
  });

  it("only counts days the practice was due", () => {
    const habit = withMarks(["2026-03-09"], { cadence: { type: "days", days: [1] } });
    const result = completion(habit, "2026-03-03", TODAY);
    expect(result.due).toBe(1);
    expect(result.rate).toBe(1);
  });

  it("caps bonus days at 100%", () => {
    const habit = withMarks(["2026-03-07", "2026-03-08", "2026-03-09"], {
      cadence: { type: "weekly", times: 1 },
      createdAt: "2026-01-01",
    });
    const result = completion(habit, "2026-03-03", TODAY);
    expect(result.rate).toBe(1);
  });

  it("reports null when nothing was due", () => {
    const habit = makeHabit({ createdAt: "2026-04-01" });
    expect(completion(habit, "2026-03-03", TODAY).rate).toBeNull();
  });
});

describe("day status", () => {
  const habit = withMarks(["2026-03-06"], { cadence: { type: "days", days: [1, 3, 5] } });

  it("classifies each kind of day", () => {
    expect(dayStatus(habit, "2026-03-06", TODAY)).toBe("marked"); // Friday, kept
    expect(dayStatus(habit, "2026-03-04", TODAY)).toBe("missed"); // Wednesday, due, empty
    expect(dayStatus(habit, "2026-03-07", TODAY)).toBe("off"); // Saturday, rest day
    expect(dayStatus(habit, TODAY, TODAY)).toBe("pending"); // Monday, still open
    expect(dayStatus(habit, "2026-03-10", TODAY)).toBe("future");
  });

  it("never marks a weekly cadence day as missed", () => {
    const flexible = makeHabit({ cadence: { type: "weekly", times: 2 } });
    expect(dayStatus(flexible, "2026-03-04", TODAY)).toBe("off");
  });
});

describe("studio-wide views", () => {
  const habits = [
    withMarks(["2026-03-08", "2026-03-09"], { id: "a" }),
    withMarks(["2026-03-09"], { id: "b", cadence: { type: "days", days: [1] } }),
    withMarks([], { id: "c", shelvedAt: "2026-02-01" }),
  ];

  it("lists what is due, ignoring shelved practices", () => {
    expect(dueOn(habits, TODAY).map((h) => h.id)).toEqual(["a", "b"]);
    expect(dueOn(habits, "2026-03-10").map((h) => h.id)).toEqual(["a"]);
  });

  it("buckets a day into the grid ramp", () => {
    expect(dayDigest(habits, TODAY)).toMatchObject({ due: 2, kept: 2, ratio: 1, step: 4 });
    expect(dayDigest(habits, "2026-03-10")).toMatchObject({ due: 1, kept: 0, step: 0 });
  });

  it("builds a trailing momentum series", () => {
    const series = momentum(habits, TODAY, 3);
    expect(series.map((d) => d.iso)).toEqual(["2026-03-07", "2026-03-08", TODAY]);
    expect(series[2].ratio).toBe(1);
  });

  it("rolls every practice into one rate", () => {
    const rate = overallRate(habits, TODAY, 7);
    expect(rate).toBeGreaterThan(0);
    expect(rate).toBeLessThanOrEqual(1);
    expect(overallRate([], TODAY, 7)).toBeNull();
  });

  it("profiles the week without inventing data", () => {
    const profile = weekdayProfile(habits, TODAY, 7);
    expect(profile).toHaveLength(7);
    expect(profile[1].rate).toBe(1); // Monday: both practices kept
    expect(profile[2].due).toBe(1); // Tuesday: only the daily practice was due
    expect(profile[2].rate).toBe(0); // …and it was not kept

    // A window with no Tuesday in it reports no opinion at all.
    const monday = weekdayProfile(habits, TODAY, 1);
    expect(monday[2].due).toBe(0);
    expect(monday[2].rate).toBeNull();
  });
});

describe("practice grid", () => {
  it("lays out Monday-first columns ending in the current week", () => {
    const grid = gridWeeks(makeHabit(), 4, TODAY);
    expect(grid).toHaveLength(4);
    expect(grid[0][0].iso).toBe("2026-02-16");
    expect(grid[3][0].iso).toBe("2026-03-09");
    expect(grid[3].every((cell) => cell.iso >= "2026-03-09")).toBe(true);
    expect(grid[3][1].status).toBe("future");
  });
});

describe("habitStats", () => {
  it("assembles the numbers the studio shows", () => {
    const habit = withMarks(["2026-03-07", "2026-03-08", "2026-03-09"]);
    const stats = habitStats(habit, TODAY, 7);
    expect(stats).toMatchObject({
      run: { length: 3, unit: "day" },
      kept: 3,
      due: 7,
      marksAllTime: 3,
      dueToday: true,
      doneToday: true,
      lastMark: "2026-03-09",
    });
  });
});
