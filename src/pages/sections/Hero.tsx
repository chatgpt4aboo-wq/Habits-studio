import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/brand/Marks";
import { ButtonLink } from "@/components/ui/Button";
import { ProductShot } from "@/components/garment/ProductShot";
import { house, pieces } from "@/data/collection";
import { cn } from "@/lib/cn";

export function Hero() {
  // Three pieces, stepped — the cover image, built from the collection itself.
  const showcase = [pieces[1], pieces[0], pieces[4]];

  return (
    <section className="relative overflow-hidden border-b border-line-dark">
      <div className="wrap grid items-center gap-16 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div className="animate-rise-in">
          <p className="spec text-amber">
            {house.collection} / {house.kind}
          </p>

          <h1 className="mt-10">
            <Wordmark size="xl" className="iridescent animate-sheen [background-size:220%_auto]" />
            <span className="sr-only">{house.name}</span>
          </h1>

          <div className="mt-12 max-w-md space-y-2 border-l border-amber/50 pl-5">
            <p className="spec text-amber">{house.scope}</p>
            <p className="spec text-amber">{house.attributes.join(" / ")}</p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <ButtonLink to="/collection" size="lg">
              Shop the capsule
              <ArrowRight className="h-3.5 w-3.5" />
            </ButtonLink>
            <ButtonLink to="/lookbook" size="lg" variant="outline">
              The lookbook
            </ButtonLink>
          </div>

          <p className="spec mt-16 text-bone-soft">{house.cities.join(" / ")}</p>
        </div>

        <div className="relative animate-fade-in">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--line-dark)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line-dark)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(65% 65% at 50% 45%, black, transparent)",
              WebkitMaskImage: "radial-gradient(65% 65% at 50% 45%, black, transparent)",
            }}
          />
          {/* Three pieces, the centre one lifted — a rail, not a grid. */}
          <ul className="flex items-end justify-center gap-3 sm:gap-6">
            {showcase.map((piece, index) => (
              <li key={piece.slug} className={cn("min-w-0 flex-1", index === 1 && "mb-16 scale-[1.06]")}>
                <div className="aspect-[4/5] overflow-hidden">
                  <ProductShot piece={piece} washed className="h-full w-full object-cover" />
                </div>
                <p className="spec-sm mt-5 text-center text-bone-soft">
                  {piece.no} · {piece.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
