/**
 * Brand and product artwork.
 *
 * Every path here is loaded at runtime with a drawn fallback behind it, so the
 * site is correct whether or not the file exists yet. To switch a drawing for
 * the real artwork, commit a file at the path below — no code change.
 *
 * The wordmark and sleeve lockup are transparent PNGs in two tones: the plain
 * file is black ink for bone sheets, the `-light` file is bone ink for the
 * void. The monogram has no supplied artwork yet and stays drawn.
 */
export const brandArt = {
  /** Primary wordmark — HABITS over a spaced STUDIO. Black on transparent. */
  wordmark: "/brand/wordmark.png",
  /** The wordmark in bone, for dark surfaces. */
  wordmarkLight: "/brand/wordmark-light.png",
  /** Compact symbol — the interlocking HS brush monogram. Not yet supplied. */
  monogram: "/brand/monogram.svg",
  /** Horizontal sleeve lockup — symbol, wordmark, symbol, repeated. */
  sleeveLockup: "/brand/sleeve-lockup.png",
  /** The sleeve lockup in bone, for dark surfaces. */
  sleeveLockupLight: "/brand/sleeve-lockup-light.png",
} as const;

/**
 * Product photography, by piece number. Front is what the grid and the plate
 * show; back is optional and adds a second view to the product page.
 */
export const productArt: Record<string, { front: string; back?: string }> = {
  "01": { front: "/products/01.jpg", back: "/products/01-back.jpg" },
  "02": { front: "/products/02.jpg", back: "/products/02-back.jpg" },
  "03": { front: "/products/03.jpg", back: "/products/03-back.jpg" },
  "04": { front: "/products/04.jpg", back: "/products/04-back.jpg" },
  "05": { front: "/products/05.jpg", back: "/products/05-back.jpg" },
};
