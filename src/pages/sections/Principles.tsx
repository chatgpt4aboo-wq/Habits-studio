import { principles } from "@/brand/tokens";

export function Principles() {
  return (
    <section className="border-b border-line">
      <div className="wrap py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">What the studio believes</p>
          <h2 className="mt-4 font-display text-display-lg">
            Three rules, and everything else follows.
          </h2>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line md:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.index} className="bg-surface p-7">
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-kelp">{principle.index}</p>
              <h3 className="mt-5 font-display text-display-sm">{principle.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
