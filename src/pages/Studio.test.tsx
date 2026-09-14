import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { StudioProvider } from "@/features/habits/store";
import { STORAGE_KEY } from "@/features/habits/storage";
import { todayISO } from "@/lib/date";
import Studio from "./Studio";

function renderStudio(habits: Parameters<typeof StudioProvider>[0]["initial"] = { version: 1, habits: [] }) {
  return render(
    <MemoryRouter>
      <StudioProvider initial={habits}>
        <Studio />
      </StudioProvider>
    </MemoryRouter>,
  );
}

describe("Studio", () => {
  it("invites the visitor to design their first practice", () => {
    renderStudio();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Nothing due.");
    expect(screen.getByText(/Two practices is a good first studio/i)).toBeInTheDocument();
  });

  it("creates a practice, then marks it", async () => {
    const user = userEvent.setup();
    renderStudio();

    await user.click(screen.getByRole("button", { name: /Design a practice/i }));
    const dialog = screen.getByRole("dialog");
    await user.type(within(dialog).getByLabelText("Practice"), "Read ten pages");
    await user.click(within(dialog).getByRole("button", { name: /Add to studio/i }));

    expect(screen.getByRole("button", { name: "Read ten pages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("1 left today");

    const mark = screen.getByRole("button", { name: /^Mark Read ten pages for Today$/i });
    await user.click(mark);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Today is complete.");
    expect(
      screen.getByRole("button", { name: /^Unmark Read ten pages for Today$/i }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("persists a mark to storage", async () => {
    const user = userEvent.setup();
    const today = todayISO();
    renderStudio({
      version: 1,
      habits: [
        {
          id: "walk",
          name: "Walk after lunch",
          intention: "",
          cadence: { type: "daily" },
          color: "kelp",
          icon: "run",
          createdAt: today,
          shelvedAt: null,
          marks: {},
        },
      ],
    });

    await user.click(screen.getByRole("button", { name: /^Mark Walk after lunch for Today$/i }));

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored.habits[0].marks[today]).toBe(true);
  });

  it("does not require a name-less practice to be accepted", async () => {
    const user = userEvent.setup();
    renderStudio();

    await user.click(screen.getByRole("button", { name: /Design a practice/i }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /Add to studio/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(within(dialog).getByText(/Give the practice a name/i)).toBeInTheDocument();
  });

  it("closes the design dialog on Escape", async () => {
    const user = userEvent.setup();
    renderStudio();

    await user.click(screen.getByRole("button", { name: /Design a practice/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("only offers days that have already happened", () => {
    renderStudio();
    const strip = screen.getByRole("group", { name: /Choose a day this week/i });
    const enabled = within(strip)
      .getAllByRole("button")
      .filter((button) => !button.hasAttribute("disabled"));
    expect(enabled.length).toBeGreaterThan(0);
    expect(within(strip).getByRole("button", { current: "date" })).toBeEnabled();
  });
});
