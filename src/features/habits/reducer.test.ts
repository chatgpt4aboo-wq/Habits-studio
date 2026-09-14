import { describe, expect, it } from "vitest";
import { reducer, type Action } from "./reducer";
import type { Habit, HabitDraft, StudioState } from "./types";

const TODAY = "2026-03-09";

const draft: HabitDraft = {
  name: "Read ten pages",
  intention: "Paper books only",
  cadence: { type: "daily" },
  color: "kelp",
  icon: "book",
};

function state(habits: Habit[] = []): StudioState {
  return { version: 1, habits };
}

function run(initial: StudioState, ...actions: Action[]): StudioState {
  return actions.reduce(reducer, initial);
}

describe("studio reducer", () => {
  it("creates a practice dated today, with no marks", () => {
    const next = run(state(), { type: "create", draft, today: TODAY, id: "x" });
    expect(next.habits).toHaveLength(1);
    expect(next.habits[0]).toMatchObject({
      id: "x",
      name: "Read ten pages",
      createdAt: TODAY,
      shelvedAt: null,
      marks: {},
    });
  });

  it("edits a practice without touching its history", () => {
    const next = run(
      state(),
      { type: "create", draft, today: TODAY, id: "x" },
      { type: "toggle", id: "x", day: TODAY },
      { type: "update", id: "x", draft: { ...draft, name: "Read twenty pages" } },
    );
    expect(next.habits[0].name).toBe("Read twenty pages");
    expect(next.habits[0].marks[TODAY]).toBe(true);
    expect(next.habits[0].createdAt).toBe(TODAY);
  });

  it("toggles a mark on and off", () => {
    const created = run(state(), { type: "create", draft, today: TODAY, id: "x" });
    const marked = reducer(created, { type: "toggle", id: "x", day: TODAY });
    const cleared = reducer(marked, { type: "toggle", id: "x", day: TODAY });
    expect(marked.habits[0].marks[TODAY]).toBe(true);
    expect(cleared.habits[0].marks).toEqual({});
  });

  it("shelves and unshelves, keeping the marks either way", () => {
    const base = run(
      state(),
      { type: "create", draft, today: TODAY, id: "x" },
      { type: "toggle", id: "x", day: TODAY },
    );
    const shelved = reducer(base, { type: "shelve", id: "x", today: TODAY });
    expect(shelved.habits[0].shelvedAt).toBe(TODAY);
    expect(shelved.habits[0].marks[TODAY]).toBe(true);

    const restored = reducer(shelved, { type: "unshelve", id: "x" });
    expect(restored.habits[0].shelvedAt).toBeNull();
    expect(restored.habits[0].marks[TODAY]).toBe(true);
  });

  it("removes only the named practice", () => {
    const next = run(
      state(),
      { type: "create", draft, today: TODAY, id: "a" },
      { type: "create", draft, today: TODAY, id: "b" },
      { type: "remove", id: "a" },
    );
    expect(next.habits.map((habit) => habit.id)).toEqual(["b"]);
  });

  it("reorders within bounds and ignores impossible moves", () => {
    const base = run(
      state(),
      { type: "create", draft, today: TODAY, id: "a" },
      { type: "create", draft, today: TODAY, id: "b" },
    );
    expect(reducer(base, { type: "move", id: "b", direction: -1 }).habits.map((h) => h.id)).toEqual([
      "b",
      "a",
    ]);
    expect(reducer(base, { type: "move", id: "a", direction: -1 })).toBe(base);
    expect(reducer(base, { type: "move", id: "ghost", direction: 1 })).toBe(base);
  });

  it("seeds and clears the studio", () => {
    const seeded = reducer(state(), { type: "seed", today: TODAY });
    expect(seeded.habits.length).toBeGreaterThan(0);
    expect(reducer(seeded, { type: "clear" }).habits).toEqual([]);
  });

  it("never mutates the state it is given", () => {
    const before = run(state(), { type: "create", draft, today: TODAY, id: "x" });
    const snapshot = JSON.stringify(before);
    reducer(before, { type: "toggle", id: "x", day: TODAY });
    reducer(before, { type: "remove", id: "x" });
    expect(JSON.stringify(before)).toBe(snapshot);
  });
});
