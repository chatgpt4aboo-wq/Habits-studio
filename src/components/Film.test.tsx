import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Film } from "./Film";
import { films } from "@/data/films";

const entry = { id: "t", title: "Film 01", youtube: "abc123" };

/** What the player would post back when it starts and when it stops. */
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

/** jsdom has no IntersectionObserver, so the film mounts straight away. */
describe("Film", () => {
  it("is already playing, muted and looping, when it reaches the screen", () => {
    const { container } = render(<Film film={entry} />);
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();

    const url = new URL(iframe!.getAttribute("src")!);
    expect(url.host).toBe("www.youtube-nocookie.com");
    expect(url.searchParams.get("autoplay")).toBe("1");
    expect(url.searchParams.get("mute")).toBe("1");
    expect(url.searchParams.get("loop")).toBe("1");
    // Looping is also what keeps the end screen of other videos from drawing.
    expect(url.searchParams.get("playlist")).toBe("abc123");
  });

  it("shows nothing of the host, and offers no way out to it", () => {
    const { container } = render(<Film film={entry} />);
    const iframe = container.querySelector("iframe")!;
    const url = new URL(iframe.getAttribute("src")!);

    expect(url.searchParams.get("controls")).toBe("0");
    expect(url.searchParams.get("rel")).toBe("0");
    expect(url.searchParams.get("iv_load_policy")).toBe("3");

    // The host's own UI can never be hovered, focused or clicked.
    expect(iframe.className).toContain("pointer-events-none");
    expect(iframe.getAttribute("tabindex")).toBe("-1");
    expect(iframe.hasAttribute("allowfullscreen")).toBe(false);

    // And it is drawn larger than the frame, so its edges fall outside.
    expect(iframe.className).toContain("h-[118%]");
    expect(iframe.className).toContain("w-[118%]");

    const links = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(links.some((href) => href.includes("youtube"))).toBe(false);
  });

  it("keeps the frame covered until the player is genuinely playing", () => {
    const { container } = render(<Film film={entry} />);
    const cover = () => container.querySelector("div[aria-hidden]")!;

    // Whatever the host paints on a video that has not started is behind this.
    expect(cover().className).toContain("opacity-100");
    playerSays(1);
    expect(cover().className).toContain("opacity-0");
    playerSays(2);
    expect(cover().className).toContain("opacity-100");
  });

  it("drives the player with our own controls", async () => {
    const { container } = render(<Film film={entry} />);
    const iframe = container.querySelector("iframe")!;
    const post = vi.fn();
    Object.defineProperty(iframe, "contentWindow", { value: { postMessage: post } });
    playerSays(1);

    await userEvent.click(screen.getByRole("button", { name: "Pause Film 01" }));
    expect(post).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
      "https://www.youtube-nocookie.com",
    );
    expect(screen.getByRole("button", { name: "Play Film 01" })).toBeTruthy();

    // It starts muted because browsers demand it of anything self-starting.
    await userEvent.click(screen.getByRole("button", { name: "Sound on for Film 01" }));
    expect(post).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "unMute", args: [] }),
      "https://www.youtube-nocookie.com",
    );
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
      expect(film.youtube || film.vimeo || film.src).toBeTruthy();
      expect(film.note?.length ?? 0).toBeGreaterThan(40);
    }
    const ids = films.map((film) => film.youtube ?? film.vimeo ?? film.src);
    expect(new Set(ids).size).toBe(films.length);
  });
});
