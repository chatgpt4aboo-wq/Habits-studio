import type { FilmEntry } from "@/data/films";
import { AmbientFilm } from "@/components/AmbientFilm";
import { Monogram } from "@/brand/Marks";
import { cn } from "@/lib/cn";

/**
 * A film on the studio page: the same moving picture the home page runs, with
 * a title over it.
 *
 * It waited to load once, mounting only as it came near the screen, and that
 * is the one thing it did differently from the film on the home page, which
 * has always started. So it does not wait any more. Three players load with
 * the page, which is the price of them being certain to run.
 *
 * Which means it is silent: no browser starts a video with sound unbidden, and
 * there is nothing here to ask with.
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
    return <AmbientFilm youtube={film.youtube} label={film.title} className={className} />;
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
