/**
 * Colour maths for the technical drawings. Garment colourways are fixed brand
 * values, so seams, stitching and prints have to decide for themselves whether
 * to sit lighter or darker than the cloth they are drawn on.
 */

export function parseHex(hex: string): [number, number, number] {
  let value = hex.replace("#", "").trim();
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    throw new Error(`Not a hex colour: ${hex}`);
  }
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16)) as [
    number,
    number,
    number,
  ];
}

/** WCAG relative luminance, 0 (black) – 1 (white). */
export function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const unit = channel / 255;
    return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Is this cloth light enough to take dark stitching and dark print?
 *
 * The collection's colourways fall either side of a wide gap: the darkest
 * light cloth is mushroom taupe at 0.27, the lightest dark cloth is indigo
 * wash at 0.08. The threshold sits in that gap.
 */
export function isLightCloth(hex: string): boolean {
  return luminance(hex) > 0.18;
}

/** Seam and topstitch colour: always a tone of the cloth, never pure ink. */
export function stitchColour(hex: string, strength = 0.42): string {
  return isLightCloth(hex) ? `rgba(0,0,0,${strength})` : `rgba(255,255,255,${strength * 0.7})`;
}

/** Print colour for graphics laid onto the cloth. */
export function printColour(hex: string, opacity = 0.92): string {
  return isLightCloth(hex) ? `rgba(20,19,17,${opacity})` : `rgba(241,237,227,${opacity})`;
}

/** Mix a colour toward black or white by `amount` (-1 … 1). */
export function shade(hex: string, amount: number): string {
  const target = amount < 0 ? 0 : 255;
  const weight = Math.abs(amount);
  const [r, g, b] = parseHex(hex).map((channel) =>
    Math.round(channel + (target - channel) * weight),
  );
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}
