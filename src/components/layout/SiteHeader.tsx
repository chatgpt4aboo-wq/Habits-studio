import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Lockup } from "@/brand/Marks";
import { house } from "@/data/collection";
import { useBag } from "@/features/bag/store";
import { cn } from "@/lib/cn";

const links = [
  { to: "/collection", label: "Shop" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/identity", label: "Identity" },
  { to: "/studio", label: "Studio" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const bag = useBag();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line-dark bg-void/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label={`${house.name} — home`} className="text-bone">
          <Lockup />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn("spec transition-colors", isActive ? "text-amber" : "text-bone-soft hover:text-bone")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <p className="spec-sm hidden text-bone-soft lg:block">
            {house.cities.join(" / ")}
          </p>

          <Link
            to="/bag"
            className="inline-flex items-center gap-2 spec text-bone-soft transition-colors hover:text-bone"
            aria-label={`Bag, ${bag.count} item${bag.count === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="tabular-nums">{bag.count}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center border border-line-dark text-bone md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line-dark md:hidden">
          <div className="wrap flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "border-b border-line-dark py-4 spec last:border-0",
                    isActive ? "text-amber" : "text-bone-soft",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
