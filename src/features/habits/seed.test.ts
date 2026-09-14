import { describe, expect, it } from "vitest";
import { completion, isScheduled, markCount } from "./engine";
import { seedHabits } from "./seed";

const TODAY = "2026-03-09";

describe("demo studio", () => {
  it("is deterministic", () => {
    expect(seedHabits(TODAY)).toEqual(seedHabits(TODAY));
  });

  it("leaves most of today open so there is something to do", () => {
    const habits = seedHabits(TODAY);
    const dueToday = habits.filter((habit) => isScheduled(habit, TODAY));
    const keptToday = dueToday.filter((habit) => habit.marks[TODAY]);
    expect(dueToday.length).toBeGreaterThan(1);
    expect(keptToday.length).toBe(1);
  });

  it("looks lived-in without looking perfect", () => {
    for (const habit of seedHabits(TODAY)) {
      const { rate } = completion(habit, habit.createdAt, TODAY);
      expect(markCount(habit)).toBeGreaterThan(5);
      expect(rate).not.toBeNull();
      expect(rate!).toBeGreaterThan(0.2);
      expect(rate!).toBeLessThan(0.95);
    }
  });

  it("never marks a day before the practice existed", () => {
    for (const habit of seedHabits(TODAY)) {
      for (const day of Object.keys(habit.marks)) {
        expect(day >= habit.createdAt).toBe(true);
        expect(day <= TODAY).toBe(true);
      }
    }
  });
});
