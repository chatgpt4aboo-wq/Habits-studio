import { house } from "@/data/collection";
import { policies } from "@/data/policies";

/** Plain page, plainly set. Somewhere to write to, and what to write about. */
export default function Contact() {
  return (
    <div className="sheet min-h-[70vh] bg-bone">
      <div className="wrap py-16 lg:py-24">
        <h1 className="font-body text-[clamp(2.25rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
          Contact
        </h1>

        <dl className="mt-16 max-w-2xl divide-y divide-line-light border-y border-line-light">
          <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <dt className="spec text-ink-faint">Email</dt>
            <dd>
              <a
                href={`mailto:${policies.contact.email}`}
                className="text-[1.0625rem] text-ink underline underline-offset-4 transition-colors hover:text-navy"
              >
                {policies.contact.email}
              </a>
            </dd>
          </div>

          <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <dt className="spec text-ink-faint">Instagram</dt>
            <dd className="text-[1.0625rem] text-ink">{policies.contact.instagram}</dd>
          </div>

          <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <dt className="spec text-ink-faint">Studio</dt>
            <dd className="text-[1.0625rem] text-ink">{house.cities.join(" / ")}</dd>
          </div>

          {policies.contact.lines.map((line) => (
            <div key={line.label} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="spec text-ink-faint">{line.label}</dt>
              <dd className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
                {line.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
