import { useId } from "react";
import { cn } from "@/lib/cn";
import { printColour, shade, stitchColour } from "@/lib/colour";
import type { Piece } from "@/data/types";
import {
  BOX,
  COLLAR,
  CUFFS,
  HEM,
  LAYER_SPLIT,
  SEAMS,
  SILHOUETTE,
  SILHOUETTE_ARC_HEM,
} from "./geometry";
import { GarmentGraphic, SleeveTape } from "./Graphics";

/**
 * A piece, drawn as a flat technical sketch: one shared block, with the seams,
 * cuffs, hem and print that make it that piece. Front and back are the same
 * body with different artwork.
 *
 * `washed` adds the garment-dye texture. It costs a filter pass, so grids
 * leave it off and the detail views turn it on.
 */
export function Garment({
  piece,
  view = "front",
  washed = false,
  className,
}: {
  piece: Piece;
  view?: "front" | "back";
  washed?: boolean;
  className?: string;
}) {
  const id = useId();
  const { build, colour } = piece;
  const cloth = colour.hex;
  const seamInk = stitchColour(cloth);
  const ink = printColour(cloth);
  const body = build.hem === "arc" ? SILHOUETTE_ARC_HEM : SILHOUETTE;
  const graphic = (view === "front" ? build.front : build.back) ?? null;

  return (
    <svg
      viewBox={`0 0 ${BOX.width} ${BOX.height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={`${piece.name}, ${colour.name}, ${view} view`}
    >
      <defs>
        <clipPath id={`body-${id}`}>
          <path d={body} />
        </clipPath>

        {/* Cloth shading: light from the upper left, shadow into the sides. */}
        <linearGradient id={`shade-${id}`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={shade(cloth, -0.22)} />
          <stop offset="28%" stopColor={shade(cloth, 0.06)} />
          <stop offset="62%" stopColor={cloth} />
          <stop offset="100%" stopColor={shade(cloth, -0.18)} />
        </linearGradient>

        {washed ? (
          <filter id={`wash-${id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.16" intercept="0" />
            </feComponentTransfer>
          </filter>
        ) : null}
      </defs>

      {/* The cloth. */}
      <path d={body} fill={`url(#shade-${id})`} />

      {/* Garment dye never lands evenly; this is the unevenness. */}
      {washed ? (
        <g clipPath={`url(#body-${id})`}>
          <rect
            x="0"
            y="0"
            width={BOX.width}
            height={BOX.height}
            filter={`url(#wash-${id})`}
            opacity="0.5"
          />
        </g>
      ) : null}

      {/* Layered construction: a second cloth from the chest down. */}
      {build.layered && colour.contrastHex ? (
        <g clipPath={`url(#body-${id})`}>
          <rect
            x="0"
            y={LAYER_SPLIT}
            width={BOX.width}
            height={BOX.height}
            fill={colour.contrastHex}
            opacity="0.95"
          />
          <path
            d={`M 0 ${LAYER_SPLIT} L ${BOX.width} ${LAYER_SPLIT}`}
            stroke={seamInk}
            strokeWidth="0.8"
            fill="none"
          />
        </g>
      ) : null}

      {/* Seams, clipped so nothing runs off the cloth. */}
      <g clipPath={`url(#body-${id})`} fill="none" stroke={seamInk} strokeWidth="1" strokeLinecap="round">
        {(build.seams ?? []).flatMap((seam) =>
          SEAMS[seam].map((d, index) => (
            <path key={`${seam}-${index}`} d={d} strokeDasharray={seam === "raglan" ? "3 2" : undefined} />
          )),
        )}
      </g>

      {/* Print and embroidery. */}
      <g clipPath={`url(#body-${id})`}>
        <GarmentGraphic graphic={graphic} ink={ink} />
        {build.sleeve ? <SleeveTape ink={ink} mode={build.sleeve} /> : null}
      </g>

      {/* Collar: a rib band, in the contrast colour where the piece calls for it.
          Clipped to the cloth so the band cannot spill over the shoulder line. */}
      <g clipPath={`url(#body-${id})`}>
        <path
          d={COLLAR}
          fill="none"
          stroke={
            build.collar === "contrast" && colour.contrastHex
              ? colour.contrastHex
              : shade(cloth, -0.16)
          }
          strokeWidth={build.collar === "contrast" ? 7 : 6}
        />
        <path d={COLLAR} fill="none" stroke={seamInk} strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* Cuffs. */}
      <g fill={shade(cloth, -0.14)} stroke={seamInk} strokeWidth="0.7">
        <path d={CUFFS.left} />
        <path d={CUFFS.right} />
        {build.cuff === "double" ? (
          <>
            <path d={CUFFS.leftDouble} fill={shade(cloth, -0.24)} />
            <path d={CUFFS.rightDouble} fill={shade(cloth, -0.24)} />
          </>
        ) : null}
      </g>

      {/* Hem stitch. */}
      <path
        d={build.hem === "arc" ? HEM.arc : HEM.straight}
        fill="none"
        stroke={seamInk}
        strokeWidth="0.7"
        strokeDasharray="2.5 2"
        transform="translate(0 -6)"
      />

      {/* The silhouette edge, drawn last so it stays crisp. */}
      <path d={body} fill="none" stroke={shade(cloth, -0.42)} strokeWidth="1.1" />
    </svg>
  );
}
