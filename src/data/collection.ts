import type { Capsule, Piece } from "./types";

/**
 * HABITS STUDIO, DAILY.
 * One capsule of five long sleeves, all one price and one size.
 *
 * This file is the only place product data lives; every page, grid, plate and
 * bag line reads from it. To put photography on the site, add a `photo` to a
 * piece. Nothing else has to change.
 */

export const PRICE_USD = 75;
export const SIZES = ["M"] as const;

export const house = {
  name: "Habits Studio",
  collection: "Daily",
  kind: "Long Sleeve Collection",
  /* The hero's own paragraph. Prose, not a spec line: it is set as prose. */
  intro:
    "Long sleeves are made for days that turn into nights, changing weather, familiar streets and unexpected plans. Worn often enough, they become more than clothing. They become part of the habit.",
  attributes: ["Dropped shoulder", "Boxy body", "Ribbed collar and cuff"],
  cities: ["Los Angeles", "New York"],
  /**
   * Each style is made once, in a run of fifty, and every garment carries its
   * own number in that run. The number is the only thing separating two of the
   * same piece, which is the whole of the claim: nothing here says handmade,
   * or one of a kind, or anything else nobody can check.
   */
  edition: {
    size: 50,
    spec: "Series of fifty",
    line: "Numbered 01 to 50",
    sentence:
      "Every piece is made in a series of fifty and carries its own number. Two people can own the same long sleeve and not the same one.",
  },
  fabric: "400 gsm cotton jersey · garment dyed · enzyme washed",
  fit: "Oversized · dropped shoulder · boxy body · ribbed collar and cuff",
  sizes: SIZES,
  currency: "USD",
  lines: {
    higherStandard: "Same habits. A higher standard.",
    freedom: "Discipline creates freedom.",
    /**
     * The footer's own line, and it stands under every page, so it repeats
     * neither the hero above it nor the studio's writing.
     */
    footnote:
      "Cotton keeps the shape of the days it is worn through. A long sleeve is the one that was there for most of them.",
  },
} as const;

export const capsules: Capsule[] = [
  {
    id: "daily",
    range: "01–05",
    index: "Capsule 1",
    title: "Daily",
    footline: house.lines.higherStandard,
  },
];

/**
 * The five. Names and colourways follow the portfolio's construction capsule
 * and are marked provisional until the product photography confirms them.
 */
export const pieces: Piece[] = [
  {
    no: "01",
    slug: "line-study",
    name: "Line Study",
    capsule: "daily",
    colour: {
      name: "Warm Bone",
      hex: "#E9E3D6",
      contrastName: "Black",
      contrastHex: "#1A1A18",
    },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Warm bone", "Contrast rib collar", "Shoulder wordmark", "Piping detail"],
    build: {
      collar: "contrast",
      cuff: "rib",
      hem: "straight",
      front: "shoulder-wordmark",
      sleeve: "piping",
    },
    note: "One dark line at the collar, carried down the shoulder and the length of each sleeve.",
  },
  {
    no: "02",
    slug: "constellation",
    name: "Constellation",
    capsule: "daily",
    colour: { name: "Tobacco Brown", hex: "#4E3A2E" },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Tobacco brown", "Chest wordmark", "Symbol and star scatter", "Sleeve graphic"],
    build: {
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "chest-wordmark-scatter",
      back: "monogram-scatter",
    },
    note: "Symbols and stars scattered down one side and both sleeves. Placed, never gridded.",
  },
  {
    no: "03",
    slug: "orbit",
    name: "Orbit",
    capsule: "daily",
    colour: {
      name: "Washed Olive",
      hex: "#4E5546",
      contrastName: "Bone Thread",
      contrastHex: "#CFC9B8",
    },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Washed olive", "Symbol in orbit to chest", "Spiral panel seams", "Mesh sleeve inserts"],
    build: {
      seams: ["spiral", "panel"],
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "orbit",
      sleeve: "piping",
      contrastStitch: true,
    },
    note: "The symbol set in an orbit at the chest, with the seams drawn around it in piping rather than hidden.",
    provisional: true,
  },
  {
    no: "04",
    slug: "brighter-tomorrow",
    name: "Brighter Tomorrow",
    capsule: "daily",
    colour: {
      name: "Washed Black",
      hex: "#1E1E1D",
      contrastName: "Bone Print",
      contrastHex: "#CFCCC4",
    },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Washed black", "Star and orbit to front", "Printed line to chest", "Graphic to both sleeves"],
    build: {
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "star-wordmark",
      sleeve: "tape",
    },
    note: "A star and its orbit printed across the whole front, with the line the piece is named for set beside it.",
    provisional: true,
  },
  {
    no: "05",
    slug: "arch",
    name: "Arch",
    capsule: "daily",
    colour: {
      name: "Washed Navy",
      hex: "#28304A",
      contrastName: "Bone Stripe",
      contrastHex: "#DCD8CC",
    },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Washed navy", "Arched wordmark to chest", "Twin sleeve stripes", "Curved panel seams"],
    build: {
      seams: ["arc", "panel"],
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "arc-wordmark",
      sleeve: "tape",
      contrastStitch: true,
    },
    note: "The wordmark arched across the chest, and two bone stripes carried the length of each sleeve.",
    provisional: true,
  },
];

/** "$75", whole dollars, because every piece is priced in them. */
export function formatPrice(amount: number): string {
  return `$${amount}`;
}

export function capsuleOf(id: Piece["capsule"]): Capsule {
  const capsule = capsules.find((entry) => entry.id === id);
  if (!capsule) throw new Error(`Unknown capsule: ${id}`);
  return capsule;
}

export function piecesIn(id: Piece["capsule"]): Piece[] {
  return pieces.filter((piece) => piece.capsule === id);
}

export function pieceBySlug(slug: string): Piece | undefined {
  return pieces.find((piece) => piece.slug === slug);
}

/** Previous and next in collection order, wrapping at both ends. */
export function neighbours(slug: string): { previous: Piece; next: Piece } | null {
  const index = pieces.findIndex((piece) => piece.slug === slug);
  if (index < 0) return null;
  return {
    previous: pieces[(index - 1 + pieces.length) % pieces.length],
    next: pieces[(index + 1) % pieces.length],
  };
}
