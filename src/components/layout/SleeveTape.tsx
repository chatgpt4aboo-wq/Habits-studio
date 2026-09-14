import { SleeveLockup } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * The sleeve lockup, run as a band across the page — the deck's third
 * identity application, at page scale.
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
        "overflow-hidden border-y py-4",
        tone === "bone" ? "sheet border-line-light bg-bone" : "border-line-dark bg-void-raised",
        className,
      )}
    >
      <div className="flex w-max animate-tape items-center gap-6">
        {[0, 1].map((run) => (
          <SleeveLockup key={run} repeat={6} className="shrink-0" />
        ))}
      </div>
    </div>
  );
}
