import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Garment } from "./Garment";
import { pieceBySlug, pieces } from "@/data/collection";
import type { Piece } from "@/data/types";

function draw(piece: Piece, view: "front" | "back" = "front") {
  const { container } = render(<Garment piece={piece} view={view} />);
  return container.querySelector("svg")!;
}

describe("garment drawing", () => {
  it("labels itself for anyone who cannot see it", () => {
    render(<Garment piece={pieceBySlug("constellation")!} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      "Constellation, Tobacco Brown, front view",
    );
  });

  it("draws every piece, front and back, without throwing", () => {
    for (const piece of pieces) {
      expect(draw(piece, "front")).toBeTruthy();
      expect(draw(piece, "back")).toBeTruthy();
    }
  });

  it("puts the cloth colour on the garment", () => {
    const svg = draw(pieceBySlug("constellation")!);
    const stops = [...svg.querySelectorAll("stop")].map((stop) => stop.getAttribute("stop-color"));
    expect(stops).toContain("#4E3A2E");
  });

  it("topstitches in thread colour only where the piece asks for it", () => {
    const stitched = draw(pieceBySlug("minimal-black")!);
    // Bone thread on washed black.
    expect(stitched.innerHTML).toContain("#C9C6BD");

    const plain = draw(pieceBySlug("oversized-navy")!);
    expect(plain.innerHTML).not.toContain("#C9C6BD");
  });

  it("runs piping down the sleeves of the piece that has it", () => {
    const piped = draw(pieceBySlug("line-study")!);
    expect(piped.innerHTML).toContain("M 60 50");
    expect(draw(pieceBySlug("constellation")!).innerHTML).not.toContain("M 60 50");
  });

  it("wraps the tonal wordmark around both sleeves", () => {
    const wrapped = draw(pieceBySlug("tonal-wrap")!);
    const habits = [...wrapped.querySelectorAll("text")].filter(
      (node) => node.textContent === "HABITS",
    );
    // Five rows down each sleeve, plus the small mark at the chest.
    expect(habits.length).toBeGreaterThanOrEqual(10);
    expect(draw(pieceBySlug("oversized-navy")!).innerHTML).not.toContain("rotate(-6");
  });

  it("scatters symbols and stars on the constellation piece", () => {
    const scattered = draw(pieceBySlug("constellation")!, "back");
    expect(scattered.querySelectorAll("path").length).toBeGreaterThan(40);
  });

  it("only pays for the wash filter when asked", () => {
    const { container: plain } = render(<Garment piece={pieces[0]} />);
    const { container: washed } = render(<Garment piece={pieces[0]} washed />);
    expect(plain.querySelector("feTurbulence")).toBeNull();
    expect(washed.querySelector("feTurbulence")).toBeTruthy();
  });

  it("keeps ids unique so two garments on a page cannot collide", () => {
    const { container } = render(
      <>
        <Garment piece={pieces[0]} />
        <Garment piece={pieces[1]} />
      </>,
    );
    const ids = [...container.querySelectorAll("clipPath, linearGradient")].map((node) =>
      node.getAttribute("id"),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
