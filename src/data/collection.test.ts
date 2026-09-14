import { describe, expect, it } from "vitest";
import {
  PRICE_USD,
  SIZES,
  capsuleOf,
  capsules,
  formatPrice,
  house,
  neighbours,
  pieceBySlug,
  pieces,
  piecesIn,
} from "./collection";
import { parseHex } from "@/lib/colour";

describe("the Daily capsule", () => {
  it("is one capsule of five long sleeves", () => {
    expect(capsules).toHaveLength(1);
    expect(capsules[0].title).toBe("Daily");
    expect(pieces).toHaveLength(5);
    expect(piecesIn("daily")).toHaveLength(5);
  });

  it("prices every piece at 75 USD", () => {
    for (const piece of pieces) {
      expect(piece.price).toBe(75);
      expect(piece.price).toBe(PRICE_USD);
    }
    expect(house.currency).toBe("USD");
    expect(formatPrice(75)).toBe("$75");
    expect(formatPrice(150)).toBe("$150");
  });

  it("cuts every piece in one size, M", () => {
    expect(SIZES).toEqual(["M"]);
    expect(house.sizes).toEqual(["M"]);
    for (const piece of pieces) {
      expect(piece.sizes).toEqual(["M"]);
    }
  });

  it("numbers the pieces 01 through 05", () => {
    expect(pieces.map((piece) => piece.no)).toEqual(["01", "02", "03", "04", "05"]);
  });

  it("keeps slugs unique and resolvable", () => {
    const slugs = pieces.map((piece) => piece.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(pieceBySlug(slug)?.slug).toBe(slug);
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
    expect(pieceBySlug("not-a-piece")).toBeUndefined();
  });

  it("describes every piece well enough to sell it", () => {
    for (const piece of pieces) {
      expect(piece.name.length).toBeGreaterThan(2);
      expect(piece.specs.length).toBeGreaterThanOrEqual(3);
      expect(piece.note.length).toBeGreaterThan(20);
      // The first spec always names the colourway, as the portfolio sets it.
      expect(piece.specs[0].toLowerCase()).toContain(
        piece.colour.name.split(" ").pop()!.toLowerCase(),
      );
    }
  });

  it("uses real hex, and pairs two-tone pieces properly", () => {
    for (const piece of pieces) {
      expect(() => parseHex(piece.colour.hex)).not.toThrow();
      expect(Boolean(piece.colour.contrastHex)).toBe(Boolean(piece.colour.contrastName));
      if (piece.colour.contrastHex) expect(() => parseHex(piece.colour.contrastHex!)).not.toThrow();
    }
  });

  it("never asks for a contrast treatment without a second colour", () => {
    for (const piece of pieces) {
      if (piece.build.layered || piece.build.collar === "contrast" || piece.build.contrastStitch) {
        expect(piece.colour.contrastHex).toBeTruthy();
      }
      if (piece.build.sleeve === "piping") expect(piece.colour.contrastHex).toBeTruthy();
    }
  });

  it("resolves the capsule behind every piece", () => {
    for (const piece of pieces) {
      expect(capsuleOf(piece.capsule).id).toBe(piece.capsule);
    }
    expect(() => capsuleOf("nope" as never)).toThrow();
  });

  it("walks the capsule in a loop", () => {
    expect(neighbours("line-study")?.previous.no).toBe("05");
    expect(neighbours("line-study")?.next.no).toBe("02");
    expect(neighbours("archive-arc")?.next.no).toBe("01");
    expect(neighbours("not-a-piece")).toBeNull();
  });

  it("marks the two entries whose captions were not supplied", () => {
    expect(pieces.filter((piece) => piece.provisional).map((piece) => piece.no)).toEqual([
      "04",
      "05",
    ]);
  });
});
