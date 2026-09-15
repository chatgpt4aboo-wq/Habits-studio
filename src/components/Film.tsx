import { useState } from "react";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * A film, full bleed.
 *
 * It behaves like a moving image rather than a video player: no chrome, no
 * sound, nothing to press. Three states, in order of preference — the clip,
 * its poster frame, and a ruled field holding the space. The last one matters:
 * a missing file has to look like a decision, not a broken page.
 */
export function Film({
  src,
  poster,
  caption,
  className,
}: {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <figure className={cn("relative", className)}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-void-raised md:aspect-[21/9]">
        {!videoFailed ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={caption}
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : poster && !posterFailed ? (
          <img
            src={poster}
            alt={caption ?? ""}
            onError={() => setPosterFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 border border-line-dark">
            <Monogram light className="h-8 w-8 opacity-40" />
            <p className="spec text-bone-soft/60">Film</p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="spec-sm mt-5 text-bone-soft">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
