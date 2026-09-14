import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The studio's one container: a hairline frame on a raised surface. */
export function Panel({
  className,
  as: Tag = "div",
  ...props
}: HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" | "li" }) {
  return (
    <Tag
      className={cn("rounded-[var(--radius)] border border-line bg-surface", className)}
      {...props}
    />
  );
}

export function PanelHeader({
  title,
  hint,
  action,
  className,
}: {
  title: ReactNode;
  hint?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-line px-5 py-4", className)}>
      <div className="min-w-0">
        <h2 className="font-display text-display-sm">{title}</h2>
        {hint ? <p className="mt-1 text-sm text-ink-faint">{hint}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
