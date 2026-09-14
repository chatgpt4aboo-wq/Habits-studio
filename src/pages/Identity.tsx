import { Lockup, Monogram, SleeveLockup, Wordmark } from "@/brand/Marks";
import { colourRules, markUsage, surfaces, typefaces } from "@/brand/identity";
import { house } from "@/data/collection";
import { Rule } from "@/components/ui/Rule";
import { cn } from "@/lib/cn";

/** The deck's identity page, rebuilt as a live one. */
export default function Identity() {
  return (
    <div>
      <header className="wrap py-16">
        <p className="spec text-amber">Identity system</p>
        <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase">The marks</h1>
        <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
          Three applications, one system: the primary wordmark, the compact symbol, and the sleeve
          lockup that runs the length of an arm.
        </p>
      </header>

      <section className="sheet bg-bone">
        <div className="wrap py-16">
          <p className="spec text-center text-ink-faint">( 1 ) Primary wordmark</p>
          <div className="mt-10 flex justify-center">
            <Wordmark size="lg" />
          </div>

          <div className="mx-auto mt-16 h-px w-24 bg-line-light" />

          <p className="spec mt-16 text-center text-ink-faint">( 2 ) Compact symbol</p>
          <div className="mt-10 flex justify-center">
            <Monogram className="h-28 w-28" />
          </div>

          <div className="mx-auto mt-16 h-px w-24 bg-line-light" />

          <p className="spec mt-16 text-center text-ink-faint">( 3 ) Sleeve lockup · horizontal</p>
          <div className="mt-10 overflow-hidden">
            <div className="flex justify-center">
              <SleeveLockup repeat={2} />
            </div>
          </div>

          <Rule className="mt-16">{house.name}</Rule>
        </div>
      </section>

      <section className="wrap py-20">
        <p className="spec text-amber">On each surface</p>
        <h2 className="mt-5 font-display text-mark-md font-extrabold uppercase">Two grounds</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="flex min-h-[13rem] flex-col items-center justify-center gap-6 border border-line-dark bg-void">
            <Lockup />
            <p className="spec-sm text-bone-soft">Bone on void</p>
          </div>
          <div className="sheet flex min-h-[13rem] flex-col items-center justify-center gap-6 border border-line-light bg-bone text-ink">
            <Lockup />
            <p className="spec-sm text-ink-faint">Ink on bone</p>
          </div>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {markUsage.map((rule) => (
            <li key={rule} className="flex gap-3 text-sm leading-relaxed text-bone-soft">
              <span aria-hidden="true" className="text-amber">
                —
              </span>
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet bg-bone">
        <div className="wrap py-20">
          <p className="spec text-navy">Colour</p>
          <h2 className="mt-5 font-display text-mark-md font-extrabold uppercase">
            Two grounds, two signals
          </h2>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {surfaces.map((surface) => (
              <li key={surface.token}>
                <div
                  className="h-28 border border-line-light"
                  style={{ background: surface.hex }}
                  aria-hidden="true"
                />
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-bold uppercase">{surface.name}</h3>
                  <code className="spec-sm text-ink-faint">{surface.hex}</code>
                </div>
                <p className="spec-sm mt-2 text-ink-faint">{surface.token}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">{surface.role}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-12 space-y-4 border-t border-line-light pt-8">
            {colourRules.map((entry) => (
              <li key={entry.rule} className="grid gap-1 sm:grid-cols-[18rem_1fr] sm:gap-6">
                <p className="spec text-ink">{entry.rule}</p>
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{entry.detail}</p>
              </li>
            ))}
          </ul>

          <p className="spec mt-16 text-navy">Type</p>
          <ul className="mt-10 grid gap-10 lg:grid-cols-3">
            {typefaces.map((face) => (
              <li key={face.role} className="border-t border-line-light pt-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="spec text-ink">{face.role}</h3>
                  <code className="spec-sm text-ink-faint">{face.family}</code>
                </div>
                <p className={cn("mt-8 text-ink", face.className)}>{face.sample}</p>
                <p className="mt-8 text-[0.875rem] leading-relaxed text-ink-soft">{face.detail}</p>
              </li>
            ))}
          </ul>

          <Rule className="mt-16">{house.lines.freedom}</Rule>
        </div>
      </section>
    </div>
  );
}
