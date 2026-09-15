# Films

Films are listed in `src/data/films.ts`. Each entry needs a source and a line
of writing; the page renders them in order.

## Hosted on YouTube or Vimeo

Paste the id, not the URL:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ   →   youtube: "dQw4w9WgXcQ"
https://youtu.be/dQw4w9WgXcQ                  →   youtube: "dQw4w9WgXcQ"
https://vimeo.com/123456789                   →   vimeo: "123456789"
```

Nothing loads from YouTube or Vimeo until someone presses play — the frame
shows the still and a play control, and the embed is only created on the click.
The page stays fast, and nobody is tracked for scrolling past a film.

YouTube's own thumbnail is used automatically. To use a different frame, add
`poster: "/studio/the-same-hour.jpg"` and put the image in this folder.

## A file instead

Drop an `.mp4` in here and set `src: "/studio/film.mp4"`. Files play inline,
muted and looping, with no controls — that is for texture, not for something
anyone is meant to sit and watch.

```sh
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow \
  -movflags +faststart public/studio/film.mp4
```

## Before there is anything to play

An entry with no source still appears, holding its frame and its writing, and
says the film is in progress. That is deliberate — remove the entry from
`films.ts` if you would rather it were not there at all.
