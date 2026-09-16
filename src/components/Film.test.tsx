import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Film } from "./Film";
import { films } from "@/data/films";

const entry = { id: "t", title: "Film 01", youtube: "abc123" };

describe("Film", () => {
  it("loads nothing from the host until someone presses play", () => {
    const { container } = render(<Film film={entry} />);
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("button", { name: "Play Film 01" })).toBeTruthy();
  });

  it("plays without the host's chrome, and without any way out to it", async () => {
    const { container } = render(<Film film={entry} />);
    await userEvent.click(screen.getByRole("button", { name: "Play Film 01" }));

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();

    const url = new URL(iframe!.getAttribute("src")!);
    expect(url.host).toBe("www.youtube-nocookie.com");
    expect(url.searchParams.get("controls")).toBe("0");
    expect(url.searchParams.get("rel")).toBe("0");
    expect(url.searchParams.get("modestbranding")).toBe("1");

    // The host's own UI can never be hovered, focused or clicked.
    expect(iframe!.className).toContain("pointer-events-none");
    expect(iframe!.getAttribute("tabindex")).toBe("-1");
    expect(iframe!.hasAttribute("allowfullscreen")).toBe(false);

    // Nothing anywhere in the frame links to youtube.com.
    const links = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(links.some((href) => href.includes("youtube"))).toBe(false);
  });

  it("drives the player with our own controls", async () => {
    const { container } = render(<Film film={entry} />);
    await userEvent.click(screen.getByRole("button", { name: "Play Film 01" }));

    const iframe = container.querySelector("iframe")!;
    const post = vi.fn();
    Object.defineProperty(iframe, "contentWindow", { value: { postMessage: post } });

    await userEvent.click(screen.getByRole("button", { name: "Pause Film 01" }));
    expect(post).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
      "https://www.youtube-nocookie.com",
    );
    expect(screen.getByRole("button", { name: "Play Film 01" })).toBeTruthy();

    await userEvent.click(screen.getByRole("button", { name: "Sound off for Film 01" }));
    expect(post).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "mute", args: [] }),
      "https://www.youtube-nocookie.com",
    );
  });

  it("says so plainly when a film has no source yet", () => {
    render(<Film film={{ id: "x", title: "Film" }} />);
    expect(screen.getByText("Film in progress")).toBeTruthy();
  });
});

describe("the studio's films", () => {
  it("all have something to play, with no repeats", () => {
    expect(films.length).toBeGreaterThan(0);
    for (const film of films) expect(film.youtube || film.vimeo || film.src).toBeTruthy();
    const ids = films.map((film) => film.youtube ?? film.vimeo ?? film.src);
    expect(new Set(ids).size).toBe(films.length);
  });
});
