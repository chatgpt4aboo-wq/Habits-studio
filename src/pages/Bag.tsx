import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { PRICE_USD, formatPrice, house } from "@/data/collection";
import { useBag } from "@/features/bag/store";
import { ProductShot } from "@/components/garment/ProductShot";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";

export default function Bag() {
  const bag = useBag();

  return (
    <div className="sheet min-h-screen bg-bone">
      <div className="wrap py-14">
        <header className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="spec text-navy">Bag</p>
            <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase">
              {bag.count === 0 ? "Empty" : `${bag.count} piece${bag.count === 1 ? "" : "s"}`}
            </h1>
          </div>
          {bag.count > 0 ? (
            <button
              type="button"
              onClick={bag.clear}
              className="spec text-ink-faint transition-colors hover:text-ink"
            >
              Empty the bag
            </button>
          ) : null}
        </header>

        {bag.items.length === 0 ? (
          <div className="mt-14 border-t border-line-light pt-14 text-center">
            <p className="max-w-prose mx-auto text-[0.9375rem] leading-relaxed text-ink-soft">
              Nothing in the bag yet. The capsule is five long sleeves, {formatPrice(PRICE_USD)}{" "}
              each, cut in one size, and made in a series of {house.edition.size}.
            </p>
            <ButtonLink to="/collection" variant="ink" className="mt-8">
              View the collection
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-12 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
            <ul className="divide-y divide-line-light border-y border-line-light">
              {bag.items.map((item) => (
                <li key={`${item.slug}-${item.size}`} className="flex gap-5 py-6">
                  <Link
                    to={`/collection/${item.slug}`}
                    className="aspect-[4/5] w-24 shrink-0 overflow-hidden bg-plate"
                  >
                    <ProductShot piece={item.piece} className="h-full w-full object-contain" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <Link
                        to={`/collection/${item.slug}`}
                        className="spec text-ink transition-colors hover:text-navy"
                      >
                        {item.piece.no} · {item.piece.name}
                      </Link>
                      <p className="spec text-ink">{formatPrice(item.lineTotal)}</p>
                    </div>
                    <p className="spec-sm mt-2 text-ink-faint">
                      {item.piece.colour.name} · size {item.size}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-line-light">
                        <QuantityButton
                          label={`Reduce ${item.piece.name}`}
                          onClick={() => bag.setQuantity(item.slug, item.size, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </QuantityButton>
                        <span className="w-10 text-center spec text-ink" aria-live="polite">
                          {item.quantity}
                        </span>
                        <QuantityButton
                          label={`Add another ${item.piece.name}`}
                          onClick={() => bag.setQuantity(item.slug, item.size, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </QuantityButton>
                      </div>

                      <button
                        type="button"
                        onClick={() => bag.remove(item.slug, item.size)}
                        aria-label={`Remove ${item.piece.name}`}
                        className="inline-flex items-center gap-1.5 spec-sm text-ink-faint transition-colors hover:text-ink"
                      >
                        <X className="h-3 w-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside>
              <h2 className="spec text-navy">Summary</h2>
              <dl className="mt-6 space-y-3 border-t border-line-light pt-6">
                <div className="flex justify-between">
                  <dt className="spec text-ink-faint">Subtotal</dt>
                  <dd className="spec text-ink">{formatPrice(bag.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="spec text-ink-faint">Shipping</dt>
                  <dd className="spec text-ink-faint">Calculated at checkout</dd>
                </div>
              </dl>

              <div className="mt-6 flex justify-between border-t border-line-light pt-6">
                <p className="spec text-ink">Total</p>
                <p className="text-2xl font-semibold tabular-nums">{formatPrice(bag.subtotal)}</p>
              </div>

              <Button variant="ink" size="lg" className="mt-8 w-full" disabled>
                Checkout
              </Button>
              <p className="spec-sm mt-4 leading-relaxed text-ink-faint">
                Checkout is not connected to a payment provider yet. The bag, quantities and totals
                are live. Wiring Stripe or Shopify is the remaining step.
              </p>
            </aside>
          </div>
        )}

        <Rule className="mt-20">{house.lines.higherStandard}</Rule>
      </div>
    </div>
  );
}

function QuantityButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center text-ink-faint transition-colors hover:bg-bone-sunken hover:text-ink"
    >
      {children}
    </button>
  );
}
