import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { capsuleOf, house, piecesIn } from "@/data/collection";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Rule } from "@/components/ui/Rule";
import { Wordmark } from "@/brand/Marks";

/** The core five, set as a portfolio sheet on bone. */
export function CoreRow() {
  const capsule = capsuleOf("core");
  const core = piecesIn("core");

  return (
    <section className="sheet bg-bone py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="spec text-navy">
            {capsule.range} / {capsule.title}
          </p>
          <Link
            to="/collection"
            className="spec inline-flex items-center gap-2 text-ink-faint transition-colors hover:text-ink"
          >
            All twenty
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-14 text-center">
          <Wordmark size="md" />
          <p className="spec mt-6 text-ink-faint">{capsule.subtitle}</p>
          <p className="spec-sm mt-2 text-ink-faint">{house.fit}</p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {core.map((piece) => (
            <li key={piece.slug}>
              <GarmentPlate piece={piece} href={`/collection/${piece.slug}`} showSpecs={false} />
            </li>
          ))}
        </ul>

        <Rule className="mt-16">{capsule.footline}</Rule>
      </div>
    </section>
  );
}
