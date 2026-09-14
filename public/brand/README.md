# Brand artwork

The studio's own logo files go here and replace the drawn fallbacks everywhere
on the site — header, footer, lookbook sheets, 404, favicon.

| File | What it is |
| --- | --- |
| `wordmark.svg` | Primary wordmark — HABITS over a spaced STUDIO |
| `monogram.svg` | Compact symbol — the interlocking HS brush mark |
| `sleeve-lockup.svg` | Horizontal lockup — symbol / wordmark, repeated |

- **SVG is best** — the wordmark is set at everything from 17px in the nav to
  9rem on the cover, and a raster file will soften at the top end.
- **PNG works** if SVG isn't available: transparent background, at least
  2000px wide. Update the paths in `src/brand/assets.ts` to `.png`.
- **Transparency matters.** The marks are placed on both the near-black page
  and the bone sheet. A file with a baked-in white or cream background will
  show a rectangle on one of the two.

Until these exist the site uses the vector approximations in
`src/brand/Marks.tsx`.
