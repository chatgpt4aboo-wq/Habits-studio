import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { capsuleOf, formatPrice, house, pieces } from "@/data/collection";
import { ProductShot } from "@/components/garment/ProductShot";

/** What the capsule is, and what it costs — the one commercial statement. */
export function CapsuleIndex() {
  const capsule = capsuleOf("daily");

  return (
    <section className="border-y border-line-dark bg-void-raised">
      <div className="wrap py-24">
        <p className="spec text-amber">{capsule.index}</p>
        <h2 className="mt-5 max-w-2xl font-display text-mark-md font-extrabold uppercase">
          {capsule.title} — {pieces.length} long sleeves
        </h2>
        <p className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-bone-soft">
          {capsule.blurb}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-8 border-y border-line-dark py-8 sm:grid-cols-4">
          {[
            { label: "Price", value: formatPrice(pieces[0].price) },
            { label: "Size", value: house.sizes.join(" / ") },
            { label: "Pieces", value: String(pieces.length) },
            { label: "Fabric", value: "400 gsm" },
          ].map((fact) => (
            <div key={fact.label}>
              <dt className="spec text-bone-soft">{fact.label}</dt>
              <dd className="mt-3 font-display text-3xl font-extrabold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {pieces.map((piece) => (
            <li key={piece.slug}>
              <Link to={`/collection/${piece.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-void">
                  <ProductShot piece={piece} className="h-full w-full object-cover" />
                </div>
                <p className="spec mt-3 text-bone transition-colors group-hover:text-amber">
                  {piece.no} · {piece.name}
                </p>
                <p className="spec-sm mt-1 text-bone-soft">{formatPrice(piece.price)}</p>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/collection"
          className="mt-12 inline-flex items-center gap-2 spec text-amber transition-colors hover:text-bone"
        >
          Shop all {pieces.length}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
