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
  /** Seconds to skip, each time around, when the opening is not the film. */
  start?: number;
  youtube?: string;
  /** A file in /public, e.g. "/studio/film.mp4". */
  src?: string;
  /** Still frame, for the file case and as a fallback everywhere. */
  poster?: string;
}

/**
 * The films that play on /studio. They start themselves when they reach the
 * screen, silently, and never show a frame of YouTube.
 *
 * Titles and writing are the studio's own. They are about habits rather than
 * about what is on screen, which is also the only honest way round it here:
 * the films have not been watched from this repository.
 */
export const films: FilmEntry[] = [
  {
    id: "film-02",
    title: "Returning",
    note: "We return to the same things for a reason. A familiar street. A familiar song. A familiar piece of clothing. Repetition is not always limitation. Sometimes it is belonging.",
    youtube: "qFwWWMVAwVo",
    start: 3,
  },
  {
    id: "film-03",
    title: "Worn Into Being",
    note: "Clothing remembers what we forget. The places we sat, the nights we stayed out and the roads we took home. Every crease becomes evidence of a life in motion.",
    youtube: "4S35Nx_yFUY",
    start: 3,
  },
  {
    id: "film-05",
    title: "What Remains",
    note: "Most moments disappear without announcing themselves. What remains is what we repeated, what we carried and what we chose to wear through it all.",
    youtube: "OyRQeXekHSU",
    start: 3,
  },
];

/**
 * The film behind the studio page. It runs silently, on a loop, under the
 * writing, and is never in the way of it.
 */
export const backgroundFilm = {
  youtube: "1qYqEnW2H1s",
  label: "Habits Studio film",
  /** Seconds to skip, each time around. The opening is not the film. */
  start: 5,
} as const;

/**
 * The film that plays beside the wordmark on the home page. It runs silently,
 * on a loop, and cannot be clicked through to YouTube.
 */
export const heroFilm = {
  youtube: "-DksmbDMDUU",
  label: "Habits Studio film",
  /** Seconds to skip. The first beats of this one are not the film. */
  start: 3,
} as const;

/** The films that actually have something to play. */
export function playableFilms(entries: FilmEntry[] = films): FilmEntry[] {
  return entries.filter((film) => film.youtube || film.src);
}
