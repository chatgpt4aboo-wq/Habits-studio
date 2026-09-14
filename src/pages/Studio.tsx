import { house, pieces } from "@/data/collection";
import { Garment } from "@/components/garment/Garment";
import { Rule } from "@/components/ui/Rule";
import { Wordmark } from "@/brand/Marks";

const process = [
  {
    step: "01",
    title: "One block",
    body: "The body, shoulder, collar and cuff are drawn once. Nothing in the collection re-opens them — an extension earns its number through construction, not through a new fit.",
  },
  {
    step: "02",
    title: "Cut, then dye",
    body: "Pieces are made up in raw cloth and dyed as finished garments, so the seams pull colour differently to the panels and the wash settles into the stitch.",
  },
  {
    step: "03",
    title: "Graphic last",
    body: "Print is the final decision, never the first. Two capsules carry none at all, and the third keeps the front quiet and gives the back the whole sheet.",
  },
];

export default function Studio() {
  const hero = pieces[9];

  return (
    <div>
      <header className="wrap py-16">
        <p className="spec text-amber">The studio</p>
        <h1 className="mt-5 max-w-3xl font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
          Discipline creates freedom
        </h1>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-bone-soft">
          {house.name} works on one garment at a time. This is the long sleeve — twenty of them,
          drawn as a single collection rather than a season, between {house.cities.join(" and ")}.
        </p>
      </header>

      <section className="wrap grid items-center gap-16 border-t border-line-dark py-20 lg:grid-cols-[1fr_1fr]">
        <div className="mx-auto w-full max-w-sm">
          <Garment piece={hero} washed />
          <p className="spec-sm mt-6 text-center text-bone-soft">
            {hero.no} · {hero.name} · {hero.colour.name}
          </p>
        </div>

        <ol className="space-y-12">
          {process.map((entry) => (
            <li key={entry.step} className="border-t border-line-dark pt-6">
              <p className="spec text-amber">{entry.step}</p>
              <h2 className="mt-4 font-display text-mark-sm font-bold uppercase">{entry.title}</h2>
              <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sheet bg-bone">
        <div className="wrap py-20 text-center">
          <Wordmark size="md" />
          <p className="spec mt-8 text-ink-faint">{house.fabric}</p>
          <p className="spec mt-2 text-ink-faint">{house.fit}</p>
          <p className="spec mt-2 text-ink-faint">Sizes {house.sizes.join(" · ")}</p>
          <Rule className="mt-14">{house.lines.differentForm}</Rule>
        </div>
      </section>
    </div>
  );
}
