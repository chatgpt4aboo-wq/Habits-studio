import { productArt } from "@/brand/assets";
import type { Piece } from "@/data/types";

/**
 * Is there a second view worth showing?
 *
 * Once a piece has photography, its back view has to be photography too —
 * offering a flat technical sketch as the "back" of a photographed garment
 * reads as a broken image, not as a drawing.
 */
export function hasBackView(piece: Piece): boolean {
  const supplied = piece.photo ?? productArt[piece.no];
  if (supplied?.front) return Boolean(supplied.back);
  return Boolean(piece.build.back);
}

/** Does any piece in the collection have a second view? */
export function anyBackView(pieces: Piece[]): boolean {
  return pieces.some(hasBackView);
}
