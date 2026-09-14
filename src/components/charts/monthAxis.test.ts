import { describe, expect, it } from "vitest";
import { labelMonths } from "./monthAxis";

describe("grid month axis", () => {
  it("labels each month once", () => {
    expect(labelMonths(["Jun", "Jul", "Jul", "Jul", "Aug", "Aug"])).toEqual([
      "Jun",
      "",
      "Jul",
      "",
      "Aug",
      "",
    ]);
  });

  it("never places two labels side by side", () => {
    const labels = labelMonths(["Jan", "Feb", "Mar", "Apr", "May"]);
    const positions = labels.flatMap((label, index) => (label ? [index] : []));
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i] - positions[i - 1]).toBeGreaterThanOrEqual(2);
    }
  });

  it("drops a month only when it has no room of its own", () => {
    // Every month change lands on an adjacent column; the ones that cannot be
    // nudged into their own month are the only ones left unlabelled.
    const labels = labelMonths(["Jan", "Feb", "Mar", "Apr"]);
    expect(labels.filter(Boolean)).toEqual(["Jan", "Mar"]);
  });

  it("handles a single month", () => {
    expect(labelMonths(["Sep", "Sep", "Sep"])).toEqual(["Sep", "", ""]);
  });
});
