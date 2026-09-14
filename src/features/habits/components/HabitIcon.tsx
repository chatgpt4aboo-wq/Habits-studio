import type { HabitColor, HabitIcon as IconName } from "../types";
import { accentClass, iconFor } from "./icons";
import { cn } from "@/lib/cn";

export function HabitGlyph({
  icon,
  color,
  className,
}: {
  icon: IconName;
  color: HabitColor;
  className?: string;
}) {
  const Icon = iconFor(icon);
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
        accentClass[color],
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
    </span>
  );
}
