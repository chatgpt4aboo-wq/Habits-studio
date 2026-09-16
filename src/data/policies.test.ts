import { describe, expect, it } from "vitest";
import { needsConfirming, policies } from "./policies";

/** Walks "shipping.domestic.time" to the value it names. */
function at(path: string): unknown {
  return path.split(".").reduce<unknown>(
    (value, key) => (value as Record<string, unknown> | undefined)?.[key],
    policies,
  );
}

describe("policies", () => {
  it("keeps the to-confirm list pointing at values that exist", () => {
    // If a field is renamed or removed, the list has to be updated with it —
    // otherwise a placeholder quietly becomes invisible.
    for (const path of needsConfirming) {
      expect(at(path), `${path} is listed as unconfirmed but is not in policies`).toBeTruthy();
    }
  });

  it("still has placeholders in it", () => {
    // This is a reminder, not a rule: when every value has been confirmed,
    // empty `needsConfirming` and delete this test.
    expect(needsConfirming.length).toBeGreaterThan(0);
  });

  it("says something for every field the pages render", () => {
    for (const value of [
      policies.contact.email,
      policies.contact.instagram,
      policies.shipping.from,
      policies.shipping.cost,
      policies.returns.window,
      policies.returns.condition,
      policies.returns.postage,
      policies.returns.exchanges,
    ]) {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(2);
    }
  });

  it("does not promise exchanges the one-size collection cannot make", () => {
    expect(policies.returns.exchanges).toMatch(/one size/i);
  });
});
