type GoldOrnamentProps = {
  className?: string;
  /** Compact for inline use under titles */
  size?: "sm" | "md";
};

/**
 * Symmetric gold manuscript flourish — scripture motif without clutter.
 */
export default function GoldOrnament({
  className = "",
  size = "md",
}: GoldOrnamentProps) {
  const width = size === "sm" ? "w-28" : "w-40 md:w-48";

  return (
    <div className={`ornament-row ${className}`} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 20"
        fill="none"
        className={`${width} h-auto text-gold`}
      >
        <path
          d="M8 10c6-6 14-6 20 0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M12 10c4-3.5 10-3.5 14 0"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M52 10 L60 4 L68 10 L60 16 Z"
          fill="currentColor"
          opacity="0.75"
        />
        <circle cx="60" cy="10" r="1.6" fill="var(--background)" />
        <circle cx="44" cy="10" r="1.2" fill="currentColor" opacity="0.5" />
        <circle cx="76" cy="10" r="1.2" fill="currentColor" opacity="0.5" />
        <path
          d="M92 10c6 6 14 6 20 0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M94 10c4 3.5 10 3.5 14 0"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
