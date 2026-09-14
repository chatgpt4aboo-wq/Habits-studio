import { describe, expect, it } from "vitest";
import {
  capsuleOf,
  capsules,
  house,
  neighbours,
  pieceBySlug,
  pieces,
  piecesIn,
} from "./collection";
import { luminance, parseHex } from "@/lib/colour";

describe("the collection", () => {
  it("holds twenty pieces — five core designs and fifteen extensions", () => {
    expect(pieces).toHaveLength(20);
    expect(piecesIn("core")).toHaveLength(5);
    expect(pieces.filter((piece) => piece.capsule !== "core")).toHaveLength(15);
    expect(house.scope).toBe("5 core designs + 15 collection extensions");
  });

  it("numbers every piece in order, 01 through 20", () => {
    expect(pieces.map((piece) => piece.no)).toEqual(
      Array.from({ length: 20 }, (_, index) => String(index + 1).padStart(2, "0")),
    );
  });

  it("gives each capsule exactly five pieces, in its own number range", () => {
    for (const capsule of capsules) {
      const inCapsule = piecesIn(capsule.id);
      expect(inCapsule).toHaveLength(5);

      const [from, to] = capsule.range.split("–").map(Number);
      for (const piece of inCapsule) {
        expect(Number(piece.no)).toBeGreaterThanOrEqual(from);
        expect(Number(piece.no)).toBeLessThanOrEqual(to);
      }
    }
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

  it("describes every piece well enough to put on a page", () => {
    for (const piece of pieces) {
      expect(piece.name.length).toBeGreaterThan(2);
      expect(piece.specs.length).toBeGreaterThanOrEqual(3);
      expect(piece.note.length).toBeGreaterThan(20);
      expect(piece.colour.name.length).toBeGreaterThan(2);
      // The first spec always names the colourway, as the portfolio sets it.
      expect(piece.specs[0].toLowerCase()).toContain(
        piece.colour.name.split(" ").pop()!.toLowerCase(),
      );
    }
  });

  it("uses real hex for every colourway, and pairs two-tone pieces properly", () => {
    for (const piece of pieces) {
      expect(() => parseHex(piece.colour.hex)).not.toThrow();
      expect(luminance(piece.colour.hex)).toBeGreaterThanOrEqual(0);

      // A contrast colour and a contrast name always travel together.
      expect(Boolean(piece.colour.contrastHex)).toBe(Boolean(piece.colour.contrastName));
      if (piece.colour.contrastHex) {
        expect(() => parseHex(piece.colour.contrastHex!)).not.toThrow();
      }
    }
  });

  it("never asks for a layer or a contrast collar without a second colour", () => {
    for (const piece of pieces) {
      if (piece.build.layered || piece.build.collar === "contrast") {
        expect(piece.colour.contrastHex).toBeTruthy();
      }
    }
  });

  it("resolves the capsule behind every piece", () => {
    for (const piece of pieces) {
      expect(capsuleOf(piece.capsule).id).toBe(piece.capsule);
    }
    expect(() => capsuleOf("nope" as never)).toThrow();
  });

  it("walks the collection in a loop", () => {
    expect(neighbours("base-form")?.previous.no).toBe("20");
    expect(neighbours("base-form")?.next.no).toBe("02");
    expect(neighbours("tonal-wrap")?.next.no).toBe("01");
    expect(neighbours("not-a-piece")).toBeNull();
  });

  it("marks reconstructed entries so they can be replaced from the deck", () => {
    // 06–10 and 16–20 were legible in the portfolio; the rest are provisional.
    const confirmed = pieces.filter((piece) => !piece.provisional).map((piece) => piece.no);
    expect(confirmed).toEqual(["06", "07", "08", "09", "10", "16", "17", "18", "19", "20"]);
  });
});
