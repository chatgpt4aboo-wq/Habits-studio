/**
 * The studio's films.
 *
 * Each entry needs a `youtube` id (or a `vimeo` id, or a `src` for a file in
 * /public) and a line of writing. Nothing else has to change: add an entry and
 * it appears, in order, on /studio.
 *
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  youtube: "dQw4w9WgXcQ"
 *   https://vimeo.com/123456789                  →  vimeo: "123456789"
 */
export interface FilmEntry {
  id: string;
  title: string;
  /** One or two sentences. Written to sit beside the film, not to explain it. */
  note: string;
  /** Runtime as it should read: "2:14". Optional. */
  runtime?: string;
  youtube?: string;
  vimeo?: string;
  /** A file in /public, e.g. "/studio/film.mp4". */
  src?: string;
  /** Still frame, for the file case and as a fallback everywhere. */
  poster?: string;
}

export const films: FilmEntry[] = [
  // Nothing here yet, and nothing invented to fill it. Add an entry when a
  // film exists:
  //
  //   {
  //     id: "the-same-hour",
  //     title: "The Same Hour",
  //     note: "One line about it, written the way the studio writes.",
  //     runtime: "2:10",
  //     youtube: "dQw4w9WgXcQ",
  //   },
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
