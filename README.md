# Habits Studio

**Design the days that design you.**

A calm practice studio: design a handful of habits, mark them daily, and let twelve weeks of
evidence do the arguing. No account, no notifications, no streak guilt — everything you mark stays
in your own browser.

This repository holds both halves of the brand: the public site (landing page and brand book) and
the product itself (the studio and its insights).

## Run it

```sh
npm install
npm run dev        # http://localhost:8080
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run test` | Vitest suite (62 tests) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` in strict mode |

## The pages

| Route | What lives there |
| --- | --- |
| `/` | Landing page — positioning, principles, method, features |
| `/studio` | The product: today's practices, the week strip, every practice's grid, the shelf |
| `/insights` | Momentum, weekday profile, per-practice completion, export |
| `/brand` | The brand book — logo, palette, type, voice, motion |

## How it is built

- **Vite + React 18 + TypeScript** (strict), **Tailwind CSS** for the design system.
- No component library and no chart library: every primitive, the practice grid, the momentum
  line, and the weekday bars are in this repo.
- **`src/index.css` is the source of truth for colour.** Both themes (Paper and Studio Night) are
  CSS variables; `tailwind.config.ts` just maps them.
- **`src/brand/tokens.ts` is the source of truth for the brand.** The `/brand` page renders
  straight from it, so guidelines and product cannot drift apart.

```
src/
  brand/        tokens + the logo system (Mark, Wordmark, Lockup)
  components/   ui primitives, charts, layout
  features/
    habits/     types · engine (pure logic) · reducer · storage · seed · store · components
  hooks/        theme
  lib/          cn, date helpers (local calendar days, never timestamps)
  pages/        Landing (+ sections), Studio, Insights, Brand, NotFound
```

### The engine

All habit logic is pure functions over plain data in `src/features/habits/engine.ts` — no React, no
storage, and no hidden clock (`today` is always an argument). That is what makes runs, rates, and
the grid straightforward to test:

- A day still in progress never breaks a run; rest days carry it across.
- Flexible cadences (`3× a week`) count runs in **weeks**, not days.
- A day with nothing due is left blank, never scored zero.
- Bonus marks outside the cadence count toward completion, capped at 100%.

### Data

Marks live in `localStorage` under `habits-studio:v1`. Stored data is treated as untrusted on read:
anything that doesn't parse into a valid practice is dropped rather than allowed to crash the
studio. A first visit is seeded with a deterministic demo studio; Insights can export everything as
JSON or clear it.

### Accessibility

Every text and mark colour clears 4.5:1 against its own surface in both themes; the practice grid is
a real table with per-day labels; dialogs trap focus and restore it; all motion collapses under
`prefers-reduced-motion`.
