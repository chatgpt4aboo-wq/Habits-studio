import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Collection from "./Collection";
import Piece from "./Piece";
import Bag from "./Bag";
import { BagProvider } from "@/features/bag/store";
import { pieces } from "@/data/collection";

function renderAt(path: string) {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <BagProvider initial={[]}>
        <Routes>
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:slug" element={<Piece />} />
          <Route path="/bag" element={<Bag />} />
        </Routes>
      </BagProvider>
    </MemoryRouter>,
  );
}

describe("Collection", () => {
  it("shows the five pieces with their price", () => {
    renderAt("/collection");
    const grid = screen.getAllByRole("list")[0];
    expect(within(grid).getAllByRole("link")).toHaveLength(pieces.length);
    expect(within(grid).getAllByText("$75")).toHaveLength(pieces.length);
  });

  it("states the one size on offer", () => {
    renderAt("/collection");
    expect(screen.getByText(/5 pieces · \$75 each · size M/i)).toBeInTheDocument();
  });

  it("turns the whole grid around", async () => {
    const user = userEvent.setup();
    renderAt("/collection");

    expect(screen.getAllByRole("img", { name: /front view$/ })).toHaveLength(pieces.length);
    await user.click(screen.getByRole("button", { name: "back" }));
    expect(screen.getAllByRole("img", { name: /back view$/ })).toHaveLength(pieces.length);
  });
});

describe("Piece", () => {
  it("lays out one piece with its price, size and specs", () => {
    renderAt("/collection/line-study");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Line Study");
    // The headline price, plus one on each related plate.
    expect(screen.getAllByText("$75").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/contrast rib collar/i)).toBeInTheDocument();
    expect(screen.getByText(/400 gsm cotton jersey/i)).toBeInTheDocument();

    const sizes = screen.getByRole("group", { name: "Size" });
    expect(within(sizes).getAllByRole("button")).toHaveLength(1);
    expect(within(sizes).getByRole("button", { name: "M" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("adds to the bag and says so", async () => {
    const user = userEvent.setup();
    renderAt("/collection/line-study");

    await user.click(screen.getByRole("button", { name: /Add to bag · \$75/i }));
    expect(screen.getByRole("button", { name: /Added to bag/i })).toBeInTheDocument();
  });

  it("sends an unknown piece back to the shop", () => {
    renderAt("/collection/nonsense");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Five long sleeves");
  });
});

describe("Bag", () => {
  it("starts empty", () => {
    renderAt("/bag");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Empty");
  });
});
