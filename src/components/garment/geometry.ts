/**
 * The block: one oversized long-sleeve body, drawn once and shared by every
 * piece in the collection. Extensions differ by seam, cuff, hem and print —
 * never by silhouette, which is the point the portfolio makes.
 *
 * Drawn on a 200 × 250 grid, centred on x = 100. Sleeves run long: the cuff
 * finishes just above the hem, which is what separates this block from a tee.
 */

export const BOX = { width: 200, height: 250 } as const;

/** Key points of the block, named so the seam paths can refer to them. */
export const P = {
  neckLeft: [80, 30],
  neckRight: [120, 30],
  neckDip: [100, 41],
  shoulderLeft: [56, 44],
  shoulderRight: [144, 44],
  sleeveHeadLeft: [16, 80],
  sleeveHeadRight: [184, 80],
  cuffOuterLeft: [10, 196],
  cuffOuterRight: [190, 196],
  cuffInnerLeft: [36, 202],
  cuffInnerRight: [164, 202],
  armpitLeft: [58, 112],
  armpitRight: [142, 112],
  hemLeft: [52, 224],
  hemRight: [148, 224],
} as const;

/** The silhouette, clockwise from the left of the neck. */
export const SILHOUETTE = [
  "M 80 30",
  "Q 100 41 120 30", // neckline
  "L 144 44", // right shoulder, dropped
  "C 162 48 176 60 184 80", // right sleeve head
  "L 190 196", // down the outer sleeve
  "L 164 202", // cuff
  "L 142 112", // back up to the armpit
  "L 148 224", // right side seam
  "L 52 224", // hem
  "L 58 112", // left side seam
  "L 36 202", // down the inner sleeve
  "L 10 196", // cuff
  "L 16 80", // up the outer sleeve
  "C 24 60 38 48 56 44", // left sleeve head
  "Z",
].join(" ");

/** The arc hem lifts at the sides and drops through the centre. */
export const SILHOUETTE_ARC_HEM = [
  "M 80 30",
  "Q 100 41 120 30",
  "L 144 44",
  "C 162 48 176 60 184 80",
  "L 190 196",
  "L 164 202",
  "L 142 112",
  "L 148 216",
  "Q 100 234 52 216",
  "L 58 112",
  "L 36 202",
  "L 10 196",
  "L 16 80",
  "C 24 60 38 48 56 44",
  "Z",
].join(" ");

export const HEM = {
  straight: "M 52 224 L 148 224",
  arc: "M 52 216 Q 100 234 148 216",
} as const;

/** The rib collar band, following the neckline. */
export const COLLAR = "M 78 32 Q 100 44 122 32";

export const SEAMS = {
  /** Raglan: neck to armpit, both sides. */
  raglan: ["M 82 33 L 58 112", "M 118 33 L 142 112"],
  /** Panels: two verticals dividing the body into thirds. */
  panel: ["M 76 66 L 74 224", "M 124 66 L 126 224"],
  /** Arcs: curved joins where a straight one would normally sit. */
  arc: ["M 58 104 Q 100 136 142 104", "M 60 162 Q 100 188 140 162"],
  /** One seam taken around the body rather than down it. */
  spiral: ["M 58 128 Q 100 104 142 140 Q 120 186 64 168 Q 54 212 124 218"],
  /** A single diagonal across the body. */
  diagonal: ["M 56 96 L 148 202"],
} as const;

/** Cuff bands, measured up from the cuff edge. */
export const CUFFS = {
  left: "M 11 182 L 37 188 L 36 202 L 10 196 Z",
  right: "M 189 182 L 163 188 L 164 202 L 190 196 Z",
  leftDouble: "M 12 164 L 38 170 L 37 188 L 11 182 Z",
  rightDouble: "M 188 164 L 162 170 L 163 188 L 189 182 Z",
} as const;

/** Where sleeve tape runs, as a path for text to follow. */
export const SLEEVE_PATH = {
  left: "M 36 100 L 24 188",
  right: "M 164 100 L 176 188",
} as const;

/** The arc the front wordmark is set on. */
export const ARC_PATH = "M 64 104 Q 100 82 136 104";

/** Where a layered lower body starts. */
export const LAYER_SPLIT = 142;
