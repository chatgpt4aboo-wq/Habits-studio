import { house } from "@/data/collection";
import { Rule } from "@/components/ui/Rule";

const facts = [
  { value: "20", label: "Long sleeves" },
  { value: "04", label: "Capsules" },
  { value: "01", label: "Block" },
  { value: "06", label: "Sizes" },
];

export function Statement() {
  return (
    <section className="wrap py-24">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <h2 className="font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
          Same habits.
          <br />
          <span className="text-amber">A higher standard.</span>
        </h2>

        <div className="space-y-6 text-[1.0625rem] leading-relaxed text-bone-soft">
          <p>
            One block, cut twenty ways. The body is oversized and squared, the shoulder dropped, the
            collar and cuff ribbed — and then it is left alone. What changes is the seam, the wash,
            and where the graphic sits.
          </p>
          <p>
            Every piece is {house.fabric.toLowerCase()}, so the colour moves in the wash and no two
            finish identically. That is the point of a garment dye, and the reason the collection
            reads quieter in person than on a screen.
          </p>
        </div>
      </div>

      <Rule tone="dark" className="mt-20">
        {house.attributes.join(" · ")}
      </Rule>

      <dl className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
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
