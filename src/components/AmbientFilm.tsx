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
  /** Let the browser hold the fetch until the frame is near the screen. */
  lazy?: boolean;
  /** Drawn over the film: a scrim, a gradient. */
  overlay?: ReactNode;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const onScreen = useRef(true);
  const running = !reduced;
  const { playing, silent, command } = useYouTubePlayer(frame, running);
  // Lift the cover for a player that never answered: it is most likely playing.
  const shown = playing || silent;

  /*
   * A film nobody is looking at should not be decoding. Four players running
   * at once is four video streams competing for the same connection and the
   * same processor, which is what makes every one of them stutter. So each
   * one plays while it is on screen and stops the moment it is not.
   *
   * It is sent as a message to the player rather than by unmounting it: an
   * unmounted film has to start over, and a film that has to start over is
   * exactly the delay this is meant to remove. If the player never answers,
   * nothing is paused and the page behaves as it did before.
   */
  useEffect(() => {
    const node = box.current;
    if (!running || !node || typeof IntersectionObserver === "undefined") return;
    const watch = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
        command(entry.isIntersecting ? "playVideo" : "pauseVideo");
      },
      { threshold: 0.01 },
    );
    watch.observe(node);
    return () => watch.disconnect();
  }, [running, command]);

  // A player that finished loading while off screen starts anyway. Stop it.
  useEffect(() => {
    if (playing && !onScreen.current) command("pauseVideo");
  }, [playing, command]);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    setReduced(query.matches);
    const listen = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener?.("change", listen);
    return () => query.removeEventListener?.("change", listen);
  }, []);

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
          loading={lazy ? "lazy" : "eager"}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0",
            // Much taller than the hole, a little wider: the host's title and
            // its bottom bar land in the letterbox and never show. See OVERSCAN.
            // In fill, the width still covers the container exactly, so the
            // picture crops to its shape rather than letterboxing into it.
            fill ? "h-[max(156vh,87.75vw)] w-[max(104vw,184.89vh)]" : "h-[150%] w-[104%]",
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
