import type { FilmEntry } from "@/data/films";
import { AmbientFilm } from "@/components/AmbientFilm";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * A film on the studio page, and nothing else.
 *
 * There is no player here. No play button, no sound button, no progress bar,
 * no title card, no channel, no end screen, nothing of the host at any point.
 * The film starts itself when it reaches the screen and loops, and that is the
 * whole of it: a moving picture set into the page, the way a photograph is.
 *
 * Which means it is silent, and stays silent. No browser will start a video
 * with sound unbidden, and there is no control left to ask with.
 *
 * With no source yet, the frame holds its own space and says so. A missing film
 * has to look like a decision, not a broken page.
 */
export function Film({ film, className }: { film: FilmEntry; className?: string }) {
  if (film.src) {
    return (
      <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
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
      </div>
    );
  }

  if (film.youtube) {
    return <AmbientFilm youtube={film.youtube} label={film.title} lazy className={className} />;
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
