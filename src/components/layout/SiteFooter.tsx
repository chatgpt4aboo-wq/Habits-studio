import { Link } from "react-router-dom";
import { Monogram, Wordmark } from "@/brand/Marks";
import { house, pieces } from "@/data/collection";
import { Rule } from "@/components/ui/Rule";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line-dark">
      <div className="wrap py-16">
        <Rule tone="dark">{house.lines.higherStandard}</Rule>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Wordmark size="sm" light className="text-bone" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone-soft">
              {house.collection}. {house.scope}. {house.attributes.join(" · ")}.
            </p>
            <p className="spec-sm mt-6 text-bone-soft">{house.cities.join(" / ")}</p>
          </div>

          <nav aria-label="The capsule">
            <h2 className="spec text-amber">Daily</h2>
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

          <nav aria-label="Studio">
            <h2 className="spec text-amber">Studio</h2>
            <ul className="mt-5 space-y-3">
              {[
                { to: "/collection", label: "Shop" },
                { to: "/bag", label: "Bag" },
                { to: "/lookbook", label: "Lookbook" },
                { to: "/identity", label: "Identity system" },
                { to: "/studio", label: "About the studio" },
              ].map((link) => (
                <li key={link.to}>
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
          <Monogram className="h-4 w-4 text-bone-soft" />
          <p className="spec-sm text-bone-soft">{house.kind}</p>
        </div>
      </div>
    </footer>
  );
}
