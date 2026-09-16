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
  scope: "The long sleeve, five ways. One size, one price",
  attributes: ["Dropped shoulder", "Boxy body", "Ribbed collar and cuff"],
  cities: ["Los Angeles", "New York"],
  fabric: "400 gsm cotton jersey · garment dyed · enzyme washed",
  fit: "Oversized · dropped shoulder · boxy body · ribbed collar and cuff",
  sizes: SIZES,
  currency: "USD",
  lines: {
    higherStandard: "Same habits. A higher standard.",
    freedom: "Discipline creates freedom.",
  },
} as const;

export const capsules: Capsule[] = [
  {
    id: "daily",
    range: "01–05",
    index: "Capsule 1",
    title: "Daily",
    subtitle: "Fabric first · discipline always",
    footline: house.lines.higherStandard,
    blurb:
      "Five long sleeves cut from one block. No print where a seam will do: raglan lines turned out, panels squared, arcs where a join would normally hide. One size, one price.",
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
    slug: "tonal-wrap",
    name: "Tonal Wrap",
    capsule: "daily",
    colour: { name: "Faded Midnight", hex: "#2A2F3C" },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Faded midnight", "Tonal wordmark repeat", "Sleeve wrap", "Studio mark to chest"],
    build: {
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "studio-chest",
      sleeve: "tonal-repeat",
    },
    note: "The wordmark wrapped around both sleeves, printed one shade off the cloth.",
  },
  {
    no: "04",
    slug: "minimal-black",
    name: "Minimal Black",
    capsule: "daily",
    colour: {
      name: "Washed Black",
      hex: "#1C1C1A",
      contrastName: "Bone Thread",
      contrastHex: "#C9C6BD",
    },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Washed black", "Contrast topstitch", "Curved panel seams", "Embroidered HS symbol"],
    build: {
      seams: ["raglan", "arc"],
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "monogram-chest",
      contrastStitch: true,
    },
    note: "Every join topstitched in bone thread, so the construction is the graphic.",
    provisional: true,
  },
  {
    no: "05",
    slug: "oversized-navy",
    name: "Oversized Navy",
    capsule: "daily",
    colour: { name: "Indigo Navy", hex: "#2E3260" },
    price: PRICE_USD,
    sizes: [...SIZES],
    specs: ["Indigo navy", "Arched wordmark", "Washed print", "Blank back"],
    build: { collar: "rib", cuff: "rib", hem: "straight", front: "arc-wordmark" },
    note: "The wordmark arched the full width of the chest, washed until it sits under the surface.",
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
