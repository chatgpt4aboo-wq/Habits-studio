/**
 * The identity system in data, so the Identity page and the site itself can
 * never disagree about the brand. Hex values mirror src/index.css.
 */

export const surfaces = [
  {
    name: "Void",
    token: "--void",
    hex: "#100F0E",
    role: "The page. Warm near-black — never pure black, which flattens the washes.",
  },
  {
    name: "Bone",
    token: "--bone",
    hex: "#F1EDE3",
    role: "The portfolio sheet. Every garment plate and every spec sits on it.",
  },
  {
    name: "Amber",
    token: "--amber",
    hex: "#E07C33",
    role: "Signal. Collection lines, capsule counts, the live nav item. Dark surfaces only.",
  },
  {
    name: "Navy",
    token: "--navy",
    hex: "#17284D",
    role: "Page marks and headers inside a sheet. Bone only.",
  },
];

/** The two rules that are not negotiable, with the numbers behind them. */
export const colourRules = [
  {
    rule: "Amber never sits on bone",
    detail: "2.5:1 — under every legibility floor there is. On void it reads 6.5:1.",
  },
  {
    rule: "Navy never sits on void",
    detail: "1.3:1 — effectively invisible. On bone it reads 12.4:1.",
  },
];

export const typefaces = [
  {
    role: "Wordmark",
    family: "Playfair Display",
    detail:
      "High contrast, sharp serifs, set uppercase and always letter-spaced open. Used for HABITS, headlines, and the piece numbers.",
    sample: "HABITS",
    className: "font-display text-mark-md font-extrabold uppercase tracking-[0.04em]",
  },
  {
    role: "Specification",
    family: "Inter",
    detail:
      "Small, uppercase, tracked to 0.22em. Every caption, colourway, seam note and nav item in the system is set this way.",
    sample: "WASHED OLIVE / INSIDE-OUT RAGLAN SEAMS",
    className: "spec text-ink",
  },
  {
    role: "Reading",
    family: "Inter",
    detail: "Sentence case, 300–400, for the few places the collection explains itself.",
    sample: "One block, cut twenty ways.",
    className: "text-lg",
  },
];

export const markUsage = [
  "The compact symbol is the only mark permitted below 24px.",
  "Clear space around any mark equals the height of the STUDIO line.",
  "The wordmark is never condensed, outlined, or set in a colour other than bone, ink or the chrome finish.",
  "The chrome finish appears once per view — the cover, and nowhere else on the same page.",
  "The sleeve lockup runs symbol, wordmark, symbol; it never breaks mid-unit.",
];
