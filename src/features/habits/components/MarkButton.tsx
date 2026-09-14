import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The only interaction that matters. Big hit target, one spring on completion,
 * and a label that says which day is being marked.
 */
export function MarkButton({
  marked,
  onToggle,
  dayLabel,
  name,
  size = "md",
}: {
  marked: boolean;
  onToggle: () => void;
  dayLabel: string;
  name: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={marked}
      aria-label={`${marked ? "Unmark" : "Mark"} ${name} for ${dayLabel}`}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center rounded-full border transition-all",
        size === "md" ? "h-11 w-11" : "h-9 w-9",
        marked
          ? "border-kelp bg-kelp text-kelp-on"
          : "border-line-strong bg-surface text-ink-faint hover:border-kelp hover:text-kelp",
      )}
    >
      <Check
        className={cn(
          size === "md" ? "h-5 w-5" : "h-4 w-4",
          marked ? "animate-pop-mark" : "opacity-40 group-hover:opacity-100",
        )}
        strokeWidth={2.5}
      />
    </button>
  );
}
