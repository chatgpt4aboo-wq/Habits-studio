import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { capsules, piecesIn } from "@/data/collection";
import { Garment } from "@/components/garment/Garment";

export function CapsuleIndex() {
  return (
    <section className="border-y border-line-dark bg-void-raised">
      <div className="wrap py-24">
        <p className="spec text-amber">The capsules</p>
        <h2 className="mt-5 max-w-2xl font-display text-mark-md font-extrabold uppercase">
          Four pages from the portfolio
        </h2>

        <ul className="mt-16 space-y-px">
          {capsules.map((capsule) => {
            const inCapsule = piecesIn(capsule.id);
            return (
              <li key={capsule.id}>
                <Link
                  to={`/lookbook#${capsule.id}`}
                  className="group grid items-center gap-6 border-t border-line-dark py-8 sm:grid-cols-[7rem_1fr_auto] sm:gap-10"
                >
                  <p className="spec text-bone-soft">{capsule.range}</p>

                  <div className="min-w-0">
                    <h3 className="font-display text-mark-sm font-bold uppercase transition-colors group-hover:text-amber">
                      {capsule.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-bone-soft">
                      {capsule.blurb}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <ul className="hidden items-center gap-1 lg:flex" aria-hidden="true">
                      {inCapsule.slice(0, 3).map((piece) => (
                        <li key={piece.slug} className="w-16">
                          <Garment piece={piece} />
                        </li>
                      ))}
                    </ul>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-bone-soft transition-colors group-hover:text-amber" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
