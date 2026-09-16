import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The film's own still, falling back from the large frame to the small one and
 * then to nothing: the large one exists only for films uploaded big enough,
 * and an empty frame reads better than a browser's broken-image glyph.
 */
export function FilmStill({
  youtube,
  poster,
  alt = "",
  className,
}: {
  youtube?: string;
  poster?: string;
  alt?: string;
  className?: string;
}) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const src =
    poster ??
    (youtube && step < 2
      ? `https://i.ytimg.com/vi/${youtube}/${["maxresdefault", "hqdefault"][step]}.jpg`
      : undefined);

  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setStep((current) => (current === 0 ? 1 : 2))}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
