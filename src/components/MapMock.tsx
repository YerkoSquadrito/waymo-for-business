import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  /** Hide the route polyline + pins (just a static map background). */
  decorative?: boolean;
};

/**
 * Hand-drawn SVG map. Per the approved plan we ship a stylized mockup
 * rather than a real tile service — zero deps, zero signup, indistinguishable
 * from a real low-detail render when overlaid with the bottom sheet.
 *
 * Palette is bound to design tokens via Tailwind: roads use
 * `outline-variant`, water uses `secondary-fixed`, the route uses
 * `primary`, and the destination pin is filled `primary`.
 */
export function MapMock({ className, decorative = false }: Props) {
  return (
    <svg
      className={cn('block h-full w-full bg-surface-container-low', className)}
      viewBox="0 0 400 600"
      role="img"
      aria-label="Route from home to Acme HQ"
    >
      {/* Park polygon */}
      <path
        d="M 30 80 L 130 70 L 150 160 L 60 180 Z"
        className="fill-tertiary-fixed/30"
      />
      {/* Water body */}
      <path
        d="M 240 0 L 400 0 L 400 110 L 320 130 L 250 90 Z"
        className="fill-secondary-fixed"
      />
      <path
        d="M 0 480 L 90 470 L 130 540 L 60 600 L 0 600 Z"
        className="fill-secondary-fixed"
      />

      {/* Road grid — horizontal */}
      {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((y) => (
        <line
          key={`h-${y}`}
          x1="0"
          x2="400"
          y1={y}
          y2={y}
          className="stroke-outline-variant"
          strokeWidth="2"
        />
      ))}
      {/* Road grid — vertical */}
      {[40, 110, 180, 250, 320, 380].map((x) => (
        <line
          key={`v-${x}`}
          y1="0"
          y2="600"
          x1={x}
          x2={x}
          className="stroke-outline-variant"
          strokeWidth="2"
        />
      ))}

      {/* Major arterial — wider stroke */}
      <line
        x1="0"
        x2="400"
        y1="300"
        y2="300"
        className="stroke-surface-container-highest"
        strokeWidth="6"
      />
      <line
        x1="180"
        x2="180"
        y1="0"
        y2="600"
        className="stroke-surface-container-highest"
        strokeWidth="6"
      />

      {decorative ? null : (
        <>
          {/* Route polyline */}
          <path
            d="M 80 460 L 80 300 L 180 300 L 180 200 L 280 200 L 280 130"
            className="stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="0"
          />
          {/* Origin pin (home) */}
          <circle
            cx="80"
            cy="460"
            r="10"
            className="fill-surface-container-lowest stroke-on-surface"
            strokeWidth="3"
          />
          <circle cx="80" cy="460" r="3" className="fill-on-surface" />
          {/* Destination pin (work) */}
          <g transform="translate(280 130)">
            <path
              d="M 0 -28 C -12 -28 -22 -18 -22 -6 C -22 8 0 28 0 28 C 0 28 22 8 22 -6 C 22 -18 12 -28 0 -28 Z"
              className="fill-primary"
            />
            <circle cx="0" cy="-8" r="6" className="fill-on-primary" />
          </g>
        </>
      )}
    </svg>
  );
}
