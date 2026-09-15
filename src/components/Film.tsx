import { useState } from "react";
import { Play } from "lucide-react";
import type { FilmEntry } from "@/data/films";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * A film, played in place.
 *
 * Hosted video is embedded as a facade rather than an iframe: nothing loads
 * from YouTube or Vimeo until someone presses play, so the page stays fast and
 * nobody is tracked for scrolling past. A file in /public plays inline,
 * muted and looping, the way a moving image should.
 *
 * With no source yet, the frame holds its own space and says so. A missing
 * film has to look like a decision, not a broken page.
 */
export function Film({ film, className }: { film: FilmEntry; className?: string }) {
  const [playing, setPlaying] = useState(false);

  const still =
    film.poster ?? (film.youtube ? `https://i.ytimg.com/vi/${film.youtube}/maxresdefault.jpg` : undefined);

  const embed = film.youtube
    ? `https://www.youtube-nocookie.com/embed/${film.youtube}?autoplay=1&rel=0&modestbranding=1`
    : film.vimeo
      ? `https://player.vimeo.com/video/${film.vimeo}?autoplay=1&title=0&byline=0`
      : null;

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
      {playing && embed ? (
        <iframe
          src={embed}
          title={film.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : film.src ? (
        <video
          src={film.src}
          poster={film.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={film.title}
          className="h-full w-full object-cover"
        />
      ) : embed ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${film.title}`}
          className="group relative h-full w-full"
        >
          {still ? (
            <img
              src={still}
              alt=""
              loading="lazy"
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 border border-line-dark">
          <Monogram light className="h-7 w-7 opacity-35" />
          <p className="spec text-bone-soft/60">Film — in progress</p>
        </div>
      )}
    </div>
  );
}
