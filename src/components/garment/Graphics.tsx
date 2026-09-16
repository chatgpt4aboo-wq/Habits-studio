import { useId } from "react";
import { ARC_PATH, SLEEVE_PATH } from "./geometry";
import type { Graphic } from "@/data/types";

/**
 * Prints, embroidery and tape. Each takes the print colour worked out from the
 * cloth, so the same artwork reads on bone and on washed black.
 */

export function GarmentGraphic({ graphic, ink }: { graphic: Graphic; ink: string }) {
  switch (graphic) {
    case "monogram-chest":
      return <ChestSymbol ink={ink} />;
    case "chest-wordmark-left":
      return <ChestWordmarkLeft ink={ink} />;
    case "chest-wordmark-scatter":
      return (
        <>
          <ChestWordmarkLeft ink={ink} />
          <MonogramScatter ink={ink} />
        </>
      );
    case "studio-chest":
      return <StudioChest ink={ink} />;
    case "monogram-scatter":
      return <MonogramScatter ink={ink} />;
    case "arc-wordmark":
      return <ArcWordmark ink={ink} />;
    case "wordmark-small":
      return <SmallWordmark ink={ink} />;
    case "shoulder-wordmark":
      return <ShoulderWordmark ink={ink} />;
    case "collage":
      return <Collage ink={ink} />;
    case "orbit":
      return <Orbit ink={ink} />;
    case "constellation":
      return <Constellation ink={ink} />;
    case "star-wordmark":
      return <StarWordmark ink={ink} />;
    case "diagonal-type":
      return <DiagonalType ink={ink} />;
    default:
      return null;
  }
}

/** The compact symbol, embroidered small at the left chest. */
function ChestSymbol({ ink, x = 72, y = 84, scale = 0.44 }: { ink: string; x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.95">
      <g transform="rotate(-5 32 32)" fill={ink}>
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
    </g>
  );
}

/** Small wordmark at the left chest, as on the tobacco brown piece. */
function ChestWordmarkLeft({ ink }: { ink: string }) {
  return (
    <g>
      <text
        x="68"
        y="86"
        fill={ink}
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="8.5"
        fontWeight="800"
        letterSpacing="0.4"
      >
        HABITS
      </text>
      <text
        x="68.5"
        y="92.5"
        fill={ink}
        fontFamily="Inter, sans-serif"
        fontSize="2.8"
        fontWeight="500"
        letterSpacing="2"
      >
        STUDIO
      </text>
    </g>
  );
}

/** Just STUDIO, small and central. The faded midnight piece. */
function StudioChest({ ink }: { ink: string }) {
  return (
    <g>
      <text
        x="104"
        y="120"
        fill={ink}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="5"
        fontWeight="600"
        letterSpacing="3.4"
      >
        STUDIO
      </text>
      <text
        x="104"
        y="126"
        fill={ink}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="2.4"
        fontWeight="500"
        letterSpacing="1.8"
        opacity="0.8"
      >
        HABITS
      </text>
    </g>
  );
}

/** Symbols and four-point stars scattered down one side and the sleeves. */
function MonogramScatter({ ink }: { ink: string }) {
  const star = (x: number, y: number, size: number) =>
    `M ${x} ${y - size} Q ${x + size * 0.2} ${y - size * 0.2} ${x + size} ${y} Q ${x + size * 0.2} ${y + size * 0.2} ${x} ${y + size} Q ${x - size * 0.2} ${y + size * 0.2} ${x - size} ${y} Q ${x - size * 0.2} ${y - size * 0.2} ${x} ${y - size} Z`;

  // Right of the body, and down both sleeves. The placement in the photograph.
  const symbols: [number, number, number][] = [
    [120, 96, 0.13],
    [131, 122, 0.11],
    [118, 140, 0.1],
    [133, 160, 0.12],
    [120, 182, 0.1],
    [160, 116, 0.1],
    [170, 148, 0.11],
    [176, 178, 0.1],
    [30, 130, 0.1],
    [24, 166, 0.11],
  ];
  const stars: [number, number, number][] = [
    [112, 108, 3],
    [128, 106, 2],
    [124, 132, 2.6],
    [110, 152, 2.2],
    [130, 176, 3],
    [114, 196, 2.2],
    [166, 100, 2.4],
    [156, 134, 2],
    [178, 162, 2.6],
    [40, 116, 2.2],
    [28, 148, 2.4],
    [34, 182, 2],
  ];

  return (
    <g fill={ink} opacity="0.94">
      {stars.map(([x, y, size], index) => (
        <path key={`s${index}`} d={star(x, y, size)} />
      ))}
      {symbols.map(([x, y, scale], index) => (
        <g key={`m${index}`} transform={`translate(${x} ${y}) scale(${scale}) translate(-32 -32)`}>
          <g transform="rotate(-5 32 32)">
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
          </g>
        </g>
      ))}
    </g>
  );
}

/** HABITS arched across the chest, the way a team shirt carries it. */
function ArcWordmark({ ink }: { ink: string }) {
  const id = useId();
  return (
    <g>
      <defs>
        <path id={`arc-${id}`} d={ARC_PATH} />
      </defs>
      <text
        fill={ink}
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="24"
        fontWeight="800"
        textLength="84"
        lengthAdjust="spacingAndGlyphs"
      >
        <textPath href={`#arc-${id}`} startOffset="50%" textAnchor="middle">
          HABITS
        </textPath>
      </text>
      <text
        x="100"
        y="116"
        fill={ink}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="5"
        fontWeight="500"
        letterSpacing="3.4"
      >
        STUDIO
      </text>
    </g>
  );
}

function SmallWordmark({ ink }: { ink: string }) {
  return (
    <g>
      <text
        x="100"
        y="94"
        fill={ink}
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="9"
        fontWeight="800"
        letterSpacing="0.6"
      >
        HABITS
      </text>
      <text
        x="100"
        y="101"
        fill={ink}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="3.2"
        fontWeight="500"
        letterSpacing="2.2"
      >
        STUDIO
      </text>
    </g>
  );
}

/** One line of type laid across the shoulder. */
function ShoulderWordmark({ ink }: { ink: string }) {
  return (
    <text
      x="70"
      y="64"
      fill={ink}
      fontFamily="Inter, sans-serif"
      fontSize="4.4"
      fontWeight="600"
      letterSpacing="2.6"
    >
      HABITS STUDIO
    </text>
  );
}

/** Four archive plates printed as one block across the back. */
function Collage({ ink }: { ink: string }) {
  return (
    <g stroke={ink} fill="none" strokeWidth="0.9" opacity="0.92">
      <rect x="66" y="102" width="32" height="32" />
      <rect x="102" y="102" width="32" height="32" />
      <rect x="66" y="138" width="32" height="32" />
      <rect x="102" y="138" width="32" height="32" />
      <path d="M70 130 L82 110 L94 130 Z" />
      <circle cx="118" cy="118" r="10" />
      <path d="M70 146 h24 M70 154 h24 M70 162 h16" strokeWidth="1.4" />
      <path d="M106 142 l24 24 M130 142 l-24 24" />
      <text
        x="100"
        y="184"
        fill={ink}
        stroke="none"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="3.6"
        fontWeight="500"
        letterSpacing="2.4"
      >
        ARCHIVE GRAPHICS
      </text>
    </g>
  );
}

/** Concentric rings with the wordmark set around the outer one. */
function Orbit({ ink }: { ink: string }) {
  const id = useId();
  return (
    <g>
      <defs>
        <path
          id={`orbit-${id}`}
          d="M 100 92 a 38 38 0 1 1 -0.1 0"
          fill="none"
        />
      </defs>
      <g stroke={ink} fill="none" strokeWidth="0.9">
        <circle cx="100" cy="130" r="30" />
        <circle cx="100" cy="130" r="19" />
        <ellipse cx="100" cy="130" rx="38" ry="14" transform="rotate(-18 100 130)" />
        <path d="M62 130 h76 M100 92 v76" strokeWidth="0.6" opacity="0.7" />
      </g>
      <circle cx="100" cy="130" r="4.5" fill={ink} />
      <text
        fill={ink}
        fontFamily="Inter, sans-serif"
        fontSize="4"
        fontWeight="500"
        letterSpacing="2.8"
      >
        <textPath href={`#orbit-${id}`} startOffset="25%" textAnchor="middle">
          HABITS STUDIO · DISCIPLINE CREATES FREEDOM
        </textPath>
      </text>
    </g>
  );
}

/** Scattered four-point stars, placed by hand, not on a grid. */
function Constellation({ ink }: { ink: string }) {
  const stars = [
    [78, 104, 4],
    [96, 90, 2.6],
    [118, 110, 3.4],
    [86, 132, 3],
    [112, 148, 4.4],
    [70, 162, 2.4],
    [128, 178, 3],
    [94, 190, 2.6],
    [134, 132, 2.2],
    [62, 196, 2],
  ] as const;

  return (
    <g fill={ink} opacity="0.9">
      {stars.map(([x, y, size], index) => (
        <path
          key={index}
          d={`M ${x} ${y - size} Q ${x + size * 0.22} ${y - size * 0.22} ${x + size} ${y} Q ${x + size * 0.22} ${y + size * 0.22} ${x} ${y + size} Q ${x - size * 0.22} ${y + size * 0.22} ${x - size} ${y} Q ${x - size * 0.22} ${y - size * 0.22} ${x} ${y - size} Z`}
        />
      ))}
    </g>
  );
}

/** The wordmark with a star set beside it. */
function StarWordmark({ ink }: { ink: string }) {
  return (
    <g>
      <text
        x="100"
        y="140"
        fill={ink}
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="1"
      >
        HABITS
      </text>
      <text
        x="100"
        y="150"
        fill={ink}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="4"
        fontWeight="500"
        letterSpacing="3.2"
      >
        STUDIO
      </text>
      <path
        d="M 132 112 Q 133.2 116.8 138 118 Q 133.2 119.2 132 124 Q 130.8 119.2 126 118 Q 130.8 116.8 132 112 Z"
        fill={ink}
      />
      <path
        d="M 68 164 Q 68.8 167.2 72 168 Q 68.8 168.8 68 172 Q 67.2 168.8 64 168 Q 67.2 167.2 68 164 Z"
        fill={ink}
      />
    </g>
  );
}

/** Type run off the horizontal and left there. */
function DiagonalType({ ink }: { ink: string }) {
  return (
    <g transform="rotate(-38 100 146)">
      <text
        x="100"
        y="142"
        fill={ink}
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="2"
      >
        HABITS
      </text>
      <text
        x="100"
        y="152"
        fill={ink}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="4"
        fontWeight="500"
        letterSpacing="3"
      >
        STUDIO
      </text>
    </g>
  );
}

/** A tonal wordmark wrapped around both sleeves, one shade off the cloth. */
export function TonalSleeveWrap({ ink }: { ink: string }) {
  // Sleeves only: the body carries just the small studio mark.
  const rows = [124, 142, 160, 178, 196];
  return (
    <g fill={ink} opacity="0.32">
      {rows.map((y, index) => (
        <g key={y}>
          <text
            x={index % 2 === 0 ? 8 : 2}
            y={y}
            fontFamily="Playfair Display, Georgia, serif"
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.2"
            transform={`rotate(-7 26 ${y})`}
          >
            HABITS
          </text>
          <text
            x={index % 2 === 0 ? 146 : 152}
            y={y}
            fontFamily="Playfair Display, Georgia, serif"
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.2"
            transform={`rotate(7 174 ${y})`}
          >
            HABITS
          </text>
        </g>
      ))}
    </g>
  );
}

/** Piping run from the shoulder down the length of each sleeve. */
export function SleevePiping({ colour }: { colour: string }) {
  return (
    <g fill="none" stroke={colour} strokeWidth="2.2" strokeLinecap="round">
      <path d="M 60 50 C 44 58 30 84 24 190" />
      <path d="M 140 50 C 156 58 170 84 176 190" />
    </g>
  );
}

/** Repeating tape down a sleeve. */
export function SleeveTape({ ink, mode }: { ink: string; mode: "tape" | "wordmark" }) {
  const id = useId();
  const text =
    mode === "tape"
      ? "HABITS STUDIO · HABITS STUDIO · HABITS STUDIO"
      : "HABITS STUDIO";

  return (
    <g>
      <defs>
        <path id={`sleeve-l-${id}`} d={SLEEVE_PATH.left} />
        <path id={`sleeve-r-${id}`} d={SLEEVE_PATH.right} />
      </defs>
      <text fill={ink} fontFamily="Inter, sans-serif" fontSize="4" fontWeight="600" letterSpacing="1.6">
        <textPath href={`#sleeve-l-${id}`} startOffset="4%">
          {text}
        </textPath>
      </text>
      <text fill={ink} fontFamily="Inter, sans-serif" fontSize="4" fontWeight="600" letterSpacing="1.6">
        <textPath href={`#sleeve-r-${id}`} startOffset="4%">
          {text}
        </textPath>
      </text>
    </g>
  );
}
