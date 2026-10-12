import { NavLink } from "react-router-dom";
import { legal, type LegalDocument } from "@/data/legal";
import { cn } from "@/lib/cn";

/** One legal document, set like the other sheets, with its siblings alongside. */
export default function Legal({ doc }: { doc: LegalDocument }) {
  return (
    <div className="sheet min-h-[70vh] bg-bone">
      <div className="wrap py-16 lg:py-24">
        <h1 className="font-body text-[clamp(2.25rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
          {doc.title}
        </h1>
        <p className="spec mt-6 text-ink-faint">Effective {doc.effective}</p>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_12rem] lg:gap-20">
          <article className="max-w-2xl">
            <p className="text-[1.0625rem] leading-relaxed text-ink">{doc.intro}</p>

            <div className="mt-12 divide-y divide-line-light border-y border-line-light">
              {doc.sections.map((section) => (
                <section key={section.heading} className="py-8">
                  <h2 className="spec text-navy">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="spec text-ink-faint">Legal</h2>
            <ul className="mt-5 space-y-3">
              {legal.map((other) => (
                <li key={other.slug}>
                  <NavLink
                    to={`/${other.slug}`}
                    className={({ isActive }) =>
                      cn("spec transition-colors", isActive ? "text-navy" : "text-ink-soft hover:text-ink")
                    }
                  >
                    {other.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
