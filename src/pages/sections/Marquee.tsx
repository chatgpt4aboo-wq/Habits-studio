import { Mark } from "@/brand/Logo";

const words = [
  "Small enough to keep",
  "Visible at a glance",
  "Kind about misses",
  "No streak guilt",
  "No account",
  "No notifications",
];

/** A single band of brand voice, drifting slowly. Static under reduced motion. */
export function Marquee() {
  const run = [...words, ...words];
  return (
    <div className="overflow-hidden border-b border-line bg-ink py-3.5 text-paper">
      <div className="flex w-max animate-drift items-center gap-10 pr-10">
        {run.map((word, index) => (
          <span key={index} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.22em] opacity-90">
              {word}
            </span>
            <Mark className="h-3 w-3 shrink-0 opacity-70" accent="volt" />
          </span>
        ))}
      </div>
    </div>
  );
}
