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

describe("shipping origins", () => {
  it("ships from both home cities, not one", () => {
    // The studio is in two places and orders leave from whichever is closer.
    // That is what makes Los Angeles and New York quick rather than decorative.
    expect(policies.shipping.from).toMatch(/los angeles/i);
    expect(policies.shipping.from).toMatch(/new york/i);
  });

  it("quotes the two home cities ahead of everywhere else", () => {
    expect(policies.shipping.local.where).toMatch(/los angeles/i);
    expect(policies.shipping.local.where).toMatch(/new york/i);
    expect(policies.shipping.domestic.where).not.toMatch(/los angeles/i);
  });

  it("no longer lists the origin as a guess", () => {
    expect(needsConfirming).not.toContain("shipping.from");
  });
});
