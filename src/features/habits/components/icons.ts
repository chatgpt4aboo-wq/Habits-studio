import {
  BookOpen,
  Droplets,
  Footprints,
  Guitar,
  Moon,
  PenLine,
  SmartphoneCharging,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { HabitColor, HabitIcon } from "../types";

const icons: Record<HabitIcon, LucideIcon> = {
  sprout: Sprout,
  book: BookOpen,
  run: Footprints,
  water: Droplets,
  pen: PenLine,
  moon: Moon,
  guitar: Guitar,
  phone: SmartphoneCharging,
};

export const iconLabels: Record<HabitIcon, string> = {
  sprout: "Growth",
  book: "Reading",
  run: "Movement",
  water: "Hydration",
  pen: "Writing",
  moon: "Rest",
  guitar: "Music",
  phone: "Unplugging",
};

/** The accent marks identity only — it never stands in for data. */
export const accentClass: Record<HabitColor, string> = {
  kelp: "bg-kelp-tint text-kelp",
  volt: "bg-volt/25 text-ink",
  clay: "bg-clay-tint text-clay",
  ink: "bg-surface-sunken text-ink",
};

export function iconFor(icon: HabitIcon): LucideIcon {
  return icons[icon] ?? Sprout;
}
