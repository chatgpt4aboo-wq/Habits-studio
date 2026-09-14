import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  isLightCloth,
  luminance,
  parseHex,
  printColour,
  shade,
  stitchColour,
} from "./colour";

describe("colour", () => {
  it("parses long and short hex, with or without the hash", () => {
    expect(parseHex("#F1EDE3")).toEqual([241, 237, 227]);
    expect(parseHex("F1EDE3")).toEqual([241, 237, 227]);
    expect(parseHex("#fff")).toEqual([255, 255, 255]);
    expect(() => parseHex("#nope")).toThrow();
  });

  it("puts black and white at the ends of the luminance scale", () => {
    expect(luminance("#000000")).toBeCloseTo(0);
    expect(luminance("#FFFFFF")).toBeCloseTo(1);
  });

  it("matches known WCAG ratios", () => {
    expect(contrastRatio("#FFFFFF", "#000000")).toBeCloseTo(21, 1);
    expect(contrastRatio("#F1EDE3", "#100F0E")).toBeGreaterThan(15);
    // Order must not matter.
    expect(contrastRatio("#100F0E", "#F1EDE3")).toBeCloseTo(
      contrastRatio("#F1EDE3", "#100F0E"),
      5,
    );
  });

  it("sorts the collection's colourways into light and dark cloth", () => {
    // Bone, sand and mineral grey take dark stitching …
    for (const light of ["#E8E1D2", "#C6B49A", "#8E9092", "#F7F5F0", "#A9A9A6"]) {
      expect(isLightCloth(light)).toBe(true);
      expect(stitchColour(light)).toMatch(/^rgba\(0,0,0,/);
      expect(printColour(light)).toMatch(/^rgba\(20,19,17,/);
    }
    // … washed black, olive, espresso, indigo and midnight take light.
    for (const dark of ["#26261F", "#4A4F3C", "#4A3B32", "#3A4E72", "#2B3242", "#2F4034"]) {
      expect(isLightCloth(dark)).toBe(false);
      expect(stitchColour(dark)).toMatch(/^rgba\(255,255,255,/);
      expect(printColour(dark)).toMatch(/^rgba\(241,237,227,/);
    }
  });

  it("shades toward black and white without leaving the gamut", () => {
    expect(shade("#808080", -1)).toBe("#000000");
    expect(shade("#808080", 1)).toBe("#ffffff");
    expect(shade("#808080", 0)).toBe("#808080");
    expect(luminance(shade("#4A4F3C", -0.2))).toBeLessThan(luminance("#4A4F3C"));
    expect(luminance(shade("#4A4F3C", 0.2))).toBeGreaterThan(luminance("#4A4F3C"));
  });
});
