/**
 * The studio's films.
 *
 * Each entry needs a `youtube` id (or a `vimeo` id, or a `src` for a file in
 * /public) and a line of writing. Nothing else has to change — add an entry
 * and it appears, in order, on /studio.
 *
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  youtube: "dQw4w9WgXcQ"
 *   https://vimeo.com/123456789                  →  vimeo: "123456789"
 */
export interface FilmEntry {
  id: string;
  /** Roman numeral or short index, as the page sets it. */
  index: string;
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
  {
    id: "the-same-hour",
    index: "I",
    title: "The Same Hour",
    note: "One morning, repeated until it stops looking like a decision. Shot in a single room over a week, at the hour nobody is watching.",
    runtime: "2:10",
  },
  {
    id: "wear",
    index: "II",
    title: "Wear",
    note: "What a garment does over a year, in the order it does it: the fade, the give at the elbow, the hem learning the shape of a hand.",
    runtime: "1:35",
  },
];

/** The films that actually have something to play. */
export function playableFilms(entries: FilmEntry[] = films): FilmEntry[] {
  return entries.filter((film) => film.youtube || film.vimeo || film.src);
}
