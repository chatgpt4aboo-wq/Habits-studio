# Product photography

Drop the five product photos in here, named by piece number. They appear on the
site the moment they exist — no code change, no rebuild of anything else.

| File | Piece |
| --- | --- |
| `01.jpg` | 01 Line Study — Warm Bone |
| `02.jpg` | 02 Constellation — Tobacco Brown |
| `03.jpg` | 03 Tonal Wrap — Faded Midnight |
| `04.jpg` | 04 Arc Stitch — Washed Black |
| `05.jpg` | 05 Archive Arc — Indigo Navy |

Back views are optional and use the same name with `-back`: `01-back.jpg`, and
so on. A piece with a back photo gets a front/back toggle on its product page.

- **Format**: `.jpg` for photography (`.png` if it needs transparency).
- **Shape**: portrait, 4:5. Plates and the product page crop to that ratio, so
  a square or landscape file will be cropped top and bottom.
- **Size**: 1600 × 2000 px is plenty; anything above ~2400px wide is wasted
  bytes.

Until a file is here, the site draws the piece as a flat technical sketch
instead. Nothing breaks either way — see `src/components/ArtOrFallback.tsx`.
