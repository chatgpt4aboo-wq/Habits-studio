import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/brand/Marks";
import { ButtonLink } from "@/components/ui/Button";
import { ShaderField } from "@/components/ShaderField";
import { house } from "@/data/collection";

/**
 * The cover: moving colour, edge to edge, and the wordmark standing on it.
 *
 * The ground was a film, and a film here was somebody else's footage carrying
 * the first thing anyone sees of this brand. It is drawn now: the house
 * palette folded through itself, slow enough to be a surface rather than an
 * event. The films are on the studio page, where they are the subject.
 *
 * The mark is flat. The chrome finish was the one flashy thing on an
 * otherwise plain site, and bone on black is the stronger of the two.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden border-b border-line-dark">
      <ShaderField className="absolute inset-0" />

      {/* The mark has to hold over moving colour, and the ground has to end in
          the page rather than stop at an edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-void/30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-void via-void/90 to-transparent"
      />

      <div className="wrap relative animate-rise-in pb-20 pt-40 lg:pb-24">
        <p className="spec text-signal">
          {house.collection} / {house.kind}
        </p>

        <h1 className="mt-8">
          <Wordmark size="xl" light />
          <span className="sr-only">{house.name}</span>
        </h1>

        <div className="mt-12 flex flex-wrap items-center gap-8">
          <ButtonLink to="/collection" size="lg">
            Shop the capsule
            <ArrowRight className="h-3.5 w-3.5" />
          </ButtonLink>
          <p className="spec text-bone-soft">{house.cities.join(" / ")}</p>
        </div>
      </div>
    </section>
  );
}
