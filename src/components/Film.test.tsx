import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Film } from "./Film";
import { films } from "@/data/films";

const entry = { id: "t", title: "Film 01", youtube: "abc123" };

/** What the player posts back when it starts and when it stops. */
function playerSays(state: number) {
  act(() => {
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ event: "infoDelivery", info: { playerState: state } }),
        origin: "https://www.youtube-nocookie.com",
      }),
    );
  });
}

describe("Film", () => {
  it("loads nothing from the host until someone presses play", async () => {
    const { container } = render(<Film film={entry} />);
    expect(container.querySelector("iframe")).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Play Film 01" }));
    expect(container.querySelector("iframe")).toBeTruthy();
  });

  it("plays muted and looping once pressed", async () => {
    const { container } = render(<Film film={entry} />);
    await userEvent.click(screen.getByRole("button", { name: "Play Film 01" }));
    const url = new URL(container.querySelector("iframe")!.getAttribute("src")!);

    expect(url.host).toBe("www.youtube-nocookie.com");
    expect(url.searchParams.get("autoplay")).toBe("1");
    expect(url.searchParams.get("mute")).toBe("1");
    expect(url.searchParams.get("loop")).toBe("1");
    // Looping is also what keeps the end screen of other videos from drawing.
    expect(url.searchParams.get("playlist")).toBe("abc123");
  });

  it("carries nothing at all once it is running: no controls, none of the host's", async () => {
    const { container } = render(<Film film={entry} />);
    await userEvent.click(screen.getByRole("button", { name: "Play Film 01" }));
    const iframe = container.querySelector("iframe")!;
    const url = new URL(iframe.getAttribute("src")!);

    expect(url.searchParams.get("controls")).toBe("0");
    expect(url.searchParams.get("rel")).toBe("0");
    expect(url.searchParams.get("iv_load_policy")).toBe("3");

    // Nothing of the host can be hovered, focused or clicked.
    expect(iframe.className).toContain("pointer-events-none");
    expect(iframe.getAttribute("tabindex")).toBe("-1");
    expect(iframe.hasAttribute("allowfullscreen")).toBe(false);
    // And it is drawn larger than the frame, so its edges fall outside.
    expect(iframe.className).toContain("h-[150%]"); // taller than the hole
    expect(iframe.className).toContain("w-[104%]");

    // The press is spent. From here the frame holds the film and that is all.
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    const links = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(links.some((href) => href.includes("youtube"))).toBe(false);
  });

  it("keeps the frame covered until the player is genuinely playing", async () => {
    const { container } = render(<Film film={entry} />);
    await userEvent.click(screen.getByRole("button", { name: "Play Film 01" }));
    const cover = () => container.querySelector("div[aria-hidden]")!;

    // Whatever the host paints on a video that has not started is behind this.
    expect(cover().className).toContain("opacity-100");
    playerSays(1);
    expect(cover().className).toContain("opacity-0");
    playerSays(2);
    expect(cover().className).toContain("opacity-100");
  });

  it("says so plainly when a film has no source yet", () => {
    render(<Film film={{ id: "x", title: "Film" }} />);
    expect(screen.getByText("Film in progress")).toBeTruthy();
  });
});

describe("the studio's films", () => {
  it("all have something to play, their own writing, and no repeats", () => {
    expect(films.length).toBeGreaterThan(0);
    for (const film of films) {
      expect(film.youtube || film.src).toBeTruthy();
      expect(film.note?.length ?? 0).toBeGreaterThan(40);
    }
    const ids = films.map((film) => film.youtube ?? film.src);
    expect(new Set(ids).size).toBe(films.length);
  });
});

describe("a player that never answers", () => {
  it("does not leave the cover over a film that is playing fine", () => {
    // Faked before mounting, because the giving-up timer is set on mount.
    vi.useFakeTimers();
    try {
      const { container } = render(<Film film={entry} />);
      // fireEvent, not userEvent: userEvent waits on the timers we just faked.
      fireEvent.click(screen.getByRole("button", { name: "Play Film 01" }));
      const cover = () => container.querySelector("div[aria-hidden]")!;
      expect(cover().className).toContain("opacity-100");
      // No message ever comes back: the API is blocked, or the embed is old.
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(cover().className).toContain("opacity-0");
    } finally {
      vi.useRealTimers();
    }
  });
});
