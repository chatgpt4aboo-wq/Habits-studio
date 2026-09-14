import { useMemo, useState } from "react";
import { capsules, house, pieces } from "@/data/collection";
import type { CapsuleId } from "@/data/types";
import { GarmentPlate } from "@/components/garment/GarmentPlate";
import { Rule } from "@/components/ui/Rule";
import { cn } from "@/lib/cn";

type Filter = CapsuleId | "all";
type View = "front" | "back";

export default function Collection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("front");

  const shown = useMemo(
    () => (filter === "all" ? pieces : pieces.filter((piece) => piece.capsule === filter)),
    [filter],
  );

  return (
    <div className="sheet min-h-screen bg-bone">
      <div className="wrap py-14">
        <header>
          <p className="spec text-navy">The collection</p>
          <h1 className="mt-5 font-display text-mark-lg font-extrabold uppercase">
            Twenty long sleeves
          </h1>
          <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
            {house.scope}, cut from one block. {house.fit}.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-line-light py-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter by capsule">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              All · {pieces.length}
            </FilterButton>
            {capsules.map((capsule) => (
              <FilterButton
                key={capsule.id}
                active={filter === capsule.id}
                onClick={() => setFilter(capsule.id)}
              >
                {capsule.range} {capsule.title}
              </FilterButton>
            ))}
          </div>

          <div className="flex gap-x-5" role="group" aria-label="Garment view">
            {(["front", "back"] as View[]).map((option) => (
              <FilterButton key={option} active={view === option} onClick={() => setView(option)}>
                {option}
              </FilterButton>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {shown.map((piece) => (
            <li key={piece.slug}>
              <GarmentPlate piece={piece} view={view} href={`/collection/${piece.slug}`} />
            </li>
          ))}
        </ul>

        <Rule className="mt-16">{house.lines.higherStandard}</Rule>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "spec transition-colors",
        active ? "text-navy underline decoration-navy underline-offset-[6px]" : "text-ink-faint hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
