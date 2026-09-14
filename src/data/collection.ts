import type { Capsule, Piece } from "./types";

/**
 * HABITS STUDIO — Long Sleeve Collection.
 * Five core designs and fifteen collection extensions, as laid out in the
 * concept portfolio. This file is the only place garment data lives; every
 * page, grid and technical drawing reads from it.
 */

export const house = {
  name: "Habits Studio",
  collection: "Long Sleeve Collection",
  kind: "Concept Portfolio",
  scope: "5 core designs + 15 collection extensions",
  attributes: ["Oversized form", "Long sleeves", "Washed texture", "Graphic rhythm"],
  cities: ["Los Angeles", "New York"],
  fabric: "400 gsm cotton jersey · garment dyed · enzyme washed",
  fit: "Oversized · dropped shoulder · boxy body · ribbed collar and cuff",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  lines: {
    higherStandard: "Same habits. A higher standard.",
    freedom: "Discipline creates freedom.",
    differentForm: "Same habits. A different form.",
  },
} as const;

export const capsules: Capsule[] = [
  {
    id: "core",
    range: "01–05",
    index: null,
    title: "Core Designs",
    subtitle: "The block every extension is cut from",
    footline: house.lines.higherStandard,
    blurb:
      "The foundation. Five long sleeves that set the block — the body, the shoulder, the collar and the cuff that every extension is cut from.",
  },
  {
    id: "quiet-construction",
    range: "06–10",
    index: "Capsule 1 of 3",
    title: "Quiet Construction",
    subtitle: "Fabric first · discipline always",
    footline: house.lines.higherStandard,
    blurb:
      "No print. The design is in the seam: raglan lines turned out, panels squared, arcs where a join would normally hide. Branding shrinks to an embroidered symbol.",
  },
  {
    id: "archive-graphics",
    range: "11–15",
    index: "Capsule 2 of 3",
    title: "Archive Graphics",
    subtitle: "Long sleeve collection",
    footline: house.lines.freedom,
    blurb:
      "The graphic capsule. Chest marks kept small, backs given the whole sheet — collage, orbit, constellation — and the wordmark arched across the front the way a team shirt would carry it.",
  },
  {
    id: "altered-uniform",
    range: "16–20",
    index: "Capsule 3 of 3",
    title: "Altered Uniform",
    subtitle: "Five long sleeves for a different routine",
    footline: house.lines.differentForm,
    blurb:
      "The same uniform, cut differently. A seam that spirals the body, type set on the diagonal, a cuff doubled back, a wrap held in one tone.",
  },
];

export const pieces: Piece[] = [
  // ───────────────────────────────── 01–05 · CORE DESIGNS
  // The portfolio page for the core five was not among the pages supplied;
  // these entries are reconstructed from the collection's stated scope and
  // are marked provisional until the page is available.
  {
    no: "01",
    slug: "base-form",
    name: "Base Form",
    capsule: "core",
    colour: { name: "Washed Black", hex: "#26251F" },
    specs: ["Washed black", "The collection block", "Blank front", "Woven hem label"],
    build: { collar: "rib", cuff: "rib", hem: "straight", front: null, back: null },
    note: "The block every other piece is cut from: boxy body, dropped shoulder, nothing on it.",
    provisional: true,
  },
  {
    no: "02",
    slug: "daily-rib",
    name: "Daily Rib",
    capsule: "core",
    colour: { name: "Warm Bone", hex: "#E8E1D2" },
    specs: ["Warm bone", "Heavy rib collar", "Rib cuff", "Chest symbol"],
    build: { collar: "rib", cuff: "rib", hem: "straight", front: "monogram-chest" },
    note: "The everyday one. Ribbing doubled at the collar so it holds its shape through the wash.",
    provisional: true,
  },
  {
    no: "03",
    slug: "boxy-crew",
    name: "Boxy Crew",
    capsule: "core",
    colour: { name: "Mushroom Taupe", hex: "#9A8C7C" },
    specs: ["Mushroom taupe", "Squared body", "Dropped shoulder", "Tonal stitch"],
    build: { collar: "rib", cuff: "rib", hem: "straight", seams: ["panel"] },
    note: "Cut square through the body, so it hangs off the shoulder rather than the chest.",
    provisional: true,
  },
  {
    no: "04",
    slug: "shadow-panel",
    name: "Shadow Panel",
    capsule: "core",
    colour: {
      name: "Faded Midnight",
      hex: "#2B3242",
      // Two tones off one dye lot, which is what "tonal contrast" means here.
      contrastName: "Faded Midnight · deep",
      contrastHex: "#212734",
    },
    specs: ["Faded midnight", "Panelled body", "Tonal contrast", "Blank back"],
    build: { collar: "rib", cuff: "rib", hem: "straight", seams: ["panel"], layered: true },
    note: "Two tones of the same dye lot, split at the panel seam.",
    provisional: true,
  },
  {
    no: "05",
    slug: "clean-sleeve",
    name: "Clean Sleeve",
    capsule: "core",
    colour: { name: "Mineral Grey", hex: "#8E9092" },
    specs: ["Mineral grey", "Sleeve tape", "Rib cuff", "Micro branding"],
    build: { collar: "rib", cuff: "rib", hem: "straight", sleeve: "tape" },
    note: "The sleeve lockup, repeated down the arm, and nothing else.",
    provisional: true,
  },

  // ───────────────────────────────── 06–10 · QUIET CONSTRUCTION
  {
    no: "06",
    slug: "raglan-study",
    name: "Raglan Study",
    capsule: "quiet-construction",
    colour: { name: "Washed Olive", hex: "#4A4F3C" },
    specs: ["Washed olive", "Inside-out raglan seams", "Embroidered HS symbol"],
    build: { seams: ["raglan"], collar: "rib", cuff: "rib", hem: "straight", front: "monogram-chest" },
    note: "The raglan turned out, so the seam that usually hides becomes the only detail.",
  },
  {
    no: "07",
    slug: "panel-work",
    name: "Panel Work",
    capsule: "quiet-construction",
    colour: { name: "Mushroom Taupe", hex: "#9A8C7C" },
    specs: ["Mushroom taupe", "Longer torso", "Clean panel seams", "Micro branding"],
    build: { seams: ["panel"], collar: "rib", cuff: "rib", hem: "straight", front: "wordmark-small" },
    note: "Length added through the body, then divided back up by the panels.",
  },
  {
    no: "08",
    slug: "arc-seams",
    name: "Arc Seams",
    capsule: "quiet-construction",
    colour: { name: "Washed Espresso", hex: "#4A3B32" },
    specs: ["Washed espresso", "Curved join lines", "Blank front"],
    build: { seams: ["arc"], collar: "rib", cuff: "rib", hem: "arc" },
    note: "Every straight join on the block, redrawn as an arc.",
  },
  {
    no: "09",
    slug: "layered-essential",
    name: "Layered Essential",
    capsule: "quiet-construction",
    colour: {
      name: "Ash Heather",
      hex: "#A9A9A6",
      contrastName: "Washed Black",
      contrastHex: "#2A2A28",
    },
    specs: ["Ash heather / washed black", "Layered construction", "Arc hem"],
    build: { collar: "rib", cuff: "rib", layered: true, hem: "arc" },
    note: "Two garments' worth of layering, built into one.",
  },
  {
    no: "10",
    slug: "line-story",
    name: "Line Story",
    capsule: "quiet-construction",
    colour: {
      name: "Warm Bone",
      hex: "#E8E1D2",
      contrastName: "Washed Black",
      contrastHex: "#2A2A28",
    },
    specs: ["Warm bone", "Contrast rib collar", "Shoulder wordmark", "Tonal detail"],
    build: { collar: "contrast", cuff: "rib", hem: "straight", front: "shoulder-wordmark" },
    note: "One dark line at the collar, one line of type across the shoulder.",
  },

  // ───────────────────────────────── 11–15 · ARCHIVE GRAPHICS
  // Piece names on this page were not legible in the supplied image; the
  // graphics and colourways are taken from the artwork, the names are
  // provisional.
  {
    no: "11",
    slug: "field-note",
    name: "Field Note",
    capsule: "archive-graphics",
    colour: { name: "Washed Forest", hex: "#2F4034" },
    specs: ["Washed forest", "Small chest mark", "Orbit graphic to back"],
    build: { collar: "rib", cuff: "rib", hem: "straight", front: "monogram-chest", back: "orbit" },
    note: "Quiet from the front. The whole drawing is on the back.",
    provisional: true,
  },
  {
    no: "12",
    slug: "college-arc",
    name: "College Arc",
    capsule: "archive-graphics",
    colour: { name: "Vintage Bone", hex: "#EFE9DC" },
    specs: ["Vintage bone", "Arched wordmark", "Collage panel to back"],
    build: { collar: "rib", cuff: "rib", hem: "straight", front: "arc-wordmark", back: "collage" },
    note: "The wordmark arched across the chest the way a team shirt carries it.",
    provisional: true,
  },
  {
    no: "13",
    slug: "archive-collage",
    name: "Archive Collage",
    capsule: "archive-graphics",
    colour: { name: "Faded Charcoal", hex: "#333331" },
    specs: ["Faded charcoal", "Symbol to chest", "Collage to back"],
    build: { collar: "rib", cuff: "rib", hem: "straight", front: "monogram-chest", back: "collage" },
    note: "Four archive plates, printed as one block.",
    provisional: true,
  },
  {
    no: "14",
    slug: "orbit",
    name: "Orbit",
    capsule: "archive-graphics",
    colour: { name: "Indigo Wash", hex: "#3A4E72" },
    specs: ["Indigo wash", "Small wordmark", "Symbol and stars to back"],
    build: {
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "wordmark-small",
      back: "star-wordmark",
    },
    note: "Indigo, washed until the print sits under the surface rather than on it.",
    provisional: true,
  },
  {
    no: "15",
    slug: "sleeve-repeat",
    name: "Sleeve Repeat",
    capsule: "archive-graphics",
    colour: { name: "Desert Sand", hex: "#C6B49A" },
    specs: ["Desert sand", "Sleeve repeat lockup", "Wordmark to back"],
    build: {
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      sleeve: "tape",
      front: "wordmark-small",
      back: "star-wordmark",
    },
    note: "The sleeve lockup, run the full length of the arm.",
    provisional: true,
  },

  // ───────────────────────────────── 16–20 · ALTERED UNIFORM
  {
    no: "16",
    slug: "spiral-seam",
    name: "Spiral Seam",
    capsule: "altered-uniform",
    colour: { name: "Washed Black", hex: "#26261F" },
    specs: ["Washed black", "Seam spiralled through the body", "Blank front"],
    build: { seams: ["spiral"], collar: "rib", cuff: "rib", hem: "straight" },
    note: "One seam, taken around the body instead of down it.",
  },
  {
    no: "17",
    slug: "diagonal-type",
    name: "Diagonal Type",
    capsule: "altered-uniform",
    colour: {
      name: "White",
      hex: "#F7F5F0",
      contrastName: "Black",
      contrastHex: "#1A1A18",
    },
    specs: ["White / black", "Type set on the diagonal", "Sleeve wordmark"],
    build: {
      seams: ["diagonal"],
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "diagonal-type",
      sleeve: "wordmark",
    },
    note: "The wordmark turned off the horizontal and left there.",
  },
  {
    no: "18",
    slug: "double-cuff",
    name: "Double Cuff",
    capsule: "altered-uniform",
    colour: { name: "Mineral Grey", hex: "#8E9092" },
    specs: ["Mineral grey", "Cuff doubled back", "Extended sleeve"],
    build: { collar: "rib", cuff: "double", hem: "straight" },
    note: "Sleeve cut long, then folded back on itself and stitched down.",
  },
  {
    no: "19",
    slug: "constellation",
    name: "Constellation",
    capsule: "altered-uniform",
    colour: { name: "Tobacco Brown", hex: "#5A4030" },
    specs: ["Tobacco brown", "Constellation to sleeve and body", "Symbol to chest"],
    build: {
      collar: "rib",
      cuff: "rib",
      hem: "straight",
      front: "constellation",
      back: "constellation",
    },
    note: "Scattered, not placed — the print reads differently on every body.",
  },
  {
    no: "20",
    slug: "tonal-wrap",
    name: "Tonal Wrap",
    capsule: "altered-uniform",
    colour: { name: "Faded Midnight", hex: "#2B3242" },
    specs: ["Faded midnight", "Wrapped body seam", "One tone throughout"],
    build: { seams: ["arc", "panel"], collar: "rib", cuff: "rib", hem: "arc" },
    note: "Held in a single tone so the construction is the only thing to read.",
  },
];

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

/** Previous and next in portfolio order, wrapping at both ends. */
export function neighbours(slug: string): { previous: Piece; next: Piece } | null {
  const index = pieces.findIndex((piece) => piece.slug === slug);
  if (index < 0) return null;
  return {
    previous: pieces[(index - 1 + pieces.length) % pieces.length],
    next: pieces[(index + 1) % pieces.length],
  };
}
