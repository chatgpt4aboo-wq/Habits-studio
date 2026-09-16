import { capsuleOf, house, pieces } from "@/data/collection";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The lookbook opens on the clothes.
 *
 * One page mark at the top says which capsule and which numbers; everything
 * else that used to introduce the page is gone, because the site header
 * already says whose page this is and every plate carries its own number,
 * name and price. The footer carries the house line, so the page does not
 * repeat it a few pixels above. The drawn h1 is replaced by screen-reader
 * text. A page still has to tell assistive technology what it is.
 */
export default function Lookbook() {
  const capsule = capsuleOf("daily");

  return (
    <div className="sheet bg-bone">
      <h1 className="sr-only">
        {capsule.index}, {capsule.title}
      </h1>

      <div className="wrap py-12 lg:py-16">
        <p className="spec text-navy">
          {capsule.index} · {capsule.range} / {capsule.title}
        </p>
        <p className="spec-sm mt-3 text-ink-faint">
          {house.edition.spec} of each · {house.edition.line}
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-24 sm:grid-cols-3 lg:mt-20 lg:grid-cols-5">
          {pieces.map((piece, index) => (
            <Reveal as="li" key={piece.slug} delay={index * 50}>
              <GarmentPlate piece={piece} href={`/lookbook/${piece.slug}`} />
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
