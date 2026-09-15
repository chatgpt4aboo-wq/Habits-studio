import { capsuleOf, pieces } from "@/data/collection";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The lookbook opens on the clothes, and closes on them too.
 *
 * There is no title block: the site header already says whose page this is,
 * and every plate carries its own number, name and price. The footer carries
 * the house line, so the page does not repeat it a few pixels above. The one
 * heading left is for screen readers and search engines, which still need to
 * be told what the page is — it just isn't drawn.
 */
export default function Lookbook() {
  const capsule = capsuleOf("daily");

  return (
    <div className="sheet bg-bone">
      <h1 className="sr-only">
        {capsule.index} — {capsule.title}
      </h1>

      <div className="wrap py-16 lg:py-24">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-24 sm:grid-cols-3 lg:grid-cols-5">
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
