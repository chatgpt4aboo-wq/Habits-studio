import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { capsuleOf, house, neighbours, pieceBySlug, piecesIn } from "@/data/collection";
import { Garment } from "@/components/garment/Garment";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { ButtonLink } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { cn } from "@/lib/cn";

export default function Piece() {
  const { slug = "" } = useParams();
  const piece = pieceBySlug(slug);
  const [view, setView] = useState<"front" | "back">("front");

  if (!piece) return <Navigate to="/collection" replace />;

  const capsule = capsuleOf(piece.capsule);
  const around = neighbours(piece.slug);
  const alsoIn = piecesIn(piece.capsule).filter((entry) => entry.slug !== piece.slug);
  const hasBack = Boolean(piece.build.back);

  return (
    <div className="sheet bg-bone">
      <div className="wrap py-12">
        <nav aria-label="Breadcrumb" className="spec text-ink-faint">
          <Link to="/collection" className="transition-colors hover:text-ink">
            Collection
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/lookbook#${capsule.id}`} className="transition-colors hover:text-ink">
            {capsule.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{piece.no}</span>
        </nav>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="bg-bone-sunken/70 px-6 py-8">
              <Garment piece={piece} view={view} washed className="mx-auto max-w-md" />
            </div>

            {hasBack ? (
              <div className="mt-4 flex gap-6" role="group" aria-label="Garment view">
                {(["front", "back"] as const).map((option) => (
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
                    {option} view
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="spec text-navy">
              {capsule.range} / {capsule.title}
            </p>
            <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
              {piece.name}
            </h1>
            <p className="spec mt-5 text-ink-faint">Piece {piece.no} of 20</p>

            <p className="mt-8 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              {piece.note}
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

            <dl className="mt-8 space-y-5">
              <Row label="Construction">
                <ul className="space-y-1">
                  {piece.specs.map((spec) => (
                    <li key={spec} className="spec text-ink-soft">
                      {spec}
                    </li>
                  ))}
                </ul>
              </Row>
              <Row label="Fabric">
                <p className="spec text-ink-soft">{house.fabric}</p>
              </Row>
              <Row label="Fit">
                <p className="spec text-ink-soft">{house.fit}</p>
              </Row>
              <Row label="Sizes">
                <p className="spec text-ink-soft">{house.sizes.join(" · ")}</p>
              </Row>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/#release" variant="ink">
                Join the release list
              </ButtonLink>
              <ButtonLink
                to={`/lookbook#${capsule.id}`}
                variant="ghost"
                className="text-ink-faint hover:text-ink"
              >
                See the capsule
              </ButtonLink>
            </div>
          </div>
        </div>

        {around ? (
          <nav
            aria-label="Collection"
            className="mt-20 flex items-center justify-between gap-6 border-t border-line-light pt-6"
          >
            <Link
              to={`/collection/${around.previous.slug}`}
              className="spec inline-flex items-center gap-2 text-ink-faint transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              {around.previous.no} {around.previous.name}
            </Link>
            <Link
              to={`/collection/${around.next.slug}`}
              className="spec inline-flex items-center gap-2 text-right text-ink-faint transition-colors hover:text-ink"
            >
              {around.next.no} {around.next.name}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </nav>
        ) : null}

        <section className="mt-20">
          <p className="spec text-navy">Also in {capsule.title}</p>
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
