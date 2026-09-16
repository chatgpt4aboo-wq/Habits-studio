import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
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
 * With `controls`, two of ours appear: play or pause, and sound or mute. They
 * are the only controls anywhere on it.
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
  controls = false,
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
  /** Show our own play and sound controls. */
  controls?: boolean;
  /** Drawn over the film and under the controls: a scrim, a gradient. */
  overlay?: ReactNode;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);
  const [muted, setMuted] = useState(true);
  const frame = useRef<HTMLIFrameElement>(null);
  const { playing, setPlaying, command } = useYouTubePlayer(frame, !reduced);

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
      className={cn(
        "relative overflow-hidden bg-void-raised",
        fill ? "h-full w-full" : "aspect-video w-full",
        className,
      )}
    >
      {!reduced ? (
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
        aria-hidden={playing}
        className={cn(
          "pointer-events-none absolute inset-0 bg-void-raised transition-opacity duration-700",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <FilmStill youtube={youtube} alt={reduced ? label : ""} />
      </div>

      {overlay}

      {controls ? (
        <div
          className={cn(
            "absolute flex items-center gap-2",
            // In a page's ground they sit clear of the writing, which is low
            // and to the left, and clear of the site header above them.
            fill ? "right-5 top-24" : "bottom-4 left-4",
          )}
        >
          <button
            type="button"
            aria-label={playing ? `Pause ${label}` : `Play ${label}`}
            onClick={() => {
              command(playing ? "pauseVideo" : "playVideo");
              setPlaying(!playing);
            }}
            className="flex h-9 w-9 items-center justify-center border border-bone/30 bg-void/50 text-bone-soft backdrop-blur-sm transition-colors hover:border-bone/60 hover:text-bone"
          >
            {playing ? (
              <Pause className="h-3.5 w-3.5" fill="currentColor" />
            ) : (
              <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />
            )}
          </button>
          <button
            type="button"
            aria-label={muted ? `Sound on for ${label}` : `Sound off for ${label}`}
            onClick={() => {
              command(muted ? "unMute" : "mute");
              setMuted(!muted);
            }}
            className="flex h-9 w-9 items-center justify-center border border-bone/30 bg-void/50 text-bone-soft backdrop-blur-sm transition-colors hover:border-bone/60 hover:text-bone"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      ) : null}
    </div>
  );
}
