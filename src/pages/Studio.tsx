import { house } from "@/data/collection";
import { films } from "@/data/films";
import { Film } from "@/components/Film";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Wordmark } from "@/brand/Marks";
import { SleeveTapeBand } from "@/components/layout/SleeveTape";

/**
 * Not a making-of. The studio's subject is the habit, not the factory — so the
 * page carries the films and the writing, and no garment at all. The clothes
 * have their own pages.
 */
const movements = [
  {
    index: "I",
    title: "What repeats, becomes",
    body: "No life is decided once. It is decided again every morning, in the small unremarkable order of things — what you reach for, what you put on, what you do before the day has asked anything of you.",
  },
  {
    index: "II",
    title: "You are always practising something",
    body: "A habit is not a rule and it is not a promise. It is a groove worn by repetition, and it deepens whether or not you are paying attention. The only question is which groove.",
  },
  {
    index: "III",
    title: "The days are the life",
    body: "We overestimate what a decision can do and underestimate what a Tuesday can. Character is not chosen in the large moments; it is accumulated in the ones nobody watches.",
  },
];

export default function Studio() {
  return (
    <div>
      <header className="wrap py-20 lg:py-32">
        <p className="spec text-amber">The studio</p>
        <h1 className="mt-8 max-w-4xl font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
          Discipline creates freedom
        </h1>
        <p className="mt-10 max-w-prose font-display text-2xl leading-[1.45] text-bone">
          We are what we do twice. Then a hundred times. Then without thinking.
        </p>
      </header>

      <section className="wrap pb-28 lg:pb-40">
        <ol className="grid gap-x-10 gap-y-16 md:grid-cols-3">
          {movements.map((movement, index) => (
            <Reveal
              as="li"
              key={movement.index}
              delay={index * 80}
              className="border-t border-line-dark pt-7"
            >
              <p className="spec text-amber">{movement.index}</p>
              <h2 className="mt-5 font-display text-mark-sm font-bold uppercase leading-tight">
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
          <p className="spec text-amber">Films</p>
          <h2 id="films" className="mt-8 font-display text-mark-md font-extrabold uppercase leading-[1.05]">
            Short films about repetition
          </h2>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-bone-soft">
            We make a film for each thing we are trying to understand, and the subject is always the
            same: what a person does again. No product, no voiceover, no argument — a room, an
            hour, and whatever survives the edit.
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-bone-soft">
            They are short on purpose. A habit is not dramatic, and a film about one should not
            pretend otherwise.
          </p>
        </Reveal>

        <ul className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
          {films.map((film, index) => (
            <Reveal as="li" key={film.id} delay={index * 60}>
              <Film film={film} />
              <div className="mt-7 grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
                <p className="spec text-amber">{film.index}</p>
                <div>
                  <h3 className="font-display text-mark-sm font-bold uppercase">{film.title}</h3>
                  <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
                    {film.note}
                  </p>
                </div>
                {film.runtime ? <p className="spec text-bone-soft">{film.runtime}</p> : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="wrap pb-24">
        <Reveal>
          <blockquote className="border-l border-amber/50 py-2 pl-7">
            <p className="max-w-3xl font-display text-mark-md font-extrabold uppercase leading-[1.05]">
              A garment you keep returning to stops being a choice
              <span className="text-amber"> and becomes a fact.</span>
            </p>
            <p className="mt-7 max-w-prose text-[1.0625rem] leading-relaxed text-bone-soft">
              It softens. It fades unevenly. It fits closer to you than it did on the first day, and
              it holds the shape of everywhere it has been. Cloth keeps the record the same way the
              days do — slowly, and then all at once.
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
          <Rule className="mt-14">{house.lines.differentForm}</Rule>
        </div>
      </section>
    </div>
  );
}
