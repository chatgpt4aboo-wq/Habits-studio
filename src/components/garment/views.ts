import { productArt } from "@/brand/assets";
import type { Piece } from "@/data/types";

/** Does this piece have a second view to offer? */
export function hasBackView(piece: Piece): boolean {
  const supplied = piece.photo ?? productArt[piece.no];
  return Boolean(supplied?.back) || Boolean(piece.build.back);
}
