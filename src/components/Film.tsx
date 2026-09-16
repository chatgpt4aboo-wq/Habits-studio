import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { FilmEntry } from "@/data/films";
import { FilmStill } from "@/components/FilmStill";
import { embedSrc, useYouTubePlayer } from "@/lib/youtube";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * A film, playing in the page, wearing none of the host's clothes.
 *
 * It starts itself when it reaches the screen and loops, so it is simply
 * running by the time anyone gets to it. Nothing loads before that.
 *
 * Nothing of the host is ever on screen. Its controls are off, the player is
 * drawn larger than the frame it shows through so the title and channel it
 * paints along the edges fall outside, the iframe ignores the pointer so none
 * of it can be summoned by hovering, and the frame stays covered by the film's
 * own still until the player reports it is genuinely playing, which is what
 * keeps the host's own play button and title card out of sight when a browser
 * refuses to autoplay. Looping is what keeps the end screen from ever drawing.
 *
 * The only controls are ours: play or pause, and sound or mute. It begins
 * muted because every browser demands that of anything that starts on its own.
 *
 * Under prefers-reduced-motion nothing moves until it is asked to. A file in
 * /public plays with the browser's own controls: no third party is involved,
 * so there is nothing to hide.
 */
export function Film({ film, className }: { film: FilmEntry; className?: string }) {
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [muted, setMuted] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  const hosted = film.youtube
    ? ({ kind: "youtube", id: film.youtube } as const)
    : film.vimeo
      ? ({ kind: "vimeo", id: film.vimeo } as const)
      : null;

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
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const watch = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          watch.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    watch.observe(node);
    return () => watch.disconnect();
  }, []);

  const started = Boolean(hosted) && (pressed || (inView && !reduced));
  const { playing, setPlaying, command } = useYouTubePlayer(frame, started);

  const src =
    hosted?.kind === "youtube"
      ? embedSrc(hosted.id)
      : hosted?.kind === "vimeo"
        ? `https://player.vimeo.com/video/${hosted.id}?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0`
        : undefined;

  return (
    <div
      ref={box}
      className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}
    >
      {film.src ? (
        <video
          src={film.src}
          poster={film.poster}
          autoPlay={!reduced}
          muted
          loop
          controls
          playsInline
          preload="metadata"
          aria-label={film.title}
          className="h-full w-full object-cover"
        />
      ) : !hosted ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 border border-line-dark">
          <Monogram light className="h-7 w-7 opacity-35" />
          <p className="spec text-bone-soft/60">Film in progress</p>
        </div>
      ) : (
        <>
          {started ? (
            <iframe
              ref={frame}
              src={src}
              title={film.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 border-0"
            />
          ) : null}

          {/* Held over the player until it is truly playing, so nothing the
              host paints on a stopped video is ever on screen. */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-void-raised transition-opacity duration-700",
              playing ? "opacity-0" : "opacity-100",
            )}
          >
            <FilmStill youtube={film.youtube} poster={film.poster} />
            <span className="absolute inset-0 bg-void/25" />
          </div>

          {/* Ours, not the host's. The whole frame is the play toggle. */}
          <button
            type="button"
            aria-label={playing ? `Pause ${film.title}` : `Play ${film.title}`}
            onClick={() => {
              if (!started) {
                setPressed(true);
                return;
              }
              command(playing ? "pauseVideo" : "playVideo");
              setPlaying(!playing);
            }}
            className="group absolute inset-0 h-full w-full"
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                playing
                  ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  : "opacity-100",
              )}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/50 bg-void/40 text-bone backdrop-blur-sm">
                {playing ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                )}
              </span>
            </span>
          </button>

          <button
            type="button"
            aria-label={muted ? `Sound on for ${film.title}` : `Sound off for ${film.title}`}
            onClick={() => {
              command(muted ? "unMute" : "mute");
              setMuted(!muted);
            }}
            className="spec absolute bottom-4 right-4 flex items-center gap-2 border border-bone/30 bg-void/50 px-3 py-2 text-bone-soft backdrop-blur-sm transition-colors hover:border-bone/60 hover:text-bone"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            {muted ? "Sound" : "Mute"}
          </button>
        </>
      )}
    </div>
  );
}
