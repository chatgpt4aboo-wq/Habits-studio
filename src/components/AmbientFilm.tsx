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
 * Under prefers-reduced-motion it becomes a still. Nobody who has asked their
 * machine to stop moving things should be handed an autoplaying video.
 */
export function AmbientFilm({
  youtube,
  label,
  className,
}: {
  youtube: string;
  /** For anyone who cannot see it. */
  label: string;
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
  });

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-void-raised", className)}>
      {still ? (
        <img src={poster} alt={label} className="h-full w-full object-cover" />
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtube}?${params}`}
          title={label}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      )}
    </div>
  );
}
