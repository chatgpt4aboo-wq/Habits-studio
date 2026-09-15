import { Link } from "react-router-dom";
import { capsules, house, piecesIn } from "@/data/collection";
import type { Capsule } from "@/data/types";
import { Wordmark } from "@/brand/Marks";
import { modelArt } from "@/brand/assets";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { ProductShot } from "@/components/garment/ProductShot";
import { hasBackView } from "@/components/garment/views";
import { Rule } from "@/components/ui/Rule";

/**
 * The portfolio, page for page: a bone sheet per capsule, the header bar top
 * left, the wordmark block centred, the five garments in a row, the back views
 * beneath, and the line ruled across the foot.
 */
export default function Lookbook() {
  return (
    <div>
      <header className="wrap py-16">
        <p className="spec text-amber">{house.kind}</p>
        <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase">Lookbook</h1>
        <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
          {house.collection}. {house.scope}. Every page as it is laid out in the portfolio.
        </p>
      </header>

      <div className="space-y-8 pb-8">
        {capsules.map((capsule) => (
          <CapsuleSheet key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
}

function CapsuleSheet({ capsule }: { capsule: Capsule }) {
  const pieces = piecesIn(capsule.id);
  const backs = pieces.filter(hasBackView);

  return (
    <section id={capsule.id} className="sheet scroll-mt-16 bg-bone">
      <div className="wrap py-12">
        <header className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="spec text-navy">
            {capsule.range} / {capsule.title}
          </p>
          <p className="spec-sm text-ink-faint">{house.collection}</p>
        </header>

        <div className="mt-12 text-center">
          <Wordmark size="md" />
          {capsule.index ? <p className="spec mt-7 text-ink-faint">{capsule.index}</p> : null}
          <h2 className="mt-4 font-display text-mark-sm font-bold uppercase tracking-[0.12em]">
            {capsule.title}
          </h2>
          <p className="spec-sm mt-3 text-ink-faint">{capsule.subtitle}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {pieces.map((piece) => (
            <li key={piece.slug}>
              <GarmentPlate piece={piece} href={`/collection/${piece.slug}`} />
            </li>
          ))}
        </ul>

        {backs.length > 0 ? (
          <div className="mt-14">
            <p className="spec text-center text-ink-faint">Back views</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-8">
              {backs.map((piece) => (
                <li key={piece.slug} className="w-32 sm:w-40">
                  <div className="aspect-[4/5] overflow-hidden">
                    <ProductShot piece={piece} view="back" className="h-full w-full object-contain" />
                  </div>
                  <p className="spec-sm mt-2.5 text-center text-ink-faint">{piece.no} back</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-14">
          <p className="spec text-center text-ink-faint">On body</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-8">
            {pieces.map((piece) => (
              <li key={piece.slug} className="w-32 sm:w-40">
                <Link to={`/collection/${piece.slug}`} className="group block">
                  <div className="aspect-[2/5] overflow-hidden">
                    <img
                      src={modelArt[piece.no]}
                      alt={`${piece.name} in ${piece.colour.name}, worn`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <p className="spec-sm mt-2.5 text-center text-ink-faint transition-colors group-hover:text-ink">
                    {piece.no} · {piece.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Rule className="mt-16">{capsule.footline}</Rule>
      </div>
    </section>
  );
}
