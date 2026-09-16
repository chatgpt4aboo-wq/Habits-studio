import { useEffect, useRef, useState, type ReactNode } from "react";
import { FilmStill } from "@/components/FilmStill";
import { embedSrc, useYouTubePlayer } from "@/lib/youtube";
import { cn } from "@/lib/cn";

/**
 * A film used as a moving image rather than a video.
 *
 * It plays itself, silently, on a loop, and shows nothing of where it is
 * hosted. The player is drawn larger than the frame it shows through, so the
 * title and channel the host paints along the edges fall outside it, and the
 * frame stays covered by the film's own still until the player reports that it
 * is genuinely playing, so the host's paused state is never seen either. The
 * iframe ignores the pointer, so none of that can be summoned by hovering.
 *
 * It carries no controls of its own. It is a moving image in a page, not a
 * player, and the films that are meant to be watched are elsewhere.
 *
 * In `fill` it becomes the background of whatever contains it, cropped to the
 * shape of that container the way a cover image would be, never letterboxed.
 *
 * Under prefers-reduced-motion it stays a still. Nobody who has asked their
 * machine to stop moving things should be handed an autoplaying video.
 */
export function AmbientFilm({
  youtube,
  label,
  start,
  fill = false,
  lazy = false,
  overlay,
  className,
}: {
  youtube: string;
  /** For anyone who cannot see it. */
  label: string;
  /** Seconds to skip, each time around. */
  start?: number;
  /** Cover the container instead of holding a 16:9 frame of its own. */
  fill?: boolean;
  /** Wait until it is nearly on screen before loading anything. */
  lazy?: boolean;
  /** Drawn over the film: a scrim, a gradient. */
  overlay?: ReactNode;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);
  const [near, setNear] = useState(!lazy);
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const running = near && !reduced;
  const { playing, silent } = useYouTubePlayer(frame, running);
  // Lift the cover for a player that never answered: it is most likely playing.
  const shown = playing || silent;

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    setReduced(query.matches);
    const listen = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener?.("change", listen);
    return () => query.removeEventListener?.("change", listen);
  }, []);

  // Load it just before it arrives, so it is already running when it lands.
  useEffect(() => {
    const node = box.current;
    if (!lazy || !node || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const watch = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          watch.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    watch.observe(node);
    return () => watch.disconnect();
  }, [lazy]);

  return (
    <div
      ref={box}
      className={cn(
        "relative overflow-hidden bg-void-raised",
        fill ? "h-full w-full" : "aspect-video w-full",
        className,
      )}
    >
      {running ? (
        <iframe
          ref={frame}
          src={embedSrc(youtube, start ? { start: String(start) } : {})}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0",
            // Cover, exactly: both sides stay on 16:9 whichever way the
            // container is shaped, so the film crops instead of letterboxing.
            fill ? "h-[max(118vh,66.4vw)] w-[max(118vw,209.8vh)]" : "h-[118%] w-[118%]",
          )}
        />
      ) : null}

      {/* Held over the player until it is truly playing, so nothing the host
          paints on a stopped video is ever on screen. */}
      <div
        aria-hidden={shown}
        className={cn(
          "pointer-events-none absolute inset-0 bg-void-raised transition-opacity duration-700",
          shown ? "opacity-0" : "opacity-100",
        )}
      >
        <FilmStill youtube={youtube} alt={reduced ? label : ""} />
      </div>

      {overlay}
    </div>
  );
}
