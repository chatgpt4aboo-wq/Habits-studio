import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { capsuleOf, formatPrice, house, neighbours, pieceBySlug, pieces } from "@/data/collection";
import { modelArt } from "@/brand/assets";
import { policies } from "@/data/policies";
import { ProductShot } from "@/components/garment/ProductShot";
import { SwipeGallery, type Slide } from "@/components/ui/SwipeGallery";
import { hasBackView } from "@/components/garment/views";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { useBag } from "@/features/bag/store";
import { cn } from "@/lib/cn";

export default function Piece() {
  const { slug = "" } = useParams();
  const piece = pieceBySlug(slug);
  const bag = useBag();
  const [size, setSize] = useState<string>(house.sizes[0]);
  const [added, setAdded] = useState(false);

  if (!piece) return <Navigate to="/lookbook" replace />;

  const capsule = capsuleOf(piece.capsule);
  const around = neighbours(piece.slug);
  const alsoIn = pieces.filter((entry) => entry.slug !== piece.slug);
  const showBack = hasBackView(piece);

  // What there is to look at, in the order it is worth looking at it.
  const views: Slide[] = [
    {
      key: "garment",
      label: "Garment",
      content: <ProductShot piece={piece} washed className="h-full w-full object-contain" />,
    },
    ...(showBack
      ? [
          {
            key: "back",
            label: "Back",
            content: (
              <ProductShot piece={piece} view="back" className="h-full w-full object-contain" />
            ),
          },
        ]
      : []),
    ...(modelArt[piece.no]
      ? [
          {
            key: "worn",
            label: "On body",
            content: (
              <img
                src={modelArt[piece.no]}
                alt={`${piece.name} in ${piece.colour.name}, worn`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ),
          },
        ]
      : []),
  ];

  const addToBag = () => {
    bag.add(piece.slug, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div className="sheet bg-bone">
      <div className="wrap py-12">
        <nav aria-label="Breadcrumb" className="spec text-ink-faint">
          <Link to="/lookbook" className="transition-colors hover:text-ink">
            {capsule.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{piece.no}</span>
        </nav>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <SwipeGallery
              slides={views}
              frameClassName="aspect-[2/3] overflow-hidden bg-plate"
              className="lg:sticky lg:top-24"
            />
          </div>

          <div>
            <p className="spec text-navy">
              {capsule.range} / {capsule.title}
            </p>
            <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
              {piece.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-4">
              <p className="font-display text-3xl font-bold">{formatPrice(piece.price)}</p>
              <p className="spec text-ink-faint">{house.currency}</p>
            </div>

            <p className="mt-8 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              {piece.note}
            </p>

            <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              {house.edition.sentence}
            </p>

            <div className="mt-10 flex items-center gap-4 border-y border-line-light py-5">
              <span
                className="h-12 w-12 shrink-0 border border-line-light"
                style={{ background: piece.colour.hex }}
                aria-hidden="true"
              />
              {piece.colour.contrastHex ? (
                <span
                  className="h-12 w-12 shrink-0 border border-line-light"
                  style={{ background: piece.colour.contrastHex }}
                  aria-hidden="true"
                />
              ) : null}
              <div>
                <p className="spec text-ink">
                  {piece.colour.name}
                  {piece.colour.contrastName ? ` / ${piece.colour.contrastName}` : ""}
                </p>
                <p className="spec-sm mt-1 text-ink-faint">Garment dyed · enzyme washed</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="spec text-ink-faint">Size</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Size">
                {piece.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={size === option}
                    className={cn(
                      "h-11 min-w-[3.25rem] border spec transition-colors",
                      size === option
                        ? "border-ink bg-ink text-bone"
                        : "border-line-light text-ink-soft hover:border-ink",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="spec-sm mt-3 text-ink-faint">
                Cut in one size. Oversized, so it sits large through the body and shoulder.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="ink" size="lg" onClick={addToBag} className="min-w-[14rem]">
                {added ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Added to bag
                  </>
                ) : (
                  <>Add to bag · {formatPrice(piece.price)}</>
                )}
              </Button>
              <ButtonLink to="/bag" variant="ghost" size="lg" className="text-ink-faint hover:text-ink">
                View bag
              </ButtonLink>
            </div>

            <dl className="mt-10 space-y-5 border-t border-line-light pt-8">
              <Row label="Construction">
                <ul className="space-y-1">
                  {piece.specs.map((spec) => (
                    <li key={spec} className="spec text-ink-soft">
                      {spec}
                    </li>
                  ))}
                </ul>
              </Row>
              <Row label="Edition">
                <p className="spec text-ink-soft">
                  {house.edition.spec} · {house.edition.line}
                </p>
              </Row>
              <Row label="Fabric">
                <p className="spec text-ink-soft">{house.fabric}</p>
              </Row>
              <Row label="Fit">
                <p className="spec text-ink-soft">{house.fit}</p>
              </Row>
              <Row label="Shipping">
                <Link
                  to="/shipping"
                  className="spec text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
                >
                  {policies.shipping.local.where} · {policies.shipping.local.time}
                </Link>
              </Row>
            </dl>
          </div>
        </div>

        {around ? (
          <nav
            aria-label="Collection"
            className="mt-20 flex items-center justify-between gap-6 border-t border-line-light pt-6"
          >
            <Link
              to={`/lookbook/${around.previous.slug}`}
              className="spec inline-flex items-center gap-2 text-ink-faint transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              {around.previous.no} {around.previous.name}
            </Link>
            <Link
              to={`/lookbook/${around.next.slug}`}
              className="spec inline-flex items-center gap-2 text-right text-ink-faint transition-colors hover:text-ink"
            >
              {around.next.no} {around.next.name}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </nav>
        ) : null}

        <section className="mt-20">
          <p className="spec text-navy">The rest of {capsule.title}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
            {alsoIn.map((entry) => (
              <li key={entry.slug}>
                <GarmentPlate piece={entry} href={`/collection/${entry.slug}`} showSpecs={false} />
              </li>
            ))}
          </ul>
        </section>

        <Rule className="mt-16">{capsule.footline}</Rule>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <dt className="spec text-ink-faint">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
