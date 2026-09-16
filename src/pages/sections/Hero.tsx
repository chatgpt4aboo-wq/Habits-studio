import { ArrowRight } from "lucide-react";
import { ChromeWordmark } from "@/brand/Marks";
import { ButtonLink } from "@/components/ui/Button";
import { AmbientFilm } from "@/components/AmbientFilm";
import { house } from "@/data/collection";
import { heroFilm } from "@/data/films";

/**
 * The cover: the wordmark, and the film running beside it. The clothes are
 * three sections down and do not need to introduce themselves twice.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line-dark">
      <div className="wrap grid items-center gap-16 py-24 lg:grid-cols-[1fr_1.1fr] lg:py-32">
        <div className="animate-rise-in">
          <p className="spec text-signal">
            {house.collection} / {house.kind}
          </p>

          <h1 className="mt-10 max-w-xl">
            <ChromeWordmark />
            <span className="sr-only">{house.name}</span>
          </h1>

          <div className="mt-12 max-w-md space-y-2 border-l border-signal/50 pl-5">
            <p className="spec text-signal">{house.scope}</p>
            <p className="spec text-signal">{house.attributes.join(" / ")}</p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <ButtonLink to="/lookbook" size="lg">
              Shop the capsule
              <ArrowRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>

          <p className="spec mt-16 text-bone-soft">{house.cities.join(" / ")}</p>
        </div>

        <div className="animate-fade-in">
          <AmbientFilm
            youtube={heroFilm.youtube}
            label={heroFilm.label}
            start={heroFilm.start}
          />
        </div>
      </div>
    </section>
  );
}
