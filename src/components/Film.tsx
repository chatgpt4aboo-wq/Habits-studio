import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { FilmEntry } from "@/data/films";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

const EMBED_ORIGIN = "https://www.youtube-nocookie.com";

/**
 * A film, played in place, wearing none of the host's clothes.
 *
 * Nothing loads until someone presses play, so the page stays fast and nobody
 * is tracked for scrolling past. Once it is playing, the frame holds the film
 * and nothing else: no title card, no channel, no share tray, no end screen of
 * other people's videos, and no link out. The player's own controls are turned
 * off and the iframe ignores the pointer entirely, so none of that chrome can
 * be surfaced or clicked even by hovering. Play, pause and sound are ours,
 * driven over postMessage, and they sit in the studio's own type.
 *
 * When the film ends the frame returns to its still, which is also how the end
 * screen never gets a chance to appear.
 *
 * A file in /public plays inline with the browser's controls: there is no third
 * party involved, so there is nothing to hide.
 *
 * With no source yet, the frame holds its own space and says so. A missing film
 * has to look like a decision, not a broken page.
 */
export function Film({ film, className }: { film: FilmEntry; className?: string }) {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  // maxres exists only if the film was uploaded large enough, so fall back to
  // hq, and then to nothing at all: an empty frame reads better than a browser's
  // broken-image glyph.
  const [stillStep, setStillStep] = useState<0 | 1 | 2>(0);
  const still =
    film.poster ??
    (film.youtube && stillStep < 2
      ? `https://i.ytimg.com/vi/${film.youtube}/${["maxresdefault", "hqdefault"][stillStep]}.jpg`
      : undefined);

  const hosted = film.youtube
    ? ({ kind: "youtube", id: film.youtube } as const)
    : film.vimeo
      ? ({ kind: "vimeo", id: film.vimeo } as const)
      : null;

  /** Speak to the player directly. No API script, no extra request. */
  const command = useCallback((func: string, args: unknown[] = []) => {
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      EMBED_ORIGIN,
    );
  }, []);

  // Follow the player rather than assume it: it can stall, buffer, or reach the
  // end on its own, and the controls should say what is actually happening.
  useEffect(() => {
    if (!started || hosted?.kind !== "youtube") return;

    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: film.id }),
      EMBED_ORIGIN,
    );

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== EMBED_ORIGIN || typeof event.data !== "string") return;
      let state: unknown;
      try {
        const payload = JSON.parse(event.data) as {
          info?: number | { playerState?: number };
        };
        state = typeof payload.info === "object" ? payload.info?.playerState : payload.info;
      } catch {
        return;
      }
      if (state === 1) setPlaying(true);
      if (state === 2) setPlaying(false);
      if (state === 0) {
        setPlaying(false);
        setStarted(false); // back to the still, before any end screen draws
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [started, hosted?.kind, film.id]);

  const src =
    hosted?.kind === "youtube"
      ? `${EMBED_ORIGIN}/embed/${hosted.id}?${new URLSearchParams({
          autoplay: "1",
          controls: "0",
          modestbranding: "1",
          rel: "0",
          playsinline: "1",
          disablekb: "1",
          iv_load_policy: "3",
          fs: "0",
          enablejsapi: "1",
        })}`
      : hosted?.kind === "vimeo"
        ? `https://player.vimeo.com/video/${hosted.id}?autoplay=1&controls=0&title=0&byline=0&portrait=0`
        : null;

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
      {film.src ? (
        <video
          src={film.src}
          poster={film.poster}
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
      ) : !started ? (
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            setPlaying(true);
          }}
          aria-label={`Play ${film.title}`}
          className="group relative h-full w-full"
        >
          {still ? (
            <img
              src={still}
              alt=""
              loading="lazy"
              onError={() => setStillStep((step) => (step === 0 ? 1 : 2))}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : null}
          <span className="absolute inset-0 flex items-center justify-center bg-void/30 transition-colors group-hover:bg-void/15">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/60 text-bone backdrop-blur-sm transition-colors group-hover:border-bone">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
            </span>
          </span>
        </button>
      ) : (
        <>
          <iframe
            ref={frame}
            src={src ?? undefined}
            title={film.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
          />

          {/* Ours, not the host's. The whole frame is the play toggle. */}
          <button
            type="button"
            aria-label={playing ? `Pause ${film.title}` : `Play ${film.title}`}
            onClick={() => {
              command(playing ? "pauseVideo" : "playVideo");
              setPlaying(!playing);
            }}
            className="group absolute inset-0 h-full w-full"
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                playing ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100",
              )}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/50 bg-void/30 text-bone backdrop-blur-sm">
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
