import {
  CalendarRange,
  EyeOff,
  Grid3x3,
  HeartHandshake,
  Keyboard,
  PackageOpen,
} from "lucide-react";

const features = [
  {
    icon: Grid3x3,
    title: "The twelve-week grid",
    body: "Every practice gets 84 days on one line. Kept days fill in, missed days stay hollow, rest days recede.",
  },
  {
    icon: CalendarRange,
    title: "Cadences that bend",
    body: "Daily, chosen weekdays, or a flexible “three times a week” that counts in weeks rather than days.",
  },
  {
    icon: HeartHandshake,
    title: "Runs without guilt",
    body: "A day still in progress never breaks a run, rest days carry it, and a miss is recorded in the same ink as anything else.",
  },
  {
    icon: PackageOpen,
    title: "A shelf, not a bin",
    body: "Pause a practice and its history waits for you. Seasons change; the record shouldn't disappear.",
  },
  {
    icon: EyeOff,
    title: "Nothing leaves the browser",
    body: "No account, no sync, no analytics. Your marks are in localStorage and exportable as JSON in one click.",
  },
  {
    icon: Keyboard,
    title: "Built for keyboards and readers",
    body: "Focus rings everywhere, dialogs that trap focus, the grid legible to screen readers, motion that honours your settings.",
  },
];

export function Features() {
  return (
    <section className="border-b border-line">
      <div className="wrap py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Inside the studio</p>
          <h2 className="mt-4 font-display text-display-lg">
            Everything it does, and nothing it doesn't.
          </h2>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-kelp">
                <feature.icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[1.0625rem] font-medium text-ink">{feature.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
