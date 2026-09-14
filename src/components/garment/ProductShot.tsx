import { ArtOrFallback } from "@/components/ArtOrFallback";
import { productArt } from "@/brand/assets";
import type { Piece } from "@/data/types";
import { cn } from "@/lib/cn";
import { Garment } from "./Garment";

/**
 * What a piece looks like: the photograph if there is one, the technical
 * drawing until there is. Every surface in the site goes through here, so
 * adding photography is a matter of dropping files into /public/products.
 */
export function ProductShot({
  piece,
  view = "front",
  washed = false,
  className,
}: {
  piece: Piece;
  view?: "front" | "back";
  washed?: boolean;
  className?: string;
}) {
  const supplied = piece.photo ?? productArt[piece.no];
  const src = view === "back" ? supplied?.back : supplied?.front;

  return (
    <ArtOrFallback
      src={src}
      alt={piece.photo?.alt ?? `${piece.name} in ${piece.colour.name}, ${view} view`}
      className={cn("h-full w-full object-contain", className)}
      fallback={<Garment piece={piece} view={view} washed={washed} className={className} />}
    />
  );
}
