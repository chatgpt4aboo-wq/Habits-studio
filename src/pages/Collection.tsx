import { useState } from "react";
import { capsuleOf, house, pieces } from "@/data/collection";
import { anyBackView } from "@/components/garment/views";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type View = "front" | "back";

export default function Collection() {
  const [view, setView] = useState<View>("front");
  const capsule = capsuleOf("daily");
  // Nothing to toggle to until back photography exists.
  const showViews = anyBackView(pieces);

  return (
    <div className="sheet min-h-screen bg-bone">
      <div className="wrap py-16 lg:py-24">
        <header>
          <p className="spec text-navy">
            {capsule.range} / {capsule.title}
          </p>
          <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase">
            Five long sleeves
          </h1>
          <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
            {capsule.blurb}
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-line-light py-4">
          <p className="spec text-ink-faint">
            {pieces.length} pieces · ${pieces[0].price} each · size {house.sizes.join(" / ")}
          </p>

          {showViews ? (
            <div className="flex gap-x-5" role="group" aria-label="Garment view">
              {(["front", "back"] as View[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setView(option)}
                  aria-pressed={view === option}
                  className={cn(
                    "spec transition-colors",
                    view === option
                      ? "text-navy underline decoration-navy underline-offset-[6px]"
                      : "text-ink-faint hover:text-ink",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-20 sm:grid-cols-3 lg:grid-cols-5">
          {pieces.map((piece, index) => (
            <Reveal as="li" key={piece.slug} delay={index * 50}>
              <GarmentPlate piece={piece} view={view} href={`/collection/${piece.slug}`} />
            </Reveal>
          ))}
        </ul>

        <Rule className="mt-16">{capsule.footline}</Rule>
      </div>
    </div>
  );
}
