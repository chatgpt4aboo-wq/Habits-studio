import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A film used as a moving image rather than a video.
 *
 * It plays itself, silently, on a loop, with no controls, no branding and no
 * way to click through to anywhere: the frame ignores the pointer entirely, so
 * hovering cannot surface a title card or a share overlay. The embed is the
 * no-cookie host, and it is scaled a little past its frame so nothing YouTube
 * draws at the edges is ever visible.
 *
 * In `fill` it becomes the background of whatever contains it, cropped to the
 * shape of that container the way a cover image would be, never letterboxed.
 *
 * Under prefers-reduced-motion it becomes a still. Nobody who has asked their
 * machine to stop moving things should be handed an autoplaying video.
 */
export function AmbientFilm({
  youtube,
  label,
  start,
  fill = false,
  className,
}: {
  youtube: string;
  /** For anyone who cannot see it. */
  label: string;
  /** Seconds to skip, each time around. */
  start?: number;
  /** Cover the container instead of holding a 16:9 frame of its own. */
  fill?: boolean;
  className?: string;
}) {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;
    setStill(query.matches);
    const listen = (event: MediaQueryListEvent) => setStill(event.matches);
    query.addEventListener?.("change", listen);
    return () => query.removeEventListener?.("change", listen);
  }, []);

  const poster = `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: youtube, // loop needs the id repeated
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    disablekb: "1",
    iv_load_policy: "3",
    fs: "0",
    ...(start ? { start: String(start) } : {}),
  });

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-void-raised",
        fill ? "h-full w-full" : "aspect-video w-full",
        className,
      )}
    >
      {still ? (
        <img
          src={poster}
          alt={label}
          className={cn(
            "h-full w-full object-cover",
            fill && "absolute inset-0",
          )}
        />
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtube}?${params}`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0",
            // Cover, exactly: both sides stay on 16:9 whichever way the
            // container is shaped, so the film crops instead of letterboxing.
            fill ? "h-[max(106vh,59.63vw)] w-[max(106vw,188.44vh)]" : "h-[112%] w-[112%]",
          )}
        />
      )}
    </div>
  );
}
