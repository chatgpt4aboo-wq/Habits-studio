import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Slide {
  key: string;
  /** Read out to assistive tech, and shown under the frame. */
  label: string;
  content: ReactNode;
}

/**
 * Swipe between views of the same piece.
 *
 * Built on native scroll-snap rather than a carousel library: a touch swipe,
 * a trackpad flick and a shift-scroll all already do the right thing, and the
 * browser keeps the momentum feeling native. The arrows exist for a mouse, the
 * dots for a jump, and the whole strip is keyboard-reachable.
 */
export function SwipeGallery({
  slides,
  className,
  frameClassName,
}: {
  slides: Slide[];
  className?: string;
  frameClassName?: string;
}) {
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const left = track.clientWidth * index;
    // Smooth scrolling is a nicety, not a requirement — fall back to a jump
    // wherever scrollTo isn't implemented.
    if (typeof track.scrollTo === "function") {
      track.scrollTo({ left, behavior: "smooth" });
    } else {
      track.scrollLeft = left;
    }
  }, []);

  // Follow the scroll rather than driving it, so a swipe and a button press
  // end up in the same state.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.max(0, Math.min(slides.length - 1, index)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [slides.length]);

  if (slides.length === 0) return null;
  if (slides.length === 1) {
    return <div className={cn(frameClassName, className)}>{slides[0].content}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        id={id}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Views of this piece"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") goTo(Math.min(active + 1, slides.length - 1));
          if (event.key === "ArrowLeft") goTo(Math.max(active - 1, 0));
        }}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            className={cn("w-full shrink-0 snap-center", frameClassName)}
            aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
            aria-hidden={index !== active}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3" role="tablist" aria-label="Choose a view">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={id}
              onClick={() => goTo(index)}
              className={cn(
                "spec transition-colors",
                index === active
                  ? "text-navy underline decoration-navy underline-offset-[6px]"
                  : "text-ink-faint hover:text-ink",
              )}
            >
              {slide.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Arrow
            label="Previous view"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
            icon={ArrowLeft}
          />
          <Arrow
            label="Next view"
            disabled={active === slides.length - 1}
            onClick={() => goTo(active + 1)}
            icon={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}

function Arrow({
  label,
  disabled,
  onClick,
  icon: Icon,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  icon: typeof ArrowLeft;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center text-ink-faint transition-colors hover:text-ink disabled:opacity-25 disabled:hover:text-ink-faint"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
