# HABITS STUDIO, Daily

**Same habits. A higher standard.**

The shop for the Habits Studio **Daily** capsule: five long sleeves, $75 each, cut in one size (M).
Los Angeles / New York.

## Run it

```sh
npm install
npm run dev        # http://localhost:8080
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run test` | Vitest suite (31 tests) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` in strict mode |

## The pages

| Route | What lives there |
| --- | --- |
| `/` | The cover: wordmark, the capsule spread, the release list |
| `/lookbook` | The capsule, priced. This is the shop as well as the lookbook |
| `/lookbook/:slug` | One piece: swipe between the garment and the worn shot, then buy it |
| `/bag` | The bag: quantities, line totals, subtotal |
| `/studio` | The writing and the films |
| `/shipping` | Shipping and returns |
| `/contact` | Where to write, and what about |

## Design system

Two surfaces, and the rules that come with them. Both enforced by measured contrast, not taste:

| | Ground | Signal | Why |
| --- | --- | --- | --- |
| **Void** `#100F0E` | dark pages | **Amber** `#E07C33` | Amber on void reads 6.5:1. On bone it reads **2.5:1**, so it never goes there. |
| **Bone** `#F1EDE3` | portfolio sheets | **Navy** `#17284D` | Navy on bone reads 12.4:1. On void it reads **1.3:1**, so it never goes there. |

Type is Playfair Display for the wordmark and headlines, Inter for everything else. Captions,
colourways, seam notes and nav are all set in one style, small, uppercase, tracked to 0.22em ,
which is what makes the site read like the deck.

There is no separate shop page. With one capsule of five, a browsing grid and a
lookbook were the same page twice, so the lookbook carries the prices. The old
`/collection` paths redirect rather than 404.

## Placeholder policy, read this before going live

`src/data/policies.ts` holds the contact details, shipping times and returns
terms shown on `/contact` and `/shipping`. **They are conventional defaults,
not facts about this business.** The email address does not exist and nobody
has agreed to a fourteen-day window.

Every invented value is listed in that file's `needsConfirming` array. Replace
it, take the entry off the list, and a test keeps the list honest by checking
each path still points at something real.

What *is* confirmed: orders leave from Los Angeles or New York, whichever is
closer, and those two cities are the collection's actual market. So the
shipping page quotes them ahead of everywhere else, and so does the product
page. Tests pin that, because it is a fact about the business rather than a
layout choice, and a later tidy-up should not be able to flatten it back into
one generic origin.

## Films

`/studio` carries the films. They are listed in `src/data/films.ts`, and each
one needs a source and a line of writing. A YouTube or Vimeo id, or a file in
`/public`. Hosted video is embedded as a facade: nothing loads from YouTube
until someone presses play, so the page stays fast and nobody is tracked for
scrolling past. An entry with no source yet holds its frame and says so.
See `public/studio/README.md`.

## Artwork: drop files in, they appear

Photography and the studio's own logo files are **not in this repository yet**. Everything renders
from drawn fallbacks until they are, and switches over the moment a file exists. No code change,
no build flag. See `src/components/ArtOrFallback.tsx`: the browser's own load failure is the
signal, so nothing has to know in advance what is there.

- **Product photos** → `public/products/01.jpg` … `05.jpg` (plus optional `01-back.jpg` …).
  Portrait 4:5. See `public/products/README.md`.
- **Logo files** → `public/brand/wordmark.svg`, `monogram.svg`, `sleeve-lockup.svg`.
  Transparent background. The marks sit on both the near-black page and the bone sheet.
  See `public/brand/README.md`.

Until then, each piece is drawn as a flat technical sketch in SVG from one shared block
(`src/components/garment/geometry.ts`), with seams, cuffs, hem and print applied per piece.

Stitching and print decide their own colour from the cloth they sit on: `src/lib/colour.ts`
measures the colourway's luminance and picks light or dark. The collection's colourways fall
either side of a wide gap (darkest light cloth 0.27, lightest dark cloth 0.08), and the threshold
sits in it.

## Commerce

The bag is real: add to bag, quantities, line totals, subtotal, and it survives a reload
(`localStorage`, revalidated on read so a stale or hand-edited bag can't break the page).
**Checkout is not wired to a payment provider**. That is the one remaining step, and it is
deliberately a dead button rather than a fake purchase. Stripe Checkout or Shopify both drop in
behind `src/features/bag/store.tsx` without touching the pages.

```
src/
  brand/        the marks (wordmark, compact symbol, sleeve lockup) + identity data
  components/
    garment/    the block, the seams, the graphics, the plate
    layout/     header, footer, sleeve tape band
    ui/         button, rule, field
  data/         collection.ts. Every piece, price and size
  features/
    bag/        the bag: store, persistence, totals
  lib/          cn, colour maths
  pages/        Home (+ sections), Collection, Piece, Lookbook, Identity, Studio, NotFound
```

## Collection data

`src/data/collection.ts` is the only place product data lives; every page, plate and bag line reads
from it. Price and size are set once, at the top of the file.

Pieces carry a `provisional` flag where the product photograph had no caption and the name was
inferred, currently **04 Arc Stitch** and **05 Archive Arc**. Renaming one is a data edit,
nothing more.

`collection.test.ts` guards the numbering, that every piece is $75 in size M, unique slugs, valid
hex, and that a contrast treatment never ships without its second colour.
