import { describe, expect, it } from "vitest";
import { parseState, saveState, loadState, clearState, STORAGE_KEY } from "./storage";
import type { Habit } from "./types";

const habit: Habit = {
  id: "x",
  name: "Morning pages",
  intention: "",
  cadence: { type: "daily" },
  color: "kelp",
  icon: "pen",
  createdAt: "2026-03-01",
  shelvedAt: null,
  marks: { "2026-03-02": true },
};

describe("storage", () => {
  it("round-trips through localStorage", () => {
    saveState({ version: 1, habits: [habit] });
    expect(loadState()).toEqual({ version: 1, habits: [habit] });
    clearState();
    expect(loadState()).toBeNull();
  });

  it("returns null for junk instead of throwing", () => {
    expect(parseState(null)).toBeNull();
    expect(parseState("not json")).toBeNull();
    expect(parseState("[]")).toBeNull();
    expect(parseState('{"habits":"nope"}')).toBeNull();
  });

  it("drops practices it cannot trust", () => {
    const parsed = parseState(
      JSON.stringify({
        habits: [
          habit,
          { id: "no-name", createdAt: "2026-03-01", cadence: { type: "daily" } },
          { id: "bad-date", name: "x", createdAt: "yesterday", cadence: { type: "daily" } },
          { id: "bad-cadence", name: "x", createdAt: "2026-03-01", cadence: { type: "hourly" } },
        ],
      }),
    );
    expect(parsed?.habits.map((entry) => entry.id)).toEqual(["x"]);
  });

  it("sanitises salvageable fields", () => {
    const parsed = parseState(
      JSON.stringify({
        habits: [
          {
            id: "y",
            name: "Walk",
            intention: 42,
            cadence: { type: "weekly", times: 99 },
            color: "neon",
            icon: "rocket",
            createdAt: "2026-03-01",
            shelvedAt: "not a date",
            marks: { "2026-03-02": true, "2026-03-03": false, nonsense: true },
          },
        ],
      }),
    );
    const entry = parsed?.habits[0];
    expect(entry).toMatchObject({
      intention: "",
      cadence: { type: "weekly", times: 7 },
      color: "kelp",
      icon: "sprout",
      shelvedAt: null,
    });
    expect(entry?.marks).toEqual({ "2026-03-02": true });
  });

  it("de-duplicates chosen days and rejects empty ones", () => {
    const parsed = parseState(
      JSON.stringify({
        habits: [
          { ...habit, id: "dupes", cadence: { type: "days", days: [1, 1, 3, 9] } },
          { ...habit, id: "empty", cadence: { type: "days", days: [] } },
        ],
      }),
    );
    expect(parsed?.habits).toHaveLength(1);
    expect(parsed?.habits[0].cadence).toEqual({ type: "days", days: [1, 3] });
  });

  it("survives a corrupt entry already in storage", () => {
    localStorage.setItem(STORAGE_KEY, "{oops");
    expect(loadState()).toBeNull();
  });
});
