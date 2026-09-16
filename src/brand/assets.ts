/**
 * Brand and product artwork.
 *
 * The marks are supplied in two inks on transparent backgrounds: the plain
 * file is black, for bone sheets; the `-light` file is bone, for the void.
 * Picking the wrong one is the single easiest way to make the logo look
 * broken, so every component that places a mark says which surface it is on.
 *
 * The monogram was not supplied on its own; it is extracted from the sleeve
 * lockup by scripts/prepare_assets.py.
 */
export const brandArt = {
  /** Primary wordmark, HABITS over a spaced STUDIO. */
  wordmark: "/brand/wordmark.png",
  wordmarkLight: "/brand/wordmark-light.png",
  /** Compact symbol. The interlocking HS brush monogram. */
  monogram: "/brand/monogram.png",
  monogramLight: "/brand/monogram-light.png",
  /** Horizontal sleeve lockup, symbol, wordmark, symbol, repeated. */
  sleeveLockup: "/brand/sleeve-lockup.png",
  sleeveLockupLight: "/brand/sleeve-lockup-light.png",
  /** One repeat unit of the lockup, for tiling as a band. */
  sleeveTape: "/brand/sleeve-tape.png",
  sleeveTapeLight: "/brand/sleeve-tape-light.png",
} as const;

/** Intrinsic proportions, so a mark can hold its box before the file loads. */
export const brandArtRatio = {
  wordmark: 1854 / 318,
  monogram: 1,
  sleeveLockup: 1904 / 172,
} as const;

/** Product photography, by piece number. */
export const productArt: Record<string, { front: string; back?: string }> = {
  "01": { front: "/products/01.webp" },
  "02": { front: "/products/02.webp" },
  "03": { front: "/products/03.webp" },
  "04": { front: "/products/04.webp" },
  "05": { front: "/products/05.webp" },
};

/** On-body photography, each piece worn, by piece number. */
/**
 * On-body photography, by piece number. These keep their own backdrop. It is
 * a lit grey that varies shot to shot, so they are presented as photographic
 * plates rather than cut out like the garments.
 */
export const modelArt: Record<string, string> = {
  "01": "/models/01.webp",
  "02": "/models/02.webp",
  "03": "/models/03.webp",
  "04": "/models/04.webp",
  "05": "/models/05.webp",
};
