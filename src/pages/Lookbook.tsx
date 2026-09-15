import { capsuleOf, house, pieces } from "@/data/collection";
import { Wordmark } from "@/brand/Marks";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";

/**
 * The lookbook is the shop. There is one capsule of five, so a separate
 * browsing grid was the same page twice — this is the portfolio sheet, and
 * every piece on it goes straight to where you can buy it.
 */
export default function Lookbook() {
  const capsule = capsuleOf("daily");

  return (
    <div>
      {/*
       * Kept short on purpose: the capsule announces itself and gets out of the
       * way. The heading is set in the grotesque rather than the display serif
       * — a different voice from the wordmark it sits beneath.
       */}
      <header className="wrap py-12 lg:py-16">
        <h1>
          <span className="spec block text-amber">{capsule.index}</span>
          <span className="mt-5 block font-body text-[clamp(2.75rem,7vw,5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em]">
            {capsule.title}
          </span>
        </h1>
        <p className="spec mt-7 text-bone-soft">
          {pieces.length} pieces · ${pieces[0].price} each · size {house.sizes.join(" / ")}
        </p>
      </header>

      <section className="sheet bg-bone">
        <div className="wrap py-20 lg:py-28">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="spec text-navy">
              {capsule.range} / {capsule.title}
            </p>
            <p className="spec-sm text-ink-faint">{house.collection}</p>
          </Reveal>

          <Reveal className="mt-20 text-center lg:mt-24">
            <Wordmark size="md" className="mx-auto" />
            <p className="spec mt-8 text-ink-faint">{capsule.subtitle}</p>
          </Reveal>

          <ul className="mt-20 grid grid-cols-2 gap-x-8 gap-y-24 sm:grid-cols-3 lg:mt-28 lg:grid-cols-5">
            {pieces.map((piece, index) => (
              <Reveal as="li" key={piece.slug} delay={index * 50}>
                <GarmentPlate piece={piece} href={`/lookbook/${piece.slug}`} />
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <Rule className="mt-24">{capsule.footline}</Rule>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
