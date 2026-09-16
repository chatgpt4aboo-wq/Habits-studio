import { policies } from "@/data/policies";

/** Shipping and returns, in the fewest words that answer the question. */
export default function Shipping() {
  const { shipping, returns } = policies;

  return (
    <div className="sheet min-h-[70vh] bg-bone">
      <div className="wrap py-16 lg:py-24">
        <h1 className="font-body text-[clamp(2.25rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
          Shipping &amp; returns
        </h1>

        <div className="mt-16 max-w-2xl space-y-14">
          <section>
            <h2 className="spec text-navy">Shipping</h2>
            <dl className="mt-6 divide-y divide-line-light border-y border-line-light">
              {[
                { term: "Sent from", detail: shipping.from },
                { term: shipping.domestic.where, detail: shipping.domestic.time },
                { term: shipping.international.where, detail: shipping.international.time },
                { term: "Cost", detail: shipping.cost },
              ].map((row) => (
                <div key={row.term} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                  <dt className="spec text-ink-faint">{row.term}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-ink">{row.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="spec text-navy">Returns</h2>
            <dl className="mt-6 divide-y divide-line-light border-y border-line-light">
              {[
                { term: "Window", detail: returns.window },
                { term: "Condition", detail: returns.condition },
                { term: "Postage", detail: returns.postage },
                { term: "Exchanges", detail: returns.exchanges },
              ].map((row) => (
                <div key={row.term} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                  <dt className="spec text-ink-faint">{row.term}</dt>
                  <dd className="max-w-prose text-[0.9375rem] leading-relaxed text-ink">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
