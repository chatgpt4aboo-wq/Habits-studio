import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/data/collection";
import type { Piece } from "@/data/types";
import { ProductShot } from "./ProductShot";

/**
 * A piece on its plate: the shot, then the number, name, price and specs the
 * way the portfolio captions them.
 */
export function GarmentPlate({
  piece,
  view = "front",
  href,
  showSpecs = true,
  showPrice = true,
  className,
}: {
  piece: Piece;
  view?: "front" | "back";
  href?: string;
  showSpecs?: boolean;
  showPrice?: boolean;
  className?: string;
}) {
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-white transition-colors">
        <ProductShot piece={piece} view={view} className="h-full w-full object-cover" />
      </div>
      <div className="pt-3 text-center">
        <p className="spec text-ink">
          {piece.no} · {piece.name}
        </p>
        {showPrice ? <p className="spec mt-1.5 text-ink-soft">{formatPrice(piece.price)}</p> : null}
        {showSpecs ? (
          <ul className="mt-2 space-y-0.5">
            {piece.specs.map((spec) => (
              <li key={spec} className="spec-sm text-ink-faint">
                {spec}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  if (!href) return <div className={cn("group", className)}>{body}</div>;

  return (
    <Link
      to={href}
      className={cn("group block focus-visible:outline-none", className)}
      aria-label={`${piece.no} ${piece.name} — ${piece.colour.name}, ${formatPrice(piece.price)}`}
    >
      {body}
    </Link>
  );
}
