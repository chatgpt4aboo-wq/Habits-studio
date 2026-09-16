import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The em-dash is a house-style ban, not a preference: it is one of the more
 * recognisable signatures of generated copy, and the brand's voice is plain
 * enough not to need it. A comma, a colon or a full stop always works.
 */
function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) sourceFiles(path, out);
    else if (/\.(ts|tsx|css)$/.test(entry)) out.push(path);
  }
  return out;
}

describe("house style", () => {
  it("has no em-dashes anywhere in the source", () => {
    const offenders = sourceFiles("src")
      .filter((path) => !path.endsWith("house-style.test.ts"))
      .flatMap((path) =>
        readFileSync(path, "utf8")
          .split("\n")
          .flatMap((line, index) => (line.includes("—") ? [`${path}:${index + 1}`] : [])),
      );

    expect(offenders, `em-dash found in:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("has none in the document head either", () => {
    expect(readFileSync("index.html", "utf8")).not.toContain("—");
  });
});
