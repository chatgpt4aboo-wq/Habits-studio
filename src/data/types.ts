/** What the technical drawing should render for a piece. */
export interface GarmentBuild {
  /** Seam treatments drawn over the body. */
  seams?: ("raglan" | "panel" | "arc" | "spiral" | "diagonal")[];
  collar?: "rib" | "contrast";
  cuff?: "rib" | "double";
  /** A contrasting lower body — the layered look. */
  layered?: boolean;
  hem?: "straight" | "arc";
  front?: Graphic;
  back?: Graphic;
  /** Tape or type running down the sleeve. */
  sleeve?: "tape" | "wordmark" | null;
}

export type Graphic =
  | "monogram-chest"
  | "arc-wordmark"
  | "wordmark-small"
  | "shoulder-wordmark"
  | "collage"
  | "orbit"
  | "constellation"
  | "star-wordmark"
  | "diagonal-type"
  | null;

export interface Colourway {
  name: string;
  hex: string;
  /** Second colour, for layered or contrast pieces. */
  contrastName?: string;
  contrastHex?: string;
}

export type CapsuleId = "core" | "quiet-construction" | "archive-graphics" | "altered-uniform";

export interface Piece {
  /** Two-digit number as it appears in the portfolio: "01" … "20". */
  no: string;
  slug: string;
  name: string;
  capsule: CapsuleId;
  colour: Colourway;
  /** Spec lines, set in the deck's wide-tracked uppercase. */
  specs: string[];
  build: GarmentBuild;
  /** One line of copy for the piece page. */
  note: string;
  /**
   * True where the portfolio page for this piece was not available and the
   * entry is reconstructed. Replace with the deck's own wording.
   */
  provisional?: boolean;
}

export interface Capsule {
  id: CapsuleId;
  /** "06-10" — the numbering used as the page header in the portfolio. */
  range: string;
  /** "CAPSULE 1 OF 3", or null for the core designs. */
  index: string | null;
  title: string;
  subtitle: string;
  /** The line ruled across the foot of the portfolio page. */
  footline: string;
  blurb: string;
}
