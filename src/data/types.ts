/** What the technical drawing should render for a piece. */
export interface GarmentBuild {
  seams?: ("raglan" | "panel" | "arc" | "spiral" | "diagonal")[];
  collar?: "rib" | "contrast";
  cuff?: "rib" | "double";
  layered?: boolean;
  hem?: "straight" | "arc";
  front?: Graphic;
  back?: Graphic;
  sleeve?: "tape" | "wordmark" | "tonal-repeat" | "piping" | null;
  /** Seams topstitched in a contrasting thread, as on the washed black piece. */
  contrastStitch?: boolean;
}

export type Graphic =
  | "monogram-chest"
  | "chest-wordmark-left"
  | "chest-wordmark-scatter"
  | "studio-chest"
  | "monogram-scatter"
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
  contrastName?: string;
  contrastHex?: string;
}

export type CapsuleId = "daily";

export interface Piece {
  /** Two-digit number as it appears in the portfolio. */
  no: string;
  slug: string;
  name: string;
  capsule: CapsuleId;
  colour: Colourway;
  /** Price in whole US dollars. */
  price: number;
  /** Sizes cut for this piece. */
  sizes: string[];
  specs: string[];
  build: GarmentBuild;
  note: string;
  /**
   * Product photography. When set, the photo is what the site shows and the
   * technical drawing steps aside. Paths are relative to /public.
   */
  photo?: { front: string; back?: string; alt?: string };
  /**
   * True where the entry is reconstructed rather than taken from supplied
   * material, name, colourway or specs still to be confirmed.
   */
  provisional?: boolean;
}

export interface Capsule {
  id: CapsuleId;
  range: string;
  index: string | null;
  title: string;
  subtitle: string;
  footline: string;
  blurb: string;
}
