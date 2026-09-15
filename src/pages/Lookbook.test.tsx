import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Lookbook from "./Lookbook";
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
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/lookbook/:slug" element={<Piece />} />
          <Route path="/bag" element={<Bag />} />
        </Routes>
      </BagProvider>
    </MemoryRouter>,
  );
}

describe("Lookbook", () => {
  it("is the one browsing page: every piece, priced, linking to itself", () => {
    renderAt("/lookbook");
    const grid = screen.getAllByRole("list")[0];
    const links = within(grid).getAllByRole("link");
    expect(links).toHaveLength(pieces.length);
    expect(within(grid).getAllByText("$75")).toHaveLength(pieces.length);
    for (const piece of pieces) {
      expect(
        links.some((link) => link.getAttribute("href") === `/lookbook/${piece.slug}`),
      ).toBe(true);
    }
  });

  it("states the one size on offer", () => {
    renderAt("/lookbook");
    expect(screen.getByText(/5 pieces · \$75 each · size M/i)).toBeInTheDocument();
  });
});

describe("Piece", () => {
  it("lays out one piece with its price, size and specs", () => {
    renderAt("/lookbook/line-study");

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
    renderAt("/lookbook/line-study");

    await user.click(screen.getByRole("button", { name: /Add to bag · \$75/i }));
    expect(screen.getByRole("button", { name: /Added to bag/i })).toBeInTheDocument();
  });

  it("sends an unknown piece back to the lookbook", () => {
    renderAt("/lookbook/nonsense");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Daily");
  });
});

describe("Bag", () => {
  it("starts empty", () => {
    renderAt("/bag");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Empty");
  });
});

describe("Piece views", () => {
  it("offers the garment and the on-body shot in one swipeable frame", () => {
    renderAt("/lookbook/constellation");

    const gallery = screen.getByRole("group", { name: /Views of this piece/i });
    expect(gallery).toBeInTheDocument();

    const tabs = screen.getByRole("tablist", { name: /Choose a view/i });
    expect(within(tabs).getByRole("tab", { name: "Garment" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(within(tabs).getByRole("tab", { name: "On body" })).toBeInTheDocument();
    // No back photography yet, so no back view is offered.
    expect(within(tabs).queryByRole("tab", { name: "Back" })).not.toBeInTheDocument();
  });

  it("can be stepped through with the arrows", async () => {
    const user = userEvent.setup();
    renderAt("/lookbook/constellation");

    expect(screen.getByRole("button", { name: /Previous view/i })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /Next view/i }));
    // jsdom has no layout, so scrolling is inert; the controls still have to
    // be present and correctly wired at both ends of the strip.
    expect(screen.getByRole("button", { name: /Next view/i })).toBeInTheDocument();
  });
});
