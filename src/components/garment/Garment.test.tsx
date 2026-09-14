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
    render(<Garment piece={pieceBySlug("raglan-study")!} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      "Raglan Study, Washed Olive, front view",
    );
  });

  it("draws every piece in the collection, front and back, without throwing", () => {
    for (const piece of pieces) {
      expect(draw(piece, "front")).toBeTruthy();
      expect(draw(piece, "back")).toBeTruthy();
    }
  });

  it("puts the cloth colour on the garment", () => {
    const svg = draw(pieceBySlug("washed-olive") ?? pieceBySlug("raglan-study")!);
    const gradient = svg.querySelector("linearGradient");
    expect(gradient).toBeTruthy();
    // The mid stop is the colourway itself; the others are shaded from it.
    const stops = [...gradient!.querySelectorAll("stop")].map((stop) =>
      stop.getAttribute("stop-color"),
    );
    expect(stops).toContain("#4A4F3C");
  });

  it("draws the seams a piece specifies and no others", () => {
    const raglan = draw(pieceBySlug("raglan-study")!);
    // Raglan seams are dashed; the block itself has no dashed seam.
    expect(raglan.querySelectorAll("path[stroke-dasharray='3 2']").length).toBe(2);

    const plain = draw(pieceBySlug("base-form")!);
    expect(plain.querySelectorAll("path[stroke-dasharray='3 2']").length).toBe(0);
  });

  it("gives the double cuff its extra band", () => {
    const double = draw(pieceBySlug("double-cuff")!);
    const single = draw(pieceBySlug("base-form")!);
    expect(double.innerHTML).toContain("M 12 164");
    expect(single.innerHTML).not.toContain("M 12 164");
  });

  it("shows front artwork on the front and back artwork on the back", () => {
    const piece = pieceBySlug("college-arc")!;
    // Front carries the arched wordmark; the back carries the collage.
    expect(draw(piece, "front").textContent).toContain("HABITS");
    expect(draw(piece, "back").textContent).toContain("ARCHIVE GRAPHICS");
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
