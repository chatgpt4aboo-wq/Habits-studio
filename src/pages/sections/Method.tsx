const steps = [
  {
    step: "Design",
    body: "Name the practice, write the “so that”, pick a cadence: every day, chosen days, or n times a week.",
  },
  {
    step: "Mark",
    body: "One tap when it's done. Yesterday is still markable — life happens after midnight.",
  },
  {
    step: "Notice",
    body: "Twelve weeks on one screen. Runs, rates, and the weekday where things actually slip.",
  },
  {
    step: "Adjust",
    body: "Shrink the cadence instead of abandoning the practice. The shelf keeps what you pause.",
  },
];

export function Method() {
  return (
    <section className="border-b border-line bg-surface-sunken">
      <div className="wrap py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">The method</p>
            <h2 className="mt-4 font-display text-display-lg">Four moves, repeated.</h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
            No onboarding wizard, no streak notifications, no plan you have to live up to. The loop
            is short on purpose.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <li key={item.step} className="border-t-2 border-ink pt-5">
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-display-sm">{item.step}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
