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
 * The films that play on /studio. They start themselves when they reach the
 * screen, silently, and never show a frame of YouTube.
 *
 * The writing beside them is about habits, not about what is on screen: the
 * films have not been watched from here, so nothing claims to describe them.
 * Rename and rewrite freely, the page follows.
 */
export const films: FilmEntry[] = [
  {
    id: "film-02",
    title: "The Same Hour",
    note: "A habit is not a decision you made once. It is the one you keep making, at the same hour, long after you stopped noticing you were deciding anything.",
    youtube: "qFwWWMVAwVo",
  },
  {
    id: "film-03",
    title: "Small Hours",
    note: "Nothing happens in a day worth reporting. That is the point. The days that shape a person are the ones nobody would think to mention, repeated until they are a life.",
    youtube: "4S35Nx_yFUY",
  },
  {
    id: "film-04",
    title: "Second Nature",
    note: "Do a thing often enough and it stops asking permission. It arrives before the thought does, which is what people mean by second nature, and why it is so hard to take back.",
    youtube: "_JZom_gVfuw",
  },
];

/**
 * The film behind the studio page. It runs silently, on a loop, under the
 * writing, and is never in the way of it.
 */
export const backgroundFilm = {
  youtube: "1qYqEnW2H1s",
  label: "Habits Studio film",
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
  return entries.filter((film) => film.youtube || film.vimeo || film.src);
}
