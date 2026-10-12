import { Link } from "react-router-dom";
import { capsuleOf, formatPrice, pieces } from "@/data/collection";
import { ProductShot } from "@/components/garment/ProductShot";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";

/**
 * The capsule on the landing page: five plates, one size, on a line.
 *
 * It used to be a diagonal, each piece at its own span and its own height.
 * It looked designed and it read badly: the pieces could not be compared,
 * the smallest were too small to see, and it disagreed with the collection
 * page, which is level. Both are level now.
 */
export function CapsuleSpread() {
  const capsule = capsuleOf("daily");

  return (
    <section className="sheet bg-bone pb-20 pt-28 lg:pb-24 lg:pt-40">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="spec text-navy">
            {capsule.range} / {capsule.title}
          </p>
          <Link
            to="/collection"
            className="spec text-ink-faint transition-colors hover:text-ink"
          >
            Shop the capsule
          </Link>
        </Reveal>


        <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-20 md:grid-cols-3 lg:mt-20 lg:gap-x-10">
          {pieces.map((piece, index) => (
            <Reveal as="li" key={piece.slug} delay={index * 60}>
              <Link to={`/collection/${piece.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-plate">
                  <ProductShot
                    piece={piece}
                    className="h-full w-full object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-line-light pt-3">
                  <p className="spec text-ink transition-colors group-hover:text-navy">
                    {piece.no} · {piece.name}
                  </p>
                  <p className="spec text-ink-faint">{formatPrice(piece.price)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Rule className="mt-28">{capsule.footline}</Rule>
        </Reveal>
      </div>
    </section>
  );
}
