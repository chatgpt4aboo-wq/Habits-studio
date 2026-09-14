import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import type { Piece } from "@/data/types";
import { Garment } from "./Garment";

/**
 * A garment on its plate, captioned the way the portfolio captions it:
 * number, name, then the specs in wide-tracked uppercase.
 */
export function GarmentPlate({
  piece,
  view = "front",
  href,
  showSpecs = true,
  className,
}: {
  piece: Piece;
  view?: "front" | "back";
  href?: string;
  showSpecs?: boolean;
  className?: string;
}) {
  const body = (
    <>
      <div className="relative overflow-hidden bg-bone-sunken/60 px-3 py-4 transition-colors group-hover:bg-bone-sunken">
        <Garment piece={piece} view={view} />
      </div>
      <div className="pt-3 text-center">
        <p className="spec text-ink">
          {piece.no} · {piece.name}
        </p>
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
      aria-label={`${piece.no} ${piece.name} — ${piece.colour.name}`}
    >
      {body}
    </Link>
  );
}
