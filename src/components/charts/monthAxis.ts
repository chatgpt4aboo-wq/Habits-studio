/**
 * Turns a per-column month name into a sparse axis: each month is labelled
 * once, at its first column that is at least two columns clear of the last
 * label, so no month is dropped and no two labels overlap.
 */
export function labelMonths(months: string[], minGap = 2): string[] {
  const labels = months.map(() => "");
  let lastLabelAt = -Infinity;
  let pending: string | null = null;

  months.forEach((month, index) => {
    const changed = index === 0 || months[index - 1] !== month;
    if (changed) pending = month;
    // A pending label waits for a column that is both far enough from the last
    // label and still inside its own month.
    if (pending === month && index - lastLabelAt >= minGap) {
      labels[index] = month;
      lastLabelAt = index;
      pending = null;
    }
  });

  return labels;
}
