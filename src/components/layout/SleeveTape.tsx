import { brandArt } from "@/brand/assets";
import { cn } from "@/lib/cn";

/**
 * The sleeve lockup run as a band across the page — the identity's third
 * application, at page scale.
 *
 * The artwork is tiled as a repeating background rather than placed as a row
 * of images: a fixed number of copies runs out on a wide screen, and a
 * repeating background fills whatever width it is given.
 */
export function SleeveTapeBand({
  tone = "bone",
  className,
}: {
  tone?: "bone" | "void";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border-y py-5",
        tone === "bone" ? "sheet border-line-light bg-bone" : "border-line-dark bg-void-raised",
        className,
      )}
    >
      <div
        className="sleeve-tape w-full"
        role="img"
        aria-label="Habits Studio"
        style={{
          backgroundImage: `url(${tone === "void" ? brandArt.sleeveTapeLight : brandArt.sleeveTape})`,
        }}
      />
    </div>
  );
}
