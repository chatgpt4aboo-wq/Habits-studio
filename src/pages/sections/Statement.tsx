import { Reveal } from "@/components/ui/Reveal";

/**
 * One line, in a field of space. Everything that used to explain the block,
 * the dye and the wash is gone. The clothes are directly below it, and they
 * make the same point without being told to.
 */
export function Statement() {
  return (
    <section className="wrap py-32 lg:py-48">
      <Reveal>
        <h2 className="font-display text-mark-lg font-extrabold uppercase leading-[0.95]">
          Same habits.
          <br />
          <span className="text-signal">A higher standard.</span>
        </h2>
      </Reveal>
    </section>
  );
}
