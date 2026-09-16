import { useState } from "react";
import { Play } from "lucide-react";
import type { FilmEntry } from "@/data/films";
import { AmbientFilm } from "@/components/AmbientFilm";
import { FilmStill } from "@/components/FilmStill";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * A film on the studio page: its own still, and one mark to start it.
 *
 * Starting itself was not reliable. A browser will refuse to autoplay when the
 * page is inside another frame that has not passed the permission down, and
 * there was then nothing to ask with, so a film could simply sit there. A
 * press settles it: it carries the permission with it, and anything a browser
 * might have argued about is answered by someone having asked.
 *
 * Once running it is still a moving picture rather than a player. It loops, it
 * is silent, and it shows nothing of the host at any point: no title, no
 * channel, no progress bar, no end screen, no way out to it. Nothing is loaded
 * from the host until the press, either.
 *
 * With no source yet, the frame holds its own space and says so. A missing film
 * has to look like a decision, not a broken page.
 */
export function Film({ film, className }: { film: FilmEntry; className?: string }) {
  const [pressed, setPressed] = useState(false);

  if (film.src) {
    return (
      <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
        <video
          src={film.src}
          poster={film.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={film.title}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (film.youtube) {
    if (pressed) {
      return <AmbientFilm youtube={film.youtube} label={film.title} className={className} />;
    }

    return (
      <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
        <button
          type="button"
          onClick={() => setPressed(true)}
          aria-label={`Play ${film.title}`}
          className="group h-full w-full"
        >
          <FilmStill youtube={film.youtube} poster={film.poster} />
          <span className="absolute inset-0 flex items-center justify-center bg-void/30 transition-colors duration-500 group-hover:bg-void/15">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/60 text-bone backdrop-blur-sm transition-colors duration-300 group-hover:border-bone">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
            </span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 border border-line-dark">
        <Monogram light className="h-7 w-7 opacity-35" />
        <p className="spec text-bone-soft/60">Film in progress</p>
      </div>
    </div>
  );
}
