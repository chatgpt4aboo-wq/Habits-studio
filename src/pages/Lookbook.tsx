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
      <header className="wrap py-20 lg:py-28">
        <p className="spec text-amber">{house.kind}</p>
        <h1 className="mt-8 font-display text-mark-lg font-extrabold uppercase">
          {capsule.title}
        </h1>
        <p className="mt-8 max-w-prose text-[1.0625rem] leading-relaxed text-bone-soft">
          {capsule.blurb}
        </p>
        <p className="spec mt-10 text-bone-soft">
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
            <Wordmark size="md" />
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
