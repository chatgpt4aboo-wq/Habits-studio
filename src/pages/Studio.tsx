import { house } from "@/data/collection";
import { backgroundFilm, films } from "@/data/films";
import { Film } from "@/components/Film";
import { AmbientFilm } from "@/components/AmbientFilm";
import { Reveal } from "@/components/ui/Reveal";
import { Wordmark } from "@/brand/Marks";
import { SleeveTapeBand } from "@/components/layout/SleeveTape";

/**
 * Not a making-of. The studio's subject is the habit, not the factory, so the
 * page carries the films and the writing and no garment at all. The clothes
 * have their own pages.
 */
const movements = [
  {
    title: "Nothing is decided once",
    body: "You decide again every morning, in the order you do small things. What you reach for. What you put on. What you do before the day has asked anything of you.",
  },
  {
    title: "The groove deepens either way",
    body: "Repetition does not wait for your attention. Something is being worn in every day you are alive. The only open question is what.",
  },
  {
    title: "Nobody remembers a Tuesday",
    body: "Big decisions take the credit. Most of a life gets assembled out of the days nobody remembers, including the person living them.",
  },
];

export default function Studio() {
  return (
    <div>
      <header className="relative isolate flex min-h-[86vh] items-end overflow-hidden">
        <AmbientFilm
          youtube={backgroundFilm.youtube}
          label={backgroundFilm.label}
          fill
          className="absolute inset-0"
          overlay={
            <>
              {/* The writing has to stay readable over moving picture, and the
                  film has to end in the page rather than stop at an edge. */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-void/75" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-void via-void/90 to-transparent"
              />
            </>
          }
        />

        <div className="wrap relative py-24 lg:py-32">
          <p className="spec text-signal">The studio</p>
          <h1 className="mt-8 max-w-4xl font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
            Discipline creates freedom
          </h1>
          <p className="mt-10 max-w-prose font-display text-2xl leading-[1.45] text-bone">
            Almost everything you did today, you also did yesterday.
          </p>
        </div>
      </header>

      <section className="wrap py-28 lg:py-40">
        <ol className="grid gap-x-10 gap-y-16 md:grid-cols-3">
          {movements.map((movement, index) => (
            <Reveal
              as="li"
              key={movement.title}
              delay={index * 80}
              className="border-t border-line-dark pt-7"
            >
              <h2 className="font-display text-mark-sm font-bold uppercase leading-tight">
                {movement.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-bone-soft">{movement.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <SleeveTapeBand tone="void" />

      <section className="wrap py-28 lg:py-40" aria-labelledby="films">
        <Reveal className="max-w-3xl">
          <p className="spec text-signal">Films</p>
          <h2 id="films" className="mt-8 font-display text-mark-md font-extrabold uppercase leading-[1.05]">
            Short films about repetition
          </h2>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-bone-soft">
            They play here, on this page, and nowhere else. No product, no voiceover, nothing
            being sold inside them.
          </p>
        </Reveal>

        {films.length === 0 ? (
          <Reveal className="mt-20 lg:mt-28">
            <Film film={{ id: "placeholder", title: "Film", note: "" }} />
          </Reveal>
        ) : (
          <ul className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
            {films.map((film, index) => (
              <Reveal as="li" key={film.id} delay={index * 60}>
                <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4 border-b border-line-dark pb-4">
                  <h3 className="spec text-bone">{film.title}</h3>
                  {film.runtime ? <p className="spec text-bone-soft">{film.runtime}</p> : null}
                </div>
                <Film film={film} />
                {film.note ? (
                  <p className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
                    {film.note}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <section className="wrap pb-24">
        <Reveal>
          <blockquote className="border-l border-signal/50 py-2 pl-7">
            <p className="max-w-3xl font-display text-mark-md font-extrabold uppercase leading-[1.05]">
              A garment you keep returning to stops being a choice
              <span className="text-signal"> and becomes a fact.</span>
            </p>
            <p className="mt-7 max-w-prose text-[1.0625rem] leading-relaxed text-bone-soft">
              It softens. It fades unevenly. It fits closer than it did, and it holds the shape of
              wherever it has been. Cloth keeps a record the way the days do, without being asked
              to.
            </p>
          </blockquote>
        </Reveal>
      </section>

      <section className="sheet bg-bone">
        <div className="wrap py-24 text-center lg:py-32">
          <Wordmark size="md" className="mx-auto" />
          <p className="mx-auto mt-10 max-w-prose font-display text-xl leading-relaxed text-ink">
            {house.lines.higherStandard}
          </p>
          <p className="spec mt-10 text-ink-faint">{house.cities.join(" / ")}</p>
        </div>
      </section>
    </div>
  );
}
