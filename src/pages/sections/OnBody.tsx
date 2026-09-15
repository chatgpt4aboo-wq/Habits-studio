import { Link } from "react-router-dom";
import { modelArt } from "@/brand/assets";
import { pieces } from "@/data/collection";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The capsule worn, at full height, edge to edge.
 *
 * Five figures at one scale and no captions inside the frame — the row is
 * meant to be looked at before it is read. It runs full-bleed rather than
 * inside the page's measure, so it lands as a held breath between sections.
 */
export function OnBody() {
  const worn = pieces.filter((piece) => modelArt[piece.no]);
  if (worn.length === 0) return null;

  return (
    <section className="sheet bg-bone pb-28 lg:pb-40" aria-label="The capsule worn">
      <Reveal>
        <ul className="grid grid-cols-2 gap-px bg-line-light sm:grid-cols-3 lg:grid-cols-5">
          {worn.map((piece) => (
            <li key={piece.slug}>
              <Link to={`/collection/${piece.slug}`} className="group block bg-bone">
                <div className="aspect-[2/5] overflow-hidden">
                  <img
                    src={modelArt[piece.no]}
                    alt={`${piece.name} in ${piece.colour.name}, worn`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="spec-sm px-3 py-4 text-center text-ink-faint transition-colors group-hover:text-ink">
                  {piece.no} · {piece.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
