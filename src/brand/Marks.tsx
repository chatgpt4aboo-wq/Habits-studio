import { ArtOrFallback } from "@/components/ArtOrFallback";
import { brandArt, brandArtRatio } from "./assets";
import { cn } from "@/lib/cn";

/**
 * The identity system.
 *
 * Every mark takes `light`, which selects the bone-inked artwork for dark
 * surfaces. The drawn fallbacks stay behind each one: they are what renders if
 * a file is ever missing, and they take `currentColor`, so they follow the
 * surface on their own.
 */

export function Monogram({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <ArtOrFallback
      src={light ? brandArt.monogramLight : brandArt.monogram}
      alt=""
      className={cn("h-8 w-8 object-contain", className)}
      fallback={<DrawnMonogram className={className} />}
    />
  );
}

/** The vector stand-in, used only if the artwork is unavailable. */
export function DrawnMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8", className)} aria-hidden="true" focusable="false">
      <g transform="rotate(-5 32 32)" fill="currentColor">
        <path d="M22.5 5 L29 5.6 L25.8 59 L20.4 58.2 Z" />
        <path d="M41.5 5 L48 5.6 L44.8 59 L39.4 58.2 Z" />
        <path d="M23.8 28.4 L46.2 29.6 L46 34 L23.6 32.8 Z" />
        <path
          fillRule="evenodd"
          d="M8.5 33.5 C8.5 19.5 26 10.5 43.5 14 C57.5 16.8 63 28 57 36.5
             C50 46.5 27.5 50.5 15.5 44.5 C10.8 42.1 8.5 38.2 8.5 33.5 Z
             M15.6 33.8 C15.6 24.6 29.5 18.2 42.3 20.8 C51.6 22.7 55.4 30 51.4 35.6
             C45.8 43.4 28.3 45.6 19.4 40.9 C16.8 39.5 15.6 36.9 15.6 33.8 Z"
        />
        <path d="M55.6 35.2 C59.4 33.6 61.6 31.4 62.4 28.6 C62.9 32.6 61 36.2 57.4 38.4 Z" />
      </g>
    </svg>
  );
}

const SCALE = {
  sm: "text-mark-sm",
  md: "text-mark-md",
  lg: "text-mark-lg",
  xl: "text-mark-xl",
} as const;

/**
 * Primary wordmark. Height is driven by the type scale so the mark sits at the
 * same optical size as the headline it replaces.
 */
export function Wordmark({
  className,
  size = "md",
  light = false,
}: {
  className?: string;
  size?: keyof typeof SCALE;
  light?: boolean;
}) {
  return (
    <ArtOrFallback
      src={light ? brandArt.wordmarkLight : brandArt.wordmark}
      alt="Habits Studio"
      className={cn("w-auto object-contain", SCALE[size], className)}
      imgClassName="h-[1.15em]"
      fallback={<DrawnWordmark size={size} className={className} />}
    />
  );
}

function DrawnWordmark({
  size = "md",
  className,
}: {
  size?: keyof typeof SCALE;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", SCALE[size], className)}>
      <span className="font-display font-extrabold uppercase leading-[0.9]">Habits</span>
      <span
        className="font-body font-medium uppercase"
        style={{
          fontSize: "0.155em",
          letterSpacing: "0.62em",
          textIndent: "0.62em",
          marginTop: "0.28em",
        }}
      >
        Studio
      </span>
    </span>
  );
}

/**
 * The wordmark in the brand's chrome finish. The artwork's own alpha is used
 * as a mask over the gradient, so the real letterforms carry the finish rather
 * than a typeface standing in for them.
 */
export function ChromeWordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Habits Studio"
      className={cn("iridescent-surface animate-sheen block w-full", className)}
      style={{
        aspectRatio: String(brandArtRatio.wordmark),
        WebkitMaskImage: `url(${brandArt.wordmark})`,
        maskImage: `url(${brandArt.wordmark})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}

/** Header lockup: the wordmark at nav scale. */
export function Lockup({ className, light = true }: { className?: string; light?: boolean }) {
  return <Wordmark size="sm" light={light} className={cn("h-7", className)} />;
}

/** The horizontal sleeve lockup, as a repeating band. */
export function SleeveLockup({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <img
      src={light ? brandArt.sleeveLockupLight : brandArt.sleeveLockup}
      alt="Habits Studio"
      className={cn("h-10 w-auto max-w-none object-contain", className)}
    />
  );
}
