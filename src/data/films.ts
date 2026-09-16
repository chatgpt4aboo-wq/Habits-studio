/**
 * The studio's films.
 *
 * Each entry needs a `youtube` id (or a `vimeo` id, or a `src` for a file in
 * /public). Nothing else has to change: add an entry and it appears, in order,
 * on /studio.
 *
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  youtube: "dQw4w9WgXcQ"
 *   https://vimeo.com/123456789                  →  vimeo: "123456789"
 */
export interface FilmEntry {
  id: string;
  /** Shown above the film, and read out to anyone who cannot see it. */
  title: string;
  /** One or two sentences, sitting beside the film rather than explaining it. */
  note?: string;
  /** Runtime as it should read: "2:14". Optional. */
  runtime?: string;
  youtube?: string;
  vimeo?: string;
  /** A file in /public, e.g. "/studio/film.mp4". */
  src?: string;
  /** Still frame, for the file case and as a fallback everywhere. */
  poster?: string;
}

/**
 * Numbered, and nothing more, until the studio says what they are called. The
 * films have not been watched from here, so no title or note is put in their
 * mouth: swap `title` and add `note` per entry and the page follows.
 */
export const films: FilmEntry[] = [
  { id: "film-01", title: "Film 01", youtube: "1qYqEnW2H1s" },
  { id: "film-02", title: "Film 02", youtube: "qFwWWMVAwVo" },
  { id: "film-03", title: "Film 03", youtube: "4S35Nx_yFUY" },
];

/**
 * The film that plays beside the wordmark on the home page. It runs silently,
 * on a loop, and cannot be clicked through to YouTube.
 */
export const heroFilm = {
  youtube: "-DksmbDMDUU",
  label: "Habits Studio film",
} as const;

/** The films that actually have something to play. */
export function playableFilms(entries: FilmEntry[] = films): FilmEntry[] {
  return entries.filter((film) => film.youtube || film.vimeo || film.src);
}
