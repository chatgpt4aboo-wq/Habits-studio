# The film

Drop the clip in here as `film.mp4` and it plays full-bleed on `/studio`.
Nothing else needs changing.

| File | What it is |
| --- | --- |
| `film.mp4` | The clip. H.264 / AAC-free (it plays muted), 1920×1080 or wider. |
| `film-poster.jpg` | First frame, shown before the video loads and if it can't play. |

- **Keep it short and loop it** — 10–20 seconds. It autoplays muted and loops,
  which is the only way a browser will play a video without a click.
- **Silence it at the source.** Stripping the audio track halves the file and
  removes any chance of sound.
- **Aim under 8 MB.** It sits on a page people scroll past; it is texture, not
  a feature film. `-crf 26` in ffmpeg is usually indistinguishable here.
- **Shape**: the section crops to 21:9 on desktop and 16:9 on phones, so keep
  the subject away from the top and bottom edges.

```sh
ffmpeg -i source.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow \
  -movflags +faststart public/studio/film.mp4
ffmpeg -i public/studio/film.mp4 -frames:v 1 public/studio/film-poster.jpg
```

Until the file exists the section shows the poster, and if neither is there the
page simply closes up around it.
