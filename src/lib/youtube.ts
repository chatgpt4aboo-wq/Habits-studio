import { useCallback, useEffect, useState, type RefObject } from "react";

export const EMBED_ORIGIN = "https://www.youtube-nocookie.com";

/**
 * How the host's furniture is cut off.
 *
 * It draws a title and a channel along the top edge of its player, and a
 * progress bar, a watermark and a link to more videos along the bottom. None
 * of that can be turned off any more. But the player letterboxes: give it a
 * frame taller than sixteen by nine and it centres the picture and fills the
 * rest with black, drawing its furniture at the edges of the frame rather than
 * the edges of the picture.
 *
 * So the player is drawn much taller than the hole it shows through, and only
 * a little wider. The furniture lands in the letterbox, outside the hole, and
 * what shows through is the picture, very nearly all of it: the width trims
 * two percent a side, which is there to cover rounding rather than chrome.
 */
export const OVERSCAN = { width: 1.04, height: 1.5 } as const;

export function embedSrc(id: string, extra: Record<string, string> = {}) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id, // looping this way means the end screen never draws
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    disablekb: "1",
    iv_load_policy: "3",
    fs: "0",
    enablejsapi: "1",
    ...(typeof window !== "undefined" ? { origin: window.location.origin } : {}),
    ...extra,
  });
  return `${EMBED_ORIGIN}/embed/${id}?${params}`;
}

/**
 * Talk to an embedded player, and know what it is actually doing.
 *
 * Until the player says it is playing, the frame is covered: whatever the host
 * paints over a video that has not started, a title, a channel, a play button
 * of its own, is behind our own still and is never seen. `playing` is what
 * shows the film at all.
 *
 * Which makes a player that never answers dangerous, because the cover would
 * sit over a film that is running perfectly well. So `silent` reports exactly
 * that case, a player that has said nothing at all within a few seconds, and
 * the cover lifts on it. A frame of the host's chrome is a far smaller price
 * than a film nobody can see.
 *
 * No API script is loaded. The handshake is a message, repeated until the
 * player answers, because an iframe that has not finished loading hears
 * nothing.
 */
export function useYouTubePlayer(frame: RefObject<HTMLIFrameElement | null>, mounted: boolean) {
  const [playing, setPlaying] = useState(false);
  const [silent, setSilent] = useState(false);

  const command = useCallback(
    (func: string, args: unknown[] = []) => {
      frame.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args }),
        EMBED_ORIGIN,
      );
    },
    [frame],
  );

  useEffect(() => {
    if (!mounted) return;
    let acked = false;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== EMBED_ORIGIN || typeof event.data !== "string") return;
      acked = true;
      setSilent(false);
      let state: unknown;
      try {
        const payload = JSON.parse(event.data) as { info?: number | { playerState?: number } };
        state = typeof payload.info === "object" ? payload.info?.playerState : payload.info;
      } catch {
        return;
      }
      if (state === 1) setPlaying(true);
      if (state === 2 || state === 0) setPlaying(false);
    };

    const ping = () =>
      frame.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: "player" }),
        EMBED_ORIGIN,
      );

    window.addEventListener("message", onMessage);
    ping();
    const knock = window.setInterval(() => (acked ? window.clearInterval(knock) : ping()), 400);

    // If it never answers, believe the film rather than our own bookkeeping.
    const deaf = window.setTimeout(() => {
      if (!acked) setSilent(true);
    }, 2500);
    const giveUp = window.setTimeout(() => window.clearInterval(knock), 8000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(knock);
      window.clearTimeout(deaf);
      window.clearTimeout(giveUp);
    };
  }, [mounted, frame]);

  return { playing, setPlaying, silent, command };
}
