# HABITS STUDIO — Long Sleeve Collection

**Same habits. A higher standard.**

The website for the Habits Studio long sleeve collection: 5 core designs and 15 collection
extensions, built from the concept portfolio. Los Angeles / New York.

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
| `/` | The cover: wordmark, collection line, the capsules, the release list |
| `/collection` | All twenty pieces, filterable by capsule, front or back |
| `/collection/:slug` | One piece: colourway, construction, fabric, fit, sizes |
| `/lookbook` | The portfolio, page for page — one bone sheet per capsule |
| `/identity` | The identity system: marks, grounds, colour rules, type |
| `/studio` | How the collection is made |

## Design system

Two surfaces, and the rules that come with them — both enforced by measured contrast, not taste:

| | Ground | Signal | Why |
| --- | --- | --- | --- |
| **Void** `#100F0E` | dark pages | **Amber** `#E07C33` | Amber on void reads 6.5:1. On bone it reads **2.5:1**, so it never goes there. |
| **Bone** `#F1EDE3` | portfolio sheets | **Navy** `#17284D` | Navy on bone reads 12.4:1. On void it reads **1.3:1**, so it never goes there. |

Type is Playfair Display for the wordmark and headlines, Inter for everything else. Captions,
colourways, seam notes and nav are all set in one style — small, uppercase, tracked to 0.22em —
which is what makes the site read like the deck.

## The garments

There is no product photography in this repository. Every piece is drawn as a flat technical
sketch in SVG from one shared block (`src/components/garment/geometry.ts`), with seams, cuffs, hem
and print applied per piece. That mirrors how the collection is designed — one block, cut twenty
ways — and it means colourways, seams and graphics are data, not image files.

Stitching and print decide their own colour from the cloth they sit on: `src/lib/colour.ts`
measures the colourway's luminance and picks light or dark. The collection's colourways fall
either side of a wide gap (darkest light cloth 0.27, lightest dark cloth 0.08), and the threshold
sits in it.

To swap in photography later, add an image to a piece and render it in place of `<Garment />` —
the plate, caption and page layouts stay as they are.

```
src/
  brand/        the marks (wordmark, compact symbol, sleeve lockup) + identity data
  components/
    garment/    the block, the seams, the graphics, the plate
    layout/     header, footer, sleeve tape band
    ui/         button, rule, field
  data/         collection.ts — every piece, every capsule
  lib/          cn, colour maths
  pages/        Home (+ sections), Collection, Piece, Lookbook, Identity, Studio, NotFound
```

## Collection data

`src/data/collection.ts` is the only place garment data lives; every page reads from it. Pieces
carry a `provisional` flag where the portfolio page was not available and the entry was
reconstructed — currently **01–05** (core designs) and **11–15** (archive graphics names). Pieces
**06–10** and **16–20** are taken from the deck. Replacing a provisional entry is a data edit,
nothing more; `collection.test.ts` guards the numbering, the capsule ranges, unique slugs, valid
hex, and that a two-tone build never ships without its second colour.
