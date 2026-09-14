import { Lockup, Mark, MarkTile, Wordmark } from "@/brand/Logo";
import { brand, lexicon, motion, palette, principles, rampSwatches, typography, voice } from "@/brand/tokens";
import { Badge } from "@/components/ui/Badge";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";

/**
 * The brand book, rendered from src/brand/tokens.ts — so the guidelines and the
 * product cannot drift apart.
 */
export default function Brand() {
  return (
    <div className="wrap py-14">
      <header className="max-w-3xl">
        <Badge tone="kelp">Brand book · v1</Badge>
        <h1 className="mt-6 font-display text-display-xl">{brand.name}</h1>
        <p className="mt-5 font-display text-display-sm text-kelp">{brand.tagline}</p>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">{brand.promise}</p>
      </header>

      <Section id="logo" eyebrow="01 · Identity" title="The Stair">
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel className="flex flex-col items-center justify-center gap-6 px-6 py-14">
            <Mark className="h-16 w-16" />
            <p className="eyebrow">Mark</p>
          </Panel>
          <Panel className="flex flex-col items-center justify-center gap-6 px-6 py-14">
            <Wordmark className="text-2xl" />
            <p className="eyebrow">Wordmark</p>
          </Panel>
          <Panel className="flex flex-col items-center justify-center gap-6 px-6 py-14">
            <Lockup className="scale-[1.35]" />
            <p className="eyebrow">Lockup</p>
          </Panel>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Panel className="px-6 py-7">
            <h3 className="text-[0.9375rem] font-medium text-ink">Construction</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Three bars on a 32-unit square, rising 7 → 13 → 19 units from a shared baseline, each
              5 units wide with a 2.5-unit gap. It is a bar chart of a practice compounding, and it
              is the same geometry as a row of the grid.
            </p>
            <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-soft">
              <li>· The tallest bar always carries the accent — Kelp on paper, Volt on ink.</li>
              <li>· Clear space equals the width of one bar on every side.</li>
              <li>· Minimum mark size 16px; below that, use the tile.</li>
              <li>· Never re-order the bars, never add a fourth, never outline them.</li>
            </ul>
          </Panel>

          <Panel className="flex flex-wrap items-center justify-center gap-8 px-6 py-7">
            <div className="text-center">
              <MarkTile className="mx-auto h-16 w-16" />
              <p className="eyebrow mt-4">App tile</p>
            </div>
            <div className="rounded-[var(--radius)] bg-ink p-8 text-center">
              <Lockup className="text-paper" />
              <p className="eyebrow mt-4 text-paper/60">On ink</p>
            </div>
            <div className="text-center">
              <Mark className="mx-auto h-4 w-4" />
              <p className="eyebrow mt-4">16px floor</p>
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="palette" eyebrow="02 · Colour" title="Paper, ink, and one green">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {palette.map((swatch) => (
            <Panel key={swatch.token} className="overflow-hidden">
              <div className="flex h-24">
                <div className="flex-1" style={{ background: swatch.light }} />
                <div className="flex-1" style={{ background: swatch.dark }} />
              </div>
              <div className="border-t border-line px-5 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-display-sm">{swatch.name}</h3>
                  <code className="font-mono text-[0.625rem] text-ink-faint">{swatch.token}</code>
                </div>
                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                  {swatch.light} / {swatch.dark}
                </p>
                <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-soft">{swatch.role}</p>
              </div>
            </Panel>
          ))}
        </div>

        <Panel className="mt-4">
          <PanelHeader
            title="The grid ramp"
            hint="One hue, five steps, light to dark. Charts never use a second hue to mean “more”."
          />
          <div className="px-5 py-6">
            <div className="flex overflow-hidden rounded-md">
              {rampSwatches.map((step) => (
                <div key={step.step} className="flex-1">
                  <div className="h-14" style={{ background: step.light }} />
                  <div className="h-14" style={{ background: step.dark }} />
                </div>
              ))}
            </div>
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-5">
              {rampSwatches.map((step) => (
                <li key={step.step} className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-faint">
                  {step.step} · {step.label}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
              Every text and mark colour clears 4.5:1 against its own surface in both themes. Volt
              never carries text — it is a highlighter, capped at one emphasis per view.
            </p>
          </div>
        </Panel>
      </Section>

      <Section id="type" eyebrow="03 · Type" title="A serif that thinks, a sans that works">
        <div className="grid gap-4 lg:grid-cols-3">
          {typography.map((entry) => (
            <Panel key={entry.role} className="px-6 py-7">
              <div className="flex items-baseline justify-between gap-3">
                <p className="eyebrow">{entry.role}</p>
                <code className="font-mono text-[0.625rem] text-ink-faint">{entry.family}</code>
              </div>
              <p className={cn("mt-6 text-ink", entry.className)}>{entry.sample}</p>
              <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-soft">{entry.detail}</p>
            </Panel>
          ))}
        </div>

        <Panel className="mt-4 px-6 py-8">
          <p className="eyebrow">Display scale</p>
          <div className="mt-6 space-y-5">
            <p className="font-display text-display-xl">Design the days</p>
            <p className="font-display text-display-lg">Design the days</p>
            <p className="font-display text-display-md">Design the days</p>
            <p className="font-display text-display-sm">Design the days</p>
          </div>
        </Panel>
      </Section>

      <Section id="voice" eyebrow="04 · Voice" title="Plain, warm, exacting, quiet">
        <div className="grid gap-4 md:grid-cols-2">
          <Panel className="px-6 py-7">
            <p className="eyebrow">We are</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {voice.is.map((word) => (
                <li key={word}>
                  <Badge tone="kelp">{word}</Badge>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8">We are not</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {voice.isNot.map((word) => (
                <li key={word}>
                  <Badge tone="clay">{word}</Badge>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="divide-y divide-line">
            {voice.rules.map((rule) => (
              <div key={rule.do} className="px-6 py-5">
                <p className="text-[0.9375rem] text-ink">
                  <span className="mr-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-kelp">
                    Say
                  </span>
                  {rule.do}
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-faint line-through decoration-clay/60">
                  <span className="mr-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-clay no-underline">
                    Not
                  </span>
                  {rule.dont}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">{rule.why}</p>
              </div>
            ))}
          </Panel>
        </div>

        <Panel className="mt-4">
          <PanelHeader title="Lexicon" hint="The words the interface is allowed to use." />
          <dl className="divide-y divide-line">
            {lexicon.map((entry) => (
              <div key={entry.term} className="grid gap-1 px-6 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="font-display text-[1.0625rem] text-ink">{entry.term}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-ink-soft">{entry.means}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </Section>

      <Section id="motion" eyebrow="05 · Motion & principles" title="One spring, used sparingly">
        <div className="grid gap-4 md:grid-cols-2">
          <Panel className="divide-y divide-line">
            {motion.map((entry) => (
              <div key={entry.name} className="px-6 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[0.9375rem] font-medium text-ink">{entry.name}</h3>
                  <code className="font-mono text-[0.6875rem] text-ink-faint">{entry.value}</code>
                </div>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">{entry.note}</p>
              </div>
            ))}
          </Panel>

          <Panel className="divide-y divide-line">
            {principles.map((principle) => (
              <div key={principle.index} className="px-6 py-5">
                <p className="font-mono text-[0.625rem] tracking-[0.18em] text-kelp">{principle.index}</p>
                <h3 className="mt-2 font-display text-display-sm">{principle.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{principle.body}</p>
              </div>
            ))}
          </Panel>
        </div>
      </Section>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-24 border-t border-line pt-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-display-md">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
