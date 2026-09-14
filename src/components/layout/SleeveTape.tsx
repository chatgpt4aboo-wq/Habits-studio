import { SleeveLockup } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * The sleeve lockup run as a band across the page — the identity's third
 * application, at page scale. The artwork already repeats internally, so the
 * band just tiles it and drifts.
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
      <div className="flex w-max animate-tape items-center">
        {[0, 1].map((run) => (
          <SleeveLockup key={run} light={tone === "void"} className="h-7 shrink-0" />
        ))}
      </div>
    </div>
  );
}
