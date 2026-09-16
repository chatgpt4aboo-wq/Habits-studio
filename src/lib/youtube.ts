import { useCallback, useEffect, useState, type RefObject } from "react";

export const EMBED_ORIGIN = "https://www.youtube-nocookie.com";

/**
 * How much bigger than its box the player is drawn.
 *
 * The host draws a title, a channel and a watermark along the top and bottom
 * edges of its frame. Nothing turns those off any more, so the frame is drawn
 * larger than the hole it shows through and the edges fall outside it.
 */
export const OVERSCAN = 1.18;

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
 * This matters for more than the buttons. Until the player says it is playing,
 * the frame is covered: whatever the host paints over a video that has not
 * started, a title, a channel, a play button of its own, is behind our own
 * still and is never seen. `playing` is therefore the signal for showing the
 * film at all, not just for which icon to draw.
 *
 * No API script is loaded. The handshake is a message, repeated until the
 * player answers, because an iframe that has not finished loading hears
 * nothing.
 */
export function useYouTubePlayer(frame: RefObject<HTMLIFrameElement | null>, mounted: boolean) {
  const [playing, setPlaying] = useState(false);

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
    const giveUp = window.setTimeout(() => window.clearInterval(knock), 8000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(knock);
      window.clearTimeout(giveUp);
    };
  }, [mounted, frame]);

  return { playing, setPlaying, command };
}
