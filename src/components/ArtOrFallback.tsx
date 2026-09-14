import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shows artwork if the file is there, and the drawn fallback if it is not.
 *
 * The site ships before the photography does, so a missing file has to be a
 * non-event rather than a broken image — the browser's own load failure is the
 * signal, which means no build step needs to know what exists.
 */
export function ArtOrFallback({
  src,
  alt,
  fallback,
  className,
  imgClassName,
  onResolved,
}: {
  src: string | undefined;
  alt: string;
  fallback: ReactNode;
  className?: string;
  imgClassName?: string;
  /** Fires with whether the real artwork was used. */
  onResolved?: (usedArt: boolean) => void;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn(className, imgClassName)}
      onError={() => {
        setFailed(true);
        onResolved?.(false);
      }}
      onLoad={() => onResolved?.(true)}
    />
  );
}
