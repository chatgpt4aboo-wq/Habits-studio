import { house, pieces } from "@/data/collection";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";

/** Counted from the collection, so the numbers cannot go stale. */
const pad = (value: number) => String(value).padStart(2, "0");

const facts = [
  { value: pad(pieces.length), label: "Long sleeves" },
  { value: `$${pieces[0].price}`, label: "Each" },
  { value: house.sizes.join(" / "), label: "Size" },
  { value: "400", label: "GSM cotton" },
];

export function Statement() {
  return (
    <section className="wrap py-28 lg:py-40">
      <Reveal className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <h2 className="font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
          Same habits.
          <br />
          <span className="text-amber">A higher standard.</span>
        </h2>

        <div className="space-y-6 text-[1.0625rem] leading-relaxed text-bone-soft">
          <p>
            One block, cut five ways. The body is oversized and squared, the shoulder dropped, the
            collar and cuff ribbed — and then it is left alone. What changes is the seam, the wash,
            and where the graphic sits.
          </p>
          <p>
            Every piece is {house.fabric.toLowerCase()}, so the colour moves in the wash and no two
            finish identically. That is the point of a garment dye, and the reason the collection
            reads quieter in person than on a screen.
          </p>
        </div>
      </Reveal>

      <Rule tone="dark" className="mt-24">
        {house.attributes.join(" · ")}
      </Rule>

      <dl className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="spec text-bone-soft">{fact.label}</dt>
            <dd className="mt-3 font-display text-5xl font-extrabold">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
