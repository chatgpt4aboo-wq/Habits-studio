import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/data/collection";
import type { Piece } from "@/data/types";
import { ProductShot } from "./ProductShot";

/**
 * A piece on the page. The photography carries no ground of its own, so the
 * garment sits directly on the sheet — no card, no frame, nothing around it
 * but space and its own caption.
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
      <div className="relative aspect-[4/5] overflow-hidden bg-plate">
        <ProductShot
          piece={piece}
          view={view}
          className="h-full w-full object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="pt-5 text-center">
        <p className="spec text-ink">
          {piece.no} · {piece.name}
        </p>
        {showPrice ? <p className="spec mt-2 text-ink-faint">{formatPrice(piece.price)}</p> : null}
        {showSpecs ? (
          <ul className="mt-3 space-y-0.5">
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
