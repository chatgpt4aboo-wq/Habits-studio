import { house, pieces } from "@/data/collection";
import { ProductShot } from "@/components/garment/ProductShot";
import { Rule } from "@/components/ui/Rule";
import { Wordmark } from "@/brand/Marks";
import { SleeveTapeBand } from "@/components/layout/SleeveTape";

/**
 * Not a making-of. The studio's subject is the habit, not the factory — so the
 * page is about repetition and what it does to a life, and the garment is left
 * to stand in the middle of it without explanation.
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
  const hero = pieces[1];

  return (
    <div>
      <header className="wrap py-20 lg:py-28">
        <p className="spec text-amber">The studio</p>
        <h1 className="mt-8 max-w-4xl font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
          Discipline creates freedom
        </h1>
        <p className="mt-10 max-w-prose font-display text-2xl leading-[1.45] text-bone">
          We are what we do twice. Then a hundred times. Then without thinking.
        </p>
      </header>

      <SleeveTapeBand tone="void" />

      <section className="wrap grid items-start gap-16 py-24 lg:grid-cols-[1fr_1fr]">
        <div className="lg:sticky lg:top-28">
          <div className="aspect-[4/5] overflow-hidden bg-white">
            <ProductShot piece={hero} className="h-full w-full object-cover" />
          </div>
          <p className="spec-sm mt-6 text-bone-soft">
            {hero.no} · {hero.name} · {hero.colour.name}
          </p>
        </div>

        <ol className="space-y-16">
          {movements.map((movement) => (
            <li key={movement.index} className="border-t border-line-dark pt-7">
              <p className="spec text-amber">{movement.index}</p>
              <h2 className="mt-5 font-display text-mark-sm font-bold uppercase leading-tight">
                {movement.title}
              </h2>
              <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-bone-soft">
                {movement.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap pb-8">
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
      </section>

      <section className="sheet mt-20 bg-bone">
        <div className="wrap py-24 text-center">
          <Wordmark size="md" />
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
