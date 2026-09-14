import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Collection from "./Collection";
import Piece from "./Piece";
import { pieces } from "@/data/collection";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:slug" element={<Piece />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Collection", () => {
  it("shows all twenty pieces", () => {
    renderAt("/collection");
    const grid = screen.getAllByRole("list")[0];
    expect(within(grid).getAllByRole("link")).toHaveLength(pieces.length);
  });

  it("filters down to a capsule and back", async () => {
    const user = userEvent.setup();
    renderAt("/collection");

    await user.click(screen.getByRole("button", { name: /06–10 Quiet Construction/i }));
    let grid = screen.getAllByRole("list")[0];
    expect(within(grid).getAllByRole("link")).toHaveLength(5);
    expect(within(grid).getByText(/Raglan Study/i)).toBeInTheDocument();
    expect(within(grid).queryByText(/Base Form/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^All · 20$/i }));
    grid = screen.getAllByRole("list")[0];
    expect(within(grid).getAllByRole("link")).toHaveLength(pieces.length);
  });

  it("turns the whole grid around", async () => {
    const user = userEvent.setup();
    renderAt("/collection");

    expect(screen.getAllByRole("img", { name: /front view$/ }).length).toBe(pieces.length);
    await user.click(screen.getByRole("button", { name: "back" }));
    expect(screen.getAllByRole("img", { name: /back view$/ }).length).toBe(pieces.length);
  });
});

describe("Piece", () => {
  it("lays out one piece with its specs", () => {
    renderAt("/collection/raglan-study");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Raglan Study");
    expect(screen.getByText("Piece 06 of 20")).toBeInTheDocument();
    expect(screen.getByText(/inside-out raglan seams/i)).toBeInTheDocument();
    expect(screen.getByText(/400 gsm cotton jersey/i)).toBeInTheDocument();
    expect(screen.getByText(/XS · S · M · L · XL · XXL/)).toBeInTheDocument();
  });

  it("offers a back view only where there is one", async () => {
    const user = userEvent.setup();
    renderAt("/collection/college-arc");

    const toggle = screen.getByRole("group", { name: /Garment view/i });
    await user.click(within(toggle).getByRole("button", { name: /back view/i }));
    expect(screen.getByRole("img", { name: /College Arc.*back view/ })).toBeInTheDocument();
  });

  it("hides the view toggle for a piece with no back print", () => {
    renderAt("/collection/base-form");
    expect(screen.queryByRole("group", { name: /Garment view/i })).not.toBeInTheDocument();
  });

  it("links on to its neighbours in the collection", () => {
    renderAt("/collection/raglan-study");
    const nav = screen.getByRole("navigation", { name: "Collection" });
    expect(within(nav).getByRole("link", { name: /05 Clean Sleeve/ })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /07 Panel Work/ })).toBeInTheDocument();
  });

  it("sends an unknown piece back to the collection", () => {
    renderAt("/collection/nonsense");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Twenty long sleeves");
  });
});
