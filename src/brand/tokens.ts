/**
 * The Habits Studio brand, expressed once, in code.
 *
 * The Brand page (`/brand`) renders straight from this file, so the guidelines
 * can never drift from the product. Colour values are duplicated as hex here
 * purely for documentation; the runtime source of truth is src/index.css.
 */

export const brand = {
  name: "Habits Studio",
  wordmark: ["Habits", "Studio"] as const,
  tagline: "Design the days that design you.",
  promise:
    "A calm practice studio. Design a handful of habits, mark them daily, and let the grid tell you the truth — gently.",
  founded: 2026,
} as const;

export interface Swatch {
  name: string;
  token: string;
  light: string;
  dark: string;
  role: string;
}

export const palette: Swatch[] = [
  {
    name: "Paper",
    token: "--paper",
    light: "#F8F6F1",
    dark: "#0F1114",
    role: "The page. Warm, never pure white; in the dark theme, never pure black.",
  },
  {
    name: "Ink",
    token: "--ink",
    light: "#14161A",
    dark: "#F2EFE9",
    role: "Type and marks. Carries every headline and every filled grid cell edge.",
  },
  {
    name: "Kelp",
    token: "--kelp",
    light: "#1C5A4A",
    dark: "#4FBF9B",
    role: "Primary. Completion, progress, and the one button that matters on a screen.",
  },
  {
    name: "Volt",
    token: "--volt",
    light: "#D2F04B",
    dark: "#DDFB5F",
    role: "Highlighter. Used like a pen stroke — a run in progress, one emphasis per view.",
  },
  {
    name: "Clay",
    token: "--clay",
    light: "#B85228",
    dark: "#E8825A",
    role: "Attention, never alarm. A missed day is information, not a failure state.",
  },
  {
    name: "Line",
    token: "--line",
    light: "#E4DFD5",
    dark: "#262A30",
    role: "Hairlines. The studio is built from rules and grids, not drop shadows.",
  },
];

/** Sequential ramp for the practice grid: empty → complete. */
export const rampSwatches = [
  { step: 0, light: "#EFEBE3", dark: "#1B1F24", label: "Nothing marked" },
  { step: 1, light: "#CDE3D9", dark: "#1E3A33", label: "A quarter of the day" },
  { step: 2, light: "#9BC9B8", dark: "#266152", label: "Half the day" },
  { step: 3, light: "#58A088", dark: "#35907A", label: "Most of the day" },
  { step: 4, light: "#1C5A4A", dark: "#4FBF9B", label: "The whole day" },
];

export const typography = [
  {
    role: "Display",
    family: "Fraunces",
    detail: "Variable serif, optical sizing. Headlines, numbers that deserve weight, the wordmark.",
    sample: "Design the days",
    className: "font-display text-display-md",
  },
  {
    role: "Body & UI",
    family: "Inter",
    detail: "Everything you read to get something done. 300–600, never lighter than 300.",
    sample: "Mark today, then close the tab.",
    className: "font-body text-lg",
  },
  {
    role: "Data & Labels",
    family: "JetBrains Mono",
    detail: "Tabular figures, eyebrows, grid legends. Numbers must not shift as they change.",
    sample: "14 DAY RUN · 86%",
    className: "font-mono text-sm uppercase tracking-[0.14em]",
  },
];

export const voice = {
  is: ["Plain", "Warm", "Exacting", "Quiet"],
  isNot: ["Hype", "Guilt", "Gamified", "Shouty"],
  rules: [
    {
      do: "A missed day is a data point.",
      dont: "You broke your streak! 😱",
      why: "Shame is a terrible retention strategy and a worse design principle.",
    },
    {
      do: "Two practices, done daily.",
      dont: "Unlock your full potential with 12 life-changing routines!",
      why: "We help people do less, on purpose.",
    },
    {
      do: "You marked 5 of 6. Here is the one left.",
      dont: "Almost there — don't stop now!!!",
      why: "State the facts, offer the next action, get out of the way.",
    },
  ],
};

export const principles = [
  {
    index: "01",
    title: "Small enough to keep",
    body: "A practice you can finish on your worst day is worth more than one built for your best. The studio caps nothing, but it asks.",
  },
  {
    index: "02",
    title: "Visible at a glance",
    body: "One grid, twelve weeks, no scrolling. If you need a report to know how you are doing, the design has failed.",
  },
  {
    index: "03",
    title: "Kind about misses",
    body: "Runs break. We record it in the same ink as everything else and show you the recovery, not the wound.",
  },
];

export const motion = [
  { name: "Mark", value: "280ms · cubic-bezier(0.34, 1.56, 0.64, 1)", note: "The single spring in the system. Only a completed mark earns it." },
  { name: "Enter", value: "600ms · cubic-bezier(0.22, 1, 0.36, 1)", note: "Content rises 12px into place. Once, on arrival." },
  { name: "Surface", value: "240ms · cubic-bezier(0.22, 1, 0.36, 1)", note: "Sheets and dialogs. Scale from 0.985, never from zero." },
  { name: "Reduced", value: "0ms", note: "Everything above collapses under prefers-reduced-motion." },
];

/** Product vocabulary — the words the UI is allowed to use. */
export const lexicon = [
  { term: "Practice", means: "The habit itself. Something you do, not something you achieve." },
  { term: "Mark", means: "One completed day. The only interaction that matters." },
  { term: "Run", means: "Consecutive kept days (or weeks). Never called a streak in the UI." },
  { term: "Cadence", means: "How often a practice is due: daily, chosen days, or n times a week." },
  { term: "Shelf", means: "Where paused practices live. Not an archive, not a graveyard." },
];
