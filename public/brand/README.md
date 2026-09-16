# Brand artwork

Supplied by the studio, in two inks on transparent backgrounds.

| File | Use |
| --- | --- |
| `wordmark.png` | Black ink, bone sheets |
| `wordmark-light.png` | Bone ink. The void |
| `sleeve-lockup.png` / `-light.png` | The repeating sleeve band |
| `monogram.png` / `-light.png` | Extracted from the sleeve lockup by `scripts/prepare_assets.py` |

**Picking the wrong ink is the easiest way to make the logo look broken**, so
every component that places a mark states which surface it is on:
`<Wordmark light />` on the void, `<Wordmark />` on bone.

The hero uses the artwork's own alpha as a CSS mask over the chrome gradient,
so the real letterforms carry the finish rather than a typeface standing in for
them. That is why the wordmark is a PNG with clean transparency and not a
flattened image.

If the studio ever supplies SVG versions, drop them in and update the paths in
`src/brand/assets.ts`, everything else follows.
