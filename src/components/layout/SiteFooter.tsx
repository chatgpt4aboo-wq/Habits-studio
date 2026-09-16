import { Link } from "react-router-dom";
import { Monogram } from "@/brand/Marks";
import { house, pieces } from "@/data/collection";
import { Rule } from "@/components/ui/Rule";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line-dark">
      <div className="wrap py-16">
        <Rule tone="dark">{house.lines.higherStandard}</Rule>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Monogram light className="h-11 w-11" />
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-bone-soft">
              {house.lines.footnote}
            </p>
            <p className="spec-sm mt-6 text-bone-soft">{house.cities.join(" / ")}</p>
          </div>

          <nav aria-label="The capsule">
            <h2 className="spec text-signal">Daily</h2>
            <ul className="mt-5 space-y-3">
              {pieces.map((piece) => (
                <li key={piece.slug}>
                  <Link
                    to={`/collection/${piece.slug}`}
                    className="spec text-bone-soft transition-colors hover:text-bone"
                  >
                    {piece.no} {piece.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="The rest of the site">
            <h2 className="spec text-signal">Index</h2>
            <ul className="mt-5 space-y-3">
              {[
                { to: "/collection", label: "Collection" },
                { to: "/bag", label: "Bag" },
                { to: "/studio", label: "Studio" },
                { to: "/shipping", label: "Shipping & returns" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="spec text-bone-soft transition-colors hover:text-bone">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="spec-sm text-bone-soft">
            © {new Date().getFullYear()} {house.name}
          </p>
          <p className="spec-sm text-bone-soft">{house.kind}</p>
        </div>
      </div>
    </footer>
  );
}
