import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/brand/Marks";
import { ButtonLink } from "@/components/ui/Button";
import { AmbientFilm } from "@/components/AmbientFilm";
import { house } from "@/data/collection";
import { heroFilm } from "@/data/films";

/**
 * The cover: the film, edge to edge, and the wordmark standing on it.
 *
 * It used to be a column of writing beside a video in a box, which is the
 * shape of a software page rather than a clothing one. A film is worth more
 * than a quarter of a screen. So it takes the whole of it, and everything that
 * explains the collection moves one section down, onto a ground where it can
 * be read properly.
 *
 * The mark is flat here. The chrome finish was the one flashy thing on an
 * otherwise plain site, and bone on black is the stronger of the two.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden border-b border-line-dark">
      <AmbientFilm
        youtube={heroFilm.youtube}
        label={heroFilm.label}
        start={heroFilm.start}
        fill
        className="absolute inset-0"
        overlay={
          <>
            {/* The mark has to hold over moving picture, and the film has to
                end in the page rather than stop at an edge. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-void/70" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-void via-void/90 to-transparent"
            />
          </>
        }
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
