import { Link } from "react-router-dom";
import { Lockup } from "@/brand/Logo";
import { brand } from "@/brand/tokens";

const columns = [
  {
    title: "Studio",
    links: [
      { to: "/studio", label: "Today" },
      { to: "/insights", label: "Insights" },
    ],
  },
  {
    title: "The brand",
    links: [
      { to: "/brand", label: "Identity" },
      { to: "/brand#voice", label: "Voice" },
      { to: "/brand#palette", label: "Palette" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface-sunken">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Lockup />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">{brand.tagline}</p>
          <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            Everything you mark stays in this browser.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="eyebrow">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="text-sm text-ink-soft transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          © {brand.founded} {brand.name}
        </p>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Small · Visible · Kind
        </p>
      </div>
    </footer>
  );
}
