import { Link } from "react-router-dom";
import { capsuleOf, formatPrice, pieces } from "@/data/collection";
import { ProductShot } from "@/components/garment/ProductShot";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Wordmark } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * The capsule as a spread rather than a row.
 *
 * A grid of five identical plates reads as a catalogue; a fashion page is
 * scanned, not compared. So each piece takes a different span and drops to a
 * different height, and the eye moves diagonally instead of along a line. The
 * shop grid stays even on purpose — that is where things *are* compared.
 */
const PLACEMENT = [
  "col-span-2 lg:col-span-4 lg:col-start-1",
  "col-span-2 lg:col-span-3 lg:col-start-6 lg:mt-32",
  "col-span-2 lg:col-span-3 lg:col-start-10 lg:mt-12",
  "col-span-2 lg:col-span-4 lg:col-start-2 lg:-mt-16",
  "col-span-2 lg:col-span-4 lg:col-start-8 lg:mt-24",
];

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
            to="/lookbook"
            className="spec text-ink-faint transition-colors hover:text-ink"
          >
            Shop the capsule
          </Link>
        </Reveal>

        <Reveal className="mt-24 text-center lg:mt-32">
          <Wordmark size="md" className="mx-auto" />
          <p className="spec mt-8 text-ink-faint">{capsule.subtitle}</p>
        </Reveal>

        <ul className="mt-24 grid grid-cols-4 gap-x-6 gap-y-20 lg:mt-32 lg:grid-cols-12 lg:gap-x-8">
          {pieces.map((piece, index) => (
            <Reveal as="li" key={piece.slug} delay={index * 60} className={cn(PLACEMENT[index])}>
              <Link to={`/lookbook/${piece.slug}`} className="group block">
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
