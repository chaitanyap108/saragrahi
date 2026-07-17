type BrushTone = "ink" | "accent" | "muted";
type BrushSize = "sm" | "md" | "lg";
type BrushSurface = "card" | "background" | "none";

type BrushStrokeDividerProps = {
  /** Visual tint — ink charcoal, earthy accent, or softer muted */
  tone?: BrushTone;
  /** Stroke scale */
  size?: BrushSize;
  /** Match the section that follows so the join is continuous */
  surface?: BrushSurface;
  /** Extra class names on the outer wrapper */
  className?: string;
  /** Mirror the stroke horizontally for variety between sections */
  mirrored?: boolean;
};

const TONE_CLASS: Record<BrushTone, string> = {
  ink: "text-foreground/30",
  accent: "text-gold/55",
  muted: "text-muted/30",
};

const SIZE_CLASS: Record<BrushSize, string> = {
  sm: "w-[min(42vw,11rem)]",
  md: "w-[min(58vw,16rem)]",
  lg: "w-[min(72vw,20rem)]",
};

const SURFACE_CLASS: Record<BrushSurface, string> = {
  card: "bg-card",
  background: "bg-background",
  none: "",
};

/**
 * Organic dry-brush / ink-sweep section breaker.
 * Uses currentColor so tone is controlled via text-* utilities.
 */
export default function BrushStrokeDivider({
  tone = "ink",
  size = "md",
  surface = "none",
  className = "",
  mirrored = false,
}: BrushStrokeDividerProps) {
  return (
    <div
      className={`flex justify-center items-center py-8 md:py-10 ${SURFACE_CLASS[surface]} ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 28"
        fill="none"
        className={`${SIZE_CLASS[size]} h-auto ${TONE_CLASS[tone]} ${
          mirrored ? "-scale-x-100" : ""
        }`}
      >
        <path
          fill="currentColor"
          d="M8.2 15.4c18.6-4.8 41.2-7.1 64.8-7.6 22.4-.5 45.1.6 66.9 2.4 19.6 1.6 38.4 4.1 57.2 5.2 14.8.9 29.6.4 44.1-1.1 12.8-1.3 25.4-3.6 38.1-4.2 8.6-.4 17.1.3 25.4 1.8 3.1.6 5.2 1.4 4.6 2.6-.4.8-2.4 1.1-5.1.9-9.2-.6-18.4.2-27.5 1.4-13.1 1.7-26.1 4.4-39.4 5.1-16.2.9-32.4-.6-48.4-2.4-18.8-2.1-37.4-5.2-56.4-6.4-21.2-1.3-42.6-.4-63.6 1.8-18.4 1.9-36.4 5.1-54.8 6.6-6.2.5-11.8.4-16.4-.4-2.8-.5-4.2-1.4-3.6-2.4.4-.7 2.1-1.1 5.1-1.3z"
        />
        <path
          fill="currentColor"
          opacity="0.55"
          d="M14 11.8c22.1-2.9 46.4-3.8 69.8-3.2 20.8.5 41.2 2.4 61.4 4.6 16.4 1.8 32.6 4.1 49.1 4.8 11.2.5 22.4-.2 33.4-1.6 9.8-1.2 19.4-3.1 29.2-3.6 6.4-.3 12.6.2 18.4 1.4 1.8.4 2.8.9 2.4 1.5-.3.5-1.6.7-3.4.5-7.2-.6-14.4.1-21.5 1.1-10.4 1.4-20.6 3.6-31.2 4.1-12.8.6-25.6-.6-38.2-2.1-15.2-1.8-30.2-4.4-45.6-5.4-17.4-1.1-34.8-.2-51.8 1.8-14.8 1.7-29.2 4.4-44 5.6-5.1.4-9.6.2-13.2-.5-2.1-.4-3.1-1.1-2.6-1.8.3-.5 1.6-.8 3.8-.9z"
        />
        <path
          fill="currentColor"
          opacity="0.28"
          d="M22 18.6c16.4 1.2 33.2 1.4 49.6.6 14.2-.7 28.2-2.4 42.4-3.2 11.6-.7 23.2-.4 34.6.8 9.4 1 18.6 2.8 28 3.4 7.2.5 14.4.1 21.4-.9 5.8-.8 11.4-2.2 17.1-2.6 3.6-.3 7.1.1 10.2.9.9.2 1.4.5 1.2.8-.2.3-.9.4-1.9.3-4.1-.4-8.2.1-12.2.8-6.1 1.1-12.1 2.8-18.4 3.2-7.6.5-15.2-.2-22.6-1.4-9.2-1.5-18.2-3.6-27.6-4.2-10.8-.7-21.6.1-32.2 1.4-11.8 1.5-23.4 3.8-35.4 4.6-8.2.6-16.4.4-24.2-.4-3.8-.4-7.1-1.1-9.6-1.8-1.4-.4-2-.9-1.7-1.3.2-.3 1.1-.5 2.7-.4z"
        />
        <path
          fill="currentColor"
          opacity="0.35"
          d="M4.8 14.2c1.4-.6 2.8-.4 3.2.4.3.6-.4 1.2-1.6 1.4-1.2.2-2.4-.2-2.6-.8-.2-.5.4-1 1-.1z"
        />
        <path
          fill="currentColor"
          opacity="0.22"
          d="M311.4 13.6c1.8-.3 3.2.2 3.4.9.2.6-.8 1.1-2.2 1.2-1.4.1-2.8-.4-3-.9-.2-.6.6-1 1.8-1.2z"
        />
        <path
          fill="currentColor"
          opacity="0.18"
          d="M6.2 17.1c.9-.2 1.6.1 1.7.5.1.4-.5.7-1.2.7-.8 0-1.4-.3-1.5-.6-.1-.4.4-.6 1-.6z"
        />
      </svg>
    </div>
  );
}
