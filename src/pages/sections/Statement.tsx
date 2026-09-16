import { house } from "@/data/collection";
import { Reveal } from "@/components/ui/Reveal";

/**
 * What the cover no longer says.
 *
 * The line, and then the collection in a paragraph, on a ground where a
 * paragraph can be read. It follows the cover on the same black, so the page
 * does not change surface twice before it has said anything.
 */
export function Statement() {
  return (
    <section className="wrap py-28 lg:py-40">
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <Reveal>
          <h2 className="font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
            Same habits.
            <br />
            <span className="text-signal">A higher standard.</span>
          </h2>
        </Reveal>

        <Reveal delay={80} className="border-l border-signal/50 pl-6">
          <p className="text-[1.0625rem] leading-relaxed text-signal">{house.intro}</p>
          <p className="spec mt-6 text-signal">
            {[house.edition.spec, ...house.attributes].join(" / ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
